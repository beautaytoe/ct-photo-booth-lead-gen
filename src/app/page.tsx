import { Hero } from '@/components/Hero';
import { AnchorStrip } from '@/components/AnchorStrip';
import { EventSelector } from '@/components/EventSelector';
import { BoothCards } from '@/components/BoothCards';
import { MoreThanABooth } from '@/components/MoreThanABooth';
import { WhatsIncluded } from '@/components/WhatsIncluded';
import { WeddingBlock } from '@/components/WeddingBlock';
import { CorporateBlock } from '@/components/CorporateBlock';
import { FairfieldSection } from '@/components/FairfieldSection';
import { PopularCTRentals } from '@/components/PopularCTRentals';
import { ServiceMap } from '@/components/ServiceMap';
import { PackageCards } from '@/components/PackageCards';
import { WhyDifferent } from '@/components/WhyDifferent';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { FAQ_HOMEPAGE } from '@/lib/services-data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnchorStrip />
      <EventSelector />
      <BoothCards />
      <MoreThanABooth />
      <WhatsIncluded />
      <WeddingBlock />
      <CorporateBlock />
      <FairfieldSection />
      <PopularCTRentals />
      <ServiceMap />
      <PackageCards />
      <WhyDifferent />
      <FAQ items={FAQ_HOMEPAGE} eyebrow="12 — Frequently Asked" />
      <FinalCTA />
    </>
  );
}
