'use client';

import { useState } from 'react';
import { Icons, boothIconFor } from './Icons';

const EVENT_TYPES = [
  {
    id: 'wedding',
    label: 'Wedding',
    shortLabel: 'Wedding',
    icon: <Icons.Heart />,
    headline: 'Romantic, refined, unforgettable.',
    booths: ['Glam Booth', 'Open-Air Booth', 'Audio Guestbook', 'Custom Backdrop', 'Print Package'],
  },
  {
    id: 'corporate',
    label: 'Corporate Event',
    shortLabel: 'Corporate',
    icon: <Icons.Briefcase />,
    headline: 'Brand activation in every frame.',
    booths: ['Corporate Brand Activation Booth', 'Roaming Booth', 'Digital Gallery', 'QR Sharing', 'Lead Capture'],
  },
  {
    id: 'sweet16',
    label: 'Sweet 16 / Birthday',
    shortLabel: 'Birthday',
    icon: <Icons.Cake />,
    headline: 'Maximum energy, maximum shares.',
    booths: ['360 Booth', 'Mirror Booth', 'Selfie Booth', 'Props', 'Custom Overlay'],
  },
  {
    id: 'mitzvah',
    label: 'Bar / Bat Mitzvah',
    shortLabel: 'Mitzvah',
    icon: <Icons.Scroll />,
    headline: 'A celebration worth re-watching.',
    booths: ['360 Booth', 'Open-Air Booth', 'Mirror Booth', 'Custom Designs', 'Digital Sharing'],
  },
  {
    id: 'school',
    label: 'School Event',
    shortLabel: 'School',
    icon: <Icons.School />,
    headline: 'Prom-night memories, polished.',
    booths: ['Selfie Booth', 'Open-Air Booth', 'Digital Gallery', 'Props', 'Print Package'],
  },
  {
    id: 'gala',
    label: 'Gala / Fundraiser',
    shortLabel: 'Gala',
    icon: <Icons.Star />,
    headline: 'Black-tie portraiture for a cause.',
    booths: ['Glam Booth', 'Branded Booth', 'Roaming Booth', 'Custom Backdrop', 'Digital Gallery'],
  },
  {
    id: 'brand',
    label: 'Brand Activation',
    shortLabel: 'Brand',
    icon: <Icons.Spark />,
    headline: 'Make the brand the takeaway.',
    booths: ['Branded Booth', 'Lead Capture', 'QR Sharing', 'Custom Gallery', 'Corporate Overlay'],
  },
  {
    id: 'holiday',
    label: 'Holiday Party',
    shortLabel: 'Holiday',
    icon: <Icons.Diamond />,
    headline: 'Festive, fast, and on-brand.',
    booths: ['Open-Air Booth', 'Roaming Booth', 'Glam Booth', 'Props', 'Digital Gallery'],
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
              Every event has a personality. Pick yours and we'll surface the booth experiences and
              add-ons our lineup books most often for that room.
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
              aria-pressed={active === e.id}
            >
              <span className="event-chip-num">0{i + 1}</span>
              <span className="event-chip-name event-chip-name-full">{e.label}</span>
              <span className="event-chip-name event-chip-name-short">{e.shortLabel}</span>
              <span
                style={{
                  marginTop: 8,
                  color: active === e.id ? 'var(--gold)' : 'var(--text-muted)',
                }}
                aria-hidden="true"
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
