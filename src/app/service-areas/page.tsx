import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icons } from '@/components/Icons';
import { COUNTIES, TOWNS, getTownsByCounty, isIndexable } from '@/lib/towns-data';

export const metadata: Metadata = {
  title: 'CT Photo Booth Service Areas',
  description:
    'Connecticut photo booth rental service areas — Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, Windham counties. All 169 CT towns.',
  alternates: { canonical: '/service-areas/' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <InnerHero
        eyebrow="Statewide CT Coverage"
        title="Connecticut Service Areas"
        subtitle={`We serve every town in Connecticut — ${TOWNS.length} municipalities across 8 counties. Fairfield County is a featured region, but we work weddings, corporate events, and private parties from Greenwich to Putnam and everywhere in between.`}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Service Areas', href: '/service-areas/' },
            ]}
          />
        }
      />

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">By Region</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Browse by<br />
                <em>county.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Each county has its own personality — and its own popular venues. Tap a county hub
                for the towns we serve there and the booth styles we book most.
              </p>
            </div>
          </div>
          <div className="booth-grid">
            {COUNTIES.map((c) => (
              <Link
                key={c.slug}
                href={`/photo-booth-rental-${c.slug}-county-ct/`}
                className="booth-card bc-span-3"
                style={{ minHeight: 260 }}
              >
                <div className="booth-card-num">{c.name.replace(' County', '').toUpperCase()}</div>
                <h3 className="booth-card-name" style={{ fontSize: 28 }}>
                  {c.name}
                </h3>
                <p className="booth-card-desc" style={{ flexGrow: 1 }}>
                  {c.description}
                </p>
                <div className="booth-card-foot">
                  <span className="bc-link">
                    View hub <span style={{ fontSize: 14 }}>↗</span>
                  </span>
                  <div style={{ color: 'var(--gold)' }}>
                    <Icons.Spark size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {COUNTIES.map((c) => {
        const countyTowns = getTownsByCounty(c.slug).sort(
          (a, b) => a.tier - b.tier || a.name.localeCompare(b.name)
        );
        const indexable = countyTowns.filter(isIndexable);
        const other = countyTowns.filter((t) => !isIndexable(t));
        return (
          <section key={c.slug} className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="container">
              {/* Per-county town-list section. The H3 that used to live here
                  ("Photo booth rental — {County}.") duplicated the county
                  heading already present in the top "Browse by county" grid,
                  creating 16 H3s on the page with near-identical content.
                  Removed for content-quality reasons (audit High-priority H1).
                  The county is still clearly labeled via the eyebrow and the
                  prominent "{County} hub →" CTA button. */}
              <div className="section-head" style={{ alignItems: 'center' }}>
                <div>
                  <span className="eyebrow" style={{ fontSize: 13, letterSpacing: '0.22em' }}>
                    {c.name}
                  </span>
                </div>
                <div className="section-head-right">
                  <Link
                    href={`/photo-booth-rental-${c.slug}-county-ct/`}
                    className="btn btn-ghost"
                  >
                    {c.name} hub →
                  </Link>
                </div>
              </div>
              <ul className="tile-grid" style={{ listStyle: 'none', padding: 0 }}>
                {indexable.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/service-areas/${t.slug}/`} className="tile">
                      <span className="tile-meta">Tier {t.tier}</span>
                      <span className="tile-name">{t.name}, CT</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {other.length > 0 && (
                <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
                  Also serving:{' '}
                  {other.map((t, i) => (
                    <span key={t.slug}>
                      <Link
                        href={`/service-areas/${t.slug}/`}
                        style={{ color: 'var(--text-dim)', textDecoration: 'underline' }}
                      >
                        {t.name}
                      </Link>
                      {i < other.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                  .
                </p>
              )}
            </div>
          </section>
        );
      })}

      <CTASection
        title={
          <>
            CT photo booth coverage<br />
            in <em>all {TOWNS.length} towns.</em>
          </>
        }
        subtitle="If your town is in Connecticut, we serve it. Tell us your date, venue, and event type and we will confirm."
      />
    </>
  );
}
