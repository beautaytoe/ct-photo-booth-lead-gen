import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceCard } from '@/components/ServiceCard';
import { Icons } from '@/components/Icons';
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
  pathPrefix: string;
}) {
  const info = getCountyInfo(county);
  const towns = getTownsByCounty(county).sort(
    (a, b) => a.tier - b.tier || a.name.localeCompare(b.name)
  );
  const indexableTowns = towns.filter((t) => t.tier !== 3);
  const otherTowns = towns.filter((t) => t.tier === 3);

  return (
    <>
      <InnerHero
        eyebrow={`Connecticut · ${info.name}`}
        title={`Photo Booth Rental in ${info.name}, CT`}
        subtitle={info.description}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Booth Experiences', href: '/photo-booth-rental-ct/' }}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Service Areas', href: '/service-areas/' },
              { name: info.name, href: `${pathPrefix}/` },
            ]}
          />
        }
      />

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Featured towns</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Towns we cover<br />
                in <em>{info.name}.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Tap any town for local context and the booth styles that fit best. Smaller
                communities in the area are also supported — we confirm coverage during booking.
              </p>
            </div>
          </div>
          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 10,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {indexableTowns.map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}/`} className="tile">
                  <span className="tile-meta">{info.name}</span>
                  <span className="tile-name" style={{ fontSize: 19 }}>{t.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {otherTowns.length > 0 && (
            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}
            >
              Smaller communities in the area also supported, including{' '}
              {otherTowns.map((t, i) => (
                <span key={t.slug}>
                  <Link
                    href={`/service-areas/${t.slug}/`}
                    style={{ color: 'var(--text-dim)', textDecoration: 'underline' }}
                  >
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

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Booth styles</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Booth experiences for<br />
                <em>{info.name} events.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Mix and match booth styles for your event. Pair our 360 booth with an audio
                guestbook, or run a glam booth alongside the open-air for full coverage of the
                room.
              </p>
            </div>
          </div>
          <div className="booth-grid">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link href="/photo-booth-rental-ct/" className="btn btn-ghost">
              <Icons.Spark size={14} /> All booth styles
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_GENERAL.slice(0, 6)} eyebrow={`${info.name} · FAQ`} />

      <CTASection
        title={
          <>
            Check availability in<br />
            <em>{info.name}.</em>
          </>
        }
        subtitle={`Send us your date, venue, and event type and we'll come back with a tailored package recommendation.`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: `Photo Booth Rental in ${info.name}, Connecticut`,
              description: `Booth rental for weddings, corporate events, and private gatherings in ${info.name}, CT.`,
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
  const title = `Photo Booth Rental in ${info.name}, CT | Wedding, Corporate & Event Booths`;
  const description = `Booth rental for weddings, corporate events, galas, private parties, and school events in ${info.name}, Connecticut. Open-air, 360, glam, mirror, roaming, and audio guestbook options.`;
  return {
    title,
    description,
    alternates: { canonical: `${pathPrefix}/` },
    openGraph: { title, description, url: `${pathPrefix}/` },
  };
}
