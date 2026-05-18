#!/usr/bin/env node
/**
 * Screenshot QA script.
 *
 * Captures the live site at the requested viewport widths and routes,
 * writes:
 *   - PNG full-page screenshot per (route, width)
 *   - PNG viewport-only (first fold) screenshot for above-the-fold inspection
 *   - A small JSON report with measurements: scrollWidth vs clientWidth (overflow),
 *     header height, sticky CTA height, document height, document title.
 *
 * Defaults to production. Pass --base=<URL> to override.
 *
 * Usage:
 *   node scripts/screenshots.mjs
 *   node scripts/screenshots.mjs --base=http://localhost:3000 --out=/tmp/shots-local
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || true];
  })
);

const BASE = args.base || 'https://www.photoboothrentalct.com';
const OUT = args.out || '/tmp/shots-prod';
const WIDTHS = (args.widths
  ? String(args.widths).split(',')
  : ['320', '360', '375', '390', '414', '768', '1440']
).map((n) => parseInt(n, 10));

const ROUTES = [
  '/',
  '/service-areas/',
  '/service-areas/greenwich-ct/',
  '/photo-booth-rental-ct/',
  '/360-photo-booth-rental-ct/',
  '/wedding-photo-booth-rental-ct/',
  '/corporate-photo-booth-rental-ct/',
  '/contact/',
];

const routeToSlug = (r) => (r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '_'));

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const report = { base: BASE, generatedAt: new Date().toISOString(), pages: [] };

  for (const width of WIDTHS) {
    const height = width <= 480 ? 740 : width <= 800 ? 1024 : 900;
    const isMobile = width <= 768;
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2,
      userAgent: isMobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      hasTouch: isMobile,
      isMobile,
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `${BASE}${route}?cb=${Date.now()}`;
      const slug = routeToSlug(route);
      const fullPath = path.join(OUT, `${slug}__${width}_full.png`);
      const foldPath = path.join(OUT, `${slug}__${width}_fold.png`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        // Let lazy stuff settle
        await page.waitForTimeout(400);

        const measurements = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const header = document.querySelector('.nav, header.nav');
          const sticky = document.querySelector('.mobile-cta');
          // Find every element wider than the viewport (overflow risk)
          const vw = window.innerWidth;
          const overflowing = [];
          document.querySelectorAll('*').forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width > vw + 1) {
              overflowing.push({
                tag: el.tagName.toLowerCase(),
                cls: el.className ? String(el.className).slice(0, 80) : '',
                w: Math.round(r.width),
                left: Math.round(r.left),
              });
            }
          });
          return {
            title: document.title,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            scrollHeight: doc.scrollHeight,
            bodyOverflowX: getComputedStyle(body).overflowX,
            headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
            stickyVisible: sticky ? getComputedStyle(sticky).display !== 'none' : false,
            stickyHeight: sticky ? Math.round(sticky.getBoundingClientRect().height) : 0,
            overflowing: overflowing.slice(0, 10),
            // Find h1 / first h2 to verify mobile vs desktop heading
            h1Visible: Array.from(document.querySelectorAll('h1'))
              .filter((el) => el.offsetParent !== null)
              .map((el) => (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120))
              .slice(0, 3),
          };
        });

        await page.screenshot({ path: fullPath, fullPage: true });
        await page.screenshot({ path: foldPath, fullPage: false });

        report.pages.push({
          route,
          width,
          measurements,
          fullPath,
          foldPath,
          ok: true,
        });
        process.stdout.write(`  ${width.toString().padStart(4)}px ${route.padEnd(40)} ok\n`);
      } catch (err) {
        report.pages.push({
          route,
          width,
          error: err.message,
          ok: false,
        });
        process.stdout.write(`  ${width.toString().padStart(4)}px ${route.padEnd(40)} ERR: ${err.message}\n`);
      }
    }

    await context.close();
  }

  await browser.close();
  await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`\nReport: ${path.join(OUT, 'report.json')}`);
  console.log(`Screenshots: ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
