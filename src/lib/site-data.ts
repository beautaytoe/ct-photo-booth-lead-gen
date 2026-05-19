export const SITE = {
  brand: 'Gold Coast Photo Booth Co.',
  shortBrand: 'Gold Coast Photo Booth',
  /** Shortest brand form. Used in <title> templates to keep total title under
   * Google's ~60-char SERP truncation. */
  titleSuffix: 'Gold Coast',
  /** Used as `alternateName` in schema and as the small line under the brand mark. */
  seoDescriptor: 'Photo Booth Rental CT',
  /** Generic statewide tagline. Fairfield County is featured in a dedicated section, not the tagline. */
  tagline: 'Connecticut Photo Booth Rentals',
  domain: 'https://www.photoboothrentalct.com',
  serviceArea: 'Connecticut',
  primaryRegion: 'Connecticut',
  region: 'CT',
  founded: 2026,

  // Contact channel: form-only until a verified phone/email is wired.
  _placeholderPhone: '',
  _placeholderEmail: '',
  showPhonePublicly: false,
  showEmailPublicly: false,

  // Canonical response-time phrasing. Soft/vague today (defensible while
  // operator-side Resend isn't wired). Upgrade to a specific SLA only after
  // Resend env vars are set in Vercel AND daily inbox-check is operational.
  responseTime: 'Fast replies during booking hours',
};

export const NAV = {
  main: [
    { label: 'Booths', href: '/photo-booth-rental-ct/' },
    { label: '360 Booth', href: '/360-photo-booth-rental-ct/' },
    { label: 'Weddings', href: '/wedding-photo-booth-rental-ct/' },
    { label: 'Corporate', href: '/corporate-photo-booth-rental-ct/' },
    { label: 'Pricing', href: '/photo-booth-rental-prices-ct/' },
    { label: 'Service Areas', href: '/service-areas/' },
    { label: 'Blog', href: '/blog/' },
  ],
  cta: { label: 'Check Availability', href: '/check-availability/' },
};

/** Homepage in-page anchor chips (desktop) — shorter labels for mobile fit. */
export const HOMEPAGE_ANCHORS = [
  { label: 'Booths', href: '#experiences' },
  { label: 'Add-Ons', href: '#addons' },
  { label: 'Weddings', href: '#wedding' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Areas', href: '#service-area' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Availability', href: '#cta' },
];
