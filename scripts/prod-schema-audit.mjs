import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const ROUTES = [
  '/service-areas/greenwich-ct/',
  '/service-areas/stamford-ct/',
  '/service-areas/kent-ct/',
  '/photo-booth-rental-fairfield-county-ct/',
  '/360-photo-booth-rental-ct/',
];
const BASE = 'https://www.photoboothrentalct.com';

const summary = [];
for (const r of ROUTES) {
  await page.goto(BASE + r + '?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const info = await page.evaluate(() => {
    const venueLinks = Array.from(document.querySelectorAll('a[rel*="noopener"]')).filter(a => !a.href.includes('fonts.googleapis') && !a.href.includes('fonts.gstatic'));
    const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const schemas = ld.map(s => { try { return JSON.parse(s.textContent || ''); } catch { return null; } }).filter(Boolean);
    const svc = schemas.find(s => s['@type'] === 'Service');
    return {
      venueLinks: venueLinks.length,
      areaServedType: svc?.areaServed?.['@type'],
      areaServedName: svc?.areaServed?.name,
      areaContained: svc?.areaServed?.containedInPlace?.name,
      areaContainedType: svc?.areaServed?.containedInPlace?.['@type'],
      areaContained2: svc?.areaServed?.containedInPlace?.containedInPlace?.name,
      hasOfferCatalogCount: svc?.hasOfferCatalog?.itemListElement?.length,
      offerLowPrice: svc?.offers?.lowPrice,
      schemaTypes: schemas.map(s => s['@type']).join(','),
    };
  });
  summary.push({ route: r, ...info });
}

console.log('=== Production schema + outbound links ===');
console.table(summary);

await browser.close();
