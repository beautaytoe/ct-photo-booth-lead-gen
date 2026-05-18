import { chromium } from 'playwright';
const browser = await chromium.launch();

for (const [w, label] of [[1440, 'desktop'], [375, 'mobile']]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    isMobile: w < 768,
    hasTouch: w < 768,
  });
  const p = await ctx.newPage();
  await p.goto('https://www.photoboothrentalct.com/?cb=' + Date.now(), { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const info = await p.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1'));
    return h1s.map((h) => ({
      visible: h.offsetParent !== null,
      text: (h.innerText || h.textContent || '').replace(/\s+/g, ' ').trim(),
    }));
  });
  console.log(label + ' (' + w + 'px):');
  info.forEach((h) => console.log('  visible=' + h.visible + ' text="' + h.text + '"'));
  await ctx.close();
}

await browser.close();
