import { NextResponse } from 'next/server';
import { notifyLead, validateLead, isHoneypotTriggered, type LeadData } from '@/lib/lead-notifier';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Resend needs Node runtime, not Edge

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
