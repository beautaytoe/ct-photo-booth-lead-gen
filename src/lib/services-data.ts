export interface Service {
  slug: string;
  pathSegment: string;
  shortName: string;
  name: string;
  ctName: string;
  h1: string;
  title: string;
  description: string;
  hero: string;
  about: string;
  bestFor: string[];
  features: string[];
  startingFrom?: string;
  popularAdds?: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'photo-booth-rental-ct',
    pathSegment: 'photo-booth-rental-ct',
    shortName: 'Photo Booth',
    name: 'Photo Booth Rental',
    ctName: 'Photo Booth Rental in Connecticut',
    h1: 'Photo Booth Rental in Connecticut',
    title: 'Photo Booth Rental CT | All Booths & Add-Ons',
    description:
      'Premium photo booth rentals across Connecticut. Open-air, 360, glam, mirror, roaming, selfie, and audio guestbook booths for weddings and corporate events.',
    hero:
      "Connecticut's premium photo booth experience for weddings, corporate events, and private parties — 360, glam, mirror, roaming, open-air, selfie, and audio guestbook rentals.",
    about:
      'Gold Coast Photo Booth Co. provides a full lineup of event-booth experiences throughout Connecticut. We design each booking around your venue, branding, guest count, and event flow — every package can include a custom photo overlay, digital sharing, an on-site attendant, and optional print packages.',
    bestFor: ['Weddings', 'Corporate events', 'Sweet 16s', 'Bar & Bat Mitzvahs', 'School Events', 'Galas', 'Brand Activations', 'Private parties'],
    features: [
      'Custom photo overlay designed for your event',
      'Digital sharing via QR, text, or email',
      'On-site booth attendant',
      'Premium backdrop options',
      'Optional print packages',
      'Online gallery delivered after the event',
      'Curated props or clean styling',
    ],
    startingFrom: 'Entry packages start in the high three figures.',
  },
  {
    slug: '360-photo-booth-rental-ct',
    pathSegment: '360-photo-booth-rental-ct',
    shortName: '360 Booth',
    name: '360 Photo Booth',
    ctName: '360 Photo Booth Rental in Connecticut',
    h1: '360 Photo Booth Rental in Connecticut',
    title: '360 Photo Booth Rental CT | Slow-Mo Video',
    description:
      'Premium 360 photo booth rental in Connecticut. Slow-motion video, custom overlays, instant sharing, on-site attendant. Sweet 16s, weddings, brand events.',
    hero:
      'High-energy video booth experience built for reels, TikTok-style clips, entrances, birthdays, Sweet 16s, mitzvahs, and brand events.',
    about:
      'The 360 booth captures slow-motion video as a stabilized camera orbits the platform — guests strike a pose, the booth spins, and the moment is branded, edited, and shared to their phone. Custom intros and outros, optional music sync, and an on-site attendant keep the line moving.',
    bestFor: ['Weddings', 'Sweet 16s & Quinceañeras', 'Brand activations', 'Corporate parties', 'Bar/Bat Mitzvahs', 'Birthday parties'],
    features: [
      'Stabilized 4K camera + LED platform',
      'Custom intro / outro & overlays',
      'Optional music sync',
      'Instant text / AirDrop / QR delivery',
      'Branded landing page (corporate option)',
      'On-site attendant included',
      'LED light ring + RGB platform options',
    ],
    startingFrom: '360-only events typically start at our Signature tier.',
    popularAdds: ['Custom red carpet', 'Brand sponsor overlays', 'Glam lighting', 'On-site editor'],
  },
  {
    slug: 'wedding-photo-booth-rental-ct',
    pathSegment: 'wedding-photo-booth-rental-ct',
    shortName: 'Wedding',
    name: 'Wedding Photo Booth',
    ctName: 'Wedding Photo Booth Rental in Connecticut',
    h1: 'Wedding Photo Booth Rental in Connecticut',
    title: 'Wedding Photo Booth Rental CT | Glam & 360',
    description:
      'Premium wedding photo booth rental in Connecticut. Glam, 360, open-air, mirror booths and audio guestbook add-ons matched to your venue, colors, and flow.',
    hero:
      "Wedding photo booth experiences that match the room — designed to feel like part of your reception, not a kid's party.",
    about:
      "From black-tie receptions to barn weddings, design a booth setup that complements your venue, colors, and guest experience. Pair a glam booth or open-air booth with an audio guestbook, custom backdrop, and optional prints for a polished wedding add-on guests actually use.",
    bestFor: ['Weddings', 'Wedding receptions', 'Rehearsal dinners', 'Bridal showers', 'Engagement parties'],
    features: [
      'Custom overlay that matches your invitation suite',
      'Premium backdrop or custom step-and-repeat',
      'Choice of glam, 360, mirror, open-air, or roaming styles',
      'Curated props or clean styling',
      'On-site attendant in event-appropriate attire',
      'Optional print packages',
      'Online gallery for the couple after the event',
      'Audio guestbook add-on',
    ],
  },
  {
    slug: 'corporate-photo-booth-rental-ct',
    pathSegment: 'corporate-photo-booth-rental-ct',
    shortName: 'Corporate',
    name: 'Corporate Photo Booth',
    ctName: 'Corporate Photo Booth Rental in Connecticut',
    h1: 'Corporate Photo Booth Rental in Connecticut',
    title: 'Corporate Photo Booth Rental CT | Brand Booth',
    description:
      'Branded photo booths for Connecticut launches, conferences, holiday parties, fundraisers, and corporate events. Custom overlays, galleries, QR sharing.',
    hero:
      'A branded event activation — not a generic photo booth — for launches, conferences, holiday parties, and corporate events.',
    about:
      'Create a branded booth experience for launches, conferences, holiday parties, fundraisers, and corporate events. Add custom overlays, branded galleries, QR sharing, digital delivery, and optional lead capture so guests leave with content and your brand stays visible.',
    bestFor: ['Brand activations', 'Trade shows', 'Holiday parties', 'Product launches', 'Conferences', 'Office events', 'Fundraisers'],
    features: [
      'Branded overlays — print + digital',
      'Custom gallery on your event landing page',
      'QR + SMS sharing for guests',
      'Optional lead capture form',
      'Roaming coverage option',
      'Sponsor / step-and-repeat setup',
      'Post-event gallery delivery',
    ],
    popularAdds: ['Custom step-and-repeat', 'Branded prop set', 'Roaming booth coverage', 'On-site editor'],
  },
  {
    slug: 'party-photo-booth-rental-ct',
    pathSegment: 'party-photo-booth-rental-ct',
    shortName: 'Party',
    name: 'Party Photo Booth',
    ctName: 'Party Photo Booth Rental in Connecticut',
    h1: 'Party Photo Booth Rental in Connecticut',
    title: 'Party Photo Booth Rental CT | Sweet 16 Booth',
    description:
      'Photo booth rental for parties, birthdays, Sweet 16s, quinceañeras, and private celebrations across Connecticut. 360, mirror, and selfie booth setups.',
    hero:
      'High-energy photo booth setups for Sweet 16s, birthdays, quinceañeras, and adult private parties.',
    about:
      'Party-mode booths are tuned for speed and energy — fast prints, instant sharing, animated GIF / boomerang export, and a curated prop selection that keeps the line moving. We pair the right booth style with the right age group so the booth is a dance-floor centerpiece, not an awkward corner.',
    bestFor: ['Sweet 16s', 'Quinceañeras', 'Birthdays', 'Holiday parties', 'Bachelorette parties', 'Reunions'],
    features: [
      'Optional unlimited print packages',
      'GIF / Boomerang / video export',
      'Themed prop kits available',
      'LED lighting and dance-floor-friendly setup',
      'Music sync (360 booth)',
      'On-site attendant',
    ],
  },
  {
    slug: 'glam-photo-booth-rental-ct',
    pathSegment: 'glam-photo-booth-rental-ct',
    shortName: 'Glam',
    name: 'Glam Photo Booth',
    ctName: 'Glam Photo Booth Rental in Connecticut',
    h1: 'Glam Photo Booth Rental in Connecticut',
    title: 'Glam Photo Booth Rental CT | B&W Editorial',
    description:
      'Glam photo booth rental in Connecticut — editorial-style black-and-white skin-smoothing booth. Built for luxury weddings, brand activations, and galas.',
    hero:
      'Black-and-white editorial-style portraits with flattering lighting and a refined luxury event feel.',
    about:
      'Our glam booth produces editorial-quality prints in seconds — clean black-and-white, skin smoothing, bright white backdrop, and elegant prop styling. Popular for Greenwich, Westport, and New Canaan weddings and luxury gala events.',
    bestFor: ['Luxury weddings', 'Galas', 'Fundraisers', 'Brand activations', 'Sweet 16s', 'Private parties'],
    features: [
      'Beauty-retouched black & white prints',
      'White backdrop with halo lighting',
      'Premium glam prop selection',
      'Optional print + digital share',
      'On-site attendant',
    ],
  },
  {
    slug: 'mirror-photo-booth-rental-ct',
    pathSegment: 'mirror-photo-booth-rental-ct',
    shortName: 'Mirror',
    name: 'Mirror Photo Booth',
    ctName: 'Mirror Photo Booth Rental in Connecticut',
    h1: 'Mirror Photo Booth Rental in Connecticut',
    title: 'Mirror Photo Booth Rental CT | Magic Mirror',
    description:
      'Interactive full-length magic mirror photo booth rental across Connecticut. On-screen prompts, animated signatures, and a polished guest experience.',
    hero:
      'An interactive full-length mirror booth with guided prompts, animations, and a polished guest experience.',
    about:
      'The magic mirror booth turns a full-length mirror into a touch-screen photo booth. Guests walk up, follow animated prompts, sign the screen, and (optionally) walk away with a printed photo strip. One of our most popular wedding and Sweet 16 booth styles.',
    bestFor: ['Weddings', 'Sweet 16s', 'Quinceañeras', 'School proms', 'Corporate parties'],
    features: [
      'Full-length interactive mirror',
      'On-screen signatures & animations',
      'Optional instant print',
      'Custom voice / text prompts',
      'On-site attendant',
    ],
  },
  {
    slug: 'open-air-photo-booth-rental-ct',
    pathSegment: 'open-air-photo-booth-rental-ct',
    shortName: 'Open-Air',
    name: 'Open-Air Photo Booth',
    ctName: 'Open-Air Photo Booth Rental in Connecticut',
    h1: 'Open-Air Photo Booth Rental in Connecticut',
    title: 'Open-Air Photo Booth Rental CT | Backdrops',
    description:
      'Open-air photo booth rental across Connecticut. Premium lighting, custom overlays, digital sharing, optional prints. The most flexible booth for any venue.',
    hero:
      'Classic, high-volume photo booth setup with premium lighting, custom overlays, digital sharing, and optional prints.',
    about:
      'Open-air booths are the workhorse of modern photo booth rentals — they fit large groups, accommodate custom backdrops, work in tight venues, and offer the fastest print + share workflow. The most flexible setup and a strong fit for almost any event.',
    bestFor: ['Weddings', 'Corporate events', 'Sweet 16s', 'Fundraisers', 'Holiday parties'],
    features: [
      'Premium DSLR camera',
      'Custom backdrop options',
      'Optional unlimited print packages',
      'GIF / boomerang export',
      'Instant digital sharing',
      'On-site attendant',
    ],
  },
  {
    slug: 'roaming-photo-booth-rental-ct',
    pathSegment: 'roaming-photo-booth-rental-ct',
    shortName: 'Roaming',
    name: 'Roaming Photo Booth',
    ctName: 'Roaming Photo Booth Rental in Connecticut',
    h1: 'Roaming Photo Booth Rental in Connecticut',
    title: 'Roaming Photo Booth Rental CT | Mobile Booth',
    description:
      'Mobile roaming photo booth rental across Connecticut. A handheld booth for cocktail hours, receptions, trade shows, and crowded events. Instant digital sharing.',
    hero:
      'A mobile booth experience that moves through cocktail hours, receptions, trade shows, and crowded events.',
    about:
      "The roaming booth is a handheld setup an attendant carries through your event — perfect for cocktail hours, conference floors, and crowded receptions where a stationary booth doesn't fit. Custom overlays, instant text/email/QR sharing, and a fast guest experience.",
    bestFor: ['Cocktail hours', 'Wedding receptions', 'Conferences', 'Trade shows', 'Brand activations', 'Holiday parties'],
    features: [
      'Handheld mobile camera + lighting',
      'Custom event overlay',
      'Instant digital sharing',
      'No floor footprint required',
      'On-site attendant',
      'Pairs well with stationary booth',
    ],
    popularAdds: ['Stationary 360 or open-air pair', 'Branded prop set'],
  },
  {
    slug: 'selfie-booth-rental-ct',
    pathSegment: 'selfie-booth-rental-ct',
    shortName: 'Selfie',
    name: 'Selfie Booth',
    ctName: 'Selfie Booth Rental in Connecticut',
    h1: 'Selfie Booth Rental in Connecticut',
    title: 'Selfie Booth Rental CT | iPad Self-Serve',
    description:
      'Compact self-serve selfie booth rental across Connecticut. Sleek iPad booth with custom overlays, direct-to-phone delivery. Schools, brand activations, pop-ups.',
    hero:
      'Compact digital booth for parties, schools, bars, pop-ups, and high-traffic event spaces.',
    about:
      'Selfie booths are a low-footprint option built around an iPad and a clean stand. Guests tap, take a photo, and send it to themselves instantly. We design the on-screen experience around your brand or event and pre-configure everything before delivery.',
    bestFor: ['Brand activations', 'Office openings', 'Small parties', 'Trade shows', 'Pop-ups', 'School events'],
    features: [
      'Self-serve iPad booth',
      'Custom branded overlay',
      'Instant text / email share',
      'Optional unattended setup',
      'Compact footprint',
    ],
  },
  {
    slug: 'audio-guestbook-rental-ct',
    pathSegment: 'audio-guestbook-rental-ct',
    shortName: 'Audio Guestbook',
    name: 'Audio Guestbook',
    ctName: 'Audio Guestbook Rental in Connecticut',
    h1: 'Audio Guestbook Rental in Connecticut',
    title: 'Audio Guestbook Rental CT | Rotary Phone',
    description:
      'Vintage rotary phone audio guestbook rental across Connecticut. Guests leave voice messages, stories, and toasts you keep forever. Wedding and event add-on.',
    hero:
      'A vintage rotary phone where guests leave voice messages, stories, toasts, and memories you can keep forever.',
    about:
      'The audio guestbook turns a beautifully styled vintage telephone into a guestbook. After the event, you receive a curated audio reel of every message left by your guests. Pairs perfectly with a 360, glam, or open-air booth as a wedding add-on.',
    bestFor: ['Weddings', 'Anniversary parties', 'Milestone birthdays', 'Memorials', 'Retirement parties'],
    features: [
      'Restored vintage telephone',
      'Curated post-event audio reel',
      'Custom signage',
      'Pairs with any booth',
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const EVENT_TYPES = [
  { name: 'Weddings', slug: 'weddings', icon: '💍' },
  { name: 'Corporate Events', slug: 'corporate-events', icon: '🏢' },
  { name: 'Sweet 16s & Quinceañeras', slug: 'sweet-16-quinceanera', icon: '🎉' },
  { name: 'Bar & Bat Mitzvahs', slug: 'bar-bat-mitzvah', icon: '🎊' },
  { name: 'School Events & Proms', slug: 'school-proms', icon: '🎓' },
  { name: 'Fundraisers & Galas', slug: 'fundraisers-galas', icon: '🥂' },
  { name: 'Brand Activations', slug: 'brand-activations', icon: '🚀' },
  { name: 'Holiday Parties', slug: 'holiday-parties', icon: '🎄' },
];

/**
 * Generic FAQs used on internal pages (services, counties, towns).
 * Conservative phrasing — no unverified operational claims.
 */
export const FAQ_GENERAL = [
  {
    q: 'How far in advance should we book?',
    a: 'For Saturday weddings in Fairfield County peak season (May–October), we recommend booking 6–9 months out. Mid-week events and off-season dates are often available with shorter lead time.',
  },
  {
    q: 'How much does photo booth rental cost in Connecticut?',
    a: 'Entry packages start in the high three figures. Final pricing depends on booth style, hours, branding, backdrop, and add-ons like an audio guestbook or roaming booth. Premium multi-booth setups are custom quoted.',
  },
  {
    q: 'Do you bring an on-site attendant?',
    a: 'Yes. Every standard booking includes a professional on-site attendant. We handle setup, the line, prop refreshes, and breakdown so you can focus on your event.',
  },
  {
    q: 'How long does setup take and how much space do you need?',
    a: 'We typically arrive 60–90 minutes before guest arrival. Setup time is included in your booking, not your event hours. Open-air and selfie booths need less space; 360 booths and mirror booths need more clearance. Final setup requirements are confirmed before the event.',
  },
  {
    q: 'Do you provide printed photos?',
    a: 'Print packages are available as a package add-on. Digital sharing — by QR, text, or email — is available across most booth experiences and is included in most packages.',
  },
  {
    q: 'Can you brand the booth for our wedding or corporate event?',
    a: 'Yes — we design every print template, on-screen overlay, and 360 intro/outro around your branding, color palette, and event style.',
  },
  {
    q: 'Do you carry liability insurance for venues?',
    a: 'A Certificate of Insurance can be made available for venues that require one. Share your venue requirements during booking and we will confirm the specifics.',
  },
];

/**
 * Homepage-specific FAQs — broader, lineup-aware.
 */
export const FAQ_HOMEPAGE = [
  {
    q: 'What types of photo booths can I rent in Connecticut?',
    a: 'Open-air photo booths, 360 video booths, glam editorial booths, magic mirror booths, selfie booths, roaming booths, custom branded corporate booths, and audio guestbook add-ons. Each booth style suits different events, venue sizes, and guest experiences.',
  },
  {
    q: 'Do you offer audio guestbook or rotary phone guestbook rentals?',
    a: 'Yes — audio guestbook rentals are available as a wedding or event add-on. Guests pick up a vintage-style phone and leave voice messages, stories, or toasts that you can keep forever as a post-event audio reel.',
  },
  {
    q: 'Do you offer props and backdrops?',
    a: 'Yes. Packages can include curated props, clean styling, premium backdrop options, and custom event-specific design — including step-and-repeat style backdrops for sponsor visibility.',
  },
  {
    q: 'Do you offer corporate branding?',
    a: 'Yes. Corporate packages can include branded overlays, custom event galleries, QR + SMS sharing, optional lead capture, roaming booth coverage, and post-event gallery delivery.',
  },
  {
    q: 'Do you offer printed photos?',
    a: 'Print packages are available as an add-on. Digital sharing — by QR, text, or email — is included across most booth experiences for fast, social-ready delivery.',
  },
  {
    q: 'What is the best photo booth for a wedding?',
    a: 'For weddings, popular options include glam booths, open-air booths, audio guestbooks, and custom backdrops. The right choice depends on venue style, guest count, and whether you want prints, digital sharing, or both.',
  },
  {
    q: 'What is the best photo booth for a Sweet 16 or mitzvah?',
    a: '360 booths, mirror booths, and selfie booths typically work well for high-energy events where guests want social-ready content. Pair a 360 booth with a custom overlay for the most-shared moment of the night.',
  },
  {
    q: 'Do you serve all of Connecticut?',
    a: 'Yes — we serve Connecticut statewide, with Fairfield County as a featured region. Travel pricing is clearly disclosed for longer-distance bookings.',
  },
  {
    q: 'How much does photo booth rental cost in CT?',
    a: 'Most packages depend on booth style, hours, location, prints, backdrop, and add-ons. Entry packages start in the high three figures, while premium multi-experience packages are custom quoted.',
  },
  {
    q: 'How much space does a booth need?',
    a: 'Open-air booths and selfie booths need less space. 360 booths and mirror booths need more clearance. Final setup requirements are confirmed before the event so your venue can plan the floor.',
  },
];

/** Service-specific add-on FAQs used on the 360 service page. */
export const FAQ_SERVICE_360 = [
  {
    q: 'What is a 360 photo booth?',
    a: 'A 360 photo booth is a small circular platform with a stabilized camera on a rotating arm. Guests step onto the platform, the arm spins around them, and the booth produces a branded slow-motion video clip — usually 8–15 seconds long.',
  },
  {
    q: 'How is a 360 booth different from a regular photo booth?',
    a: 'A traditional photo booth captures still photos or a print strip. A 360 booth captures slow-motion video with optional music sync and branded overlays. They are complementary — many of our clients book both, especially for weddings.',
  },
  {
    q: 'How much space does a 360 booth need?',
    a: 'About 10x10 feet of clear floor space and 8 feet of ceiling clearance. We need a flat, level surface and access to a standard outlet within 25 feet.',
  },
];

/** Service-specific FAQs used on the Wedding service page. */
export const FAQ_WEDDING = [
  {
    q: 'Do you have a wedding-appropriate setup?',
    a: 'Yes — our wedding setups use elegant backdrops, curated wedding props, premium printing options, and attendants in event-appropriate attire. We can also remove props entirely for a more refined look.',
  },
  {
    q: 'Can you match our wedding stationery?',
    a: 'Yes. Send us your invitation suite or color palette and we will design the print template, digital overlay, and (if applicable) 360 intro/outro to match.',
  },
  {
    q: 'Will the photo booth fit our venue?',
    a: 'Almost always. Open-air booths are flexible and fit tight venues; the 360 booth needs about 10x10 feet. We coordinate directly with your venue or planner to confirm layout, power, and load-in details before the event.',
  },
];
