'use client';

import { useState } from 'react';
import { Icons, boothIconFor } from './Icons';

const EVENT_TYPES = [
  {
    id: 'wedding',
    label: 'Wedding',
    icon: <Icons.Heart />,
    headline: 'Romantic, refined, unforgettable.',
    booths: ['Glam Booth', 'Open-Air Booth', 'Audio Guestbook', '360 Booth'],
  },
  {
    id: 'corporate',
    label: 'Corporate Event',
    icon: <Icons.Briefcase />,
    headline: 'Brand activation in every frame.',
    booths: ['Branded Photo Booth', 'Lead Capture Booth', 'Digital Sharing Booth', '360 Booth'],
  },
  {
    id: 'sweet16',
    label: 'Sweet 16 / Birthday',
    icon: <Icons.Cake />,
    headline: 'Maximum energy, maximum shares.',
    booths: ['360 Booth', 'Mirror Booth', 'Selfie Booth'],
  },
  {
    id: 'mitzvah',
    label: 'Bar / Bat Mitzvah',
    icon: <Icons.Scroll />,
    headline: 'A celebration worth re-watching.',
    booths: ['360 Booth', 'Open-Air Booth', 'Glam Booth'],
  },
  {
    id: 'school',
    label: 'School Event',
    icon: <Icons.School />,
    headline: 'Prom-night memories, polished.',
    booths: ['Open-Air Booth', 'Selfie Booth', 'Mirror Booth'],
  },
  {
    id: 'gala',
    label: 'Gala / Fundraiser',
    icon: <Icons.Star />,
    headline: 'Black-tie portraiture for a cause.',
    booths: ['Glam Booth', 'Corporate Booth', 'Premium Backdrop', 'Audio Guestbook'],
  },
];

export function EventSelector() {
  const [active, setActive] = useState('wedding');
  const ev = EVENT_TYPES.find((e) => e.id === active)!;

  return (
    <section className="section dark" id="experiences-for-event">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">01 — Match your event</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Tell us what you're<br />
              throwing. We'll <em>tell you</em>
              <br />
              what to book.
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Every event has a personality. Pick yours and we'll surface the booth experiences our
              team books most often for that room — and what they pair with.
            </p>
          </div>
        </div>

        <div className="event-selector">
          {EVENT_TYPES.map((e, i) => (
            <button
              key={e.id}
              className={`event-chip ${active === e.id ? 'active' : ''}`}
              onClick={() => setActive(e.id)}
              type="button"
            >
              <span className="event-chip-num">0{i + 1}</span>
              <span className="event-chip-name">{e.label}</span>
              <span
                style={{
                  marginTop: 8,
                  color: active === e.id ? 'var(--gold)' : 'var(--text-muted)',
                }}
              >
                {e.icon}
              </span>
            </button>
          ))}
        </div>

        <div className="event-recos">
          <div className="event-recos-label">
            <span className="eyebrow">Recommended for {ev.label}</span>
            <h3>{ev.headline}</h3>
          </div>
          <div className="event-recos-cards">
            {ev.booths.map((b) => (
              <div key={b} className="event-reco">
                <div className="event-reco-icon">{boothIconFor(b)}</div>
                <div className="event-reco-name">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
