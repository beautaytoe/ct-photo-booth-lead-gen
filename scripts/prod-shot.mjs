import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('https://www.photoboothrentalct.com/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
await p.screenshot({ path: '/tmp/shots-hero-img/prod_desktop_1440.png', fullPage: false });
await browser.close();
console.log('DONE');
