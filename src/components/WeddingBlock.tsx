import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';
import { TrackedLink } from './TrackedLink';

const CHECKLIST = [
  ['Glam Black & White Portraits', 'Editorial retouching for every guest, Vogue-style.'],
  ['Audio Guestbook', 'Toasts and voicemails captured for the couple.'],
  ['Custom Overlay', 'Your monogram, your date, your color story.'],
  ['Premium Backdrop', 'Velvet, florals, neon, or mirrored options.'],
  ['Optional Prints', 'Print packages available as an add-on.'],
  ['Online Gallery', 'Sharable link for guests after the event.'],
  ['Attendant-Supported Setup', 'A polished crew that knows when to step in.'],
] as const;

export function WeddingBlock() {
  return (
    <section className="section ivory" id="wedding">
      <div className="container">
        <div className="wedding">
          <div className="wedding-visual">
            <Image
              src="/assets/ref-gold-arch.png"
              alt="Champagne gold balloon arch with photo booth setup in a chandelier ballroom"
              width={900}
              height={1125}
              priority={false}
            />
            <div className="wedding-visual-label">
              <span className="eyebrow" style={{ color: 'var(--gold-bright)' }}>Featured Setup</span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ivory)', marginTop: 6 }}>
                The Gold Arch <em style={{ color: 'var(--gold-bright)' }}>Wedding</em>
              </div>
            </div>
          </div>

          <div>
            <span className="eyebrow">05 — Wedding Experiences</span>
            <h2 className="display" style={{ marginTop: 24, color: '#1a1410' }}>
              Wedding photo booth<br />
              experiences that <em>match<br />
              the room.</em>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              From black-tie receptions to barn weddings, design a booth setup that complements
              your venue, colors, and guest experience. Pair a glam booth or open-air booth with an
              audio guestbook, custom backdrop, and optional prints for a polished wedding add-on
              guests actually use.
            </p>
            <p className="lede" style={{ marginTop: 14 }}>
              Designed to feel polished, not thrown together. Premium backdrops, clean styling,
              custom overlays, and a setup that complements the room.
            </p>

            <ul className="wedding-checklist">
              {CHECKLIST.map(([title, body]) => (
                <li key={title}>
                  <span className="check"><Icons.Check /></span>
                  <span>
                    <strong>{title}</strong>
                    {body}
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <TrackedLink
                href="/check-availability/"
                ctaId="check_availability_wedding_block"
                className="btn btn-dark"
              >
                Check Wedding Availability<span className="arrow" />
              </TrackedLink>
              <Link href="#experiences" className="btn btn-dark-ghost">
                Browse booths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
