import Link from 'next/link';
import { Icons } from './Icons';
import { getTownBySlug } from '@/lib/towns-data';

const FAIRFIELD_TOWNS: { slug: string; meta: string; featured: boolean }[] = [
  { slug: 'stamford-ct', meta: 'Anchor City', featured: true },
  { slug: 'greenwich-ct', meta: 'Coastal Estates', featured: true },
  { slug: 'westport-ct', meta: 'Beach + Barn', featured: true },
  { slug: 'darien-ct', meta: 'Country Club', featured: false },
  { slug: 'new-canaan-ct', meta: 'Manor Weddings', featured: false },
  { slug: 'norwalk-ct', meta: 'Waterfront', featured: false },
  { slug: 'fairfield-ct', meta: 'Town Greens', featured: false },
  { slug: 'bridgeport-ct', meta: 'Ballroom', featured: false },
  { slug: 'trumbull-ct', meta: 'Country Clubs', featured: false },
  { slug: 'shelton-ct', meta: 'Hill Estates', featured: false },
  { slug: 'stratford-ct', meta: 'Coastal', featured: false },
  { slug: 'danbury-ct', meta: 'Lake Venues', featured: false },
  { slug: 'ridgefield-ct', meta: 'Historic', featured: false },
  { slug: 'wilton-ct', meta: 'Garden', featured: false },
  { slug: 'weston-ct', meta: 'Estate', featured: false },
  { slug: 'newtown-ct', meta: 'Vineyard', featured: false },
];

export function FairfieldSection() {
  return (
    <section className="section ivory">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">07 — Fairfield County</span>
            <h2 className="display" style={{ marginTop: 24, color: '#1a1410' }}>
              Built for Fairfield<br />
              County weddings,<br />
              <em>galas &amp; private events.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Built for Fairfield County weddings, corporate events, private parties, galas, school
              events, and milestone celebrations. Fairfield County is our priority service area,
              with town pages built around the markets where wedding, corporate, school, and
              private event demand is strongest.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 24,
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '.18em',
                color: '#8b6f3a',
                textTransform: 'uppercase',
                marginTop: 8,
                flexWrap: 'wrap',
              }}
            >
              <span>· Priority booking window</span>
              <span>· Clear travel pricing</span>
            </div>
          </div>
        </div>

        <div className="locations-grid">
          {FAIRFIELD_TOWNS.map((t) => {
            const town = getTownBySlug(t.slug);
            if (!town) return null;
            return (
              <Link
                key={t.slug}
                href={`/service-areas/${t.slug}/`}
                className={`location-chip ${t.featured ? 'featured' : ''}`}
              >
                <span className="location-meta">{t.meta}</span>
                <span className="location-chip-name">{town.name}</span>
                {t.featured && (
                  <span style={{ marginTop: 6, color: 'var(--gold)' }}>
                    <Icons.Spark size={12} />
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: 32,
            border: '1px solid rgba(139, 111, 58, 0.25)',
            borderRadius: 18,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 32,
            flexWrap: 'wrap',
            background: 'rgba(255,255,255,.3)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '.22em',
                color: '#8b6f3a',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Don't see your town?
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: '#1a1410', lineHeight: 1.1 }}>
              Coverage available across <em style={{ color: '#8b6f3a' }}>Connecticut</em> — confirm your date and venue with us.
            </div>
          </div>
          <Link href="/service-areas/" className="btn btn-dark">
            Check My Town<span className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
