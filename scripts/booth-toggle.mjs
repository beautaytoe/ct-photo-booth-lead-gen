import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await page.waitForTimeout(600);

// Scroll to the booth grid and screenshot in collapsed state
await page.evaluate(() => {
  const grid = document.querySelector('.booth-grid');
  if (grid) grid.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shots-local/home__375_booth-collapsed.png', fullPage: false });

// Click the show-all label
await page.click('label.reveal-label-booths');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shots-local/home__375_booth-expanded.png', fullPage: false });

// Now scroll to addons section
await page.evaluate(() => {
  const addons = document.querySelector('#addons');
  if (addons) addons.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/shots-local/home__375_addons-collapsed.png', fullPage: false });

await browser.close();
console.log('DONE');
