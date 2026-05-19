'use client';

/**
 * Hero — luxury cinematic hero for the Photo Booth Rental CT homepage.
 *
 * Highlights:
 *  - Word-by-word stagger reveal on H1 (desktop poetic + mobile keyword-targeted)
 *  - Interactive event-type pills (Wedding / Corporate / Sweet 16 / Gala) that:
 *      • swap the subtitle copy with an AnimatePresence cross-fade
 *      • highlight a matching floating booth card in the stage
 *  - Primary CTA with a soft pulsing gold glow + a shine sweep on hover
 *  - Subtle gold particle layer (pure CSS, GPU-accelerated)
 *  - Three-item trust bar at the top of the hero
 *  - Honest availability teaser line near the CTA (no fake stats)
 *  - Decorative floating-card stage rendered desktop-only (≥1101px) to keep
 *    mobile clean. Parallax tilt is wired to the mouse on desktop and
 *    automatically suppressed when prefers-reduced-motion is set.
 *
 * Compliance notes:
 *  - The trust bar items are positioning statements only — they do NOT make
 *    unverified review/event-count claims. When real metrics are verified
 *    (e.g. "100+ Events", "5-Star Rated"), swap the strings in
 *    TRUST_BAR_ITEMS below.
 *  - The availability teaser is a soft scarcity nudge, not a real-time
 *    calendar. Wire this to a real availability source before launch if
 *    desired.
 *
 * Future swap points:
 *  - The hero background can swap in a Next/Image (or a muted looping video)
 *    underneath the existing gradient layers. See notes after the file.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icons } from './Icons';

// ============================================================
// Static config — easy to edit without touching layout
// ============================================================

const TRUST_BAR_ITEMS = [
  "Connecticut's Premium Photo Booth Experience",
  'Wedding · Corporate · Gala Specialty',
  'Statewide Connecticut Availability',
] as const;

/** Event focus pills. Each entry swaps the subtitle and highlights one of
 *  the floating booth cards via the `highlight` → card.id link. */
const EVENT_FOCUS: { id: string; label: string; tagline: string; highlight: string }[] = [
  {
    id: 'wedding',
    label: 'Wedding',
    tagline:
      'Designed for unforgettable weddings — glam portraits, audio guestbook, custom overlays.',
    highlight: 'glam',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    tagline:
      'A branded event activation — overlays, QR sharing, optional lead capture.',
    highlight: 'corporate',
  },
  {
    id: 'sweet16',
    label: 'Sweet 16',
    tagline:
      'Built for the moment everyone reposts — 360 booth, mirror booth, instant sharing.',
    highlight: '360',
  },
  {
    id: 'gala',
    label: 'Gala',
    tagline:
      'Black-tie portraiture and roaming coverage, refined for galas and fundraisers.',
    highlight: 'glam',
  },
];

// ============================================================
// Animation primitives
// ============================================================

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const headlineWord = {
  hidden: { y: 22, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ============================================================
// Types
// ============================================================

interface HeroProps {
  eyebrow?: string;
  /** Three lines — third line gets italic-gold treatment. Desktop only. */
  titleLines?: [string, string, string];
  /** Single-string H1 shown on mobile (keyword-targeted). */
  mobileTitle?: string;
  subtitle?: string;
  mobileSubtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const DEFAULT_LINES: [string, string, string] = [
  'Turn your event',
  'into the moment',
  'everyone posts.',
];

interface FloatCardData {
  /** Used to match against EVENT_FOCUS[].highlight for active state. */
  id: string;
  style: React.CSSProperties;
  delay: number;
  label: string;
  name: string;
  icon: React.ReactNode;
  depth: number;
}

/**
 * Floating booth cards — 5-card S-curve, fully INSIDE the stage box so
 * nothing gets clipped by `overflow-x: hidden` on body or by viewport
 * edges. Parallax is intentionally modest (max ±14px drift) so the
 * layout stays stable.
 *
 *   ┌──────────────── stage ────────────────┐
 *   │  [360 Booth]                          │ ← row 1, left
 *   │                       [Glam Booth]    │ ← row 2, right
 *   │  [Audio Guestbook]                    │ ← row 3, left
 *   │                       [Mirror Booth]  │ ← row 4, right
 *   │            [Corporate]                │ ← row 5, center
 *   └───────────────────────────────────────┘
 */
const CARDS: FloatCardData[] = [
  { id: '360',       style: { top: '2%',    left: '6%' },   delay: 0,    label: 'Showstopper', name: '360 Booth',       icon: <Icons.ThreeSixty size={24} />, depth: 10 },
  { id: 'glam',      style: { top: '21%',   right: '4%' },  delay: 0.9,  label: 'Editorial',   name: 'Glam Booth',      icon: <Icons.Glam size={24} />,        depth: -12 },
  { id: 'audio',     style: { top: '44%',   left: '2%' },   delay: 0.4,  label: 'Memory',      name: 'Audio Guestbook', icon: <Icons.Phone size={24} />,       depth: 14 },
  { id: 'mirror',    style: { top: '63%',   right: '6%' },  delay: 1.4,  label: 'Magic',       name: 'Mirror Booth',    icon: <Icons.Mirror size={24} />,      depth: -10 },
  { id: 'corporate', style: { bottom: '4%', left: '24%' },  delay: 2,    label: 'Brand',       name: 'Corporate',       icon: <Icons.Corporate size={24} />,   depth: -6 },
];

// ============================================================
// Component
// ============================================================

export function Hero({
  eyebrow = 'Connecticut Photo Booth Rentals',
  titleLines = DEFAULT_LINES,
  mobileTitle = 'Premium Photo Booth Rentals Across Connecticut',
  subtitle = 'Premium photo booth, 360 booth, glam booth, mirror booth, roaming booth, selfie booth, and audio guestbook rentals for weddings, corporate events, private parties, school events, and celebrations across Connecticut.',
  mobileSubtitle = '360 booths, glam booths, mirror booths, roaming booths, selfie booths, and audio guestbooks for weddings, parties, corporate events, and celebrations across CT.',
  primaryCta = { label: 'Check Availability', href: '/check-availability/' },
  secondaryCta = { label: 'Explore Our Booths', href: '#experiences' },
}: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // Mouse-parallax for the floating-card stage (desktop only). Bail out when
  // the user has prefers-reduced-motion: reduce.
  useEffect(() => {
    if (reduce) return;
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
  }, [reduce]);

  const px = (depth: number) => `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`;
  const focus = EVENT_FOCUS.find((e) => e.id === activeEvent);
  const highlightedCardId = focus?.highlight ?? null;

  return (
    <section className="hero" id="hero">
      {/* Background layer 1: radial gradient pools (champagne / blush /
          emerald / deep gold). When you want to swap in a real photo or
          looping video, set background-image on .hero-bg in globals.css —
          comment block is in place. */}
      <div className="hero-bg" />
      {/* Background layer 2: slow-drifting "aurora" of gold mist. Adds
          gentle motion across the bg without needing video. */}
      <div className="hero-aurora" aria-hidden="true" />
      {/* Background layer 3: SVG film grain. Reads as premium texture
          instead of flat CSS gradients. */}
      <div className="hero-grain" aria-hidden="true" />
      {/* Background layer 4: darkening edge vignette. */}
      <div className="hero-vignette" />

      {/* Background layer 5: six floating gold sparkle particles.
          Disabled by globals.css when prefers-reduced-motion is set. */}
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`hero-particle hero-particle-${i + 1}`} />
        ))}
      </div>

      <div className="container">
        {/* Trust bar — subtle 3-item brand promise strip.
            NOTE: when you have verified metrics (e.g. "100+ Events" or
            "5-Star Rated") swap them into TRUST_BAR_ITEMS. */}
        <motion.div
          className="hero-trust-bar"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          role="note"
          aria-label="Brand positioning"
        >
          {TRUST_BAR_ITEMS.map((item, i) => (
            <span key={i} className="hero-trust-item">
              {item}
            </span>
          ))}
        </motion.div>

        <div className="hero-inner">
          <div className="hero-left">
            {/* Eyebrow */}
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              {eyebrow}
            </motion.span>

            {/* Desktop H1 — word-by-word stagger reveal */}
            <motion.h1
              className="display hero-headline hide-on-mobile"
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
            >
              {titleLines.map((line, lineIdx) => (
                <span key={lineIdx} className="hero-line">
                  {line.split(' ').map((word, wIdx) => (
                    <motion.span
                      key={wIdx}
                      variants={headlineWord}
                      style={
                        lineIdx === 2
                          ? { fontStyle: 'italic', color: 'var(--gold-bright)' }
                          : undefined
                      }
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Mobile H1 — single line, keyword-targeted, word stagger.
                Spaces are real whitespace characters (not CSS margin) so the
                rendered text reads "Premium Photo Booth Rentals Across
                Connecticut" with spaces in the DOM — important for SEO and
                screen readers. */}
            <motion.h1
              className="display hero-headline-mobile show-on-mobile"
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
            >
              {mobileTitle.split(' ').map((word, i, arr) => (
                <motion.span
                  key={i}
                  variants={headlineWord}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                  {i < arr.length - 1 ? ' ' : ''}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle — cross-fades when an event pill is active. The
                wrapper has a min-height to prevent layout shift on swap. */}
            <div className="hero-sub-wrap" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                {focus ? (
                  <motion.p
                    key={focus.id}
                    className="hero-sub hero-sub-dynamic"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  >
                    {focus.tagline}
                  </motion.p>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="hero-sub hide-on-mobile">{subtitle}</p>
                    <p className="hero-sub show-on-mobile">{mobileSubtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTAs — primary above the fold. Pulsing gold glow + shine sweep on hover. */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {primaryCta && (
                <motion.div
                  whileHover={{ scale: reduce ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'inline-block' }}
                >
                  <Link href={primaryCta.href} className="btn btn-primary hero-primary-cta">
                    <span className="hero-primary-cta-shine" aria-hidden="true" />
                    <span className="hero-primary-cta-label">{primaryCta.label}</span>
                    <span className="arrow" aria-hidden="true" />
                  </Link>
                </motion.div>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn btn-ghost hero-secondary-cta">
                  {secondaryCta.label}
                </Link>
              )}
            </motion.div>

            {/* Availability teaser — soft scarcity nudge, no fake stats. */}
            <motion.p
              className="hero-availability"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <span className="hero-availability-dot" aria-hidden="true" />
              <span>Booking 2026 &amp; 2027 dates — peak-season Saturdays book first.</span>
            </motion.p>

            {/* Event-type pills — sit BELOW the primary CTA so the conversion
                path comes first. Tapping a pill swaps the subtitle and
                highlights a floating booth card on the right. */}
            <motion.ul
              className="hero-event-pills"
              role="group"
              aria-label="Refine by event type"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <li className="hero-event-pills-label">See examples for</li>
              {EVENT_FOCUS.map((e) => (
                <li key={e.id}>
                  <motion.button
                    type="button"
                    className={`hero-event-pill${activeEvent === e.id ? ' is-active' : ''}`}
                    onClick={() => setActiveEvent(activeEvent === e.id ? null : e.id)}
                    aria-pressed={activeEvent === e.id}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                  >
                    {e.label}
                  </motion.button>
                </li>
              ))}
            </motion.ul>

            {/* Desktop stat row — hidden on mobile so the hero stays tight. */}
            <div className="hero-meta hide-on-mobile">
              <div className="hero-meta-item">
                <div className="hero-meta-num">12</div>
                <div className="hero-meta-label">Booth &amp; Add-On Options</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">8</div>
                <div className="hero-meta-label">CT Counties Served</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-num">CT</div>
                <div className="hero-meta-label">Statewide Availability</div>
              </div>
            </div>
          </div>

          {/* Floating-card stage. Hidden ≤1100px in globals.css. */}
          <div className="hero-stage hide-on-mobile" ref={stageRef} aria-hidden="true">
            <div className="hero-stage-bg" style={{ transform: px(-6) }} />
            <div className="hero-floor" />

            {/* Flash bursts */}
            <div className="flash" style={{ top: '12%', left: '18%' }} />
            <div className="flash" style={{ top: '30%', right: '10%', animationDelay: '3s' }} />
            <div className="flash" style={{ bottom: '20%', left: '30%', animationDelay: '5s' }} />

            {/* Floating booth cards — glassmorphic, lift on hover,
                highlighted state when an event pill maps to this card. */}
            {CARDS.map((c) => (
              <motion.div
                key={c.id}
                className={`float-card${highlightedCardId === c.id ? ' is-highlighted' : ''}`}
                style={{ ...c.style, transform: px(c.depth), animationDelay: `${c.delay}s` }}
                whileHover={reduce ? undefined : { scale: 1.05, y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="fc-dot" />
                <div className="fc-icon">{c.icon}</div>
                <div className="fc-label">{c.label}</div>
                <div className="fc-name">{c.name}</div>
              </motion.div>
            ))}

            {/* Center sparkle */}
            <div className="hero-sparkle" style={{ transform: px(8) }}>
              <Icons.Spark size={48} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — desktop only */}
      <div className="hero-scroll-cue hide-on-mobile" aria-hidden="true">
        <span className="subtle-pulse">Scroll</span>
        <span className="hero-scroll-cue-line" />
      </div>
    </section>
  );
}

/** Compact, single-line inner-page hero — used for service / county / town
 *  pages. Untouched by the homepage hero refactor so internal templates
 *  keep their existing behavior. */
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
        {subtitle && (
          <p className="lede" style={{ maxWidth: '60ch', marginBottom: 32 }}>
            {subtitle}
          </p>
        )}
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
