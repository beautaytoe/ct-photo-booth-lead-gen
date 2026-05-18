import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceCard } from '@/components/ServiceCard';
import {
  type County,
  getCountyInfo,
  getTownsByCounty,
} from '@/lib/towns-data';
import { SERVICES, FAQ_GENERAL } from '@/lib/services-data';
import { faqSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-data';

export function CountyHubPage({
  county,
  pathPrefix,
}: {
  county: County;
  pathPrefix: string; // '/photo-booth-rental-fairfield-county-ct' or '/service-areas/fairfield-county-ct'
}) {
  const info = getCountyInfo(county);
  const towns = getTownsByCounty(county).sort(
    (a, b) => a.tier - b.tier || a.name.localeCompare(b.name)
  );
  const indexableTowns = towns.filter((t) => t.tier !== 3);
  const otherTowns = towns.filter((t) => t.tier === 3);

  return (
    <>
      <Hero
        eyebrow={`Connecticut · ${info.name}`}
        title={`Photo Booth Rental in ${info.name}, CT`}
        subtitle={info.description}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Photo Booths', href: '/photo-booth-rental-ct/' }}
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Service Areas', href: '/service-areas/' },
            { name: info.name, href: `${pathPrefix}/` },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page">
          <div className="eyebrow">Featured Towns</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Top {info.name} towns we serve
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--color-ink-soft)]/80">
            Click any town for local context, popular booth styles, and nearby service areas. We
            also serve every smaller community in {info.name}.
          </p>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {indexableTowns.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/service-areas/${t.slug}/`}
                  className="block rounded-xl border border-[color:var(--color-blush)] bg-white px-4 py-3 hover:border-[color:var(--color-rose)] transition-colors"
                >
                  <span className="font-medium text-[color:var(--color-ink)]">{t.name}, CT</span>
                </Link>
              </li>
            ))}
          </ul>
          {otherTowns.length > 0 && (
            <p className="mt-6 text-sm text-[color:var(--color-ink-soft)]/70">
              We also serve smaller {info.name} communities including{' '}
              {otherTowns.map((t, i) => (
                <span key={t.slug}>
                  <Link href={`/service-areas/${t.slug}/`} className="underline hover:text-[color:var(--color-ink)]">
                    {t.name}
                  </Link>
                  {i < otherTowns.length - 1 ? ', ' : ''}
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      <section className="section bg-white border-y border-[color:var(--color-blush)]">
        <div className="container-page">
          <div className="eyebrow">Photo Booth Experiences</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Photo booth styles popular in {info.name}
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <FAQ items={FAQ_GENERAL.slice(0, 6)} />

      <CTASection
        title={`Book a CT photo booth in ${info.name}`}
        subtitle="Tell us your date, venue, and event type and we will confirm availability for your event."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: `Photo Booth Rental in ${info.name}, Connecticut`,
              description: `Premium photo booth rentals in ${info.name}, CT for weddings, corporate events, and private parties.`,
              url: `${SITE.domain}${pathPrefix}/`,
              areaServed: info.name,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQ_GENERAL.slice(0, 6))),
        }}
      />
    </>
  );
}

export function buildCountyMetadata(county: County, pathPrefix: string) {
  const info = getCountyInfo(county);
  const title = `Photo Booth Rental ${info.name} CT | Premium Event Booths`;
  const description = `Premium photo booth rentals in ${info.name}, Connecticut for weddings, corporate events, private parties, galas, and celebrations. 360, glam, mirror, and open-air booths.`;
  return {
    title,
    description,
    alternates: { canonical: `${pathPrefix}/` },
    openGraph: { title, description, url: `${pathPrefix}/` },
  };
}
