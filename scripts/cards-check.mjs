import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);

// Inspect BEFORE any interaction
const info = await p.evaluate(() => {
  const stage = document.querySelector('.hero-stage');
  const stageRect = stage?.getBoundingClientRect();
  const cards = Array.from(document.querySelectorAll('.float-card'));
  return {
    stage: stageRect && { x: Math.round(stageRect.x), y: Math.round(stageRect.y), w: Math.round(stageRect.width), h: Math.round(stageRect.height) },
    cards: cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { name: c.querySelector('.fc-name')?.textContent, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    }),
  };
});
console.log('=== Stage ===');
console.log('  ', info.stage);
console.log('=== Cards ===');
info.cards.forEach(c => console.log('  ' + (c.name || '').padEnd(20) + ' x=' + c.x + ' y=' + c.y + ' w=' + c.w + ' h=' + c.h));

await p.screenshot({ path: '/tmp/shots-cards/hero_v2_1440.png', fullPage: false });
await browser.close();
