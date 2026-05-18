'use client';

import { useState } from 'react';
import { Icons } from './Icons';

/** Compact lead form used in non-homepage contexts. The full editorial form is <FinalCTA />. */
export function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
    return (
      <div className="form" style={{ alignItems: 'center', textAlign: 'center', padding: 56 }}>
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
        <h3 className="display" style={{ fontSize: 36, margin: '16px 0 8px' }}>
          Got it. <em>We're on it.</em>
        </h3>
        <p className="lede" style={{ maxWidth: '44ch' }}>
          Expect a tailored proposal and a soft date hold within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <div className="field">
          <label>Full Name</label>
          <input required name="name" type="text" placeholder="Olivia Chen" />
        </div>
        <div className="field">
          <label>Email</label>
          <input required name="email" type="email" placeholder="olivia@example.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Phone</label>
          <input required name="phone" type="tel" placeholder="(203) 555 ⋯" />
        </div>
        <div className="field">
          <label>Event Date</label>
          <input name="event_date" type="date" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Town / Venue</label>
          <input name="town" type="text" placeholder="Stamford, Greenwich, Westport…" />
        </div>
        <div className="field">
          <label>Event Type</label>
          <select name="event_type" defaultValue="Wedding">
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
        <label>Message</label>
        <textarea name="message" rows={4} placeholder="Tell us about your event…" />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', padding: 20 }}
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
        Replies within one business day · No spam · Quote is no obligation
      </div>
    </form>
  );
}
