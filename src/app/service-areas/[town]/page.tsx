import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceCard } from '@/components/ServiceCard';
import { Icons } from '@/components/Icons';
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
      <InnerHero
        eyebrow={`${countyInfo.name} · Connecticut`}
        title={`Photo Booth Rental in ${town.name}, CT`}
        subtitle={`360, glam, mirror, open-air, and audio guestbook experiences for weddings, corporate events, and private parties in ${town.name} and surrounding ${countyInfo.name} towns.`}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Photo Booths', href: '/photo-booth-rental-ct/' }}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Service Areas', href: '/service-areas/' },
              { name: countyInfo.name, href: `/photo-booth-rental-${town.county}-county-ct/` },
              { name: town.name, href: `/service-areas/${town.slug}/` },
            ]}
          />
        }
      />

      <section className="section dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' }} className="md:grid-cols-1">
            <div>
              <span className="eyebrow">About this market</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Photo booth rental<br />
                in <em>{town.name}, CT.</em>
              </h2>
              <p className="lede" style={{ marginTop: 24 }}>
                {localIntro}
              </p>
              <p className="lede" style={{ marginTop: 16 }}>
                Every {town.name} booking includes a professional on-site attendant, unlimited photo
                sessions, instant text / email sharing, and high-resolution prints. We coordinate
                load-in directly with your venue, carry event liability insurance, and design a
                print template + digital overlay around your event branding.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/check-availability/" className="btn btn-primary">
                  Check {town.name} availability<span className="arrow" />
                </Link>
                <Link href={`/photo-booth-rental-${town.county}-county-ct/`} className="btn btn-ghost">
                  {countyInfo.name} hub →
                </Link>
              </div>
            </div>

            <aside className="pkg" style={{ minHeight: 'auto' }}>
              <div className="pkg-tag">{town.name} Quick Facts</div>
              <h3 className="pkg-name" style={{ marginTop: 6, fontSize: 28 }}>
                Booking <em>essentials.</em>
              </h3>
              <ul className="pkg-list" style={{ marginTop: 24 }}>
                <li><strong style={{ color: 'var(--ivory)' }}>County:</strong> {countyInfo.name}</li>
                <li><strong style={{ color: 'var(--ivory)' }}>Service area:</strong> Statewide CT</li>
                <li><strong style={{ color: 'var(--ivory)' }}>Attendant:</strong> Included on every booking</li>
                <li><strong style={{ color: 'var(--ivory)' }}>Booth styles:</strong> 360, glam, mirror, open-air, selfie, audio guestbook</li>
                <li><strong style={{ color: 'var(--ivory)' }}>Insurance:</strong> COI on request</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Booth Styles</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Most-requested booths<br />
                for <em>{town.name}.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                From the editorial glam booth to the 360 video booth, our {town.name} clients book a
                mix of experiences to cover the dance floor, the bar, and the audio guestbook.
              </p>
            </div>
          </div>
          <div className="booth-grid">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Nearby Service Areas</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Also serving<br />
                <em>near {town.name}.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                We work the {countyInfo.name} corridor every weekend in peak season. Tap any nearby
                town for local context.
              </p>
            </div>
          </div>
          <ul className="tile-grid" style={{ listStyle: 'none', padding: 0 }}>
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link href={`/service-areas/${n.slug}/`} className="tile">
                  <span className="tile-meta">{countyInfo.name}</span>
                  <span className="tile-name">{n.name}, CT</span>
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/service-areas/" className="btn btn-ghost">
              <Icons.Spark size={14} /> All CT towns
            </Link>
            <Link href={`/photo-booth-rental-${town.county}-county-ct/`} className="btn btn-ghost">
              {countyInfo.name} hub
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_GENERAL.slice(0, 6)} eyebrow={`${town.name} · FAQ`} />

      <CTASection
        title={
          <>
            Book your <em>{town.name}, CT</em><br />photo booth.
          </>
        }
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
