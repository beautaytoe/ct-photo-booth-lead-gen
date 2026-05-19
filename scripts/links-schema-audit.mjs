import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const ROUTES = [
  '/',
  '/service-areas/greenwich-ct/',
  '/service-areas/stamford-ct/',
  '/service-areas/kent-ct/',
  '/service-areas/bristol-ct/',
  '/photo-booth-rental-fairfield-county-ct/',
  '/360-photo-booth-rental-ct/',
];

const BASE = 'https://www.photoboothrentalct.com';

for (const route of ROUTES) {
  console.log('\n==========================================');
  console.log('ROUTE:', route);
  console.log('==========================================');
  await page.goto(BASE + route + '?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  const info = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const internal = anchors.filter(a => a.href.startsWith(location.origin) && !a.href.includes('#'));
    const internalUnique = [...new Set(internal.map(a => a.href.replace(location.origin, '')))];
    const external = anchors.filter(a => !a.href.startsWith(location.origin) && !a.href.startsWith('#') && !a.href.startsWith('mailto:') && !a.href.startsWith('tel:'));
    const externalUrls = external.map(a => ({ href: a.href, text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60) }));
    const ldScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const schemas = ldScripts.map(s => {
      try { return JSON.parse(s.textContent || ''); } catch { return null; }
    }).filter(Boolean);
    return {
      internalCount: internal.length,
      internalUniqueCount: internalUnique.length,
      internalSample: internalUnique.slice(0, 30),
      externalCount: external.length,
      external: externalUrls,
      schemaTypes: schemas.map(s => s['@type']),
      schemas,
    };
  });
  console.log('Internal links: ' + info.internalCount + ' total, ' + info.internalUniqueCount + ' unique');
  console.log('External links: ' + info.externalCount);
  if (info.external.length > 0) {
    info.external.forEach(e => console.log('  → ' + e.href + ' "' + e.text + '"'));
  } else {
    console.log('  (none)');
  }
  console.log('Schema types: ' + JSON.stringify(info.schemaTypes));
  // Print Service schema in detail if present
  const svc = info.schemas.find(s => s['@type'] === 'Service');
  if (svc) {
    console.log('Service schema:');
    console.log(JSON.stringify(svc, null, 2));
  }
}

await browser.close();
