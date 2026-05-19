/**
 * Conservative JSON-LD schema helpers.
 *
 * IMPORTANT:
 *  - We DO NOT emit LocalBusiness (no verified physical address yet).
 *  - We DO NOT emit Review / AggregateRating (no real reviews yet).
 *  - We DO emit Organization, WebSite, Service, FAQPage, and BreadcrumbList.
 *  - For service-area businesses without a postal address, Google
 *    recommends Service schema with areaServed pointing at the geographic
 *    area being served. We follow that pattern.
 */

import { SITE } from './site-data';
import { SERVICES } from './services-data';

const ORG_REF = {
  '@type': 'Organization' as const,
  name: SITE.brand,
  alternateName: SITE.seoDescriptor,
  url: SITE.domain,
};

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
  if (SITE.showPhonePublicly && SITE.phone?.e164) out.telephone = SITE.phone.e164;
  return out;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    alternateName: SITE.seoDescriptor,
    url: SITE.domain,
    inLanguage: 'en-US',
    publisher: ORG_REF,
    /* potentialAction signals to search engines / AI assistants that
       the site supports a search action. Even though we don't have a
       custom search route yet, declaring intent here is harmless and
       enables future sitelinks-searchbox eligibility. Points at the
       availability form as the canonical "find what you need" action. */
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.domain}/check-availability/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Geographic scope passed to serviceSchema. Exactly one of `city`, `county`,
 *  or `state` should be set — the helper builds the right areaServed structure. */
export interface ServiceArea {
  /** Town/city, e.g. "Greenwich". Triggers City + containedInPlace chain. */
  city?: string;
  /** Town's county — used as containedInPlace when city is set, e.g. "Fairfield County". */
  cityCounty?: string;
  /** When the service is county-level (no city), e.g. "Fairfield County". */
  county?: string;
  /** State name — defaults to "Connecticut". Used in the containedInPlace chain. */
  state?: string;
}

/** Builds an `areaServed` schema object honoring Google's preferred
 *  AdministrativeArea / City / State hierarchy. */
function buildAreaServed(area?: ServiceArea) {
  const state = area?.state ?? 'Connecticut';
  if (area?.city) {
    const containedInPlace = area.cityCounty
      ? {
          '@type': 'AdministrativeArea',
          name: area.cityCounty,
          containedInPlace: { '@type': 'State', name: state },
        }
      : { '@type': 'State', name: state };
    return {
      '@type': 'City',
      name: area.city,
      containedInPlace,
    };
  }
  if (area?.county) {
    return {
      '@type': 'AdministrativeArea',
      name: area.county,
      containedInPlace: { '@type': 'State', name: state },
    };
  }
  return { '@type': 'State', name: state };
}

/** Optional offer catalog of booth experiences. When omitted, we generate
 *  one from SERVICES so every Service page links to its siblings. */
function buildOfferCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Photo Booth Experiences',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.ctName,
        url: `${SITE.domain}/${s.slug}/`,
      },
    })),
  };
}

export interface ServiceSchemaOpts {
  name: string;
  description: string;
  url: string;
  /** Geographic scope of this Service. */
  area?: ServiceArea;
  /** When true, includes the full booth-experiences OfferCatalog. */
  includeOfferCatalog?: boolean;
  /** Override priceRange string. Defaults to "$$". */
  priceRange?: string;
  /** Override lowPrice value (USD). Defaults to "595". */
  lowPrice?: string;
}

export function serviceSchema(opts: ServiceSchemaOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: ORG_REF,
    areaServed: buildAreaServed(opts.area),
    serviceType: 'Photo Booth Rental',
    category: 'Event Rental',
    hasOfferCatalog: opts.includeOfferCatalog ? buildOfferCatalog() : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      lowPrice: opts.lowPrice ?? '595',
      priceRange: opts.priceRange ?? '$$',
      availability: 'https://schema.org/InStock',
      seller: ORG_REF,
    },
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
    author: ORG_REF,
    publisher: ORG_REF,
  };
}
