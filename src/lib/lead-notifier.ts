/**
 * Lead notification fan-out.
 *
 * Called from /api/lead. Sends the lead to every configured destination
 * in parallel and never blocks the user response on any single channel —
 * if one channel fails (e.g., Resend has an outage or Slack webhook 404s),
 * the others still go through and the form-submit still succeeds.
 *
 * Channels (each gated by env var presence):
 *   - Operator email     → Resend  (RESEND_API_KEY + LEAD_TO_EMAIL)
 *   - Customer auto-reply → Resend (same key, no extra config)
 *   - Slack channel ping → POST    (SLACK_WEBHOOK_URL)
 *   - CRM webhook        → POST    (LEAD_WEBHOOK_URL — e.g., GHL inbound)
 *   - Console log        → always (dev visibility / fallback)
 *
 * Required env vars (set in Vercel project settings):
 *   RESEND_API_KEY          re_…  (https://resend.com → API Keys)
 *   LEAD_TO_EMAIL           beau@yourdomain.com  (where the lead lands)
 *   LEAD_FROM_EMAIL         leads@photoboothrentalct.com  (must be a verified sender in Resend)
 *
 * Optional env vars:
 *   LEAD_REPLY_TO_EMAIL     if set, operator email's Reply-To header
 *   LEAD_BCC_EMAIL          add a BCC (e.g., your CRM intake address)
 *   SLACK_WEBHOOK_URL       https://hooks.slack.com/services/T…/B…/…
 *   LEAD_WEBHOOK_URL        any URL accepting JSON POST (e.g., GHL inbound webhook)
 *   LEAD_SEND_AUTOREPLY     "false" to disable the customer auto-reply
 */

import { Resend } from 'resend';
import { SITE } from './site-data';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  event_date?: string;
  town?: string;
  event_type?: string;
  message?: string;
  services?: string[] | string;
  /** Hidden honeypot field — humans never fill this. If filled, drop silently. */
  website?: string;
  /** Submission metadata (filled server-side). */
  submittedAt?: string;
  userAgent?: string;
  ip?: string;
  referer?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_TO_EMAIL = process.env.LEAD_TO_EMAIL;
const LEAD_FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? 'Gold Coast Photo Booth Co. <onboarding@resend.dev>';
const LEAD_REPLY_TO_EMAIL = process.env.LEAD_REPLY_TO_EMAIL;
const LEAD_BCC_EMAIL = process.env.LEAD_BCC_EMAIL;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;
const SEND_AUTOREPLY = process.env.LEAD_SEND_AUTOREPLY !== 'false';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/** True if the submission looks like spam and should be silently dropped. */
export function isHoneypotTriggered(lead: LeadData): boolean {
  return !!(lead.website && lead.website.trim());
}

/** Basic shape validation. Returns null if OK or a short error message. */
export function validateLead(lead: LeadData): string | null {
  if (!lead.name || lead.name.trim().length < 2) return 'Please add your name.';
  if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return 'Please provide a valid email.';
  if (!lead.phone || lead.phone.replace(/\D/g, '').length < 7) return 'Please provide a valid phone number.';
  return null;
}

function asArray(v: string[] | string | undefined): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  try {
    const parsed = JSON.parse(v);
    return Array.isArray(parsed) ? parsed : [String(v)];
  } catch {
    return [String(v)];
  }
}

function fmtDate(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
}

function buildOperatorSubject(lead: LeadData): string {
  const t = lead.event_type ? ` · ${lead.event_type}` : '';
  const d = lead.event_date ? ` · ${fmtDate(lead.event_date)}` : '';
  const w = lead.town ? ` · ${lead.town}` : '';
  return `New lead — ${lead.name}${t}${w}${d}`;
}

/** Operator notification HTML — readable in any client, mobile-safe. */
function buildOperatorHtml(lead: LeadData): string {
  const services = asArray(lead.services);
  const safe = (s: string | undefined) => (s ? escapeHtml(s) : '<span style="color:#888;">—</span>');
  const replyMailto = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(`Re: your ${lead.event_type ?? 'event'} inquiry — ${SITE.brand}`)}`;
  const phoneTel = `tel:${(lead.phone || '').replace(/[^\d+]/g, '')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>New Lead — ${escapeHtml(SITE.brand)}</title>
</head>
<body style="margin:0;padding:0;background:#f7f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1410;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f5f0;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden;">
          <tr>
            <td style="background:#0b0a09;color:#ecd49a;padding:20px 28px;font-family:Georgia,'Cormorant Garamond',serif;">
              <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#d4b87c;margin-bottom:4px;">New lead</div>
              <div style="font-size:22px;line-height:1.2;color:#f5ecdb;">${escapeHtml(lead.name)}</div>
              <div style="font-size:12px;color:#b6ad9e;margin-top:4px;font-family:-apple-system,sans-serif;">${escapeHtml(lead.event_type ?? 'Event')} · ${escapeHtml(lead.town ?? 'No location')} · ${escapeHtml(fmtDate(lead.event_date))}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;width:140px;">Name</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;color:#1a1410;">${safe(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;">Email</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;"><a href="${replyMailto}" style="color:#1a1410;text-decoration:underline;">${safe(lead.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;">Phone</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;"><a href="${phoneTel}" style="color:#1a1410;text-decoration:underline;">${safe(lead.phone)}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;">Event date</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;">${escapeHtml(fmtDate(lead.event_date))}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;">Town / venue</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;">${safe(lead.town)}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;">Event type</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:16px;">${safe(lead.event_type)}</td>
                </tr>
                ${
                  services.length
                    ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;vertical-align:top;">Interested in</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:14px;">${services.map(s => `<span style="display:inline-block;padding:4px 10px;border:1px solid #d4b87c;border-radius:999px;margin:2px 4px 2px 0;font-size:12px;color:#8b6f3a;">${escapeHtml(s)}</span>`).join('')}</td>
                </tr>`
                    : ''
                }
                ${
                  lead.message
                    ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8b6f3a;vertical-align:top;">Message</td>
                  <td style="padding:12px 0;border-bottom:1px solid #eee5d6;font-size:15px;line-height:1.55;white-space:pre-wrap;">${safe(lead.message)}</td>
                </tr>`
                    : ''
                }
              </table>
              <div style="margin-top:24px;">
                <a href="${replyMailto}" style="display:inline-block;padding:14px 24px;border-radius:999px;background:linear-gradient(180deg,#e6cf94,#c9a865);color:#1a1410;font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;">Reply to ${escapeHtml(lead.name.split(' ')[0] || lead.name)}</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background:#fbf8f3;font-size:11px;color:#74695a;font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.12em;border-top:1px solid #eee5d6;">
              <div>Submitted: ${escapeHtml(lead.submittedAt ?? new Date().toISOString())}</div>
              ${lead.referer ? `<div>Referer: ${escapeHtml(lead.referer)}</div>` : ''}
              ${lead.ip ? `<div>IP: ${escapeHtml(lead.ip)}</div>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plaintext fallback for clients that strip HTML. */
function buildOperatorText(lead: LeadData): string {
  const services = asArray(lead.services).join(', ');
  return [
    `NEW LEAD — ${SITE.brand}`,
    '',
    `Name:        ${lead.name}`,
    `Email:       ${lead.email}`,
    `Phone:       ${lead.phone}`,
    `Event date:  ${fmtDate(lead.event_date)}`,
    `Town/venue:  ${lead.town || '—'}`,
    `Event type:  ${lead.event_type || '—'}`,
    services ? `Interested:  ${services}` : '',
    '',
    lead.message ? `Message:\n${lead.message}` : '',
    '',
    '—',
    `Submitted: ${lead.submittedAt || new Date().toISOString()}`,
    lead.referer ? `Referer: ${lead.referer}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Branded auto-reply for the customer. */
function buildCustomerReplyHtml(lead: LeadData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${escapeHtml(SITE.brand)}</title></head>
<body style="margin:0;padding:0;background:#0b0a09;color:#f5efe6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0a09;padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(180deg,#131110,#0b0a09);border:1px solid rgba(212,184,124,.18);border-radius:18px;overflow:hidden;">
          <tr>
            <td style="padding:36px 36px 8px 36px;text-align:center;">
              <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#d4b87c;">Gold Coast Photo Booth Co.</div>
              <h1 style="font-family:Georgia,'Cormorant Garamond',serif;font-weight:400;font-size:36px;line-height:1.1;color:#f5ecdb;margin:14px 0 0 0;">Thanks, ${escapeHtml(lead.name.split(' ')[0] || lead.name)}.<br /><em style="color:#ecd49a;">We've got your request.</em></h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 28px 36px;text-align:center;font-size:16px;line-height:1.6;color:#b6ad9e;">
              We received your inquiry${lead.event_type ? ` for your <strong style="color:#f5ecdb;">${escapeHtml(lead.event_type.toLowerCase())}</strong>` : ''}${lead.event_date ? ` on <strong style="color:#f5ecdb;">${escapeHtml(fmtDate(lead.event_date))}</strong>` : ''}${lead.town ? ` in <strong style="color:#f5ecdb;">${escapeHtml(lead.town)}</strong>` : ''}. We'll come back to you with a tailored package recommendation and a date check during the next booking-hours window.
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid rgba(212,184,124,.18);border-radius:14px;">
                <tr>
                  <td style="padding:18px 22px;">
                    <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#74695a;">What happens next</div>
                    <ul style="margin:10px 0 0 0;padding:0 0 0 18px;font-size:14px;line-height:1.7;color:#b6ad9e;">
                      <li>We confirm whether your date is open.</li>
                      <li>We send a tailored package recommendation (line-itemed).</li>
                      <li>We follow up with any venue or logistics questions.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 36px 36px;text-align:center;">
              <a href="${SITE.domain}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(180deg,#e6cf94,#c9a865);color:#1a1410;font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;">Visit ${escapeHtml(SITE.seoDescriptor)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 36px;background:#0b0a09;border-top:1px solid rgba(212,184,124,.12);font-size:10px;color:#74695a;font-family:'JetBrains Mono',ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;text-align:center;">
              ${escapeHtml(SITE.brand)} · Connecticut
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildCustomerReplyText(lead: LeadData): string {
  return [
    `Thanks, ${lead.name.split(' ')[0] || lead.name}.`,
    '',
    `We received your inquiry${lead.event_type ? ` for your ${lead.event_type.toLowerCase()}` : ''}${
      lead.event_date ? ` on ${fmtDate(lead.event_date)}` : ''
    }${lead.town ? ` in ${lead.town}` : ''}. We'll come back to you with a tailored package recommendation and a date check during the next booking-hours window.`,
    '',
    'What happens next:',
    '  • We confirm whether your date is open',
    '  • We send a tailored package recommendation (line-itemed)',
    '  • We follow up with any venue or logistics questions',
    '',
    SITE.brand,
    SITE.domain,
  ].join('\n');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Send the lead through every configured channel in parallel. */
export async function notifyLead(lead: LeadData) {
  const ts = lead.submittedAt ?? new Date().toISOString();
  const enriched = { ...lead, submittedAt: ts };

  // Always console-log so Vercel Function Logs preserves a copy.
  // Strip the honeypot before logging so the log line stays narrow.
  const { website: _hp, ...logSafe } = enriched;
  void _hp;
  // eslint-disable-next-line no-console
  console.log('[lead]', JSON.stringify(logSafe));

  const tasks: Promise<{ channel: string; ok: boolean; detail?: string }>[] = [];

  // 1. Operator email via Resend
  if (resend && LEAD_TO_EMAIL) {
    tasks.push(
      (async () => {
        try {
          const res = await resend.emails.send({
            from: LEAD_FROM_EMAIL,
            to: [LEAD_TO_EMAIL],
            ...(LEAD_BCC_EMAIL ? { bcc: [LEAD_BCC_EMAIL] } : {}),
            replyTo: LEAD_REPLY_TO_EMAIL ?? enriched.email,
            subject: buildOperatorSubject(enriched),
            html: buildOperatorHtml(enriched),
            text: buildOperatorText(enriched),
            tags: [
              { name: 'kind', value: 'lead-operator' },
              { name: 'event_type', value: (enriched.event_type ?? 'unknown').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 32) },
            ],
          });
          if (res.error) throw new Error(res.error.message);
          return { channel: 'operator-email', ok: true, detail: res.data?.id };
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[lead] operator email failed', err);
          return { channel: 'operator-email', ok: false, detail: err instanceof Error ? err.message : 'unknown' };
        }
      })()
    );
  }

  // 2. Customer auto-reply via Resend
  if (resend && SEND_AUTOREPLY && enriched.email) {
    tasks.push(
      (async () => {
        try {
          const res = await resend.emails.send({
            from: LEAD_FROM_EMAIL,
            to: [enriched.email],
            ...(LEAD_REPLY_TO_EMAIL ? { replyTo: LEAD_REPLY_TO_EMAIL } : LEAD_TO_EMAIL ? { replyTo: LEAD_TO_EMAIL } : {}),
            subject: `We got it — ${SITE.brand}`,
            html: buildCustomerReplyHtml(enriched),
            text: buildCustomerReplyText(enriched),
            tags: [{ name: 'kind', value: 'lead-autoreply' }],
          });
          if (res.error) throw new Error(res.error.message);
          return { channel: 'customer-autoreply', ok: true, detail: res.data?.id };
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[lead] customer auto-reply failed', err);
          return { channel: 'customer-autoreply', ok: false, detail: err instanceof Error ? err.message : 'unknown' };
        }
      })()
    );
  }

  // 3. Slack channel notification
  if (SLACK_WEBHOOK_URL) {
    tasks.push(
      (async () => {
        try {
          const text = [
            `*New lead — ${enriched.name}*`,
            `Email: ${enriched.email}`,
            `Phone: ${enriched.phone}`,
            `Event: ${enriched.event_type ?? '—'} · ${enriched.town ?? '—'} · ${fmtDate(enriched.event_date)}`,
            enriched.message ? `> ${enriched.message.replace(/\n/g, ' ')}` : '',
          ]
            .filter(Boolean)
            .join('\n');
          const res = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ text }),
          });
          if (!res.ok) throw new Error(`Slack returned ${res.status}`);
          return { channel: 'slack', ok: true };
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[lead] slack failed', err);
          return { channel: 'slack', ok: false, detail: err instanceof Error ? err.message : 'unknown' };
        }
      })()
    );
  }

  // 4. Generic CRM / inbound webhook (GHL, Zapier, etc.)
  if (LEAD_WEBHOOK_URL) {
    tasks.push(
      (async () => {
        try {
          const res = await fetch(LEAD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...enriched, source: SITE.domain }),
          });
          if (!res.ok) throw new Error(`Webhook returned ${res.status}`);
          return { channel: 'webhook', ok: true };
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[lead] webhook failed', err);
          return { channel: 'webhook', ok: false, detail: err instanceof Error ? err.message : 'unknown' };
        }
      })()
    );
  }

  const results = await Promise.all(tasks);
  return {
    delivered: results.filter((r) => r.ok).map((r) => r.channel),
    failed: results.filter((r) => !r.ok),
    configured: results.length,
  };
}
