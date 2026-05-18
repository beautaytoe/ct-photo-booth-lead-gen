import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Until a real GHL webhook is wired in, log the lead for debugging.
    // Replace this with a real fetch() to your GoHighLevel form webhook.
    // eslint-disable-next-line no-console
    console.log('[lead]', new Date().toISOString(), body);

    // Light validation — never block legit submissions.
    const required = ['name', 'email', 'phone'];
    for (const f of required) {
      if (!body[f] || typeof body[f] !== 'string') {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${f}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
