import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SERVICES } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Photo Booth Rental Prices CT | 2026 Pricing Guide',
  description:
    'Photo booth rental pricing in Connecticut for 2026 — open-air booths, 360 booths, glam booths, mirror booths, and corporate activations. What drives cost and what to expect.',
  alternates: { canonical: '/photo-booth-rental-prices-ct/' },
};

const tiers = [
  {
    name: 'Essential',
    headline: 'Open-Air or Mirror Booth · 3 hours',
    audience: 'Small private parties, birthdays, school events',
    bullets: [
      'Open-air or mirror photo booth',
      'On-site attendant',
      'Unlimited prints',
      'Instant digital sharing',
      'Custom print template',
      'Online gallery delivered after the event',
    ],
    range: 'Most events land in the low-to-mid three figures.',
    cta: 'Check Essential availability',
  },
  {
    name: 'Signature',
    headline: 'Open-Air or Glam Booth · 4 hours · Premium Backdrop',
    audience: 'Weddings, corporate events, Sweet 16s',
    bullets: [
      'Open-air or glam photo booth',
      'Premium backdrop',
      'Custom print template + digital overlay',
      'On-site attendant',
      'Unlimited prints + digital share',
      'Online gallery + GIF export',
    ],
    range: 'Most events land in the mid-three to high-three figures.',
    highlight: true,
    cta: 'Check Signature availability',
  },
  {
    name: '360 + Audio Guestbook',
    headline: '4K 360 Booth · 4 hours · Audio Guestbook',
    audience: 'Modern weddings, brand activations, Sweet 16s',
    bullets: [
      '4K stabilized 360 booth',
      'Custom intro / outro + music sync',
      'Vintage telephone audio guestbook',
      'On-site attendant',
      'Branded landing page (corporate)',
      'Online gallery + post-event reel',
    ],
    range: 'Most events land in the low-to-mid four figures.',
    cta: 'Check 360 availability',
  },
];

export default function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title="Photo Booth Rental Prices in Connecticut"
        subtitle="Every event is custom-quoted, but here is what most CT bookings look like at three common levels. Final pricing depends on booth style, hours, branding, and add-ons."
        primaryCta={{ label: 'Get Your Tailored Quote', href: '/check-availability/' }}
      />

      <section className="container-page mt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Pricing', href: '/photo-booth-rental-prices-ct/' },
          ]}
        />
      </section>

      <section className="section">
        <div className="container-page grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border bg-white p-6 flex flex-col ${
                t.highlight
                  ? 'border-[color:var(--color-rose)] shadow-md'
                  : 'border-[color:var(--color-blush)]'
              }`}
            >
              {t.highlight && (
                <div className="text-xs uppercase tracking-wider font-semibold text-[color:var(--color-rose-dark)] mb-2">
                  Most popular
                </div>
              )}
              <h2 className="text-2xl font-[var(--font-display)] font-semibold">{t.name}</h2>
              <div className="mt-1 text-sm text-[color:var(--color-ink-soft)]/70">{t.headline}</div>
              <div className="mt-3 text-xs uppercase tracking-wider text-[color:var(--color-rose-dark)]">
                Best for
              </div>
              <div className="text-sm">{t.audience}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[color:var(--color-rose-dark)]">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm italic text-[color:var(--color-ink-soft)]/70">{t.range}</p>
              <Link href="/check-availability/" className="btn-primary mt-5 text-sm">
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white border-y border-[color:var(--color-blush)]">
        <div className="container-page max-w-3xl">
          <div className="eyebrow">What Drives Price</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">
            What changes the price of a CT photo booth
          </h2>
          <ul className="mt-6 grid gap-3 text-[color:var(--color-ink-soft)]/85 leading-relaxed">
            <li>
              <strong>Booth style.</strong> 360 booths and glam booths cost more than open-air
              booths because of the rig, lighting, and editing workflow.
            </li>
            <li>
              <strong>Event hours.</strong> The longer the event, the higher the booking. Setup
              and breakdown are not counted against your event hours.
            </li>
            <li>
              <strong>Custom branding.</strong> Custom print templates, on-screen overlays, 360
              intro/outro, and branded landing pages take design time.
            </li>
            <li>
              <strong>Backdrop type.</strong> A standard backdrop is included; premium step-and-repeat
              and custom-built backdrops are an add-on.
            </li>
            <li>
              <strong>Travel.</strong> Most of CT is included; remote shoreline and Litchfield
              Hills venues may carry a travel adjustment.
            </li>
            <li>
              <strong>Day of week / season.</strong> Saturday weddings in peak season book first
              and price firmest.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="eyebrow">Browse</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold">Browse photo booth styles</h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className="block rounded-xl border border-[color:var(--color-blush)] bg-white px-4 py-3 hover:border-[color:var(--color-rose)] text-sm font-medium"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={[
          {
            q: 'Do you have packages or is everything custom?',
            a: 'Both — most bookings start from one of the three packages above and then we adjust booth style, hours, branding, and add-ons to fit the event. You will get a clean, line-itemed quote before anything is signed.',
          },
          {
            q: 'Is there a deposit?',
            a: 'Yes — a 25% deposit holds your date. The balance is due 14 days before the event.',
          },
          {
            q: 'What happens if our event is cancelled or postponed?',
            a: 'Full reschedule policy is in the contract — short version, you can move your date once at no charge subject to availability. Cancellation policy is also clearly written.',
          },
          {
            q: 'Do you charge for travel?',
            a: 'Most of Connecticut is included. We may add a small travel fee for remote shoreline or Litchfield Hills venues — this is always disclosed in the quote.',
          },
        ]}
      />

      <CTASection
        title="Want a real quote in writing?"
        subtitle="Send us your date, town, and event type — we will reply with a tailored, line-itemed quote within one business day."
      />
    </>
  );
}
