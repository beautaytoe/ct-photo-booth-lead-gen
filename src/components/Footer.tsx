import Link from 'next/link';
import { SITE } from '@/lib/site-data';
import { SERVICES } from '@/lib/services-data';
import { COUNTIES, getTownBySlug } from '@/lib/towns-data';
import { TrackedLink } from './TrackedLink';

export function Footer() {
  // Statewide spread — one anchor town per county. Reinforces the brand's
  // statewide Connecticut positioning instead of the previous Fairfield-only
  // bias. All 8 are indexable (Tier 1 or Tier 2). Audit reference:
  // High-priority H4 (footer rebalance).
  const featuredTowns = [
    'greenwich-ct',     // Fairfield County (Tier 1)
    'new-haven-ct',     // New Haven County (Tier 1)
    'hartford-ct',      // Hartford County (Tier 2)
    'litchfield-ct',    // Litchfield County (Tier 2)
    'old-saybrook-ct',  // Middlesex County (Tier 2)
    'groton-ct',        // New London County (Tier 2)
    'mansfield-ct',     // Tolland County (Tier 2)
    'putnam-ct',        // Windham County (Tier 2)
  ]
    .map((s) => getTownBySlug(s))
    .filter((t): t is NonNullable<ReturnType<typeof getTownBySlug>> => !!t);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand" style={{ marginBottom: 20 }}>
              <div className="brand-mark">G</div>
              <div className="brand-text">
                <div className="brand-name">Gold Coast Photo Booth Co.</div>
                <div className="brand-sub">Photo Booth Rental CT</div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-dim)', maxWidth: '38ch', fontSize: 14, lineHeight: 1.6, marginTop: 24 }}>
              Premium photo booth, 360, glam, mirror, roaming, and audio guestbook rentals for
              Connecticut weddings, corporate events, and private celebrations.
            </p>
            {SITE.showPhonePublicly && (
              <div style={{ marginTop: 20 }}>
                <TrackedLink
                  href={`tel:${SITE.phone.e164}`}
                  ctaId="phone_call_footer"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    color: 'var(--gold-bright)',
                    textDecoration: 'none',
                  }}
                  aria-label={`Call ${SITE.phone.display}`}
                >
                  {SITE.phone.display}
                </TrackedLink>
              </div>
            )}
            <div style={{ marginTop: 24 }}>
              <TrackedLink
                href="/check-availability/"
                ctaId="check_availability_footer"
                className="btn btn-primary"
              >
                Check Availability →
              </TrackedLink>
            </div>
          </div>

          <details className="footer-col">
            <summary>
              <span className="footer-col-label">Booths &amp; Add-Ons</span>
            </summary>
            <ul>
              {SERVICES.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`}>{s.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/photo-booth-rental-ct/">All booth experiences →</Link>
              </li>
            </ul>
          </details>

          <details className="footer-col">
            <summary>
              <span className="footer-col-label">Counties</span>
            </summary>
            <ul>
              {COUNTIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/photo-booth-rental-${c.slug}-county-ct/`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="footer-col">
            <summary>
              <span className="footer-col-label">Featured CT Towns</span>
            </summary>
            <ul>
              {featuredTowns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/service-areas/${t.slug}/`}>{t.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas/">All CT service areas →</Link>
              </li>
            </ul>
          </details>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.brand} · Connecticut</span>
          <span>
            <Link href="/check-availability/" style={{ color: 'var(--gold-bright)' }}>
              Check Availability
            </Link>
            {'  ·  '}
            <Link href="/contact/">Contact</Link>
            {'  ·  '}
            <Link href="/privacy/">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
