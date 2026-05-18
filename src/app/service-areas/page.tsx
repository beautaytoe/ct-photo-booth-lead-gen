import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { COUNTIES, TOWNS, getTownsByCounty, isIndexable } from '@/lib/towns-data';

export const metadata: Metadata = {
  title: 'CT Photo Booth Service Areas | All Connecticut Towns',
  description:
    'Service areas for Gold Coast Photo Booth Co. across Connecticut — Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, and Windham counties.',
  alternates: { canonical: '/service-areas/' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <Hero
        eyebrow="Statewide CT Coverage"
        title="Connecticut Service Areas"
        subtitle="We serve every town in Connecticut. Fairfield County is our highest-volume market, but we work weddings, corporate events, and private parties from Greenwich to Putnam and everywhere in between."
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Service Areas', href: '/service-areas/' },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page">
          <div className="eyebrow">By Region</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Browse by county</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COUNTIES.map((c) => (
              <Link
                key={c.slug}
                href={`/photo-booth-rental-${c.slug}-county-ct/`}
                className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-5 hover:border-[color:var(--color-rose)]"
              >
                <div className="font-[var(--font-display)] text-lg font-semibold">{c.name}</div>
                <div className="text-sm text-[color:var(--color-ink-soft)]/70 mt-2 line-clamp-3">
                  {c.description}
                </div>
                <div className="mt-3 text-[color:var(--color-rose-dark)] text-sm">View hub →</div>
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
          <section key={c.slug} className="section border-t border-[color:var(--color-blush)]">
            <div className="container-page">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="eyebrow">{c.name}</div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-semibold">
                    Photo booth rental — {c.name}
                  </h3>
                </div>
                <Link
                  href={`/photo-booth-rental-${c.slug}-county-ct/`}
                  className="btn-secondary"
                >
                  {c.name} hub →
                </Link>
              </div>
              <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {indexable.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/service-areas/${t.slug}/`}
                      className="block rounded-xl border border-[color:var(--color-blush)] bg-white px-4 py-3 hover:border-[color:var(--color-rose)]"
                    >
                      <span className="font-medium">{t.name}, CT</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {other.length > 0 && (
                <p className="mt-4 text-sm text-[color:var(--color-ink-soft)]/70">
                  Also serving:{' '}
                  {other.map((t, i) => (
                    <span key={t.slug}>
                      <Link
                        href={`/service-areas/${t.slug}/`}
                        className="underline hover:text-[color:var(--color-ink)]"
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
        title={`Photo booth rental near you in CT (${TOWNS.length} towns served)`}
        subtitle="If your town is in Connecticut, we serve it. Tell us your date, venue, and event type and we will confirm."
      />
    </>
  );
}
