import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Check Availability | Gold Coast Photo Booth Co.',
  description:
    'Check CT photo booth rental availability for your wedding, corporate event, or private party. Fast replies during booking hours.',
  alternates: { canonical: '/check-availability/' },
};

export default function CheckAvailabilityPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Check Availability', href: '/check-availability/' },
            ]}
          />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
