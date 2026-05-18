import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-data';
import { SERVICES } from '@/lib/services-data';
import { COUNTIES, TOWNS, isIndexable } from '@/lib/towns-data';
import { POSTS } from '@/lib/blog-data';

const BASE = SITE.domain;

function url(path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Core pages
  entries.push(url('/', 1.0, 'weekly'));
  entries.push(url('/photo-booth-rental-prices-ct/', 0.9, 'monthly'));
  entries.push(url('/service-areas/', 0.9, 'monthly'));
  entries.push(url('/check-availability/', 0.8, 'monthly'));
  entries.push(url('/about/', 0.6, 'monthly'));
  entries.push(url('/contact/', 0.6, 'monthly'));
  entries.push(url('/blog/', 0.7, 'weekly'));

  // Service pages
  for (const s of SERVICES) {
    entries.push(url(`/${s.slug}/`, s.slug === 'photo-booth-rental-ct' ? 0.95 : 0.85, 'monthly'));
  }

  // County hubs at root
  for (const c of COUNTIES) {
    entries.push(
      url(`/photo-booth-rental-${c.slug}-county-ct/`, c.slug === 'fairfield' ? 0.9 : 0.8, 'monthly')
    );
  }

  // Town pages — only indexable (Tier 1 + Tier 2)
  for (const t of TOWNS) {
    if (!isIndexable(t)) continue;
    entries.push(
      url(`/service-areas/${t.slug}/`, t.tier === 1 ? 0.8 : 0.65, 'monthly')
    );
  }

  // Blog
  for (const p of POSTS) {
    entries.push(url(`/blog/${p.slug}/`, 0.6, 'monthly'));
  }

  return entries;
}
