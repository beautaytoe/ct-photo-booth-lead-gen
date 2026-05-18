import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
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
      <Hero
        eyebrow="About"
        title="Premium photo booth experiences, designed in Connecticut."
        subtitle="We treat every booth like a brand asset. Print templates designed around your invitation suite. Digital overlays built on your colors. On-site attendants who keep the line moving and the booth on-brand."
      />

      <section className="container-page mt-6">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about/' }]} />
      </section>

      <section className="section">
        <div className="container-page max-w-3xl grid gap-8">
          <p className="text-lg text-[color:var(--color-ink-soft)]/85 leading-relaxed">
            {SITE.brand} is a premium photo booth & event-booth rental company serving all of
            Connecticut. We focus on weddings, corporate events, and luxury private parties
            across Fairfield County and the rest of the state.
          </p>
          <p className="text-lg text-[color:var(--color-ink-soft)]/85 leading-relaxed">
            We run modern booth hardware — 4K cameras, stabilized 360 rigs, retouched glam prints,
            interactive mirror booths, and self-serve selfie booths — paired with custom design,
            real attendants, and clean post-event delivery.
          </p>
          <p className="text-lg text-[color:var(--color-ink-soft)]/85 leading-relaxed">
            What you will not get from us: clip-art print frames, off-the-shelf prop bins, missing
            attendants, or thin templates. Every event is designed before we show up.
          </p>

          <div className="rounded-2xl border border-[color:var(--color-blush)] bg-white p-6">
            <h2 className="text-xl font-semibold font-[var(--font-display)]">Service area</h2>
            <p className="mt-2 text-[color:var(--color-ink-soft)]/85">
              Statewide CT — Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London,
              Tolland, and Windham counties. Fairfield County is our highest-volume region.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
