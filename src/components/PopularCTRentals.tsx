import Link from 'next/link';

const ITEMS: { label: string; meta: string; href: string }[] = [
  { label: 'Photo Booth Rental CT', meta: 'Statewide · all booths', href: '/photo-booth-rental-ct/' },
  { label: '360 Photo Booth Rental CT', meta: 'Slow-mo video', href: '/360-photo-booth-rental-ct/' },
  { label: 'Wedding Photo Booth Rental CT', meta: 'Reception · ceremony', href: '/wedding-photo-booth-rental-ct/' },
  { label: 'Corporate Photo Booth Rental CT', meta: 'Brand activation', href: '/corporate-photo-booth-rental-ct/' },
  { label: 'Audio Guestbook Rental CT', meta: 'Vintage phone', href: '/audio-guestbook-rental-ct/' },
  { label: 'Mirror Booth Rental CT', meta: 'Magic mirror', href: '/mirror-photo-booth-rental-ct/' },
  { label: 'Glam Booth Rental CT', meta: 'Editorial B&W', href: '/glam-photo-booth-rental-ct/' },
  { label: 'Roaming Photo Booth Rental CT', meta: 'Mobile coverage', href: '/roaming-photo-booth-rental-ct/' },
  { label: 'Party Photo Booth Rental CT', meta: 'Sweet 16 · birthday', href: '/party-photo-booth-rental-ct/' },
  { label: 'School Event Photo Booth Rental CT', meta: 'Prom · school', href: '/photo-booth-rental-ct/' },
];

export function PopularCTRentals() {
  return (
    <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">08 — Popular CT Event Rentals</span>
            <h2 className="display" style={{ marginTop: 24 }}>
              The most-searched<br />
              <em>booth rentals in CT.</em>
            </h2>
          </div>
          <div className="section-head-right">
            <p className="lede">
              Quick jump-off points for the rental categories Connecticut couples, planners, and
              marketing teams ask us about most.
            </p>
          </div>
        </div>

        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {ITEMS.map((it) => (
            <li key={it.href + it.label}>
              <Link href={it.href} className="tile">
                <span className="tile-meta">{it.meta}</span>
                <span className="tile-name" style={{ fontSize: 19 }}>
                  {it.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
