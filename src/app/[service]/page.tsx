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
      <InnerHero
        eyebrow="Connecticut · Photo Booth Rental"
        title={service.h1}
        subtitle={service.hero}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Pricing', href: '/photo-booth-rental-prices-ct/' }}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: service.name, href: `/${service.slug}/` },
            ]}
          />
        }
      />

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">About this booth</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                What you get with the<br />
                <em>{service.name.toLowerCase()}</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">{service.about}</p>
              {service.startingFrom && (
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  {service.startingFrom}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            <div className="pkg" style={{ minHeight: 'auto' }}>
              <div className="pkg-tag">Included</div>
              <h3 className="pkg-name" style={{ marginTop: 6, fontSize: 28 }}>
                Features <em>standard</em>
              </h3>
              <ul className="pkg-list" style={{ marginTop: 24 }}>
                {service.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="pkg" style={{ minHeight: 'auto' }}>
              <div className="pkg-tag">Best For</div>
              <h3 className="pkg-name" style={{ marginTop: 6, fontSize: 28 }}>
                When to <em>book it</em>
              </h3>
              <ul className="pkg-list" style={{ marginTop: 24 }}>
                {service.bestFor.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            {service.popularAdds && (
              <div className="pkg featured" style={{ minHeight: 'auto' }}>
                <span className="pkg-badge">★ Pair with</span>
                <div className="pkg-tag">Popular add-ons</div>
                <h3 className="pkg-name" style={{ marginTop: 6, fontSize: 28 }}>
                  Make it <em>yours</em>
                </h3>
                <ul className="pkg-list" style={{ marginTop: 24 }}>
                  {service.popularAdds.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <div className="pkg-foot">
                  <Link
                    href="/check-availability/"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Build your package<span className="arrow" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Service Areas</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                CT towns where we<br />
                <em>book this most.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                These are the priority CT markets where this booth style is most-requested. We serve
                every town in Connecticut — see the full list.
              </p>
            </div>
          </div>
          <ul className="tile-grid" style={{ listStyle: 'none', padding: 0 }}>
            {featuredTowns.map((t) => (
              <li key={t.slug}>
                <Link href={`/service-areas/${t.slug}/`} className="tile">
                  <span className="tile-meta">{t.county.replace('-', ' ')} county</span>
                  <span className="tile-name">{t.name}, CT</span>
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24 }}>
            <Link href="/service-areas/" className="btn btn-ghost">
              <Icons.Spark size={14} /> All CT towns
            </Link>
          </div>
        </div>
      </section>

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Also Available</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Other booth<br />
                <em>experiences.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Pair this booth with a 360 video booth, an audio guestbook, or a glam editorial setup
                for the full Gold Coast experience.
              </p>
            </div>
          </div>
          <div className="booth-grid">
            {otherServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs.slice(0, 8)} eyebrow="Frequently Asked" />

      <CTASection
        title={
          <>
            Ready to book the <em>{service.name.toLowerCase()}?</em>
          </>
        }
        subtitle="Send us your date, town, and event type — we will confirm availability within one business day."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.ctName,
              description: service.description,
              url: `${SITE.domain}/${service.slug}/`,
              // Service pages target the whole state
              area: { state: 'Connecticut' },
              includeOfferCatalog: true,
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
