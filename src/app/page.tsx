import { Hero } from '@/components/Hero';
import { EventSelector } from '@/components/EventSelector';
import { BoothCards } from '@/components/BoothCards';
import { FairfieldSection } from '@/components/FairfieldSection';
import { PackageCards } from '@/components/PackageCards';
import { CorporateBlock } from '@/components/CorporateBlock';
import { WeddingBlock } from '@/components/WeddingBlock';
import { ServiceMap } from '@/components/ServiceMap';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { FAQ_GENERAL } from '@/lib/services-data';

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventSelector />
      <BoothCards />
      <FairfieldSection />
      <PackageCards />
      <CorporateBlock />
      <WeddingBlock />
      <ServiceMap />
      <FAQ items={FAQ_GENERAL} />
      <FinalCTA />
    </>
  );
}
