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
  defaultIntroFor,
  metaDescriptionFor,
} from '@/lib/towns-data';
import { SERVICES, FAQ_GENERAL } from '@/lib/services-data';
import { POSTS } from '@/lib/blog-data';
import { getVenuesForTown, venueTypeLabel } from '@/lib/venues-data';
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
  // Title stays short so the layout template's "| Gold Coast" suffix fits
  // under Google's ~60-char SERP truncation. Vibe-based suffix (e.g. "360,
  // Glam & Wedding Booths") used to live here but pushed every town title
  // over 70 chars. Removed; the vibe still varies the meta description.
  const title = `Photo Booth Rental in ${town.name}, CT`;
  const description = indexable
    ? metaDescriptionFor(town)
    : `Photo booth rental available for ${town.name}, CT events. Request a quote to confirm coverage and pricing.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${town.slug}/` },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url: `/service-areas/${town.slug}/` },
  };
}

const EVENT_TYPES = [
  'Weddings',
  'Corporate Events',
  'Sweet 16s',
  'Bar / Bat Mitzvahs',
  'School Events',
  'Galas & Fundraisers',
  'Brand Activations',
  'Holiday Parties',
];

const INCLUDED = [
  'Professional setup and breakdown',
  'On-site booth attendant',
  'Custom photo overlay',
  'Premium lighting',
  'Digital sharing by QR, text, or email',
  'Online gallery',
  'Backdrop options',
  'Optional print packages',
];

/** Pick the two most relevant blog posts for the town's vibe. */
function relatedPostsFor(vibe: string | undefined) {
  const slugs =
    vibe === 'corporate'
      ? ['corporate-photo-booth-rental-ideas', 'how-much-does-photo-booth-rental-cost-in-ct']
      : ['best-photo-booth-ideas-for-weddings-in-ct', 'how-much-does-photo-booth-rental-cost-in-ct'];
  return slugs.map((s) => POSTS.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => !!p);
}

export default async function TownPage({ params }: PageProps) {
  const { town: slug } = await params;
  const town = getTownBySlug(slug);
  if (!town) notFound();
  const countyInfo = getCountyInfo(town.county);
  const nearby = getNearbyTowns(town, 6);
  const indexable = isIndexable(town);
  const localIntro = town.intro ?? defaultIntroFor(town);
  const venues = getVenuesForTown(town.slug);
  const relatedPosts = relatedPostsFor(town.vibe);

  // Town-specific FAQ — keeps an exact-match keyword phrase in one place
  // without scattering it through H2s.
  const townFaqs = [
    {
      q: `What does photo booth rental in ${town.name}, CT typically include?`,
      a: 'Packages can include an attendant-supported setup, a custom photo overlay, premium lighting, digital sharing by QR/text/email, an online gallery, backdrop options, and optional print packages. Final scope depends on the booth style selected and the event timing.',
    },
    {
      q: `Which booths fit ${town.name} weddings best?`,
      a: 'A common pairing for receptions is an open-air booth or a glam booth for portraits, with a 360 booth for social-ready video clips or an audio guestbook for voice messages. Mirror booths and roaming booths are also strong pairings depending on the venue.',
    },
    ...FAQ_GENERAL.slice(0, 5),
  ];

  return (
    <>
      <InnerHero
        eyebrow={`${countyInfo.name} · Connecticut`}
        title={`Photo Booth Rental in ${town.name}, CT`}
        subtitle={`Open-air, 360, glam, mirror, roaming, and audio guestbook options for weddings, corporate events, and private gatherings in the area.`}
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Booth Experiences', href: '/photo-booth-rental-ct/' }}
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

      {/* Section 1: polished booth experience */}
      <section className="section dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 60, alignItems: 'start' }} className="md:grid-cols-1">
            <div>
              <span className="eyebrow">About this market</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                A polished booth experience<br />
                for <em>{town.name} events.</em>
              </h2>
              <p className="lede" style={{ marginTop: 24 }}>{localIntro}</p>
              <p className="lede" style={{ marginTop: 16 }}>
                Popular settings include private residences, clubs, hotels, waterfront venues,
                school events, fundraisers, and corporate gatherings. Each booth style fits a
                slightly different room, guest count, and vibe — we help match the right setup to
                your event.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/check-availability/" className="btn btn-primary">
                  Check availability<span className="arrow" />
                </Link>
                <Link href={`/photo-booth-rental-${town.county}-county-ct/`} className="btn btn-ghost">
                  {countyInfo.name} overview →
                </Link>
              </div>
            </div>

            <aside className="pkg" style={{ minHeight: 'auto' }}>
              <div className="pkg-tag">At a glance</div>
              <h3 className="pkg-name" style={{ marginTop: 6, fontSize: 28 }}>
                Booking <em>essentials.</em>
              </h3>
              <ul className="pkg-list" style={{ marginTop: 24 }}>
                <li>
                  <strong style={{ color: 'var(--ivory)' }}>County:</strong> {countyInfo.name}
                </li>
                <li>
                  <strong style={{ color: 'var(--ivory)' }}>Coverage:</strong> Statewide across Connecticut
                </li>
                <li>
                  <strong style={{ color: 'var(--ivory)' }}>Booth styles:</strong> open-air, 360, glam, mirror, roaming, selfie, audio guestbook
                </li>
                <li>
                  <strong style={{ color: 'var(--ivory)' }}>Setup details:</strong> timing, access, power, and venue documents confirmed during booking
                </li>
              </ul>
              <div className="pkg-foot">
                <Link href="/photo-booth-rental-prices-ct/" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  View CT pricing →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Section 2: booth styles */}
      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Booth styles</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Booth styles that fit<br />
                <em>weddings, parties &amp; corporate gatherings.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Mix and match booth styles for your event. A common pairing is a stationary booth
                with one or two add-ons — for example, an open-air booth plus an audio guestbook,
                or a 360 booth plus a custom backdrop.
              </p>
            </div>
          </div>
          <div className="booth-grid">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/photo-booth-rental-ct/" className="btn btn-ghost">
              <Icons.Spark size={14} /> All booth styles
            </Link>
            <Link href="/photo-booth-rental-prices-ct/" className="btn btn-ghost">
              See CT pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: What's included */}
      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Included</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                What's included with<br />
                your <em>event booth setup.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Standard inclusions across most booth styles. Final scope is confirmed before the
                event so the venue, timing, and floor plan all line up.
              </p>
            </div>
          </div>
          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {INCLUDED.map((item) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'linear-gradient(180deg, #e6cf94, #c9a865)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#1a1410',
                    flexShrink: 0,
                  }}
                >
                  <Icons.Check size={12} />
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--ivory)', lineHeight: 1.4 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 4: Event types */}
      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Event types</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                {town.name} event types<br />
                <em>we can support.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                The booth lineup is built to work across the most common event types in the area.
                Tell us which fits your date and we'll send a tailored package recommendation.
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
            {EVENT_TYPES.map((e) => (
              <li
                key={e}
                style={{
                  padding: '14px 16px',
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  fontFamily: 'var(--serif)',
                  fontSize: 18,
                  color: 'var(--ivory)',
                }}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5: Local event venues — outbound links to real {Town} venue websites.
          Framed as public-knowledge reference; we do NOT claim partnerships. */}
      {venues.length > 0 && (
        <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Local venues</span>
                <h2 className="display" style={{ marginTop: 24 }}>
                  Common event venues<br />
                  in <em>{town.name}.</em>
                </h2>
              </div>
              <div className="section-head-right">
                <p className="lede">
                  Publicly-known event venues in and around {town.name}. We are not affiliated with
                  these venues — they're listed for reference. We'll coordinate booth setup with
                  any venue you book.
                </p>
              </div>
            </div>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 12,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {venues.map((v) => (
                <li key={v.url}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener"
                    className="tile"
                    style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}
                  >
                    <span className="tile-meta">{venueTypeLabel(v.type)}</span>
                    <span className="tile-name" style={{ fontSize: 17, lineHeight: 1.25 }}>
                      {v.name}{' '}
                      <span style={{ color: 'var(--gold)', fontSize: 12, marginLeft: 4 }} aria-hidden="true">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Section 6: Nearby */}
      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Nearby</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Nearby {countyInfo.name}<br />
                <em>service areas.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                We cover the surrounding {countyInfo.name} corridor as well as the rest of
                Connecticut. Browse a nearby area below for local context.
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
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/service-areas/${n.slug}/`}
                  className="tile"
                  style={{ padding: '14px 16px' }}
                >
                  <span className="tile-meta">{countyInfo.name}</span>
                  <span className="tile-name" style={{ fontSize: 18 }}>
                    {n.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/service-areas/" className="btn btn-ghost">
              <Icons.Spark size={14} /> All CT towns
            </Link>
            <Link href={`/photo-booth-rental-${town.county}-county-ct/`} className="btn btn-ghost">
              {countyInfo.name} overview
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Related reading — internal links to relevant blog posts */}
      {relatedPosts.length > 0 && (
        <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Related reading</span>
                <h2 className="display" style={{ marginTop: 24 }}>
                  Planning a {town.name}<br />
                  <em>event?</em>
                </h2>
              </div>
              <div className="section-head-right">
                <p className="lede">
                  Short guides with practical context — pricing, booth comparisons, and ideas to
                  help you build the right setup for your venue.
                </p>
              </div>
            </div>
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="booth-card bc-span-4"
                    style={{ minHeight: 200, gridColumn: 'auto' }}
                  >
                    <div className="booth-card-num">{p.readMinutes} min read</div>
                    <h3 className="booth-card-name" style={{ fontSize: 22 }}>
                      {p.title}
                    </h3>
                    <p className="booth-card-desc">{p.excerpt}</p>
                    <div className="booth-card-foot">
                      <span className="bc-link">
                        Read <span style={{ fontSize: 14 }}>↗</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Section 8: FAQ */}
      <FAQ
        items={townFaqs}
        eyebrow={`${town.name} · FAQ`}
        headline={
          <>
            {town.name} photo booth<br />
            <em>rental FAQs.</em>
          </>
        }
      />

      {/* Section 9: Final CTA */}
      <CTASection
        title={
          <>
            Check availability for<br />
            your <em>event date.</em>
          </>
        }
        subtitle={`Send your date, venue, and event type — we'll come back with a tailored package recommendation for your ${town.name} event.`}
      />

      {indexable && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                serviceSchema({
                  name: `Photo Booth Rental in ${town.name}, Connecticut`,
                  description: `Booth rental for weddings, corporate events, and private gatherings in ${town.name}, CT.`,
                  url: `${SITE.domain}/service-areas/${town.slug}/`,
                  // City + containedInPlace chain: City ↳ County ↳ State.
                  // This is the Google-preferred structure for service-area
                  // businesses serving a specific municipality.
                  area: {
                    city: town.name,
                    cityCounty: countyInfo.name,
                    state: 'Connecticut',
                  },
                  includeOfferCatalog: true,
                })
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema(townFaqs.slice(0, 5))),
            }}
          />
        </>
      )}
    </>
  );
}
