export const SITE = {
  brand: 'Gold Coast Photo Booth Co.',
  shortBrand: 'Gold Coast Photo Booth',
  /** Used as `alternateName` in schema and as the small line under the brand mark. */
  seoDescriptor: 'Photo Booth Rental CT',
  tagline: 'Connecticut Photo Booth Rentals · Fairfield County First',
  domain: 'https://www.photoboothrentalct.com',
  serviceArea: 'Connecticut',
  primaryRegion: 'Fairfield County, Connecticut',
  region: 'CT',
  founded: 2026,

  // Contact channel: form-only until a verified phone/email is wired.
  _placeholderPhone: '',
  _placeholderEmail: '',
  showPhonePublicly: false,
  showEmailPublicly: false,
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

/** Homepage in-page anchor chips (desktop). */
export const HOMEPAGE_ANCHORS = [
  { label: 'Booths', href: '#experiences' },
  { label: 'Weddings', href: '#wedding' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Add-Ons', href: '#addons' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Service Areas', href: '#service-area' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Availability', href: '#cta' },
];
