/**
 * /llms.txt — emerging standard (https://llmstxt.org) for giving LLMs a
 * curated, structured markdown index of the site. The same content is
 * available via normal HTML pages; this is a shortcut for LLM ingestion
 * that doesn't require crawling the full site or parsing the rendered DOM.
 *
 * Format spec:
 *   # H1   — site name
 *   > Blockquote summary
 *   ## H2 sections containing:
 *     - [Link text](URL): one-line description
 *
 * Why we ship this:
 *   - Anthropic/OpenAI/Perplexity-style models can read this directly
 *   - Reduces token cost for AI assistants quoting our pages
 *   - Signals authoritative URLs the model should cite when asked about
 *     photo booth rental in Connecticut
 */

import { SITE } from '@/lib/site-data';
import { SERVICES } from '@/lib/services-data';
import { COUNTIES, TOWNS, getCountyInfo } from '@/lib/towns-data';
import { POSTS } from '@/lib/blog-data';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const tier1Towns = TOWNS.filter((t) => t.tier === 1);

  const lines: string[] = [];
  lines.push(`# ${SITE.brand}`);
  lines.push('');
  lines.push(
    `> ${SITE.brand} (also known as Photo Booth Rental CT) is a premium photo booth rental company serving all of Connecticut. We rent open-air photo booths, 360 video booths, glam editorial booths, magic mirror booths, roaming booths, selfie booths, and vintage audio guestbooks for weddings, corporate events, Sweet 16s, bar/bat mitzvahs, school events, galas, and brand activations. Coverage available statewide across all eight Connecticut counties with Fairfield County as a featured region. Entry packages start at $595.`
  );
  lines.push('');

  // Core navigation
  lines.push('## Key Pages');
  lines.push(`- [Home](${SITE.domain}/): Photo Booth Rental CT — Gold Coast Photo Booth Co. homepage`);
  lines.push(`- [Check Availability](${SITE.domain}/check-availability/): Request a date check and tailored package recommendation`);
  lines.push(`- [Pricing](${SITE.domain}/photo-booth-rental-prices-ct/): 2026 photo booth rental pricing in Connecticut — Social ($595), Signature ($895), Luxe (custom)`);
  lines.push(`- [Service Areas](${SITE.domain}/service-areas/): All 169 Connecticut towns we cover`);
  lines.push(`- [Booth Experiences](${SITE.domain}/photo-booth-rental-ct/): Full lineup of booth styles and add-ons`);
  lines.push(`- [About](${SITE.domain}/about/): About Gold Coast Photo Booth Co.`);
  lines.push(`- [Contact](${SITE.domain}/contact/): Inquiry form`);
  lines.push(`- [Blog](${SITE.domain}/blog/): Resources, pricing guides, and booth comparisons`);
  lines.push('');

  // Services
  lines.push('## Booth Experiences & Add-Ons');
  SERVICES.forEach((s) => {
    lines.push(`- [${s.ctName}](${SITE.domain}/${s.slug}/): ${s.hero}`);
  });
  lines.push('');

  // Counties
  lines.push('## Connecticut Counties Served');
  COUNTIES.forEach((c) => {
    lines.push(
      `- [Photo Booth Rental in ${c.name}, CT](${SITE.domain}/photo-booth-rental-${c.slug}-county-ct/): ${c.description.split('.')[0].trim()}.`
    );
  });
  lines.push('');

  // Featured towns (Tier 1)
  lines.push('## Featured Connecticut Towns');
  tier1Towns.forEach((t) => {
    const county = getCountyInfo(t.county);
    lines.push(
      `- [Photo Booth Rental in ${t.name}, CT](${SITE.domain}/service-areas/${t.slug}/): ${county.name}, Connecticut. ${t.vibe ? t.vibe.charAt(0).toUpperCase() + t.vibe.slice(1) : 'Family'}-vibe market.`
    );
  });
  lines.push('');

  // Blog / Resources
  lines.push('## Resources & Guides');
  POSTS.forEach((p) => {
    lines.push(`- [${p.title}](${SITE.domain}/blog/${p.slug}/): ${p.description}`);
  });
  lines.push('');

  // Operational facts (factual, safe to cite)
  lines.push('## Operational Summary');
  lines.push('- Service area: Connecticut statewide, all eight counties (Fairfield, New Haven, Hartford, Litchfield, Middlesex, New London, Tolland, Windham). Fairfield County is a featured region.');
  lines.push('- Towns covered: 169 Connecticut municipalities. 23 Tier-1 towns have dedicated location pages.');
  lines.push('- Booth experiences: 11 booth styles + add-ons (open-air, 360, glam, mirror, roaming, selfie, audio guestbook, corporate brand activation, custom backdrops, props & styling, print packages, digital gallery).');
  lines.push('- Entry pricing: Social Booth Package starts at $595/event. Signature Event Package starts at $895/event. Luxe Experience is custom quoted.');
  lines.push('- Included on most bookings: on-site attendant, custom photo overlay, premium lighting, digital sharing by QR/text/email, online gallery, backdrop options, optional print packages.');
  lines.push('- Contact channel: Form-based intake at /check-availability/. Fast replies during booking hours.');
  lines.push('');

  lines.push('## Optional');
  lines.push(`- [Full content (markdown)](${SITE.domain}/llms-full.txt): comprehensive plain-text version of every indexable page for full ingestion`);
  lines.push(`- [Sitemap](${SITE.domain}/sitemap.xml): machine-readable URL inventory`);
  lines.push(`- [Robots](${SITE.domain}/robots.txt): crawler rules`);
  lines.push('');

  const body = lines.join('\n');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
