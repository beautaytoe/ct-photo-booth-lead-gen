'use client';

import { useState } from 'react';
import { Icons } from './Icons';

const SERVICE_CHIPS = [
  'Open-Air',
  '360 Booth',
  'Glam Booth',
  'Mirror Booth',
  'Selfie Booth',
  'Audio Guestbook',
  'Corporate Activation',
];

export function FinalCTA() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    type: 'Wedding',
    message: '',
    services: ['Open-Air', '360 Booth'] as string[],
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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
            <span className="eyebrow">09 — Let's Talk</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Tell us your date —<br />
              we'll help match<br />
              the right booth<br />
              <em>to your event.</em>
            </h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Most inquiries get a tailored proposal within one business day, including booth
              recommendations, package pricing, and a hold on your date.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40 }}>
              <ValueRow icon={<Icons.Spark size={14} />} title="One-business-day reply" sub="Tailored proposal, not a generic catalog." />
              <ValueRow icon={<Icons.Diamond size={14} />} title="Soft hold on your date" sub="We'll reserve a 7-day window while you decide." />
              <ValueRow icon={<Icons.Heart size={14} />} title="Local team, local rates" sub="Fairfield County warehouse — no out-of-state travel fees." />
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
                  Expect a tailored proposal and a soft date hold within one business day. We'll
                  reply from a Fairfield County number — keep an eye out.
                </p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Olivia Chen"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="olivia@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(203) 555 ⋯"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                    <label>Town / Venue</label>
                    <input
                      type="text"
                      name="town"
                      placeholder="Belle Haven Club, Greenwich"
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
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label>Interested Services</label>
                  <div className="chip-group">
                    {SERVICE_CHIPS.map((s) => (
                      <button
                        type="button"
                        key={s}
                        className={`chip ${form.services.includes(s) ? 'active' : ''}`}
                        onClick={() => toggle(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label>Message</label>
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
                  style={{ marginTop: 8, width: '100%', justifyContent: 'center', padding: 20 }}
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Check Availability'}
                  <span className="arrow" />
                </button>

                {status === 'error' && (
                  <div style={{ fontSize: 13, color: '#e8a99c', textAlign: 'center' }}>
                    {errorMsg || 'Please try again or call us.'}
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
                  Replies sent within one business day · No spam · Quote is no obligation
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
