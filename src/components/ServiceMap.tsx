'use client';

import { useState } from 'react';
import Link from 'next/link';

const COUNTIES = [
  {
    id: 'fairfield',
    n: '01',
    name: 'Fairfield County',
    meta: 'Primary Market',
    featured: true,
    polygon: '60,300 60,360 80,400 130,420 180,430 230,420 230,350 200,330 160,320 110,310',
  },
  {
    id: 'new-haven',
    n: '02',
    name: 'New Haven County',
    meta: 'Coastal Service',
    featured: false,
    polygon: '230,420 230,350 280,330 330,330 360,370 360,420 320,440 270,440',
  },
  {
    id: 'litchfield',
    n: '03',
    name: 'Litchfield County',
    meta: 'Hill Country',
    featured: false,
    polygon: '60,180 60,300 180,300 200,260 200,200 160,170 110,170',
  },
  {
    id: 'hartford',
    n: '04',
    name: 'Hartford County',
    meta: 'Capital Region',
    featured: false,
    polygon: '200,200 200,330 280,330 310,300 310,200 270,180',
  },
  {
    id: 'middlesex',
    n: '05',
    name: 'Middlesex County',
    meta: 'Shoreline',
    featured: false,
    polygon: '310,300 360,330 410,360 410,400 360,420 320,420 320,360',
  },
  {
    id: 'new-london',
    n: '06',
    name: 'New London County',
    meta: 'Eastern Shore',
    featured: false,
    polygon: '410,290 410,400 510,420 540,400 540,310 480,290',
  },
  {
    id: 'tolland',
    n: '07',
    name: 'Tolland County',
    meta: 'Northeast',
    featured: false,
    polygon: '310,200 310,300 410,290 410,200 360,180',
  },
  {
    id: 'windham',
    n: '08',
    name: 'Windham County',
    meta: 'Quiet Corner',
    featured: false,
    polygon: '410,200 410,290 510,290 540,260 540,200 470,180',
  },
];

export function ServiceMap() {
  const [active, setActive] = useState('fairfield');
  return (
    <section className="section dark" id="service-area">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">07 — Connecticut Service Area</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Statewide coverage,<br />
              <em>Fairfield first.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              We serve events across Connecticut, with Fairfield County as our first-priority
              market. Availability, travel pricing, and setup requirements are confirmed before
              each booking.
            </p>
          </div>
        </div>

        <div className="map-section">
          <div className="map-list">
            {COUNTIES.map((c) => (
              <Link
                key={c.id}
                href={`/photo-booth-rental-${c.id}-county-ct/`}
                className={`map-row ${c.featured ? 'featured' : ''} ${active === c.id ? 'active' : ''}`}
                onMouseEnter={() => setActive(c.id)}
              >
                <span className="map-row-num">{c.n}</span>
                <span className="map-row-name">{c.name}</span>
                <span className="map-row-meta">{c.meta}</span>
              </Link>
            ))}
          </div>

          <div className="map-svg-wrap">
            <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="featGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#ecd49a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#d4b87c" stopOpacity="0.2" />
                </radialGradient>
                <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0e1a2c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0e1a2c" stopOpacity="0" />
                </linearGradient>
              </defs>

              <rect x="0" y="430" width="600" height="70" fill="url(#seaGrad)" />

              {COUNTIES.map((c) => {
                const isActive = active === c.id;
                const isFeat = c.featured;
                return (
                  <g key={c.id} onMouseEnter={() => setActive(c.id)} style={{ cursor: 'pointer' }}>
                    <polygon
                      points={c.polygon}
                      fill={isFeat ? 'url(#featGrad)' : isActive ? 'rgba(212,184,124,.25)' : 'rgba(255,250,240,.04)'}
                      stroke={isFeat || isActive ? 'var(--gold)' : 'var(--line-strong)'}
                      strokeWidth={isFeat ? 1.5 : 1}
                      style={{ transition: 'all .3s ease' }}
                    />
                  </g>
                );
              })}

              {COUNTIES.map((c) => {
                if (active !== c.id) return null;
                const pts = c.polygon.split(' ').map((p) => p.split(',').map(Number));
                const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
                const cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
                return (
                  <g key={c.id + '-label'}>
                    <circle cx={cx} cy={cy} r="4" fill="var(--gold-bright)" style={{ filter: 'drop-shadow(0 0 8px var(--gold-bright))' }} />
                    <text
                      x={cx}
                      y={cy - 14}
                      textAnchor="middle"
                      fontFamily="var(--mono)"
                      fontSize="11"
                      fill="var(--gold-bright)"
                      letterSpacing="2"
                    >
                      {c.name.replace(' County', '').toUpperCase()}
                    </text>
                  </g>
                );
              })}

              <g transform="translate(490, 60)" opacity="0.5">
                <circle cx="0" cy="0" r="18" fill="none" stroke="var(--gold)" />
                <text x="0" y="-22" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--gold)" letterSpacing="2">
                  N
                </text>
                <path d="M0 -14 L4 0 L0 14 L-4 0 Z" fill="var(--gold)" />
              </g>
              <text x="40" y="40" fontFamily="var(--mono)" fontSize="10" fill="var(--text-muted)" letterSpacing="3">
                CONNECTICUT
              </text>
              <text x="40" y="55" fontFamily="var(--mono)" fontSize="8" fill="var(--text-muted)" letterSpacing="2">
                SERVICE AREAS · 2026
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
