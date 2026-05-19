import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.screenshot({ path: '/tmp/shots-cards/hero_1440_tall.png', fullPage: false });

// Hover on Wedding pill to see highlighted card
await p.click('button.hero-event-pill:has-text("Wedding")');
await p.waitForTimeout(700);
await p.screenshot({ path: '/tmp/shots-cards/hero_1440_wedding-active.png', fullPage: false });

// Card overlap inspection
const info = await p.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('.float-card'));
  return cards.map((c) => {
    const r = c.getBoundingClientRect();
    return { name: c.querySelector('.fc-name')?.textContent, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  });
});
console.log('=== Card bounding boxes ===');
info.forEach(c => console.log('  ' + c.name?.padEnd(20) + ' x=' + c.x + ' y=' + c.y + ' w=' + c.w + ' h=' + c.h));

await browser.close();
