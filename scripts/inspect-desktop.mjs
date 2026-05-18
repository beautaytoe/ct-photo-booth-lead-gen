import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const info = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('.booth-card'));
  return {
    boothCardsVisible: cards.filter(c => c.offsetParent !== null).length,
    boothCardsTotal: cards.length,
    revealLabelDisplay: getComputedStyle(document.querySelector('.reveal-label-booths')).display,
    heroStageDisplay: getComputedStyle(document.querySelector('.hero-stage')).display,
    mobileH1Display: getComputedStyle(document.querySelector('.hero-headline-mobile')).display,
    desktopH1Display: getComputedStyle(document.querySelector('.hero-headline')).display,
  };
});
console.log('=== Desktop 1440 ===');
console.log('  Booth cards: ' + info.boothCardsVisible + ' visible / ' + info.boothCardsTotal + ' total');
console.log('  Show-all label display: ' + info.revealLabelDisplay);
console.log('  Hero stage display: ' + info.heroStageDisplay);
console.log('  Mobile H1 display: ' + info.mobileH1Display);
console.log('  Desktop H1 display: ' + info.desktopH1Display);

await browser.close();
