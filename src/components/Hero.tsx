'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';

interface HeroProps {
  eyebrow?: string;
  /** Three lines of headline. The third line is shown as <em> (italic gold). */
  titleLines?: [string, string, string];
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showTrustStrip?: boolean;
}

const DEFAULT_LINES: [string, string, string] = [
  'Turn your event',
  'into the moment',
  'everyone posts.',
];

const TRUST_STRIP_ITEMS = [
  'Weddings',
  'Corporate Events',
  'Sweet 16s',
  'Bar / Bat Mitzvahs',
  'School Events',
  'Galas',
  'Brand Activations',
];

interface FloatCardData {
  style: React.CSSProperties;
  delay: number;
  label: string;
  name: string;
  icon: React.ReactNode;
  depth: number;
}

const CARDS: FloatCardData[] = [
  { style: { top: '6%', left: '-4%' }, delay: 0, label: 'Showstopper', name: '360 Booth', icon: <Icons.ThreeSixty size={20} />, depth: 20 },
  { style: { top: '22%', right: '-6%' }, delay: 1, label: 'Editorial', name: 'Glam Booth', icon: <Icons.Glam size={20} />, depth: -25 },
  { style: { top: '45%', left: '10%' }, delay: 2, label: 'Classic', name: 'Open-Air', icon: <Icons.Camera size={20} />, depth: 15 },
  { style: { top: '58%', right: '0%' }, delay: 1.5, label: 'Magic', name: 'Mirror Booth', icon: <Icons.Mirror size={20} />, depth: -18 },
  { style: { bottom: '8%', left: '-2%' }, delay: 0.5, label: 'Memory', name: 'Audio Guestbook', icon: <Icons.Phone size={20} />, depth: 28 },
  { style: { bottom: '20%', right: '12%' }, delay: 2.5, label: 'Brand', name: 'Corporate', icon: <Icons.Corporate size={20} />, depth: -12 },
];

export function Hero({
  eyebrow = 'Connecticut Photo Booth Rentals · Fairfield County First',
  titleLines = DEFAULT_LINES,
  subtitle = 'Premium photo booth, 360 booth, glam booth, mirror booth, roaming booth, selfie booth, and audio guestbook rentals for weddings, corporate events, private parties, school events, and celebrations across Connecticut.',
  primaryCta = { label: 'Check Availability', href: '/check-availability/' },
  secondaryCta = { label: 'View Booth Experiences', href: '#experiences' },
  showTrustStrip = true,
}: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      setTilt({ x, y });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const px = (depth: number) => `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`;

  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-vignette" />

      <div className="container">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="display hero-headline">
              {titleLines[0]}
              <br />
              {titleLines[1]}
              <br />
              <em>{titleLines[2]}</em>
            </h1>
            <p className="hero-sub">{subtitle}</p>
            <div className="hero-ctas">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn btn-primary">
                  {primaryCta.label}
                  <span className="arrow" />
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn btn-ghost">
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {showTrustStrip && (
              <ul
                aria-label="Event types we serve"
                style={{
                  margin: '0 0 36px 0',
                  padding: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  listStyle: 'none',
                }}
              >
                {TRUST_STRIP_ITEMS.map((t) => (
                  <li
                    key={t}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 10,
                      letterSpacing: '.18em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      padding: '6px 12px',
                      border: '1px solid var(--line)',
                      borderRadius: 999,
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <div className="hero-meta">
              <div className="hero-meta-item">
                <div className="hero-meta-num">12</div>
                <div className="hero-meta-label">Booth &amp; Add-On Options</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">8</div>
                <div className="hero-meta-label">CT Counties Served</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">169</div>
                <div className="hero-meta-label">CT Towns</div>
              </div>
            </div>
          </div>

          <div className="hero-stage" ref={stageRef}>
            <div className="hero-stage-bg" style={{ transform: px(-6) }} />
            <div className="hero-floor" />

            <div className="flash" style={{ top: '12%', left: '18%' }} />
            <div className="flash" style={{ top: '30%', right: '10%', animationDelay: '3s' }} />
            <div className="flash" style={{ bottom: '20%', left: '30%', animationDelay: '5s' }} />

            {CARDS.map((c, i) => (
              <div
                key={i}
                className="float-card"
                style={{
                  ...c.style,
                  transform: px(c.depth),
                  animationDelay: `${c.delay}s`,
                }}
              >
                <div className="fc-dot" />
                <div className="fc-icon">{c.icon}</div>
                <div className="fc-label">{c.label}</div>
                <div className="fc-name">{c.name}</div>
              </div>
            ))}

            <div
              style={{
                position: 'absolute',
                top: '38%',
                left: '48%',
                color: 'var(--gold-bright)',
                filter: 'drop-shadow(0 0 20px rgba(236,212,154,.7))',
                transform: px(8),
              }}
            >
              <Icons.Spark size={48} />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span className="subtle-pulse">Scroll</span>
        <span style={{ width: 1, height: 32, background: 'var(--gold)', opacity: 0.5 }} />
      </div>
    </section>
  );
}

/** Compact, single-line inner-page hero — used for service / county / town pages. */
export function InnerHero({
  eyebrow,
  title,
  subtitle,
  primaryCta = { label: 'Check Availability', href: '/check-availability/' },
  secondaryCta,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  crumbs?: React.ReactNode;
}) {
  return (
    <section className="inner-hero">
      <div className="hero-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {crumbs && <div style={{ marginBottom: 24 }}>{crumbs}</div>}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="display">{title}</h1>
        {subtitle && <p className="lede" style={{ maxWidth: '60ch', marginBottom: 32 }}>{subtitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
          {primaryCta && (
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
              <span className="arrow" />
            </Link>
          )}
          {secondaryCta && (
            <Link href={secondaryCta.href} className="btn btn-ghost">
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
