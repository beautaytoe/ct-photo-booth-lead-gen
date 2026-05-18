import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceCard } from '@/components/ServiceCard';
import {
  TOWNS,
  getTownBySlug,
  getCountyInfo,
  getNearbyTowns,
  isIndexable,
} from '@/lib/towns-data';
import { SERVICES, FAQ_GENERAL } from '@/lib/services-data';
import { faqSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-data';

interface PageProps {
  params: Promise<{ town: string }>;
}

export async function generateStaticParams() {
  // Generate routes for every town in CT (all 169) — quality / index controlled per-town below.
  return TOWNS.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) return {};
  const indexable = isIndexable(town);
  const title = `Photo Booth Rental ${town.name} CT | 360, Glam & Wedding Booths`;
  const description = indexable
    ? `Looking for photo booth rental in ${town.name}, CT? Book 360 booths, glam booths, open-air booths, and wedding photo booth experiences for local events.`
    : `Photo booth rental serving ${town.name}, CT. Coverage available — request a quote for your local event.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${town.slug}/` },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url: `/service-areas/${town.slug}/` },
  };
}

export default async function TownPage({ params }: PageProps) {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();
  const countyInfo = getCountyInfo(town.county);
  const nearby = getNearbyTowns(town, 6);
  const indexable = isIndexable(town);

  const localIntro =
    town.intro ??
    `${town.name}, Connecticut is part of ${countyInfo.name}. Gold Coast Photo Booth Co. provides full-service photo booth rentals for ${town.name} weddings, corporate events, Sweet 16s, school events, fundraisers, and private parties. We work nearby venues across ${countyInfo.name} and travel statewide.`;

  return (
    <>
      <Hero
        eyebrow={`${countyInfo.name} · Connecticut`}
        title={`Photo Booth Rental in ${town.name}, CT`}
        subtitle={`360, glam, mirror, open-air, and audio guestbook experiences for weddings, corporate events, and private parties in ${town.name} and surrounding ${countyInfo.name} towns.`}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Photo Booths', href: '/photo-booth-rental-ct/' }}
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Service Areas', href: '/service-areas/' },
            {
              name: countyInfo.name,
              href: `/photo-booth-rental-${town.county}-county-ct/`,
            },
            { name: town.name, href: `/service-areas/${town.slug}/` },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="eyebrow">About this market</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
              Photo booth rental in {town.name}, CT
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-soft)]/85 leading-relaxed">
              {localIntro}
            </p>
            <p className="mt-4 text-[color:var(--color-ink-soft)]/85 leading-relaxed">
              Every {town.name} booking includes a professional on-site attendant, unlimited photo
              sessions, instant text / email sharing, and high-resolution prints. We coordinate
              load-in directly with your venue, carry event liability insurance, and design a
              print template + digital overlay around your event branding.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/check-availability/" className="btn-primary">
                Check {town.name} availability
              </Link>
              <Link
                href={`/photo-booth-rental-${town.county}-county-ct/`}
                className="btn-secondary"
              >
                {countyInfo.name} hub →
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6">
            <h3 className="font-semibold">Quick facts — {town.name}</h3>
            <dl className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between gap-3 border-b border-[color:var(--color-blush)] pb-2">
                <dt className="text-[color:var(--color-ink-soft)]/70">County</dt>
                <dd className="font-medium text-right">{countyInfo.name}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-[color:var(--color-blush)] pb-2">
                <dt className="text-[color:var(--color-ink-soft)]/70">Service area</dt>
                <dd className="font-medium text-right">Statewide CT</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-[color:var(--color-blush)] pb-2">
                <dt className="text-[color:var(--color-ink-soft)]/70">On-site attendant</dt>
                <dd className="font-medium text-right">Included</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-[color:var(--color-blush)] pb-2">
                <dt className="text-[color:var(--color-ink-soft)]/70">Booth styles</dt>
                <dd className="font-medium text-right">360, glam, mirror, open-air</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[color:var(--color-ink-soft)]/70">Insurance</dt>
                <dd className="font-medium text-right">COI on request</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white border-y border-[color:var(--color-blush)]">
        <div className="container-page">
          <div className="eyebrow">Booth Styles</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Most-requested booths for {town.name} events
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="section">
        <div className="container-page">
          <div className="eyebrow">Nearby Service Areas</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Also serving near {town.name}
          </h2>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/service-areas/${n.slug}/`}
                  className="block rounded-xl border border-[color:var(--color-blush)] bg-white px-4 py-3 hover:border-[color:var(--color-rose)] text-sm font-medium"
                >
                  {n.name}, CT
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/service-areas/" className="underline">
              All CT towns
            </Link>
            <span className="text-[color:var(--color-ink-soft)]/50">|</span>
            <Link
              href={`/photo-booth-rental-${town.county}-county-ct/`}
              className="underline"
            >
              {countyInfo.name} hub
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_GENERAL.slice(0, 6)} />

      <CTASection
        title={`Book your ${town.name}, CT photo booth`}
        subtitle={`Tell us your date and venue in ${town.name} — we will confirm availability within one business day.`}
      />

      {indexable && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                serviceSchema({
                  name: `Photo Booth Rental in ${town.name}, Connecticut`,
                  description: `Premium photo booth rentals serving ${town.name}, CT for weddings, corporate events, and private parties.`,
                  url: `${SITE.domain}/service-areas/${town.slug}/`,
                  areaServed: town.name,
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
      )}
    </>
  );
}
