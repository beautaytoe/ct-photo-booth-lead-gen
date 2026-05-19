import type { Metadata } from 'next';
import { InnerHero } from '@/components/Hero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FinalCTA } from '@/components/FinalCTA';
import { BookingEmbed } from '@/components/BookingEmbed';

export const metadata: Metadata = {
  title: 'Check Availability',
  description:
    'Check CT photo booth rental availability for your wedding, corporate event, or private party. Fast replies during booking hours.',
  alternates: { canonical: '/check-availability/' },
  openGraph: { url: '/check-availability/' },
};

export default function CheckAvailabilityPage() {
  return (
    <>
      <InnerHero
        eyebrow="Booking"
        title="Check availability for your CT photo booth."
        subtitle="Pick a time on the calendar to talk options, pricing, and your date — or send a quick inquiry below."
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Check Availability', href: '/check-availability/' },
            ]}
          />
        }
      />

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Direct Booking</span>
              <h2 className="display" style={{ marginTop: 24 }}>
                Pick a time that<br />
                <em>works for you.</em>
              </h2>
            </div>
            <div className="section-head-right">
              <p className="lede">
                Choose a 30-minute slot, tell us about your event, and we'll be ready to walk
                through booth options, pricing, and your date when we connect.
              </p>
            </div>
          </div>
          <BookingEmbed />
        </div>
      </section>

      {/* Visual divider between self-serve booking and form-based inquiry */}
      <div
        className="section"
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.24em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Or send a quick inquiry instead
          </span>
        </div>
      </div>

      <FinalCTA />
    </>
  );
}
