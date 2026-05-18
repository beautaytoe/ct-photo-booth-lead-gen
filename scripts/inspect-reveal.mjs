import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto('http://localhost:3000/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await page.waitForTimeout(600);

const info = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('.booth-card'));
  const addonItems = Array.from(document.querySelectorAll('.addons-grid > li'));
  return {
    boothCards: cards.map(c => ({
      classes: c.className,
      display: getComputedStyle(c).display,
      visible: c.offsetParent !== null,
      rect: { w: Math.round(c.offsetWidth), h: Math.round(c.offsetHeight) },
    })),
    addonItems: addonItems.map(c => ({
      classes: c.className,
      display: getComputedStyle(c).display,
      visible: c.offsetParent !== null,
    })),
    revealLabelBooths: document.querySelector('.reveal-label-booths') ? {
      display: getComputedStyle(document.querySelector('.reveal-label-booths')).display,
    } : null,
  };
});

console.log('=== Booth cards ===');
info.boothCards.forEach((c, i) => {
  console.log('  [' + i + '] visible=' + c.visible + ' display=' + c.display + '  classes=' + c.classes);
});
console.log('=== Addon items ===');
info.addonItems.forEach((c, i) => {
  console.log('  [' + i + '] visible=' + c.visible + ' display=' + c.display + '  classes=' + c.classes);
});
console.log('=== Show-all booths label display ===');
console.log('  ', info.revealLabelBooths);

await browser.close();
