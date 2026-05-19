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

/** Compact lead form used in non-homepage contexts. The full editorial form is <FinalCTA />. */
export function LeadForm() {
  const [services, setServices] = useState<string[]>(['Open-Air Photo Booth']);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const hasFiredStart = useRef(false);

  const toggle = (s: string) => {
    setServices((cur) => {
      if (cur.includes(s)) return cur.filter((x) => x !== s);
      trackEvent('service_selected', { service: s, form_location: 'lead_form' });
      return [...cur, s];
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const form = e.currentTarget;
    // FormData picks up the honeypot 'website' field automatically — the
    // server silently drops submissions where it's filled.
    const data = {
      ...Object.fromEntries(new FormData(form).entries()),
      services,
      form_location: 'lead_form' as const,
    };
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error || 'Failed to submit');
      setStatus('success');
      trackEvent('form_submit', {
        form_location: 'lead_form',
        services: services.join(','),
      });
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setStatus('error');
      setErrorMsg(message);
      trackEvent('form_error', { form_location: 'lead_form', error_message: message });
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
          Expect a tailored proposal during the next booking-hours window.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      onFocus={() => {
        if (hasFiredStart.current) return;
        trackEvent('form_start', { form_location: 'lead_form' });
        hasFiredStart.current = true;
      }}
    >
      {/* Honeypot: hidden from humans, bots fill it and get silently dropped server-side */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Name</label>
          <input required name="name" type="text" placeholder="Your name" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input required name="phone" type="tel" placeholder="Best contact number" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Email</label>
          <input required name="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label>Event Date</label>
          <input name="event_date" type="date" />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Event Town / Venue</label>
          <input name="town" type="text" placeholder="Stamford ballroom, Greenwich estate…" />
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
            <option>Brand Activation</option>
            <option>Holiday Party</option>
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
              className={`chip ${services.includes(s) ? 'active' : ''}`}
              onClick={() => toggle(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>Message (optional)</label>
        <textarea name="message" rows={4} placeholder="Tell us about your event…" />
      </div>
      {/* TCPA / SMS consent disclosure at point of phone-number collection.
          Audit reference: Critical issue C2. Privacy policy contains the
          full consent language; this is the visible "clear and conspicuous"
          notice expected at the form. */}
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          lineHeight: 1.55,
          color: 'var(--text-muted)',
          margin: '4px 0 12px',
        }}
      >
        By submitting, you agree to be contacted by phone, SMS, or email about your inquiry. See
        our{' '}
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
        style={{ width: '100%', justifyContent: 'center', padding: 20 }}
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
        Fast replies during booking hours · No obligation · We'll match the right booth to your event.
      </div>
    </form>
  );
}
