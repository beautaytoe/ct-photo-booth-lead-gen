/**
 * Conservative JSON-LD schema helpers.
 *
 * IMPORTANT:
 *  - We DO NOT emit LocalBusiness (no verified physical address yet).
 *  - We DO NOT emit Review / AggregateRating (no real reviews yet).
 *  - We DO emit Organization, WebSite, Service, and FAQPage where appropriate.
 *  - When a verified address and reviews are added, this file is where to wire them.
 */

import { SITE } from './site-data';

export function organizationSchema() {
  const out: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.brand,
    alternateName: SITE.seoDescriptor,
    url: SITE.domain,
    areaServed: { '@type': 'State', name: 'Connecticut' },
    knowsAbout: [
      'Photo Booth Rental',
      '360 Photo Booth',
      'Wedding Photo Booth',
      'Corporate Photo Booth',
      'Audio Guestbook',
      'Mirror Photo Booth',
      'Glam Photo Booth',
      'Roaming Photo Booth',
    ],
  };
  if (SITE.showEmailPublicly && SITE._placeholderEmail) out.email = SITE._placeholderEmail;
  if (SITE.showPhonePublicly && SITE._placeholderPhone) out.telephone = SITE._placeholderPhone;
  return out;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    alternateName: SITE.seoDescriptor,
    url: SITE.domain,
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'Organization',
      name: SITE.brand,
      url: SITE.domain,
    },
    areaServed: {
      '@type': opts.areaServed && opts.areaServed !== 'Connecticut' ? 'City' : 'State',
      name: opts.areaServed ?? 'Connecticut',
    },
    serviceType: 'Photo Booth Rental',
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      item: i.url,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: {
      '@type': 'Organization',
      name: SITE.brand,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.brand,
    },
  };
}
