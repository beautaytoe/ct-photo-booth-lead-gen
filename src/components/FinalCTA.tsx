'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Icons } from './Icons';
import { trackEvent } from '@/lib/analytics';

const SERVICE_CHIPS = [
  'Open-Air Photo Booth',
  '360 Booth',
  'Glam Booth',
  'Mirror Booth',
  'Selfie Booth',
  'Roaming Booth',
  'Audio Guestbook',
  'Corporate Activation',
  'Backdrops / Props',
  'Print Package',
  'Not Sure Yet',
];

const MOBILE_VISIBLE = 6;

export function FinalCTA() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    type: 'Wedding',
    message: '',
    services: ['Open-Air Photo Booth', '360 Booth'] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [chipsExpanded, setChipsExpanded] = useState(false);
  const hasFiredStart = useRef(false);

  const toggle = (s: string) => {
    setForm((f) => {
      if (f.services.includes(s)) {
        return { ...f, services: f.services.filter((x) => x !== s) };
      }
      trackEvent('service_selected', { service: s, form_location: 'final_cta' });
      return { ...f, services: [...f.services, s] };
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    // Read the hidden honeypot field straight from the form DOM
    const formEl = e.currentTarget;
    const honeypot = (formEl.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '';
    const payload = {
      ...form,
      event_date: form.date,
      town: form.venue,
      event_type: form.type,
      website: honeypot,
      form_location: 'final_cta' as const,
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to submit');
      setStatus('success');
      trackEvent('form_submit', {
        form_location: 'final_cta',
        services: form.services.join(','),
        event_type: form.type,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setStatus('error');
      setErrorMsg(message);
      trackEvent('form_error', { form_location: 'final_cta', error_message: message });
    }
  };

  return (
    <section className="section final-cta" id="cta">
      <div className="container">
        <div className="cta-grid">
          <div>
            <span className="eyebrow">11 — Let's Talk</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Tell us your date —<br />
              we'll help match<br />
              the right booth<br />
              <em>to your event.</em>
            </h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Send us your date, venue, and event type and we'll come back with a tailored package
              recommendation, a clean line-itemed quote, and follow up while you decide.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40 }}>
              <ValueRow
                icon={<Icons.Spark size={14} />}
                title="Fast replies during booking hours"
                sub="Tailored proposal, not a generic catalog."
              />
              <ValueRow
                icon={<Icons.Diamond size={14} />}
                title="Date check before quote"
                sub="We confirm whether your date is open before sending pricing."
              />
              <ValueRow
                icon={<Icons.Heart size={14} />}
                title="Statewide Connecticut coverage"
                sub="Service available statewide, with travel pricing confirmed before booking."
              />
            </div>
          </div>

          <form
            className="form"
            onSubmit={submit}
            onFocus={() => {
              if (hasFiredStart.current) return;
              trackEvent('form_start', { form_location: 'final_cta' });
              hasFiredStart.current = true;
            }}
          >
            {/* Honeypot: hidden from humans, bots fill it and get silently dropped server-side */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </label>
            </div>
            {status === 'success' ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #e6cf94, #c9a865)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#1a1410',
                  }}
                >
                  <Icons.Check size={28} />
                </div>
                <h3 className="display" style={{ fontSize: 36, margin: 0 }}>
                  Got it. <em>We're on it.</em>
                </h3>
                <p className="lede" style={{ maxWidth: '44ch' }}>
                  Expect a tailored proposal during the next booking-hours window. We'll match the
                  right booth to your event.
                </p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="field">
                    <label>Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Best contact number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Event Date</label>
                    <input
                      type="date"
                      name="event_date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Event Town / Venue</label>
                    <input
                      type="text"
                      name="town"
                      placeholder="Stamford ballroom, Greenwich estate…"
                      value={form.venue}
                      onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Event Type</label>
                    <select
                      name="event_type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Sweet 16 / Birthday</option>
                      <option>Bar / Bat Mitzvah</option>
                      <option>Gala / Fundraiser</option>
                      <option>School Event</option>
                      <option>Brand Activation</option>
                      <option>Holiday Party</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Interested Services</label>
                  <div className="chip-group">
                    {SERVICE_CHIPS.map((s, idx) => {
                      const beyondMobileLimit = idx >= MOBILE_VISIBLE;
                      const cls =
                        'chip' +
                        (form.services.includes(s) ? ' active' : '') +
                        (beyondMobileLimit ? ' chip-extra' : '');
                      // If past the mobile limit and chips are collapsed on mobile, skip rendering on mobile via CSS class
                      return (
                        <button
                          type="button"
                          key={s}
                          className={cls + (chipsExpanded ? ' chip-extra-shown' : '')}
                          onClick={() => toggle(s)}
                        >
                          {s}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className="chip chip-more"
                      onClick={() => setChipsExpanded((v) => !v)}
                      aria-expanded={chipsExpanded}
                    >
                      {chipsExpanded ? 'Show fewer' : 'More options'}
                    </button>
                  </div>
                </div>

                <div className="field">
                  <label>Message (optional)</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your event, your vision, what you've seen and loved..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {/* TCPA / SMS consent disclosure at point of phone-number
                    collection. Audit reference: Critical issue C2. Privacy
                    policy contains the full consent language; this is the
                    visible "clear and conspicuous" notice expected at the form. */}
                <p
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    lineHeight: 1.55,
                    color: 'var(--text-muted)',
                    margin: '8px 0 8px',
                  }}
                >
                  By submitting, you agree to be contacted by phone, SMS, or email about your
                  inquiry. See our{' '}
                  <Link
                    href="/privacy/"
                    style={{ color: 'var(--gold-bright)', textDecoration: 'underline' }}
                  >
                    privacy policy
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginTop: 8, width: '100%', justifyContent: 'center', padding: 20, minHeight: 56 }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Check Availability'}
                  <span className="arrow" />
                </button>

                {status === 'error' && (
                  <div style={{ fontSize: 13, color: '#e8a99c', textAlign: 'center' }}>
                    {errorMsg || 'Please try again or contact us.'}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 10,
                    letterSpacing: '.2em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  Fast replies during booking hours · No obligation · We'll help match the right booth to your event.
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ValueRow({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--gold)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--gold)',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--ivory)' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{sub}</div>
      </div>
    </div>
  );
}
