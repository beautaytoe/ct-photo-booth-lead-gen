'use client';

import { useState } from 'react';

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
      <div className="rounded-2xl border border-[color:var(--color-rose)] bg-white p-8 text-center">
        <div className="text-3xl mb-2">✓</div>
        <h3 className="font-[var(--font-display)] text-2xl font-semibold">Got it!</h3>
        <p className="mt-2 text-[color:var(--color-ink-soft)]/80">
          We will check availability and reply within one business day. For urgent requests, give us a call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6 md:p-8 grid gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Event date" name="event_date" type="date" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Event type" name="event_type" placeholder="Wedding, corporate, Sweet 16…" />
        <Field label="Town / venue (CT)" name="town" placeholder="Stamford, Greenwich, Westport…" />
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-[color:var(--color-ink-soft)]">Tell us about your event</span>
        <textarea
          name="message"
          rows={4}
          className="rounded-xl border border-[color:var(--color-blush)] bg-[color:var(--color-cream)]/60 px-3.5 py-2.5 outline-none focus:border-[color:var(--color-rose)] focus:ring-2 focus:ring-[color:var(--color-rose)]/20 transition"
        />
      </label>
      <button type="submit" className="btn-gold" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Check Availability'}
      </button>
      {status === 'error' && (
        <div className="text-sm text-red-700">{errorMsg || 'Please try again or call us.'}</div>
      )}
      <p className="text-xs text-[color:var(--color-ink-soft)]/60">
        By submitting, you agree to be contacted by {`Gold Coast Photo Booth Co.`} regarding your event inquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-[color:var(--color-ink-soft)]">
        {label}
        {required && <span className="text-[color:var(--color-rose-dark)]"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-[color:var(--color-blush)] bg-[color:var(--color-cream)]/60 px-3.5 py-2.5 outline-none focus:border-[color:var(--color-rose)] focus:ring-2 focus:ring-[color:var(--color-rose)]/20 transition"
      />
    </label>
  );
}
