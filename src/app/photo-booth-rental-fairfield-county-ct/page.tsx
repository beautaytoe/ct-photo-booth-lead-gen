import type { Metadata } from 'next';
import { CountyHubPage, buildCountyMetadata } from '@/components/CountyHubPage';

const COUNTY = 'fairfield' as const;
const PATH = '/photo-booth-rental-fairfield-county-ct';

export const metadata: Metadata = buildCountyMetadata(COUNTY, PATH);

export default function Page() {
  return <CountyHubPage county={COUNTY} pathPrefix={PATH} />;
}
