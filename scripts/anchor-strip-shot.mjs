import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
// Scroll to anchor strip
await page.evaluate(() => {
  const a = document.querySelector('.anchor-strip');
  if (a) window.scrollTo({ top: a.getBoundingClientRect().top + window.scrollY - 80 });
});
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/shots-local2/home__320_anchor.png', fullPage: false });

// 414 anchor
const ctx2 = await browser.newContext({ viewport: { width: 414, height: 700 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await p2.waitForTimeout(500);
await p2.evaluate(() => {
  const a = document.querySelector('.anchor-strip');
  if (a) window.scrollTo({ top: a.getBoundingClientRect().top + window.scrollY - 80 });
});
await p2.waitForTimeout(300);
await p2.screenshot({ path: '/tmp/shots-local2/home__414_anchor.png', fullPage: false });

await browser.close();
console.log('DONE');
