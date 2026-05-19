import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const ROUTES = [
  '/service-areas/greenwich-ct/',
  '/service-areas/stamford-ct/',
  '/service-areas/kent-ct/',
  '/service-areas/bristol-ct/',
  '/photo-booth-rental-fairfield-county-ct/',
  '/360-photo-booth-rental-ct/',
];

for (const r of ROUTES) {
  await page.goto('http://localhost:3000' + r + '?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const info = await page.evaluate(() => {
    const venueLinks = Array.from(document.querySelectorAll('a[rel*="noopener"]')).filter(a => !a.href.includes('fonts.googleapis') && !a.href.includes('fonts.gstatic'));
    const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const schemas = ld.map(s => { try { return JSON.parse(s.textContent || ''); } catch { return null; } }).filter(Boolean);
    const svc = schemas.find(s => s['@type'] === 'Service');
    return {
      venueLinks: venueLinks.length,
      venueSample: venueLinks.slice(0, 3).map(a => ({ href: a.href, text: a.textContent?.replace(/\s+/g, ' ').trim().slice(0, 50) })),
      schemaTypes: schemas.map(s => s['@type']),
      svc,
    };
  });
  console.log('\n===', r, '===');
  console.log('  venue outbound links:', info.venueLinks);
  if (info.venueSample.length) info.venueSample.forEach(v => console.log('    →', v.href.slice(0, 60), '"' + (v.text || '').slice(0, 40) + '"'));
  console.log('  schema types:', info.schemaTypes.join(', '));
  if (info.svc) {
    console.log('  Service.areaServed:', JSON.stringify(info.svc.areaServed, null, 2).split('\n').map((l, i) => i === 0 ? l : '    ' + l).join('\n'));
    console.log('  Service.offers:', JSON.stringify(info.svc.offers));
    console.log('  hasOfferCatalog itemListElement count:', info.svc.hasOfferCatalog?.itemListElement?.length || 0);
  }
}

await browser.close();
