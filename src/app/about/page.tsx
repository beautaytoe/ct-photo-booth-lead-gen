import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'About Gold Coast Photo Booth Co. | Premium CT Photo Booth Rentals',
  description:
    "Gold Coast Photo Booth Co. provides premium photo booth and event-booth rentals across Connecticut — 360 booths, glam booths, wedding photo booths, and corporate event activations.",
  alternates: { canonical: '/about/' },
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
          <div style={{ display: 'grid', gap: 32, fontSize: 18, lineHeight: 1.7, color: 'var(--text-dim)' }}>
            <p>
              {SITE.brand} is a premium photo booth &amp; event-booth rental company serving all of
              Connecticut. We focus on weddings, corporate events, and luxury private parties across
              Fairfield County and the rest of the state.
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

          <div
            style={{
              marginTop: 48,
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
              Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, and Windham
              counties. Fairfield County is our highest-volume region — and where our warehouse is
              based.
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
