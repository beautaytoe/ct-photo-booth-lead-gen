import { chromium } from 'playwright';

const browser = await chromium.launch();

// Desktop — click Wedding pill, see if Glam card highlights
const ctxDesk = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const pageDesk = await ctxDesk.newPage();
await pageDesk.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await pageDesk.waitForTimeout(800);
// Click Wedding pill
await pageDesk.click('button.hero-event-pill:has-text("Wedding")');
await pageDesk.waitForTimeout(500);
await pageDesk.screenshot({ path: '/tmp/shots-local4/home__1440_pill-wedding.png', fullPage: false });

// Click Sweet 16 — should highlight the 360 card
await pageDesk.click('button.hero-event-pill:has-text("Sweet 16")');
await pageDesk.waitForTimeout(500);
await pageDesk.screenshot({ path: '/tmp/shots-local4/home__1440_pill-sweet16.png', fullPage: false });

// Hover the primary CTA — capture shine sweep
await pageDesk.hover('a.hero-primary-cta');
await pageDesk.waitForTimeout(350);
await pageDesk.screenshot({ path: '/tmp/shots-local4/home__1440_cta-hover.png', fullPage: false });

await ctxDesk.close();

// Mobile — click Corporate pill
const ctxMob = await browser.newContext({ viewport: { width: 375, height: 900 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const pageMob = await ctxMob.newPage();
await pageMob.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await pageMob.waitForTimeout(800);
await pageMob.click('button.hero-event-pill:has-text("Corporate")');
await pageMob.waitForTimeout(500);
await pageMob.screenshot({ path: '/tmp/shots-local4/home__375_pill-corporate.png', fullPage: false });

await ctxMob.close();
await browser.close();
console.log('DONE');
