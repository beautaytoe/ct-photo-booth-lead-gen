'use client';

import { useState } from 'react';
import { Icons } from './Icons';

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

  const toggle = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
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

          <form className="form" onSubmit={submit}>
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
