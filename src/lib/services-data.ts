export interface Service {
  slug: string;          // e.g. '360-photo-booth-rental-ct'
  pathSegment: string;   // route under /
  shortName: string;     // 'open-air' for display chips
  name: string;          // 'Open-Air Photo Booth'
  ctName: string;        // 'Open-Air Photo Booth Rental in CT'
  h1: string;            // page H1
  title: string;         // meta title
  description: string;   // meta description
  hero: string;          // hero subheadline
  about: string;         // longer-form intro
  bestFor: string[];     // event types
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
    title: 'Photo Booth Rental CT | 360, Glam & Wedding Booths',
    description:
      'Book premium photo booth rentals across Connecticut for weddings, corporate events, parties, school events, and private celebrations. Check availability today.',
    hero:
      "Connecticut's premier photo booth experience for weddings, corporate events, and private parties — 360 booths, glam booths, mirror booths, and open-air booths.",
    about:
      'Gold Coast Photo Booth Co. provides modern photo booth rentals throughout Connecticut. We design each booking around your venue, branding, guest count, and event flow — every package includes a friendly on-site attendant, unlimited sessions, instant digital sharing, and high-quality prints.',
    bestFor: ['Weddings', 'Corporate events', 'Sweet 16s', 'Bar & Bat Mitzvahs', 'Fundraisers', 'Private parties'],
    features: [
      'Unlimited photo sessions',
      'On-site attendant',
      'Instant text / email / AirDrop',
      'Custom print template with your event branding',
      'Premium backdrops + props',
      'High-resolution DSLR or 4K cinema camera',
      'Online gallery delivered after the event',
    ],
    startingFrom: 'Packages start in the mid-three figures for short events.',
  },
  {
    slug: '360-photo-booth-rental-ct',
    pathSegment: '360-photo-booth-rental-ct',
    shortName: '360 Booth',
    name: '360 Photo Booth',
    ctName: '360 Photo Booth Rental in Connecticut',
    h1: '360 Photo Booth Rental in Connecticut',
    title: '360 Photo Booth Rental CT | 4K Slow-Motion Video Booth',
    description:
      'Premium 360 photo booth rental in Connecticut. 4K slow-motion video, custom overlays, instant sharing, and an on-site attendant. Serving CT statewide.',
    hero:
      "The hands-down crowd favorite for weddings, Sweet 16s, brand activations, and corporate parties across Connecticut.",
    about:
      'Our 360 video booth captures slow-motion video as a rotating arm orbits the platform — guests strike a pose, the booth spins, and the moment is instantly branded, edited, and sent to their phone. We use a stabilized 4K camera, custom intros / outros, music sync, and an on-site attendant to keep the line moving.',
    bestFor: ['Weddings', 'Sweet 16s & Quinceañeras', 'Brand activations', 'Corporate parties', 'Bar/Bat Mitzvahs', 'Birthday parties'],
    features: [
      'Stabilized 4K camera',
      'Custom intro / outro & overlays',
      'Music sync',
      'Instant text / AirDrop / QR delivery',
      'Branded landing page (corporate)',
      'On-site attendant included',
      'LED light ring + RGB platform options',
    ],
    startingFrom: 'Most 360 events book in the high-three / low-four figures.',
    popularAdds: ['Custom red carpet', 'Brand sponsor overlays', 'Glam lighting', 'On-site editor'],
  },
  {
    slug: 'wedding-photo-booth-rental-ct',
    pathSegment: 'wedding-photo-booth-rental-ct',
    shortName: 'Wedding Booth',
    name: 'Wedding Photo Booth',
    ctName: 'Wedding Photo Booth Rental in Connecticut',
    h1: 'Wedding Photo Booth Rental in Connecticut',
    title: 'Wedding Photo Booth Rental CT | Glam, 360 & Open-Air',
    description:
      'Premium wedding photo booth rental in Connecticut — glam booths, 360 booths, open-air booths, and mirror booths designed for elegant weddings statewide.',
    hero:
      "Connecticut's go-to wedding photo booth — designed to feel like part of your reception, not a kid's party.",
    about:
      "We build every wedding photo booth around your venue, color palette, and reception timeline. Our most-requested wedding setups are the glam booth (black-and-white skin-smoothing prints), 360 booth (4K video with your hashtag), and open-air booth with custom print templates that match your invitation suite.",
    bestFor: ['Weddings', 'Wedding receptions', 'Rehearsal dinners', 'Bridal showers', 'Engagement parties'],
    features: [
      'Print template matched to your invitation suite',
      'Premium backdrop or custom step-and-repeat',
      'Glam, 360, mirror, or open-air booth styles',
      'Curated wedding-appropriate prop selection',
      'On-site attendant in event-appropriate attire',
      'Online gallery for the couple after the event',
    ],
  },
  {
    slug: 'corporate-photo-booth-rental-ct',
    pathSegment: 'corporate-photo-booth-rental-ct',
    shortName: 'Corporate Booth',
    name: 'Corporate Photo Booth',
    ctName: 'Corporate Photo Booth Rental in Connecticut',
    h1: 'Corporate Photo Booth Rental in Connecticut',
    title: 'Corporate Photo Booth Rental CT | Brand Activations & Events',
    description:
      'Corporate photo booth rentals for trade shows, brand activations, holiday parties, and conferences across Connecticut. Custom branded overlays and lead capture.',
    hero:
      'Brand-grade photo booth experiences for trade shows, brand activations, holiday parties, and conferences.',
    about:
      'Our corporate booths are built around your brand, not ours. We design custom overlays, branded landing pages, integrate optional lead capture, and deliver a clean analytics report after the event so your marketing team can attribute swag, leads, and impressions back to the activation.',
    bestFor: ['Brand activations', 'Trade shows', 'Holiday parties', 'Product launches', 'Conferences', 'Office events'],
    features: [
      'Fully branded print + digital overlay',
      'Optional opt-in lead capture',
      'Custom branded landing page',
      'Post-event analytics & gallery report',
      'On-site attendant in business attire',
      'NDA-friendly engagement available',
    ],
    popularAdds: ['Custom step-and-repeat', 'Branded prop set', 'On-site editor', 'CRM integration'],
  },
  {
    slug: 'party-photo-booth-rental-ct',
    pathSegment: 'party-photo-booth-rental-ct',
    shortName: 'Party Booth',
    name: 'Party Photo Booth',
    ctName: 'Party Photo Booth Rental in Connecticut',
    h1: 'Party Photo Booth Rental in Connecticut',
    title: 'Party Photo Booth Rental CT | Sweet 16, Birthday & Private Parties',
    description:
      "Photo booth rental for parties, birthdays, Sweet 16s, quinceañeras, and private celebrations across Connecticut. Unlimited sessions, instant sharing, on-site attendant.",
    hero:
      'High-energy photo booth setups for Sweet 16s, birthdays, quinceañeras, and adult private parties.',
    about:
      'Party-mode booths are tuned for speed and energy — fast prints, instant sharing, animated GIF / boomerang export, and a curated prop selection that keeps the line moving. We pair the right booth style with the right age group so the photo booth is the centerpiece of the dance floor, not an awkward corner.',
    bestFor: ['Sweet 16s', 'Quinceañeras', 'Birthdays', 'Holiday parties', 'Bachelorette parties', 'Reunions'],
    features: [
      'Unlimited prints & digital shares',
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
    shortName: 'Glam Booth',
    name: 'Glam Photo Booth',
    ctName: 'Glam Photo Booth Rental in Connecticut',
    h1: 'Glam Photo Booth Rental in Connecticut',
    title: 'Glam Photo Booth Rental CT | Kim-K Style Black & White Booth',
    description:
      'Glam photo booth rental in Connecticut — the Kim-K style black-and-white skin-smoothing booth. Perfect for luxury weddings, brand activations, and gala events.',
    hero:
      'The Kim-K style glam booth — black-and-white, skin-smoothing, magazine-quality prints.',
    about:
      'Our glam booth produces fashion-magazine-quality prints in seconds — clean black-and-white, skin smoothing, bright white backdrop, and elegant prop styling. It is the most-requested booth style for Greenwich, Westport, and New Canaan weddings and luxury gala events.',
    bestFor: ['Luxury weddings', 'Galas', 'Fundraisers', 'Brand activations', 'Sweet 16s', 'Private parties'],
    features: [
      'Beauty-retouched black & white prints',
      'White backdrop with halo lighting',
      'Premium glam prop selection',
      'Print + digital share',
      'On-site attendant',
    ],
  },
  {
    slug: 'mirror-photo-booth-rental-ct',
    pathSegment: 'mirror-photo-booth-rental-ct',
    shortName: 'Mirror Booth',
    name: 'Mirror Photo Booth',
    ctName: 'Mirror Photo Booth Rental in Connecticut',
    h1: 'Mirror Photo Booth Rental in Connecticut',
    title: 'Mirror Photo Booth Rental CT | Magic Mirror Booth',
    description:
      'Magic mirror photo booth rental across Connecticut. Interactive full-length mirror booth with animations, signatures, and instant prints. Great for weddings and Sweet 16s.',
    hero:
      'An interactive full-length mirror booth with animations, on-screen signatures, and instant prints.',
    about:
      'The magic mirror booth turns a full-length mirror into a touch-screen photo booth. Guests walk up, follow animated prompts, sign the screen, and walk away with a printed photo strip. It is one of our most popular wedding and Sweet 16 booth styles.',
    bestFor: ['Weddings', 'Sweet 16s', 'Quinceañeras', 'School proms', 'Corporate parties'],
    features: [
      'Full-length interactive mirror',
      'On-screen signatures & animations',
      'Instant print',
      'Custom voice / text prompts',
      'On-site attendant',
    ],
  },
  {
    slug: 'open-air-photo-booth-rental-ct',
    pathSegment: 'open-air-photo-booth-rental-ct',
    shortName: 'Open-Air Booth',
    name: 'Open-Air Photo Booth',
    ctName: 'Open-Air Photo Booth Rental in Connecticut',
    h1: 'Open-Air Photo Booth Rental in Connecticut',
    title: 'Open-Air Photo Booth Rental CT | Custom Backdrop Booth',
    description:
      'Open-air photo booth rental across Connecticut. Custom backdrop, premium DSLR, unlimited prints, GIFs, and digital sharing. Perfect for weddings and corporate events.',
    hero:
      'A flexible open-air photo booth setup that fits any venue and any guest count.',
    about:
      'Open-air booths are the workhorse of modern photo booth rentals — they fit large groups, accommodate custom backdrops, work in tight venues, and offer the fastest print + share workflow. They are our most flexible setup and a strong fit for almost any event.',
    bestFor: ['Weddings', 'Corporate events', 'Sweet 16s', 'Fundraisers', 'Holiday parties'],
    features: [
      'Premium DSLR camera',
      'Custom backdrop',
      'Unlimited prints',
      'GIF / boomerang export',
      'Instant digital sharing',
      'On-site attendant',
    ],
  },
  {
    slug: 'selfie-booth-rental-ct',
    pathSegment: 'selfie-booth-rental-ct',
    shortName: 'Selfie Booth',
    name: 'Selfie Booth',
    ctName: 'Selfie Booth Rental in Connecticut',
    h1: 'Selfie Booth Rental in Connecticut',
    title: 'Selfie Booth Rental CT | Self-Serve iPad Photo Booth',
    description:
      'Self-serve selfie booth rental across Connecticut. Sleek iPad-based booth, custom overlays, instant text/email sharing. Great for low-staff brand activations and small events.',
    hero:
      'A sleek self-serve iPad booth — perfect for low-staff brand activations and small private events.',
    about:
      'Selfie booths are an unattended option built around an iPad and a clean stand. Guests tap, take a photo, and send it to themselves instantly. We design the on-screen experience around your brand or event and pre-configure everything before delivery.',
    bestFor: ['Brand activations', 'Office openings', 'Small parties', 'Trade shows', 'Pop-ups'],
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
    title: 'Audio Guestbook Rental CT | Vintage Phone Voicemail Guestbook',
    description:
      'Vintage telephone audio guestbook rental across Connecticut. Guests pick up the receiver and leave a voice message. A great wedding add-on paired with a 360 or glam booth.',
    hero:
      'A vintage telephone guestbook — guests pick up the receiver and leave a voice message.',
    about:
      'The audio guestbook turns a beautifully styled vintage telephone into a guestbook. After the event, you receive a curated audio reel of every message left by your guests. It pairs perfectly with our 360 or glam booth as a wedding add-on.',
    bestFor: ['Weddings', 'Anniversary parties', 'Milestone birthdays', 'Memorials'],
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
  { name: 'Birthdays', slug: 'birthdays', icon: '🎂' },
  { name: 'School Events & Proms', slug: 'school-proms', icon: '🎓' },
  { name: 'Fundraisers & Galas', slug: 'fundraisers-galas', icon: '🥂' },
  { name: 'Brand Activations', slug: 'brand-activations', icon: '🚀' },
];

export const FAQ_GENERAL = [
  {
    q: 'How far in advance should we book?',
    a: 'For Saturday weddings in Fairfield County peak season (May–October), we recommend booking 6–9 months out. Mid-week events and off-season dates are often available with 4–8 weeks of lead time.',
  },
  {
    q: 'How much does photo booth rental cost in Connecticut?',
    a: 'Most CT photo booth bookings land in the mid-three to mid-four figures depending on booth style, hours, backdrop / branding, and add-ons. The 360 booth and glam booth typically run higher than a standard open-air booth.',
  },
  {
    q: 'Do you bring an on-site attendant?',
    a: 'Yes. Every booking includes a professional on-site attendant. We handle setup, the line, prop refreshes, and breakdown so you can focus on your event.',
  },
  {
    q: 'How long does setup take and how much space do you need?',
    a: 'We typically arrive 60–90 minutes before guest arrival. Setup time is included in your booking, not your event hours. The footprint depends on booth style — an open-air booth needs about 8x8 feet; the 360 booth needs about 10x10 feet of clearance.',
  },
  {
    q: 'Do you provide unlimited prints?',
    a: 'Yes, unlimited prints and unlimited digital sharing are standard on our packages. Guests can re-print as many times as they like and instantly send photos to their phones.',
  },
  {
    q: 'Can you brand the booth for our wedding or corporate event?',
    a: 'Absolutely — we design every print template, on-screen overlay, and 360 intro/outro around your branding, color palette, and event style.',
  },
  {
    q: 'Do you carry liability insurance for venues?',
    a: 'Yes. We carry event liability insurance and can provide a Certificate of Insurance to your venue on request.',
  },
];

export const FAQ_SERVICE_360 = [
  {
    q: 'What is a 360 photo booth?',
    a: 'A 360 photo booth is a small circular platform with a stabilized 4K camera on a rotating arm. Guests step onto the platform, the arm spins around them, and the booth produces a branded slow-motion video clip — usually 8–15 seconds long.',
  },
  {
    q: 'How is a 360 booth different from a regular photo booth?',
    a: 'A traditional photo booth captures still photos or a print strip. A 360 booth captures slow-motion video with music sync and branded overlays. They are complementary — many of our clients book both, especially for weddings.',
  },
  {
    q: 'How much space does a 360 booth need?',
    a: 'About 10x10 feet of clear floor space and 8 feet of ceiling clearance. We need a flat, level surface and access to a standard outlet within 25 feet.',
  },
];

export const FAQ_WEDDING = [
  {
    q: 'Do you have a wedding-appropriate setup?',
    a: 'Yes — our wedding setups use elegant backdrops, curated wedding props, premium printing, and attendants in event-appropriate attire. We can also remove props entirely for a more refined look.',
  },
  {
    q: 'Can you match our wedding stationery?',
    a: 'Yes. Send us your invitation suite or color palette and we will design the print template, digital overlay, and (if applicable) 360 intro/outro to match.',
  },
  {
    q: 'Will the photo booth fit our venue?',
    a: 'Almost always. Open-air booths are flexible and fit tight venues; the 360 booth needs about 10x10 feet. We coordinate directly with your venue or planner to confirm layout, power, and load-in details ahead of the event.',
  },
];
