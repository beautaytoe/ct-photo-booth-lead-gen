import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerHero } from '@/components/Hero';
import { CTASection } from '@/components/CTASection';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PackageCards } from '@/components/PackageCards';
import { Icons } from '@/components/Icons';
import { SERVICES } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Photo Booth Rental Prices CT | 2026',
  description:
    'Photo booth rental pricing in Connecticut for 2026 — open-air, 360, glam, mirror, and corporate booth activations. What drives cost and what to expect.',
  alternates: { canonical: '/photo-booth-rental-prices-ct/' },
};

export default function PricingPage() {
  return (
    <>
      <InnerHero
        eyebrow="Pricing · 2026"
        title="Photo Booth Rental Prices in Connecticut"
        subtitle="Every event is custom-quoted, but here are three common starting points for CT events. Final pricing depends on booth style, hours, branding, and add-ons."
        primaryCta={{ label: 'Get Your Tailored Quote', href: '/check-availability/' }}
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Pricing', href: '/photo-booth-rental-prices-ct/' },
            ]}
          />
        }
      />

      <PackageCards />

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">What Drives Price</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                What changes the price<br />
                of a <em>CT photo booth.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Six variables drive almost every price difference between bookings. Knowing these
                helps you build the right package for your event.
              </p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              ['Booth style', '360 booths and glam booths cost more than open-air booths because of the rig, lighting, and editing workflow.'],
              ['Event hours', 'The longer the event, the higher the booking. Setup and breakdown are not counted against your event hours.'],
              ['Custom branding', 'Custom print templates, on-screen overlays, 360 intro/outro, and branded landing pages take design time.'],
              ['Backdrop type', 'A standard backdrop is included; premium step-and-repeat and custom-built backdrops are an add-on.'],
              ['Travel', 'Most of CT is included; remote shoreline and Litchfield Hills venues may carry a travel adjustment.'],
              ['Day of week / season', 'Saturday weddings in peak season book first and price firmest.'],
            ].map(([title, body]) => (
              <li
                key={title}
                style={{
                  padding: 24,
                  border: '1px solid var(--line)',
                  borderRadius: 18,
                  background: 'var(--bg-soft)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 22,
                    color: 'var(--gold-bright)',
                    marginBottom: 8,
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{body}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Browse</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Browse <em>booth styles.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Tap any booth style for in-depth pricing context, included features, and the events
                we book it for most often.
              </p>
            </div>
          </div>
          <ul className="tile-grid" style={{ listStyle: 'none', padding: 0 }}>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="tile">
                  <span className="tile-meta">{s.shortName}</span>
                  <span className="tile-name">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ
        eyebrow="Pricing FAQ"
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
        title={
          <>
            Want a <em>real quote</em><br />in writing?
          </>
        }
        subtitle="Send us your date, town, and event type — we will reply with a tailored, line-itemed quote. Fast replies during booking hours."
      />
    </>
  );
}
