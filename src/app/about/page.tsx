import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'About Us — Premium CT Photo Booth Rentals',
  description:
    'Gold Coast Photo Booth Co. — premium photo booth, 360, glam, wedding, and corporate event-booth rentals across Connecticut.',
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <InnerHero
        eyebrow="About"
        title="Premium photo booth experiences, designed in Connecticut."
        subtitle="We treat every booth like a brand asset. Print templates designed around your invitation suite. Digital overlays built on your colors. On-site attendants who keep the line moving and the booth on-brand."
        crumbs={
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about/' }]} />
        }
      />

      <section className="section dark">
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ display: 'grid', gap: 28, fontSize: 18, lineHeight: 1.7, color: 'var(--text-dim)' }}>
            <p>
              {SITE.brand} was built for Connecticut weddings, private parties, school events,
              corporate gatherings, and venue-based celebrations that need a polished booth
              experience without making the planning process complicated.
            </p>
            <p>
              We run modern booth hardware — 4K cameras, stabilized 360 rigs, retouched glam prints,
              interactive mirror booths, and self-serve selfie booths — paired with custom design,
              real attendants, and clean post-event delivery.
            </p>
            <p>
              What you will not get from us: clip-art print frames, off-the-shelf prop bins, missing
              attendants, or thin templates. Every event is designed before we show up.
            </p>
          </div>

          {/* What we focus on — trust-safe bullets that describe the operational
              approach without making unsupported claims about volume, awards,
              or unverifiable certifications. */}
          <div style={{ marginTop: 56 }}>
            <span className="eyebrow">What we focus on</span>
            <h2 className="display" style={{ marginTop: 16, fontSize: 36 }}>
              The work, <em>quietly done right.</em>
            </h2>
            <ul
              style={{
                marginTop: 24,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
                listStyle: 'none',
                padding: 0,
              }}
            >
              {[
                {
                  title: 'Clean booth setups',
                  body: 'Each booth is built to fit the room — venue access, ceiling clearance, power, and dance-floor flow all confirmed before the event.',
                },
                {
                  title: 'Simple booking',
                  body: 'Tell us your date and venue; we come back with a tailored proposal. Direct booking is also available on the availability page.',
                },
                {
                  title: 'A real booth lineup',
                  body: 'Open-air, 360, glam, mirror, roaming, selfie, and audio guestbook — chosen per event, not stamped from a template.',
                },
                {
                  title: 'Statewide CT coverage',
                  body: 'Available across all eight Connecticut counties. Travel pricing is confirmed before booking on longer-distance events.',
                },
              ].map((it) => (
                <li
                  key={it.title}
                  style={{
                    padding: 24,
                    border: '1px solid var(--line)',
                    borderRadius: 16,
                    background: 'var(--bg-soft)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ivory)', lineHeight: 1.15 }}>
                    {it.title}
                  </div>
                  <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>{it.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* How it works — 3 steps. Mirrors the actual booking flow on
              /check-availability/ (booking page or form -> tailored proposal
              -> details confirmed before the event). No fabricated SLAs. */}
          <div style={{ marginTop: 56 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="display" style={{ marginTop: 16, fontSize: 36 }}>
              Three steps, <em>start to event.</em>
            </h2>
            <ol
              style={{
                marginTop: 24,
                display: 'grid',
                gap: 18,
                listStyle: 'none',
                padding: 0,
                counterReset: 'about-step',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Tell us your date, venue, and event type',
                  body: 'Use the booking page on /check-availability/ to schedule a quick call, or send a quick inquiry through the form.',
                },
                {
                  step: '02',
                  title: 'We match the right booth setup',
                  body: 'Based on venue, guest count, and event flow, we propose the booth styles and add-ons that fit — with line-itemed pricing.',
                },
                {
                  step: '03',
                  title: 'We confirm details before the event',
                  body: 'Setup time, power access, layout, and any venue-required documents are confirmed in writing so nothing is decided on event day.',
                },
              ].map((it) => (
                <li
                  key={it.step}
                  style={{
                    padding: 24,
                    border: '1px solid var(--line)',
                    borderRadius: 16,
                    background: 'var(--bg-soft)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 20,
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      color: 'var(--gold-bright)',
                    }}
                  >
                    {it.step}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ivory)', lineHeight: 1.2 }}>
                      {it.title}
                    </div>
                    <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.6, color: 'var(--text-dim)' }}>{it.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            style={{
              marginTop: 56,
              padding: 32,
              border: '1px solid var(--line)',
              borderRadius: 18,
              background: 'var(--bg-soft)',
            }}
          >
            <span className="eyebrow">Service Area</span>
            <h2 className="display" style={{ marginTop: 16, fontSize: 36 }}>
              Statewide <em>Connecticut.</em>
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Service is available across all eight Connecticut counties — Fairfield, New Haven,
              Hartford, Litchfield, Middlesex, New London, Tolland, and Windham. The booth lineup
              is built for events anywhere in CT.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link href="/service-areas/" className="btn btn-primary">
                See all CT service areas<span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
