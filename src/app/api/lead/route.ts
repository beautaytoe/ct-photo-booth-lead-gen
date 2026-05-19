import { NextResponse } from 'next/server';
import { notifyLead, validateLead, isHoneypotTriggered, type LeadData } from '@/lib/lead-notifier';
import { createOrUpsertContact } from '@/lib/ghl';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Resend needs Node runtime, not Edge

/** Split a "first last" name into firstName/lastName. Last word is the
 *  surname; everything before is the given/middle name. Single-token names
 *  go to firstName only. */
function splitName(full: string): { firstName?: string; lastName?: string } {
  const trimmed = (full ?? '').trim();
  if (!trimmed) return {};
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
}

export async function POST(request: Request) {
  let body: LeadData;
  try {
    body = (await request.json()) as LeadData;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Spam: silently accept honeypot triggers so the bot doesn't iterate
  // on the failure. Return 200 but don't notify.
  if (isHoneypotTriggered(body)) {
    // eslint-disable-next-line no-console
    console.log('[lead] honeypot triggered, dropping silently');
    return NextResponse.json({ ok: true });
  }

  const validationError = validateLead(body);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
  }

  // Enrich with request metadata for the operator email footer
  const headers = request.headers;
  const enriched: LeadData = {
    ...body,
    submittedAt: new Date().toISOString(),
    userAgent: headers.get('user-agent') ?? undefined,
    ip:
      headers.get('x-real-ip') ??
      headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      undefined,
    referer: headers.get('referer') ?? undefined,
  };

  try {
    const result = await notifyLead(enriched);

    // GHL upsert runs AFTER Resend so a slow/down GHL doesn't delay the
    // operator email. Failure here is logged but never bubbles — the user
    // still gets ok:true because their lead is already preserved in Resend +
    // Vercel Function Logs.
    const formLocation = enriched.form_location ?? 'lead_form';
    const { firstName, lastName } = splitName(enriched.name);
    const services = Array.isArray(enriched.services)
      ? enriched.services
      : enriched.services
      ? [enriched.services]
      : undefined;
    const ghlResult = await createOrUpsertContact({
      firstName,
      lastName,
      email: enriched.email,
      phone: enriched.phone,
      services,
      event_type: enriched.event_type,
      event_date: enriched.event_date,
      notes: enriched.message,
      form_location: formLocation,
      source: 'website',
      tags: ['website-lead', `form:${formLocation}`],
    });
    if ('error' in ghlResult) {
      // eslint-disable-next-line no-console
      console.error('[ghl] contact upsert failed:', ghlResult.error);
    } else {
      // eslint-disable-next-line no-console
      console.log(
        '[ghl] contact upserted:',
        ghlResult.id,
        'existing:',
        ghlResult.existing,
        'noteCreated:',
        ghlResult.noteCreated,
        ghlResult.noteError ? `noteError: ${ghlResult.noteError}` : ''
      );
    }

    // If Resend / Slack / etc. are not configured, result.configured === 0.
    // We still return ok:true so the user sees the success state — the
    // submission is preserved in Vercel Function Logs (console.log) until
    // the integrations come online.
    return NextResponse.json({
      ok: true,
      delivered: result.delivered,
      configured: result.configured,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[lead] unexpected error', err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
