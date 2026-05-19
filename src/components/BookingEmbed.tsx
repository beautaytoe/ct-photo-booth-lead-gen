'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Google Calendar Appointment Schedule embed.
 *
 * Iframes the operator's public booking page (beau@rizedigital.io's Google
 * Calendar appointment schedule). The booking lands on the real GCal, Google
 * handles timezones / confirmations / reminders end-to-end.
 *
 * We use the LONG URL (calendar.google.com/...) not the shortlink
 * (calendar.app.google/...) because the shortlink 302-redirects and the
 * redirect carries x-frame-options: SAMEORIGIN, which would block embedding.
 * The long URL has neither X-Frame-Options nor frame-ancestors in CSP, so
 * it embeds cleanly on any origin.
 *
 * Analytics: cross-origin iframes can't be inspected, so we approximate
 * intent with two dataLayer events:
 *  - calendar_booking_visible: fires once when the iframe scrolls into view
 *    (IntersectionObserver, 40% threshold)
 *  - calendar_book_attempt: fires once on first click anywhere in the
 *    container (best proxy for "user is interacting with the calendar")
 *
 * To swap calendars later, just update BOOKING_URL.
 */

const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1kErE-VwSRCrlH2cTyi8TqLuLw7IfmkOKj-ehSwblIw_vgSV_MjRgz3pLPrXZvTPjxsbvgv7a-';

export function BookingEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasFiredView = useRef(false);
  const hasFiredInteract = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasFiredView.current) {
            trackEvent('cta_clicked', { cta_id: 'calendar_booking_visible' });
            hasFiredView.current = true;
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onContainerClick = () => {
    if (hasFiredInteract.current) return;
    trackEvent('cta_clicked', { cta_id: 'calendar_book_attempt' });
    hasFiredInteract.current = true;
  };

  return (
    <div
      ref={containerRef}
      onClick={onContainerClick}
      data-cy="booking-embed"
      style={{
        marginTop: 32,
        padding: 4,
        background: 'linear-gradient(160deg, rgba(212,184,124,0.18), rgba(212,184,124,0.02))',
        border: '1px solid rgba(212,184,124,0.28)',
        borderRadius: 22,
      }}
    >
      <iframe
        src={BOOKING_URL}
        title="Book a consultation with Gold Coast Photo Booth Co."
        loading="lazy"
        aria-label="Consultation booking calendar"
        style={{
          width: '100%',
          height: 760,
          border: 0,
          borderRadius: 18,
          background: '#ffffff',
          display: 'block',
        }}
      />
    </div>
  );
}
