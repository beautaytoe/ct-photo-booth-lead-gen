#!/usr/bin/env node
/**
 * Heading audit harness.
 *
 * Visits each unique page-type route and emits every H1/H2/H3 in document
 * order (with visibility, text, id, section context) so we can review heading
 * hierarchy and semantic correctness across templates.
 *
 * Flags surfaced per page:
 *   - Multiple visible H1s
 *   - Missing H1 (zero visible H1s)
 *   - Skipped levels (e.g. H1 -> H3 with no intervening H2)
 *   - Empty heading text
 *   - Trailing/leading whitespace artifacts
 *
 * Outputs:
 *   - <out>/heading-audit.json   machine-readable, full data
 *   - <out>/heading-audit.md     human-readable, one table per route + summary
 *
 * Defaults to production. Override with --base.
 *
 * Usage:
 *   node scripts/heading-audit.mjs
 *   node scripts/heading-audit.mjs --base=http://localhost:3000 --out=/tmp/heading-audit-local
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || true];
  })
);

const BASE = args.base || 'https://www.photoboothrentalct.com';
const OUT = args.out || '/tmp/heading-audit';

/**
 * Routes chosen to cover every unique template:
 *   home, service-areas index, town (T1/T2/T3), service (3 variants), county hub,
 *   pricing, blog index, blog post, about, contact, check-availability, privacy.
 */
const ROUTES = [
  ['/', 'home'],
  ['/service-areas/', 'service-areas-index'],
  ['/service-areas/greenwich-ct/', 'town-tier1'],
  ['/service-areas/bethel-ct/', 'town-tier2'],
  ['/service-areas/sherman-ct/', 'town-tier3'],
  ['/photo-booth-rental-ct/', 'service-main'],
  ['/360-photo-booth-rental-ct/', 'service-specialty'],
  ['/wedding-photo-booth-rental-ct/', 'service-vertical'],
  ['/photo-booth-rental-fairfield-county-ct/', 'county-hub'],
  ['/photo-booth-rental-prices-ct/', 'pricing'],
  ['/blog/', 'blog-index'],
  ['/blog/how-much-does-photo-booth-rental-cost-in-ct/', 'blog-post'],
  ['/about/', 'about'],
  ['/contact/', 'contact'],
  ['/check-availability/', 'check-availability'],
  ['/privacy/', 'privacy'],
];

const VIEWPORT_DESKTOP = { width: 1440, height: 900 };
const VIEWPORT_MOBILE = { width: 390, height: 844 };

/**
 * Collect headings via in-page DOM walk. Returns:
 *   { title, headings: [{ tag, text, level, visible, id, classes, ancestor }] }
 * Document order is preserved (querySelectorAll returns tree order).
 */
async function collectHeadings(page) {
  return await page.evaluate(() => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const isVisible = (el) => {
      if (!el || !el.isConnected) return false;
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return false;
      if (r.width === 0 && r.height === 0) return false;
      return el.offsetParent !== null;
    };
    const ancestorContext = (el) => {
      // Walk up to the nearest <section>/<article>/<aside>/<main>/<header>/<footer>
      // or any element with an `id` or `data-section`, whichever is closer.
      let n = el.parentElement;
      while (n && n !== document.body) {
        const tag = n.tagName.toLowerCase();
        if (n.id) return `#${n.id}`;
        if (n.dataset && n.dataset.section) return `[data-section=${n.dataset.section}]`;
        if (['section', 'article', 'aside', 'main', 'header', 'footer', 'nav'].includes(tag)) {
          const cls = String(n.className || '').split(/\s+/).filter(Boolean).slice(0, 2).join('.');
          return cls ? `${tag}.${cls}` : tag;
        }
        n = n.parentElement;
      }
      return 'body';
    };
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((el) => ({
      tag: el.tagName.toLowerCase(),
      level: parseInt(el.tagName.substring(1), 10),
      text: norm(el.innerText),
      rawText: norm(el.textContent),
      visible: isVisible(el),
      id: el.id || null,
      classes: el.className ? String(el.className).slice(0, 100) : '',
      ancestor: ancestorContext(el),
    }));
    return {
      title: document.title,
      url: location.pathname,
      headings,
    };
  });
}

/**
 * Compute flags per page from collected headings.
 */
function flagHeadings(data) {
  const flags = [];
  const visibleH = data.headings.filter((h) => h.visible);
  const h1s = visibleH.filter((h) => h.level === 1);
  if (h1s.length === 0) flags.push('MISSING_H1');
  if (h1s.length > 1) flags.push(`MULTIPLE_VISIBLE_H1 (${h1s.length})`);

  // Empty headings
  data.headings.forEach((h, i) => {
    if (!h.text) flags.push(`EMPTY_HEADING idx=${i} ${h.tag}`);
  });

  // Skipped levels: walk visibles; if jump > 1 from previous max, flag
  let prevLevel = 0;
  for (const h of visibleH) {
    if (h.level > prevLevel + 1 && prevLevel > 0) {
      flags.push(`SKIPPED_LEVEL ${prevLevel} -> ${h.level} at "${h.text.slice(0, 60)}"`);
    }
    if (h.level > prevLevel) prevLevel = h.level;
  }

  // Duplicate text within same level
  const seen = new Map();
  for (const h of visibleH) {
    const key = `${h.level}::${h.text.toLowerCase()}`;
    if (h.text && seen.has(key)) {
      flags.push(`DUPLICATE ${h.tag.toUpperCase()} "${h.text.slice(0, 60)}"`);
    } else if (h.text) {
      seen.set(key, true);
    }
  }

  return flags;
}

async function visit(page, route, slug) {
  const url = `${BASE}${route}?cb=${Date.now()}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(300);
    const data = await collectHeadings(page);
    const flags = flagHeadings(data);
    return { route, slug, url, ...data, flags, ok: true };
  } catch (err) {
    return { route, slug, url, error: err.message, ok: false };
  }
}

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderMarkdown(report) {
  const lines = [];
  lines.push(`# Heading Audit — ${report.base}`);
  lines.push(``);
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Routes: ${report.pages.length} (desktop viewport ${report.viewport.width}×${report.viewport.height})`);
  lines.push(``);

  // Top-level summary table
  lines.push(`## Summary`);
  lines.push(``);
  lines.push(`| Slug | Route | H1 (vis) | H2 (vis) | H3 (vis) | Flags |`);
  lines.push(`|---|---|---|---|---|---|`);
  for (const p of report.pages) {
    if (!p.ok) {
      lines.push(`| ${p.slug} | ${p.route} | — | — | — | ERROR: ${mdEscape(p.error)} |`);
      continue;
    }
    const vis = p.headings.filter((h) => h.visible);
    const c = (lvl) => `${p.headings.filter((h) => h.level === lvl).length} (${vis.filter((h) => h.level === lvl).length})`;
    const flagSummary = p.flags.length === 0 ? '✅ none' : `⚠️ ${p.flags.length}`;
    lines.push(`| ${p.slug} | ${p.route} | ${c(1)} | ${c(2)} | ${c(3)} | ${flagSummary} |`);
  }
  lines.push(``);

  // Per-page details
  lines.push(`## Per-page heading dumps`);
  lines.push(``);
  for (const p of report.pages) {
    lines.push(`### ${p.slug} — \`${p.route}\``);
    lines.push(``);
    if (!p.ok) {
      lines.push(`**ERROR:** ${p.error}`);
      lines.push(``);
      continue;
    }
    lines.push(`**Title:** ${mdEscape(p.title)}`);
    lines.push(``);
    if (p.flags.length === 0) {
      lines.push(`**Flags:** ✅ none`);
    } else {
      lines.push(`**Flags:**`);
      for (const f of p.flags) lines.push(`- ⚠️ ${f}`);
    }
    lines.push(``);
    lines.push(`| # | Tag | Text | Visible | Context | ID |`);
    lines.push(`|---|---|---|---|---|---|`);
    p.headings.forEach((h, i) => {
      lines.push(
        `| ${i + 1} | ${h.tag.toUpperCase()} | ${mdEscape(h.text || '(empty)')} | ${h.visible ? '✓' : '✗'} | \`${mdEscape(h.ancestor)}\` | ${h.id ? '`#' + h.id + '`' : '—'} |`
      );
    });
    lines.push(``);
  }
  return lines.join('\n');
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT_DESKTOP,
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  const report = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    viewport: VIEWPORT_DESKTOP,
    pages: [],
  };

  for (const [route, slug] of ROUTES) {
    const result = await visit(page, route, slug);
    report.pages.push(result);
    if (result.ok) {
      const flagN = result.flags.length;
      process.stdout.write(`  ${slug.padEnd(22)} ${route.padEnd(56)} ${flagN === 0 ? '✓' : '⚠ ' + flagN}\n`);
    } else {
      process.stdout.write(`  ${slug.padEnd(22)} ${route.padEnd(56)} ERR ${result.error}\n`);
    }
  }

  // Also check mobile viewport H1 visibility for each route — Hero hides desktop H1 on mobile.
  process.stdout.write(`\nMobile viewport (390×844) H1 visibility cross-check:\n`);
  await context.close();
  const mctx = await browser.newContext({
    viewport: VIEWPORT_MOBILE,
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    hasTouch: true,
    isMobile: true,
  });
  const mpage = await mctx.newPage();
  const mobileH1 = [];
  for (const [route, slug] of ROUTES) {
    const url = `${BASE}${route}?cb=${Date.now()}`;
    try {
      await mpage.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await mpage.waitForTimeout(300);
      const m = await mpage.evaluate(() => {
        const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
        const isVisible = (el) => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false;
          if (r.width === 0 && r.height === 0) return false;
          return el.offsetParent !== null;
        };
        return Array.from(document.querySelectorAll('h1')).map((el) => ({
          text: norm(el.innerText),
          visible: isVisible(el),
        }));
      });
      mobileH1.push({ route, slug, h1: m });
      const vis = m.filter((h) => h.visible);
      process.stdout.write(
        `  ${slug.padEnd(22)} ${route.padEnd(56)} ${vis.length}/${m.length} visible${
          vis.length === 0 ? ' ⚠ NO_VISIBLE_H1_MOBILE' : ''
        }\n`
      );
    } catch (err) {
      mobileH1.push({ route, slug, error: err.message });
      process.stdout.write(`  ${slug.padEnd(22)} ${route.padEnd(56)} ERR ${err.message}\n`);
    }
  }
  await mctx.close();
  await browser.close();
  report.mobileH1 = mobileH1;

  const jsonPath = path.join(OUT, 'heading-audit.json');
  const mdPath = path.join(OUT, 'heading-audit.md');
  await writeFile(jsonPath, JSON.stringify(report, null, 2));
  await writeFile(mdPath, renderMarkdown(report));

  // Aggregate counts for stdout
  const totalFlags = report.pages.reduce((acc, p) => acc + (p.flags ? p.flags.length : 0), 0);
  const errs = report.pages.filter((p) => !p.ok).length;
  console.log(`\nReport: ${mdPath}`);
  console.log(`JSON:   ${jsonPath}`);
  console.log(`Pages:  ${report.pages.length} (errors: ${errs})`);
  console.log(`Flags:  ${totalFlags}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
