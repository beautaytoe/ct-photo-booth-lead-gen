import type { Metadata } from 'next';
import { InnerHero } from '@/components/Hero';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Check Availability',
  description:
    'Check CT photo booth rental availability for your wedding, corporate event, or private party. Fast replies during booking hours.',
  alternates: { canonical: '/check-availability/' },
};

export default function CheckAvailabilityPage() {
  return (
    <>
      <InnerHero
        eyebrow="Booking"
        title="Check availability for your CT photo booth."
        subtitle="Send your date, venue, and event type and we'll match the right booth to your event."
        crumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Check Availability', href: '/check-availability/' },
            ]}
          />
        }
      />
      <FinalCTA />
    </>
  );
}
