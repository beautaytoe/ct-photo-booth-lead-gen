import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto('https://www.photoboothrentalct.com/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await p.waitForTimeout(2200);
const info = await p.evaluate(() => {
  const stage = document.querySelector('.hero-stage');
  const sr = stage?.getBoundingClientRect();
  const cards = Array.from(document.querySelectorAll('.float-card'));
  return {
    stage: sr && { w: Math.round(sr.width), h: Math.round(sr.height) },
    cards: cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { name: c.querySelector('.fc-name')?.textContent?.trim(), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    }),
    auroraExists: !!document.querySelector('.hero-aurora'),
    grainExists: !!document.querySelector('.hero-grain'),
  };
});
console.log('Production www, 1440px:');
console.log('  Stage:', info.stage);
console.log('  Aurora layer present:', info.auroraExists);
console.log('  Grain layer present:', info.grainExists);
console.log('  Cards:');
info.cards.forEach(c => console.log('    ' + (c.name||'').padEnd(20) + ' x=' + c.x + ' y=' + c.y + ' (' + c.w + '×' + c.h + ')'));
await p.screenshot({ path: '/tmp/shots-cards/prod_hero_1440.png', fullPage: false });
await browser.close();
