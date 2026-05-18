import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('https://www.photoboothrentalct.com/?cb=' + Date.now(), { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('.booth-card'));
  return {
    title: document.title,
    visibleH1: Array.from(document.querySelectorAll('h1')).filter(el => el.offsetParent !== null).map(el => el.innerText.trim()),
    boothCardsVisible: cards.filter(c => c.offsetParent !== null).length,
    boothCardsTotal: cards.length,
    revealLabelVisible: document.querySelector('.reveal-label-booths').offsetParent !== null,
    anchorStrip: {
      flexWrap: getComputedStyle(document.querySelector('.anchor-strip-list')).flexWrap,
      overflowX: getComputedStyle(document.querySelector('.anchor-strip-list')).overflowX,
    },
    scrollHeight: document.documentElement.scrollHeight,
    hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  };
});
console.log('=== Production www @375 mobile ===');
console.log('  title: ' + info.title);
console.log('  visible H1: ' + JSON.stringify(info.visibleH1));
console.log('  booth cards: ' + info.boothCardsVisible + ' visible / ' + info.boothCardsTotal + ' total');
console.log('  show-all label visible: ' + info.revealLabelVisible);
console.log('  anchor-strip overflowX/flexWrap: ' + info.anchorStrip.overflowX + ' / ' + info.anchorStrip.flexWrap);
console.log('  doc height: ' + info.scrollHeight + 'px');
console.log('  horizontal overflow: ' + info.hasHorizontalOverflow);

await page.screenshot({ path: '/tmp/shots-prod-after/home__375_fold.png', fullPage: false });

// Also 320 + 1440
for (const width of [320, 414, 1440]) {
  const c = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 768, hasTouch: width < 768, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto('https://www.photoboothrentalct.com/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.screenshot({ path: `/tmp/shots-prod-after/home__${width}_fold.png`, fullPage: false });
  await c.close();
}

await browser.close();
console.log('DONE');
