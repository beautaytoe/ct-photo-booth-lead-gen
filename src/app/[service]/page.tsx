import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TownGrid } from '@/components/TownGrid';
import {
  SERVICES,
  getService,
  FAQ_GENERAL,
  FAQ_SERVICE_360,
  FAQ_WEDDING,
} from '@/lib/services-data';
import { TOWNS, getTownBySlug } from '@/lib/towns-data';
import { faqSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-data';

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/${service.slug}/` },
    openGraph: { title: service.title, description: service.description, url: `/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const tier1Fairfield = TOWNS.filter((t) => t.tier === 1 && t.county === 'fairfield').slice(0, 12);
  const tier1Other = TOWNS.filter((t) => t.tier === 1 && t.county !== 'fairfield');
  const featuredTowns = [...tier1Fairfield, ...tier1Other];

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  const isWedding = service.slug.includes('wedding');
  const is360 = service.slug.includes('360');
  const faqs = [
    ...(isWedding ? FAQ_WEDDING : []),
    ...(is360 ? FAQ_SERVICE_360 : []),
    ...FAQ_GENERAL,
  ];

  return (
    <>
      <Hero
        eyebrow="Connecticut · Photo Booth Rental"
        title={service.h1}
        subtitle={service.hero}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'See pricing', href: '/photo-booth-rental-prices-ct/' }}
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: service.name, href: `/${service.slug}/` },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-12">
          <div>
            <div className="eyebrow">About this booth</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
              What you get with the {service.name.toLowerCase()}
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-soft)]/85 leading-relaxed">
              {service.about}
            </p>
            {service.startingFrom && (
              <p className="mt-4 text-sm text-[color:var(--color-ink-soft)]/70 italic">
                {service.startingFrom} Pricing varies by event hours, branding, and add-ons — see{' '}
                <Link href="/photo-booth-rental-prices-ct/" className="underline">
                  CT photo booth pricing
                </Link>
                .
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6">
            <h3 className="font-semibold">Included features</h3>
            <ul className="mt-3 grid gap-2 text-sm">
              {service.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[color:var(--color-rose-dark)]">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            {service.popularAdds && (
              <>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-ink-soft)]/70">
                  Popular Add-Ons
                </h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {service.popularAdds.map((a) => (
                    <li
                      key={a}
                      className="text-xs px-2.5 py-1 rounded-full bg-[color:var(--color-blush)]"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-white border-y border-[color:var(--color-blush)]">
        <div className="container-page">
          <div className="eyebrow">Best For</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">When to book the {service.name}</h2>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {service.bestFor.map((b) => (
              <li
                key={b}
                className="rounded-xl border border-[color:var(--color-blush)] bg-[color:var(--color-cream)] p-4 text-sm font-medium"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TownGrid
        towns={featuredTowns}
        title="CT towns where we book this most"
        subtitle="These are the priority CT markets where this booth style is most-requested. We serve every town in Connecticut — see the full list."
      />

      <section className="section">
        <div className="container-page">
          <div className="eyebrow">Also Available</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Other photo booth styles</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-5 hover:border-[color:var(--color-rose)]"
              >
                <h3 className="font-[var(--font-display)] text-lg font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]/80 line-clamp-2">
                  {s.hero}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs.slice(0, 8)} />

      <CTASection
        title={`Ready to book the ${service.name.toLowerCase()}?`}
        subtitle="Send us your date, town, and event type — we will confirm availability and send a tailored package within one business day."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.ctName,
              description: service.description,
              url: `${SITE.domain}/${service.slug}/`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs.slice(0, 8))),
        }}
      />
    </>
  );
}
