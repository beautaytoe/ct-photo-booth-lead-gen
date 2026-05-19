import Link from 'next/link';

const PACKAGES = [
  {
    name: 'Social Booth',
    em: 'Package',
    tag: 'Essential',
    price: '595',
    suffix: '/event',
    features: [
      'Choice of Open-Air or Selfie Booth',
      '3-hour event coverage',
      'Custom 2x6 strip overlay',
      'Optional print package',
      'Instant SMS + email delivery',
      'On-site attendant',
      'Premium backdrop selection',
    ],
    cta: 'Start the booking',
    featured: false,
    badge: undefined,
    isCustom: false,
  },
  {
    name: 'Signature Event',
    em: 'Package',
    tag: 'Recommended',
    badge: 'Recommended',
    featured: true,
    price: '895',
    suffix: '/event',
    features: [
      'Choice of 2 booths — pair Open-Air + 360 or Glam',
      '4-hour event coverage',
      'Bespoke print + digital overlays',
      'Online gallery for guests',
      'Premium props curated to your event',
      'Two-person professional team',
      'Idle hours included for staging',
    ],
    cta: 'Build my package',
    isCustom: false,
  },
  {
    name: 'Luxe Experience',
    em: 'Package',
    tag: 'Custom Quote',
    price: 'Custom',
    suffix: 'quote',
    isCustom: true,
    features: [
      'Choose any 3+ booth experiences',
      'Full-event coverage (up to 8 hrs)',
      'Glam editorial retouching included',
      'Audio guestbook add-on',
      'Custom-branded environment & signage',
      'Lead producer + crew',
      'Optional highlight reel add-on',
    ],
    cta: 'Request consultation',
    featured: false,
    badge: undefined,
  },
] as const;

export function PackageCards() {
  return (
    <section className="section dark" id="packages">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">10 — Packages</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              Three ways to<br />
              <em>book the night.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Every quote is custom — these are three common starting points. Each tier includes
              an attendant, digital sharing, and a clear setup plan. Print packages are an optional
              add-on across all tiers.
            </p>
          </div>
        </div>

        <div className="packages">
          {PACKAGES.map((p) => (
            <div key={p.name} className={`pkg ${p.featured ? 'featured' : ''}`}>
              {p.badge && <span className="pkg-badge">★ {p.badge}</span>}
              <div className="pkg-tag">{p.tag}</div>
              <h3 className="pkg-name" style={{ marginTop: 6 }}>
                {p.name} <em>{p.em}</em>
              </h3>
              <div className="pkg-price">
                {!p.isCustom && <span className="pkg-price-prefix">Starting at $</span>}
                <span className="pkg-price-num">{p.price}</span>
                <span className="pkg-price-suffix">{p.suffix}</span>
              </div>
              <ul className="pkg-list">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="pkg-foot">
                <Link
                  href="/check-availability/"
                  className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {p.cta}
                  <span className="arrow" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
          }}
        >
          Add-ons available · Audio Guestbook · Glam Editorial · Roaming Booth · Custom Backdrop · Print Packages
        </div>
      </div>
    </section>
  );
}
