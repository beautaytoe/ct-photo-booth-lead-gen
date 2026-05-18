import Link from 'next/link';
import Image from 'next/image';
import { Icons } from './Icons';

export function WeddingBlock() {
  return (
    <section className="section ivory" id="wedding">
      <div className="container">
        <div className="wedding">
          <div className="wedding-visual">
            <Image
              src="/assets/ref-gold-arch.png"
              alt="Champagne gold balloon arch with photo booth in a chandelier ballroom"
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
            <span className="eyebrow">06 — Wedding Experiences</span>
            <h2 className="display" style={{ marginTop: 24, color: '#1a1410' }}>
              Wedding photo booth<br />
              experiences that <em>match<br />
              the room.</em>
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              We design each setup around your florals, your linens, and your venue. Nothing tacky.
              No neon. No "props from a bin." Just a booth your guests can't stop sharing.
            </p>

            <ul className="wedding-checklist">
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Premium backdrops</strong>
                  Custom-cut velvet, florals, neon, or mirrored options.
                </span>
              </li>
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Glam B&amp;W option</strong>
                  Editorial retouching for every guest, Vogue-style.
                </span>
              </li>
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Custom overlays</strong>
                  Your monogram, your date, your color story.
                </span>
              </li>
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Audio guestbook add-on</strong>
                  Toasts and voicemails captured for the couple.
                </span>
              </li>
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Digital gallery</strong>
                  Sharable link for guests within 24 hours.
                </span>
              </li>
              <li>
                <span className="check"><Icons.Check /></span>
                <span>
                  <strong>Attendant-supported</strong>
                  A polished crew that knows when to step in — and when to step back.
                </span>
              </li>
            </ul>

            <div style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/wedding-photo-booth-rental-ct/" className="btn btn-dark">
                See wedding packages<span className="arrow" />
              </Link>
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
