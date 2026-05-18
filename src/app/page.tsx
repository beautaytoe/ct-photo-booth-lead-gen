import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { TownGrid } from '@/components/TownGrid';
import { SERVICES, EVENT_TYPES, FAQ_GENERAL } from '@/lib/services-data';
import { TOWNS, COUNTIES, getTownBySlug } from '@/lib/towns-data';

export default function HomePage() {
  const fairfieldFeatured = [
    'stamford-ct',
    'greenwich-ct',
    'norwalk-ct',
    'fairfield-ct',
    'westport-ct',
    'darien-ct',
    'new-canaan-ct',
    'ridgefield-ct',
    'wilton-ct',
    'weston-ct',
    'bridgeport-ct',
    'trumbull-ct',
    'shelton-ct',
    'stratford-ct',
    'danbury-ct',
    'newtown-ct',
  ]
    .map((s) => getTownBySlug(s))
    .filter((t): t is NonNullable<ReturnType<typeof getTownBySlug>> => !!t);

  const popularCtTowns = TOWNS.filter(
    (t) => t.tier === 1 && t.county !== 'fairfield'
  );

  return (
    <>
      <Hero
        eyebrow="Connecticut · Premium Photo Booth Rentals"
        title="Premium Photo Booth Rentals Across Connecticut"
        subtitle="360 booths, glam booths, open-air photo booths, mirror booths, selfie booths, and wedding photo booth experiences for events across Fairfield County and beyond."
        primaryCta={{ label: 'Check Availability', href: '/check-availability/' }}
        secondaryCta={{ label: 'View Packages', href: '/photo-booth-rental-prices-ct/' }}
      />

      {/* Service grid */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Photo Booth Experiences</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
                Choose your photo booth experience
              </h2>
              <p className="mt-3 max-w-2xl text-[color:var(--color-ink-soft)]/80">
                From the Kim-K style glam booth to the 360 video booth that anchors every wedding
                dance floor, every Gold Coast Photo Booth setup is designed around the moment, the
                venue, and the brand.
              </p>
            </div>
            <Link href="/photo-booth-rental-ct/" className="btn-secondary">
              All photo booth services →
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="section bg-white border-y border-[color:var(--color-blush)]">
        <div className="container-page">
          <div className="eyebrow">Built For</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            Weddings, corporate events &amp; private parties
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--color-ink-soft)]/80">
            Our team works hundreds of CT weddings, corporate activations, Sweet 16s, and private
            parties every year — from intimate 50-guest events to 600-guest corporate galas.
          </p>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {EVENT_TYPES.map((e) => (
              <li
                key={e.slug}
                className="rounded-2xl border border-[color:var(--color-blush)] p-5 hover:border-[color:var(--color-rose)] transition-colors"
              >
                <div className="text-2xl">{e.icon}</div>
                <div className="mt-2 font-semibold">{e.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured Fairfield County */}
      <TownGrid
        towns={fairfieldFeatured}
        title="Fairfield County featured locations"
        subtitle="Fairfield County is our highest-volume service region. Stamford, Greenwich, Westport, Darien, New Canaan, Norwalk, and Fairfield — plus every town along the Gold Coast and the I-84 corridor."
      />

      {/* Other popular CT */}
      <section className="section bg-white border-t border-[color:var(--color-blush)]">
        <div className="container-page">
          <div className="eyebrow">CT Service Areas</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Popular CT towns we serve</h2>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularCtTowns.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/service-areas/${t.slug}/`}
                  className="block rounded-xl border border-[color:var(--color-blush)] bg-[color:var(--color-cream)] px-4 py-3 hover:border-[color:var(--color-rose)]"
                >
                  <span className="font-medium">{t.name}, CT</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {COUNTIES.map((c) => (
              <Link
                key={c.slug}
                href={`/photo-booth-rental-${c.slug}-county-ct/`}
                className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-5 hover:border-[color:var(--color-rose)]"
              >
                <div className="font-[var(--font-display)] text-lg font-semibold">{c.name}</div>
                <div className="text-sm text-[color:var(--color-ink-soft)]/70 mt-1 line-clamp-2">
                  {c.description.split('—')[0]}…
                </div>
                <div className="mt-3 text-[color:var(--color-rose-dark)] text-sm">View →</div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/service-areas/" className="btn-secondary">
              All CT towns →
            </Link>
          </div>
        </div>
      </section>

      {/* Why book */}
      <section className="section">
        <div className="container-page grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="eyebrow">Why book with us</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
              Premium booths. Real attendants. Brand-grade design.
            </h2>
            <p className="mt-4 text-[color:var(--color-ink-soft)]/85 leading-relaxed">
              We treat every booking like a marketing channel — clean print templates, on-brand
              digital overlays, professional attendants, and a setup that actually fits the venue.
              No clip-art frames, no off-shelf prop bins.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { title: 'Premium booth hardware', body: '4K cameras, stabilized rigs, retouched glam prints, and venue-friendly footprints.' },
              { title: 'Custom design every event', body: 'Print template, on-screen overlay, and 360 intro/outro designed to match your event branding.' },
              { title: 'Professional on-site staff', body: 'Every booking includes a trained attendant in event-appropriate attire.' },
              { title: 'Statewide CT coverage', body: 'Fairfield County, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, and Windham counties.' },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-5">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]/80">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ title="Photo booth rental FAQs" items={FAQ_GENERAL} />

      <CTASection />
    </>
  );
}
