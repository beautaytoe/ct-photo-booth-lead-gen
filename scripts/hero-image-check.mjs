import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, label] of [[1440, 'desktop'], [768, 'tablet'], [375, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 768, hasTouch: w < 768, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `/tmp/shots-hero-img/home_${label}_${w}.png`, fullPage: false });
  await ctx.close();
  console.log(label + ' ' + w + 'px captured');
}
await browser.close();
