export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  // Content is intentionally short, real, and useful. No SEO filler.
  // Each section: { heading, body (markdown-lite paragraphs separated by \n\n) }
  sections: { heading: string; body: string }[];
  related: string[]; // service slugs or town slugs the post should link to
}

export const POSTS: BlogPost[] = [
  {
    slug: 'how-much-does-photo-booth-rental-cost-in-ct',
    title: 'How Much Does Photo Booth Rental Cost in Connecticut?',
    metaTitle: 'How Much Does Photo Booth Rental Cost in CT? (2026 Pricing)',
    description:
      'A straight answer on photo booth rental pricing in Connecticut for 2026 — what drives cost, what is fair to pay, and how 360 booths and glam booths compare to open-air booths.',
    date: '2026-05-18',
    readMinutes: 6,
    excerpt:
      'Photo booth rental in Connecticut typically lands between the mid-three figures for a short event and the mid-four figures for a fully branded multi-booth wedding setup. Here is what actually drives the price.',
    sections: [
      {
        heading: 'The short answer',
        body:
          'Most Connecticut photo booth rentals fall in three rough tiers:\n\n• Light open-air setup, 2–3 hours, small private party: low-to-mid three figures.\n\n• Standard wedding open-air or mirror booth, 4 hours, custom backdrop and prints: mid-three to high-three figures.\n\n• 360 booth, glam booth, or branded corporate activation, 4+ hours with attendant, premium overlays, and on-site editor: low-to-mid four figures.\n\nThose are CT-wide ranges, not quotes. Pricing varies by region, season, day of week, and add-ons.',
      },
      {
        heading: 'What actually drives the price',
        body:
          'Booth style matters more than anything else. A 360 booth is more expensive than an open-air booth because it requires a stabilized 4K rig, a heavier platform, more setup time, and longer post-event editing. A glam booth costs more than a basic open-air booth because of the lighting, the retouching workflow, and the premium print stock.\n\nAfter booth style, the next biggest drivers are: number of event hours, custom branding work (print template, digital overlay, 360 intro/outro), backdrop type (premium vs. standard), and whether you want add-ons like an audio guestbook, on-site editor, or branded landing page.',
      },
      {
        heading: 'Region matters in Connecticut',
        body:
          "Fairfield County — Greenwich, Westport, Darien, New Canaan, and Stamford — typically sees higher pricing than central or eastern CT because of venue requirements, parking, and the premium booth styles that get booked there. New Haven and Hartford counties tend to land squarely in the mid-range.",
      },
      {
        heading: 'What to expect on a quote',
        body:
          'A real quote should list the booth style, event hours, on-site attendant (yes, included), prints (yes, unlimited), digital sharing, backdrop type, custom design work, travel, and add-ons line by line. If you receive a one-line price with no detail, ask for the breakdown before signing.',
      },
    ],
    related: ['photo-booth-rental-ct', '360-photo-booth-rental-ct', 'wedding-photo-booth-rental-ct'],
  },
  {
    slug: '360-photo-booth-vs-open-air-photo-booth',
    title: '360 Photo Booth vs. Open-Air Photo Booth: Which One Should You Book?',
    description:
      'A direct comparison of 360 photo booths and open-air photo booths — when to book each one, when to book both, and what each setup actually looks like at a CT wedding or corporate event.',
    date: '2026-05-18',
    readMinutes: 5,
    excerpt:
      'They are not the same product. A 360 booth is a slow-motion video experience; an open-air booth is a high-throughput photo booth. Most CT weddings book one. Some book both.',
    sections: [
      {
        heading: '360 photo booth — what it actually is',
        body:
          'A small platform, a rotating arm, a stabilized 4K camera, and an on-site attendant. Guests step on, the camera orbits around them, and the booth produces a short slow-motion video synced to music with your branding on the intro and outro.\n\nThe output is a vertical video that lands on a guest\'s phone in under a minute. The format is built for Instagram and TikTok.',
      },
      {
        heading: 'Open-air photo booth — what it actually is',
        body:
          'A camera, a backdrop, lighting, and a touchscreen. Guests pose, the booth fires, and they walk away with a printed strip and an instant digital share. Open-air booths fit large groups and move people through quickly.\n\nThe output is a print + digital photo (or boomerang/GIF) — designed for the dance floor and the fridge door.',
      },
      {
        heading: 'When to book each one',
        body:
          'Book a 360 booth when video is the goal — Sweet 16s, brand activations, modern weddings, anything where guests are going to post the result. Book an open-air booth when prints, group photos, and high throughput are the goal — large weddings, corporate parties, school events.\n\nBook both when budget and venue allow it — they serve different jobs and don\'t compete for the same guests.',
      },
    ],
    related: ['360-photo-booth-rental-ct', 'open-air-photo-booth-rental-ct', 'wedding-photo-booth-rental-ct'],
  },
  {
    slug: 'best-photo-booth-ideas-for-weddings-in-ct',
    title: 'Best Photo Booth Ideas for Weddings in Connecticut',
    description:
      'Photo booth ideas for CT weddings that actually get used — print template ideas, backdrop pairings, 360 booth tricks, glam booth tips, and audio guestbook pairings.',
    date: '2026-05-18',
    readMinutes: 4,
    excerpt:
      'A photo booth is only as good as how guests engage with it. These are the wedding photo booth ideas our CT couples consistently come back to.',
    sections: [
      {
        heading: 'Match the booth style to your reception',
        body:
          'Glam booths fit luxury Fairfield County weddings — Greenwich, Westport, Darien. Open-air booths fit barn weddings in Litchfield County and shoreline venues. 360 booths fit modern weddings with younger crowds and a packed dance floor. Mirror booths are a strong wedding-shower or rehearsal-dinner choice.',
      },
      {
        heading: 'Pair an audio guestbook with the booth',
        body:
          'A vintage telephone audio guestbook is one of our most-requested CT wedding add-ons. Guests pick up the receiver and leave a voice message, and we deliver a curated audio reel after the event. Pair it with a glam or open-air booth and you cover both visual and audio memories.',
      },
      {
        heading: 'Design the print template like a wedding invitation',
        body:
          'Send us your invitation suite or color palette and we will design the print template to match. The result feels intentional rather than tacked on.',
      },
    ],
    related: ['wedding-photo-booth-rental-ct', 'glam-photo-booth-rental-ct', '360-photo-booth-rental-ct', 'audio-guestbook-rental-ct'],
  },
  {
    slug: 'corporate-photo-booth-rental-ideas',
    title: 'Corporate Photo Booth Rental Ideas That Actually Drive Engagement',
    description:
      'Corporate photo booth ideas for brand activations, trade shows, holiday parties, and product launches — what works, what does not, and what to measure afterward.',
    date: '2026-05-18',
    readMinutes: 5,
    excerpt:
      'A corporate photo booth is a marketing channel, not a party favor. If you treat it like one, the ROI follows.',
    sections: [
      {
        heading: 'Brand the booth, not the prop bin',
        body:
          'The booth itself — the print, the digital overlay, the 360 intro/outro, and the landing page — does more brand work than any number of branded sunglasses. Spend the budget on the asset that gets shared, not the asset that ends up in a recycling bin.',
      },
      {
        heading: 'Add a branded landing page',
        body:
          'When a guest sends themselves a photo or 360 clip, we can route the share through a branded landing page on your domain with optional opt-in lead capture. That turns the booth into a measurable marketing channel.',
      },
      {
        heading: 'Report on the activation',
        body:
          'After the event, we deliver a clean report — sessions, unique users, share rate, gallery views, and (with lead capture) opt-ins. If your team is going to defend the spend internally, that report is what wins the meeting.',
      },
    ],
    related: ['corporate-photo-booth-rental-ct', '360-photo-booth-rental-ct'],
  },
  {
    slug: 'photo-booth-rental-checklist-for-connecticut-events',
    title: 'Photo Booth Rental Checklist for Connecticut Events',
    description:
      'A practical checklist for booking a CT photo booth — booking lead time, venue logistics, power, layout, branding, and what to confirm with your vendor before contract.',
    date: '2026-05-18',
    readMinutes: 4,
    excerpt:
      'Most photo booth problems are venue problems. Walk through this checklist before you sign a contract.',
    sections: [
      {
        heading: 'Booking lead time',
        body:
          'Saturday weddings in CT peak season (May–October) typically book 6–9 months out. Off-season and mid-week dates often have shorter lead times.',
      },
      {
        heading: 'Venue logistics',
        body:
          'Before signing, confirm: power outlet within 25 feet of the booth location, floor that is flat and level, ceiling clearance of at least 8 feet (10 for 360), load-in path that does not require stairs, and parking for the vendor team.',
      },
      {
        heading: 'Insurance and Certificate of Insurance',
        body:
          'Most CT venues require a Certificate of Insurance from the booth vendor. Ask before you sign — a real vendor can produce one within 24 hours.',
      },
      {
        heading: 'What to confirm in writing',
        body:
          'Booth style, event hours (not setup hours), included staffing, included prints, branding deliverables, backdrop type, idle / breakdown fees, travel fees, deposit and balance schedule, and cancellation policy.',
      },
    ],
    related: ['photo-booth-rental-ct', 'wedding-photo-booth-rental-ct', 'corporate-photo-booth-rental-ct'],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
