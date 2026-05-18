import Link from 'next/link';
import { SITE } from '@/lib/site-data';
import { SERVICES } from '@/lib/services-data';
import { COUNTIES, TOWNS, getTownBySlug } from '@/lib/towns-data';

export function Footer() {
  const featuredTowns = [
    'stamford-ct',
    'greenwich-ct',
    'norwalk-ct',
    'westport-ct',
    'darien-ct',
    'new-canaan-ct',
  ]
    .map((s) => getTownBySlug(s))
    .filter((t): t is NonNullable<ReturnType<typeof getTownBySlug>> => !!t);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 20 }}>
              <div className="brand-mark">G</div>
              <div>
                <div className="brand-name">Gold Coast Photo Booth Co.</div>
                <div className="brand-sub">Connecticut · Est. for Fairfield</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-dim)', maxWidth: '38ch', fontSize: 14, lineHeight: 1.6, marginTop: 24 }}>
              Premium photo booth, 360, glam, mirror and audio guestbook rentals for Connecticut
              weddings, corporate events, and private celebrations. Serving all {TOWNS.length} CT towns.
            </p>
          </div>
          <div>
            <h5>Experiences</h5>
            <ul>
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Counties</h5>
            <ul>
              {COUNTIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/photo-booth-rental-${c.slug}-county-ct/`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Featured CT Towns</h5>
            <ul>
              {featuredTowns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/service-areas/${t.slug}/`}>{t.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas/">All CT towns →</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.brand} · Connecticut</span>
          <span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {'  ·  '}
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
