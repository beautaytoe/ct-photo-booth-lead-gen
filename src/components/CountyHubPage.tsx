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
        secondaryCta={{ label: 'View Photo Booths', href: '/photo-booth-rental-ct/' }}
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
              <span className="eyebrow">Featured Towns</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Top {info.name}<br />
                <em>towns we serve.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Click any town for local context, popular booth styles, and nearby service areas. We
                also serve every smaller community in {info.name}.
              </p>
            </div>
          </div>
          <ul className="tile-grid" style={{ listStyle: 'none', padding: 0 }}>
            {indexableTowns.map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}/`} className="tile">
                  <span className="tile-meta">Tier {t.tier} · {info.name}</span>
                  <span className="tile-name">{t.name}, CT</span>
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
              We also serve smaller {info.name} communities including{' '}
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
              <span className="eyebrow">Photo Booth Experiences</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Booth styles popular<br />
                in <em>{info.name}.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Mix and match booth styles for your {info.name} event — pair our 360 booth with an
                audio guestbook, or run a glam booth alongside the open-air for full coverage.
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
            Book a CT photo booth<br />in <em>{info.name}.</em>
          </>
        }
        subtitle={`Tell us your date, venue, and event type and we will confirm availability for your ${info.name} event.`}
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
