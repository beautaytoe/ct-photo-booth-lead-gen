/**
 * Connecticut towns dataset for Gold Coast Photo Booth Co.
 *
 * Tier 1: Positive search volume in keyword data OR top-priority Fairfield County markets. Indexable.
 * Tier 2: Other meaningful CT population centers. Indexable with the human-first template.
 * Tier 3: Very small towns. Routes generated but noindex until expanded.
 *
 * Town intros are intentionally process-focused, not claim-focused — see
 * `defaultIntro()` for towns without a custom intro. Avoid neighborhood and
 * venue names unless verified.
 */

export type County =
  | 'fairfield'
  | 'hartford'
  | 'litchfield'
  | 'middlesex'
  | 'new-haven'
  | 'new-london'
  | 'tolland'
  | 'windham';

export type Tier = 1 | 2 | 3;

/**
 * Town personality used to vary meta titles and descriptions so the
 * indexable town pages do not look like an identical template with only
 * the town name swapped.
 */
export type Vibe = 'luxury' | 'corporate' | 'shoreline' | 'family' | 'rural';

export interface Town {
  name: string;
  slug: string;
  county: County;
  tier: Tier;
  nearby: string[];
  vibe?: Vibe;
  /** Custom intro paragraph. Only Tier 1 + select Tier 2 towns have one. */
  intro?: string;
}

export interface CountyInfo {
  slug: County;
  name: string;
  description: string;
  featuredTowns: string[];
}

export const COUNTIES: CountyInfo[] = [
  {
    slug: 'fairfield',
    name: 'Fairfield County',
    description:
      "Connecticut's Gold Coast — including Stamford, Greenwich, Westport, Darien, New Canaan, Fairfield, and Norwalk. Our first-priority service region for weddings, corporate events, and private celebrations.",
    featuredTowns: [
      'stamford-ct',
      'greenwich-ct',
      'norwalk-ct',
      'fairfield-ct',
      'westport-ct',
      'darien-ct',
      'new-canaan-ct',
      'ridgefield-ct',
      'wilton-ct',
      'weston-ct',
      'bridgeport-ct',
      'trumbull-ct',
      'shelton-ct',
      'stratford-ct',
      'danbury-ct',
      'newtown-ct',
    ],
  },
  {
    slug: 'new-haven',
    name: 'New Haven County',
    description:
      'Greater New Haven and the Naugatuck Valley — including New Haven, Cheshire, Derby, Branford, Guilford, Madison, Milford, and Wallingford. A strong market for university, hospital, corporate, and shoreline-wedding events.',
    featuredTowns: [
      'new-haven-ct',
      'cheshire-ct',
      'derby-ct',
      'milford-ct',
      'branford-ct',
      'guilford-ct',
      'madison-ct',
      'hamden-ct',
      'wallingford-ct',
      'waterbury-ct',
      'meriden-ct',
      'orange-ct',
    ],
  },
  {
    slug: 'hartford',
    name: 'Hartford County',
    description:
      'Greater Hartford and the central corridor — including Hartford, West Hartford, Bristol, Berlin, Burlington, Glastonbury, Farmington, Simsbury, and Manchester. A mix of corporate and wedding venue demand.',
    featuredTowns: [
      'hartford-ct',
      'west-hartford-ct',
      'bristol-ct',
      'berlin-ct',
      'burlington-ct',
      'glastonbury-ct',
      'farmington-ct',
      'simsbury-ct',
      'avon-ct',
      'manchester-ct',
      'southington-ct',
      'newington-ct',
    ],
  },
  {
    slug: 'litchfield',
    name: 'Litchfield County',
    description:
      'The Litchfield Hills — including Litchfield, Torrington, Kent, New Milford, Woodbury, and Watertown. Picturesque barn, vineyard, and estate venues in the northwest corner of the state.',
    featuredTowns: [
      'kent-ct',
      'litchfield-ct',
      'torrington-ct',
      'new-milford-ct',
      'woodbury-ct',
      'watertown-ct',
      'thomaston-ct',
      'bethlehem-ct',
      'washington-ct',
    ],
  },
  {
    slug: 'middlesex',
    name: 'Middlesex County',
    description:
      'The lower Connecticut River Valley and shoreline — including Middletown, Old Saybrook, Essex, Durham, and Killingworth. A favourite for shoreline weddings and riverfront corporate events.',
    featuredTowns: [
      'durham-ct',
      'middletown-ct',
      'old-saybrook-ct',
      'essex-ct',
      'clinton-ct',
      'cromwell-ct',
      'east-hampton-ct',
      'portland-ct',
    ],
  },
  {
    slug: 'new-london',
    name: 'New London County',
    description:
      'Southeastern Connecticut and the Mystic shoreline — including New London, Norwich, Groton, Stonington, and Mystic. Strong demand from waterfront weddings and shoreline corporate events.',
    featuredTowns: [
      'new-london-ct',
      'norwich-ct',
      'groton-ct',
      'stonington-ct',
      'east-lyme-ct',
      'waterford-ct',
      'old-lyme-ct',
      'ledyard-ct',
    ],
  },
  {
    slug: 'tolland',
    name: 'Tolland County',
    description:
      'Northeastern CT and the UConn corridor — including Vernon, Tolland, Mansfield, and Ellington. A mix of university, school, and rural-venue events.',
    featuredTowns: [
      'vernon-ct',
      'tolland-ct',
      'mansfield-ct',
      'ellington-ct',
      'coventry-ct',
      'stafford-ct',
      'hebron-ct',
    ],
  },
  {
    slug: 'windham',
    name: 'Windham County',
    description:
      "Connecticut's Quiet Corner — including Putnam, Woodstock, Brooklyn, and Pomfret. Farm, vineyard, and prep-school event demand across the northeast region.",
    featuredTowns: [
      'putnam-ct',
      'woodstock-ct',
      'brooklyn-ct',
      'pomfret-ct',
      'killingly-ct',
      'plainfield-ct',
      'windham-ct',
    ],
  },
];

const SAFE_LINEUP_LINE =
  'Our booth lineup can be tailored around the room: open-air booths for classic guest photos, 360 booths for social-ready video clips, glam booths for editorial portraits, mirror booths for interactive moments, and audio guestbooks for voice messages guests can leave throughout the night.';

const introFor = (name: string, eventList: string) =>
  `${name} events often call for a booth setup that feels polished, compact, and easy for guests to use — whether it is ${eventList}. ${SAFE_LINEUP_LINE}`;

export const TOWNS: Town[] = [
  // ===== FAIRFIELD COUNTY =====
  {
    name: 'Stamford',
    slug: 'stamford-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'corporate',
    nearby: ['greenwich-ct', 'darien-ct', 'new-canaan-ct', 'norwalk-ct'],
    intro:
      'Stamford events span downtown corporate gatherings, hotel weddings, harborside parties, and milestone celebrations — each with its own set of venue requirements. ' +
      SAFE_LINEUP_LINE,
  },
  {
    name: 'Greenwich',
    slug: 'greenwich-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['stamford-ct', 'darien-ct', 'new-canaan-ct', 'westport-ct'],
    intro:
      'Greenwich events often call for a booth setup that feels polished, compact, and easy for guests to use — whether it is a wedding reception, private party, school event, fundraiser, or corporate gathering. ' +
      SAFE_LINEUP_LINE,
  },
  {
    name: 'Norwalk',
    slug: 'norwalk-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'shoreline',
    nearby: ['westport-ct', 'darien-ct', 'wilton-ct', 'new-canaan-ct'],
    intro: introFor(
      'Norwalk',
      'a waterfront wedding, downtown private party, corporate event, school function, or fundraiser'
    ),
  },
  {
    name: 'Fairfield',
    slug: 'fairfield-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'family',
    nearby: ['westport-ct', 'bridgeport-ct', 'easton-ct', 'trumbull-ct'],
    intro: introFor(
      'Fairfield',
      'a shoreline wedding, university event, downtown private party, school function, or fundraiser'
    ),
  },
  {
    name: 'Westport',
    slug: 'westport-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['norwalk-ct', 'weston-ct', 'wilton-ct', 'fairfield-ct'],
    intro: introFor(
      'Westport',
      'a wedding reception, beachside celebration, private party, corporate gathering, or fundraiser'
    ),
  },
  {
    name: 'Darien',
    slug: 'darien-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['new-canaan-ct', 'stamford-ct', 'norwalk-ct', 'greenwich-ct'],
    intro: introFor(
      'Darien',
      'a wedding reception, Sweet 16, private residence event, country-club gathering, or corporate function'
    ),
  },
  {
    name: 'New Canaan',
    slug: 'new-canaan-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['darien-ct', 'stamford-ct', 'wilton-ct', 'norwalk-ct'],
    intro: introFor(
      'New Canaan',
      'a wedding reception, private residence event, school function, gala, or corporate gathering'
    ),
  },
  {
    name: 'Bridgeport',
    slug: 'bridgeport-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'family',
    nearby: ['fairfield-ct', 'trumbull-ct', 'stratford-ct', 'shelton-ct'],
    intro: introFor(
      'Bridgeport',
      'a wedding, quinceañera, Sweet 16, corporate launch, school function, or fundraiser'
    ),
  },
  {
    name: 'Trumbull',
    slug: 'trumbull-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'family',
    nearby: ['fairfield-ct', 'bridgeport-ct', 'shelton-ct', 'monroe-ct'],
    intro: introFor(
      'Trumbull',
      'a school dance, Sweet 16, bar/bat mitzvah, fundraiser, or country-club wedding'
    ),
  },
  {
    name: 'Shelton',
    slug: 'shelton-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'corporate',
    nearby: ['trumbull-ct', 'monroe-ct', 'derby-ct', 'stratford-ct'],
    intro: introFor(
      'Shelton',
      'a corporate event, hotel wedding, country-club reception, fundraiser, or private celebration'
    ),
  },
  {
    name: 'Stratford',
    slug: 'stratford-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'shoreline',
    nearby: ['bridgeport-ct', 'milford-ct', 'shelton-ct', 'trumbull-ct'],
    intro: introFor(
      'Stratford',
      'a waterfront wedding, beach party, corporate function, downtown private event, or fundraiser'
    ),
  },
  {
    name: 'Danbury',
    slug: 'danbury-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'family',
    nearby: ['bethel-ct', 'brookfield-ct', 'new-fairfield-ct', 'newtown-ct'],
    intro: introFor(
      'Danbury',
      'a hotel wedding, university-area event, downtown private party, school function, or lake-area celebration'
    ),
  },
  {
    name: 'Ridgefield',
    slug: 'ridgefield-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['wilton-ct', 'redding-ct', 'danbury-ct', 'new-canaan-ct'],
    intro: introFor(
      'Ridgefield',
      'a downtown wedding, historic-inn reception, country-club event, gala, or private celebration'
    ),
  },
  {
    name: 'Wilton',
    slug: 'wilton-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['norwalk-ct', 'ridgefield-ct', 'weston-ct', 'new-canaan-ct'],
    intro: introFor(
      'Wilton',
      'a wedding, country-club reception, school event, fundraiser, or private gathering'
    ),
  },
  {
    name: 'Weston',
    slug: 'weston-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'luxury',
    nearby: ['westport-ct', 'wilton-ct', 'easton-ct', 'redding-ct'],
    intro: introFor(
      'Weston',
      'a wedding reception, private residence event, Sweet 16, fundraiser, or milestone celebration'
    ),
  },
  {
    name: 'Newtown',
    slug: 'newtown-ct',
    county: 'fairfield',
    tier: 1,
    vibe: 'family',
    nearby: ['bethel-ct', 'monroe-ct', 'brookfield-ct', 'danbury-ct'],
    intro: introFor(
      'Newtown',
      'a wedding, country-club reception, school gala, fundraiser, or private celebration'
    ),
  },
  { name: 'Bethel', slug: 'bethel-ct', county: 'fairfield', tier: 2, vibe: 'family', nearby: ['danbury-ct', 'newtown-ct', 'redding-ct', 'brookfield-ct'] },
  { name: 'Brookfield', slug: 'brookfield-ct', county: 'fairfield', tier: 2, vibe: 'family', nearby: ['danbury-ct', 'bethel-ct', 'new-fairfield-ct', 'newtown-ct'] },
  { name: 'Easton', slug: 'easton-ct', county: 'fairfield', tier: 2, vibe: 'rural', nearby: ['fairfield-ct', 'weston-ct', 'redding-ct', 'monroe-ct'] },
  { name: 'Monroe', slug: 'monroe-ct', county: 'fairfield', tier: 2, vibe: 'family', nearby: ['trumbull-ct', 'shelton-ct', 'newtown-ct', 'easton-ct'] },
  { name: 'New Fairfield', slug: 'new-fairfield-ct', county: 'fairfield', tier: 2, vibe: 'family', nearby: ['danbury-ct', 'sherman-ct', 'brookfield-ct'] },
  { name: 'Redding', slug: 'redding-ct', county: 'fairfield', tier: 2, vibe: 'rural', nearby: ['bethel-ct', 'ridgefield-ct', 'easton-ct', 'weston-ct'] },
  { name: 'Sherman', slug: 'sherman-ct', county: 'fairfield', tier: 3, vibe: 'rural', nearby: ['new-fairfield-ct', 'new-milford-ct'] },

  // ===== NEW HAVEN COUNTY =====
  {
    name: 'New Haven',
    slug: 'new-haven-ct',
    county: 'new-haven',
    tier: 1,
    vibe: 'corporate',
    nearby: ['hamden-ct', 'west-haven-ct', 'east-haven-ct', 'orange-ct'],
    intro: introFor(
      'New Haven',
      'a university-area wedding, downtown private event, hospital function, corporate gathering, or fundraiser'
    ),
  },
  {
    name: 'Cheshire',
    slug: 'cheshire-ct',
    county: 'new-haven',
    tier: 1,
    vibe: 'family',
    nearby: ['wallingford-ct', 'southington-ct', 'meriden-ct', 'prospect-ct'],
    intro: introFor(
      'Cheshire',
      'a Sweet 16, school event, country-club wedding, corporate gathering, or private party'
    ),
  },
  {
    name: 'Derby',
    slug: 'derby-ct',
    county: 'new-haven',
    tier: 1,
    vibe: 'family',
    nearby: ['shelton-ct', 'ansonia-ct', 'seymour-ct', 'orange-ct'],
    intro: introFor(
      'Derby',
      'a downtown banquet event, riverside wedding, school gala, or community fundraiser'
    ),
  },
  { name: 'Milford', slug: 'milford-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['stratford-ct', 'orange-ct', 'west-haven-ct', 'woodbridge-ct'] },
  { name: 'Branford', slug: 'branford-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['guilford-ct', 'east-haven-ct', 'north-branford-ct', 'new-haven-ct'] },
  { name: 'Guilford', slug: 'guilford-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['madison-ct', 'branford-ct', 'north-branford-ct', 'durham-ct'] },
  { name: 'Madison', slug: 'madison-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['guilford-ct', 'clinton-ct', 'killingworth-ct', 'durham-ct'] },
  { name: 'Hamden', slug: 'hamden-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['new-haven-ct', 'north-haven-ct', 'cheshire-ct', 'woodbridge-ct'] },
  { name: 'Wallingford', slug: 'wallingford-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['meriden-ct', 'cheshire-ct', 'north-haven-ct', 'durham-ct'] },
  { name: 'Waterbury', slug: 'waterbury-ct', county: 'new-haven', tier: 2, vibe: 'corporate', nearby: ['naugatuck-ct', 'wolcott-ct', 'middlebury-ct', 'cheshire-ct'] },
  { name: 'Meriden', slug: 'meriden-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['wallingford-ct', 'cheshire-ct', 'southington-ct', 'berlin-ct'] },
  { name: 'Orange', slug: 'orange-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['milford-ct', 'derby-ct', 'woodbridge-ct', 'west-haven-ct'] },
  { name: 'West Haven', slug: 'west-haven-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['new-haven-ct', 'orange-ct', 'milford-ct'] },
  { name: 'East Haven', slug: 'east-haven-ct', county: 'new-haven', tier: 2, vibe: 'shoreline', nearby: ['new-haven-ct', 'branford-ct', 'north-branford-ct'] },
  { name: 'North Haven', slug: 'north-haven-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['hamden-ct', 'wallingford-ct', 'new-haven-ct'] },
  { name: 'Ansonia', slug: 'ansonia-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['derby-ct', 'seymour-ct', 'shelton-ct'] },
  { name: 'Seymour', slug: 'seymour-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['ansonia-ct', 'derby-ct', 'oxford-ct', 'beacon-falls-ct'] },
  { name: 'Naugatuck', slug: 'naugatuck-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['waterbury-ct', 'beacon-falls-ct', 'prospect-ct', 'middlebury-ct'] },
  { name: 'Southbury', slug: 'southbury-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['middlebury-ct', 'woodbury-ct', 'oxford-ct', 'newtown-ct'] },
  { name: 'Woodbridge', slug: 'woodbridge-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['orange-ct', 'bethany-ct', 'hamden-ct', 'new-haven-ct'] },
  { name: 'Middlebury', slug: 'middlebury-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['waterbury-ct', 'southbury-ct', 'watertown-ct', 'naugatuck-ct'] },
  { name: 'Prospect', slug: 'prospect-ct', county: 'new-haven', tier: 2, vibe: 'family', nearby: ['cheshire-ct', 'waterbury-ct', 'naugatuck-ct'] },
  { name: 'Oxford', slug: 'oxford-ct', county: 'new-haven', tier: 2, vibe: 'rural', nearby: ['southbury-ct', 'seymour-ct', 'beacon-falls-ct'] },
  { name: 'Beacon Falls', slug: 'beacon-falls-ct', county: 'new-haven', tier: 3, vibe: 'rural', nearby: ['seymour-ct', 'naugatuck-ct', 'oxford-ct'] },
  { name: 'Bethany', slug: 'bethany-ct', county: 'new-haven', tier: 3, vibe: 'rural', nearby: ['woodbridge-ct', 'cheshire-ct'] },
  { name: 'North Branford', slug: 'north-branford-ct', county: 'new-haven', tier: 3, vibe: 'family', nearby: ['branford-ct', 'east-haven-ct'] },
  { name: 'Wolcott', slug: 'wolcott-ct', county: 'new-haven', tier: 3, vibe: 'family', nearby: ['waterbury-ct', 'bristol-ct', 'cheshire-ct'] },

  // ===== HARTFORD COUNTY =====
  { name: 'Hartford', slug: 'hartford-ct', county: 'hartford', tier: 2, vibe: 'corporate', nearby: ['west-hartford-ct', 'east-hartford-ct', 'newington-ct', 'wethersfield-ct'] },
  { name: 'West Hartford', slug: 'west-hartford-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['hartford-ct', 'farmington-ct', 'newington-ct', 'avon-ct'] },
  {
    name: 'Bristol',
    slug: 'bristol-ct',
    county: 'hartford',
    tier: 1,
    vibe: 'family',
    nearby: ['burlington-ct', 'plainville-ct', 'plymouth-ct', 'southington-ct'],
    intro: introFor(
      'Bristol',
      'a banquet-hall wedding, country-club reception, school gala, corporate event, or community fundraiser'
    ),
  },
  {
    name: 'Berlin',
    slug: 'berlin-ct',
    county: 'hartford',
    tier: 1,
    vibe: 'family',
    nearby: ['new-britain-ct', 'meriden-ct', 'newington-ct', 'cromwell-ct'],
    intro: introFor(
      'Berlin',
      'a central-corridor wedding, Sweet 16, school function, corporate gathering, or fundraiser'
    ),
  },
  {
    name: 'Burlington',
    slug: 'burlington-ct',
    county: 'hartford',
    tier: 1,
    vibe: 'rural',
    nearby: ['bristol-ct', 'farmington-ct', 'harwinton-ct', 'plymouth-ct'],
    intro: introFor(
      'Burlington',
      'a farm wedding, private residence event, school gathering, or community celebration'
    ),
  },
  { name: 'Avon', slug: 'avon-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['simsbury-ct', 'farmington-ct', 'canton-ct', 'west-hartford-ct'] },
  { name: 'Bloomfield', slug: 'bloomfield-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['hartford-ct', 'west-hartford-ct', 'windsor-ct'] },
  { name: 'Canton', slug: 'canton-ct', county: 'hartford', tier: 2, vibe: 'rural', nearby: ['avon-ct', 'simsbury-ct', 'burlington-ct'] },
  { name: 'East Granby', slug: 'east-granby-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['granby-ct', 'windsor-locks-ct', 'suffield-ct'] },
  { name: 'East Hartford', slug: 'east-hartford-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['hartford-ct', 'manchester-ct', 'glastonbury-ct'] },
  { name: 'East Windsor', slug: 'east-windsor-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['windsor-ct', 'south-windsor-ct', 'enfield-ct'] },
  { name: 'Enfield', slug: 'enfield-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['suffield-ct', 'east-windsor-ct', 'somers-ct'] },
  { name: 'Farmington', slug: 'farmington-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['avon-ct', 'west-hartford-ct', 'burlington-ct', 'plainville-ct'] },
  { name: 'Glastonbury', slug: 'glastonbury-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['east-hartford-ct', 'manchester-ct', 'south-windsor-ct'] },
  { name: 'Granby', slug: 'granby-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['simsbury-ct', 'east-granby-ct', 'suffield-ct'] },
  { name: 'Hartland', slug: 'hartland-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['barkhamsted-ct', 'granby-ct'] },
  { name: 'Manchester', slug: 'manchester-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['east-hartford-ct', 'south-windsor-ct', 'vernon-ct', 'glastonbury-ct'] },
  { name: 'Marlborough', slug: 'marlborough-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['glastonbury-ct', 'hebron-ct', 'colchester-ct'] },
  { name: 'New Britain', slug: 'new-britain-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['berlin-ct', 'plainville-ct', 'newington-ct', 'southington-ct'] },
  { name: 'Newington', slug: 'newington-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['hartford-ct', 'wethersfield-ct', 'west-hartford-ct', 'new-britain-ct'] },
  { name: 'Plainville', slug: 'plainville-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['new-britain-ct', 'bristol-ct', 'farmington-ct'] },
  { name: 'Rocky Hill', slug: 'rocky-hill-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['wethersfield-ct', 'cromwell-ct', 'newington-ct'] },
  { name: 'Simsbury', slug: 'simsbury-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['avon-ct', 'canton-ct', 'granby-ct', 'bloomfield-ct'] },
  { name: 'Southington', slug: 'southington-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['plainville-ct', 'cheshire-ct', 'bristol-ct', 'meriden-ct'] },
  { name: 'South Windsor', slug: 'south-windsor-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['manchester-ct', 'east-windsor-ct', 'east-hartford-ct'] },
  { name: 'Suffield', slug: 'suffield-ct', county: 'hartford', tier: 3, vibe: 'rural', nearby: ['enfield-ct', 'east-granby-ct', 'windsor-locks-ct'] },
  { name: 'Wethersfield', slug: 'wethersfield-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['hartford-ct', 'newington-ct', 'rocky-hill-ct'] },
  { name: 'Windsor', slug: 'windsor-ct', county: 'hartford', tier: 2, vibe: 'family', nearby: ['windsor-locks-ct', 'bloomfield-ct', 'east-windsor-ct'] },
  { name: 'Windsor Locks', slug: 'windsor-locks-ct', county: 'hartford', tier: 3, vibe: 'family', nearby: ['windsor-ct', 'east-granby-ct', 'suffield-ct'] },

  // ===== LITCHFIELD COUNTY =====
  {
    name: 'Kent',
    slug: 'kent-ct',
    county: 'litchfield',
    tier: 1,
    vibe: 'rural',
    nearby: ['warren-ct', 'cornwall-ct', 'sharon-ct', 'new-milford-ct'],
    intro: introFor(
      'Kent',
      'a barn wedding, estate event, prep-school gathering, milestone celebration, or rural reception'
    ),
  },
  { name: 'Litchfield', slug: 'litchfield-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['morris-ct', 'goshen-ct', 'thomaston-ct', 'bethlehem-ct'] },
  { name: 'Torrington', slug: 'torrington-ct', county: 'litchfield', tier: 2, vibe: 'family', nearby: ['harwinton-ct', 'winchester-ct', 'litchfield-ct'] },
  { name: 'New Milford', slug: 'new-milford-ct', county: 'litchfield', tier: 2, vibe: 'family', nearby: ['kent-ct', 'sherman-ct', 'brookfield-ct', 'washington-ct'] },
  { name: 'Woodbury', slug: 'woodbury-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['southbury-ct', 'bethlehem-ct', 'watertown-ct', 'washington-ct'] },
  { name: 'Watertown', slug: 'watertown-ct', county: 'litchfield', tier: 2, vibe: 'family', nearby: ['middlebury-ct', 'thomaston-ct', 'woodbury-ct'] },
  { name: 'Thomaston', slug: 'thomaston-ct', county: 'litchfield', tier: 2, vibe: 'family', nearby: ['watertown-ct', 'plymouth-ct', 'litchfield-ct'] },
  { name: 'Bethlehem', slug: 'bethlehem-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['woodbury-ct', 'litchfield-ct', 'morris-ct'] },
  { name: 'Washington', slug: 'washington-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['woodbury-ct', 'roxbury-ct', 'warren-ct'] },
  { name: 'Plymouth', slug: 'plymouth-ct', county: 'litchfield', tier: 2, vibe: 'family', nearby: ['thomaston-ct', 'bristol-ct', 'burlington-ct'] },
  { name: 'Harwinton', slug: 'harwinton-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['burlington-ct', 'torrington-ct', 'litchfield-ct'] },
  { name: 'Goshen', slug: 'goshen-ct', county: 'litchfield', tier: 2, vibe: 'rural', nearby: ['litchfield-ct', 'cornwall-ct', 'norfolk-ct'] },
  { name: 'Morris', slug: 'morris-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['litchfield-ct', 'bethlehem-ct', 'goshen-ct'] },
  { name: 'Barkhamsted', slug: 'barkhamsted-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['new-hartford-ct', 'hartland-ct', 'colebrook-ct'] },
  { name: 'Bridgewater', slug: 'bridgewater-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['new-milford-ct', 'roxbury-ct'] },
  { name: 'Canaan', slug: 'canaan-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['salisbury-ct', 'north-canaan-ct', 'cornwall-ct'] },
  { name: 'Colebrook', slug: 'colebrook-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['norfolk-ct', 'barkhamsted-ct'] },
  { name: 'Cornwall', slug: 'cornwall-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['kent-ct', 'sharon-ct', 'goshen-ct'] },
  { name: 'New Hartford', slug: 'new-hartford-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['canton-ct', 'barkhamsted-ct', 'winchester-ct'] },
  { name: 'Norfolk', slug: 'norfolk-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['canaan-ct', 'goshen-ct', 'colebrook-ct'] },
  { name: 'North Canaan', slug: 'north-canaan-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['canaan-ct', 'salisbury-ct'] },
  { name: 'Roxbury', slug: 'roxbury-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['washington-ct', 'bridgewater-ct'] },
  { name: 'Salisbury', slug: 'salisbury-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['canaan-ct', 'sharon-ct', 'north-canaan-ct'] },
  { name: 'Sharon', slug: 'sharon-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['kent-ct', 'salisbury-ct', 'cornwall-ct'] },
  { name: 'Warren', slug: 'warren-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['kent-ct', 'washington-ct', 'cornwall-ct'] },
  { name: 'Winchester', slug: 'winchester-ct', county: 'litchfield', tier: 3, vibe: 'rural', nearby: ['torrington-ct', 'norfolk-ct', 'new-hartford-ct'] },

  // ===== MIDDLESEX COUNTY =====
  {
    name: 'Durham',
    slug: 'durham-ct',
    county: 'middlesex',
    tier: 1,
    vibe: 'rural',
    nearby: ['middlefield-ct', 'middletown-ct', 'guilford-ct', 'wallingford-ct'],
    intro: introFor(
      'Durham',
      'a farm or barn wedding, school event, milestone birthday, or community gathering'
    ),
  },
  { name: 'Middletown', slug: 'middletown-ct', county: 'middlesex', tier: 2, vibe: 'corporate', nearby: ['cromwell-ct', 'portland-ct', 'durham-ct', 'middlefield-ct'] },
  { name: 'Old Saybrook', slug: 'old-saybrook-ct', county: 'middlesex', tier: 2, vibe: 'shoreline', nearby: ['essex-ct', 'westbrook-ct', 'old-lyme-ct'] },
  { name: 'Essex', slug: 'essex-ct', county: 'middlesex', tier: 2, vibe: 'shoreline', nearby: ['old-saybrook-ct', 'deep-river-ct', 'chester-ct'] },
  { name: 'Clinton', slug: 'clinton-ct', county: 'middlesex', tier: 2, vibe: 'shoreline', nearby: ['madison-ct', 'killingworth-ct', 'westbrook-ct'] },
  { name: 'Cromwell', slug: 'cromwell-ct', county: 'middlesex', tier: 2, vibe: 'family', nearby: ['middletown-ct', 'rocky-hill-ct', 'berlin-ct'] },
  { name: 'East Hampton', slug: 'east-hampton-ct', county: 'middlesex', tier: 2, vibe: 'family', nearby: ['portland-ct', 'colchester-ct', 'middletown-ct'] },
  { name: 'Portland', slug: 'portland-ct', county: 'middlesex', tier: 2, vibe: 'family', nearby: ['middletown-ct', 'east-hampton-ct', 'cromwell-ct'] },
  { name: 'Chester', slug: 'chester-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['deep-river-ct', 'essex-ct', 'killingworth-ct'] },
  { name: 'Deep River', slug: 'deep-river-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['essex-ct', 'chester-ct', 'haddam-ct'] },
  { name: 'East Haddam', slug: 'east-haddam-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['haddam-ct', 'east-hampton-ct', 'colchester-ct'] },
  { name: 'Haddam', slug: 'haddam-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['east-haddam-ct', 'middletown-ct', 'killingworth-ct'] },
  { name: 'Killingworth', slug: 'killingworth-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['clinton-ct', 'madison-ct', 'durham-ct'] },
  { name: 'Middlefield', slug: 'middlefield-ct', county: 'middlesex', tier: 3, vibe: 'rural', nearby: ['middletown-ct', 'durham-ct'] },
  { name: 'Westbrook', slug: 'westbrook-ct', county: 'middlesex', tier: 3, vibe: 'shoreline', nearby: ['old-saybrook-ct', 'clinton-ct'] },

  // ===== NEW LONDON COUNTY =====
  { name: 'New London', slug: 'new-london-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['groton-ct', 'waterford-ct', 'east-lyme-ct'] },
  { name: 'Norwich', slug: 'norwich-ct', county: 'new-london', tier: 2, vibe: 'family', nearby: ['montville-ct', 'preston-ct', 'lisbon-ct', 'bozrah-ct'] },
  { name: 'Groton', slug: 'groton-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['new-london-ct', 'stonington-ct', 'ledyard-ct'] },
  { name: 'Stonington', slug: 'stonington-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['groton-ct', 'north-stonington-ct'] },
  { name: 'East Lyme', slug: 'east-lyme-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['waterford-ct', 'new-london-ct', 'old-lyme-ct'] },
  { name: 'Waterford', slug: 'waterford-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['new-london-ct', 'east-lyme-ct', 'montville-ct'] },
  { name: 'Old Lyme', slug: 'old-lyme-ct', county: 'new-london', tier: 2, vibe: 'shoreline', nearby: ['old-saybrook-ct', 'east-lyme-ct', 'lyme-ct'] },
  { name: 'Ledyard', slug: 'ledyard-ct', county: 'new-london', tier: 2, vibe: 'family', nearby: ['groton-ct', 'preston-ct', 'montville-ct'] },
  { name: 'Montville', slug: 'montville-ct', county: 'new-london', tier: 2, vibe: 'family', nearby: ['norwich-ct', 'waterford-ct', 'ledyard-ct'] },
  { name: 'Colchester', slug: 'colchester-ct', county: 'new-london', tier: 2, vibe: 'family', nearby: ['east-hampton-ct', 'marlborough-ct', 'salem-ct'] },
  { name: 'Bozrah', slug: 'bozrah-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['norwich-ct', 'lebanon-ct', 'salem-ct'] },
  { name: 'Franklin', slug: 'franklin-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['norwich-ct', 'lebanon-ct', 'lisbon-ct'] },
  { name: 'Griswold', slug: 'griswold-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['lisbon-ct', 'plainfield-ct', 'preston-ct'] },
  { name: 'Lebanon', slug: 'lebanon-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['colchester-ct', 'franklin-ct', 'bozrah-ct'] },
  { name: 'Lisbon', slug: 'lisbon-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['norwich-ct', 'griswold-ct', 'franklin-ct'] },
  { name: 'Lyme', slug: 'lyme-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['old-lyme-ct', 'salem-ct', 'east-lyme-ct'] },
  { name: 'North Stonington', slug: 'north-stonington-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['stonington-ct', 'preston-ct'] },
  { name: 'Preston', slug: 'preston-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['norwich-ct', 'ledyard-ct', 'griswold-ct'] },
  { name: 'Salem', slug: 'salem-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['colchester-ct', 'bozrah-ct', 'lyme-ct'] },
  { name: 'Sprague', slug: 'sprague-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['norwich-ct', 'franklin-ct'] },
  { name: 'Voluntown', slug: 'voluntown-ct', county: 'new-london', tier: 3, vibe: 'rural', nearby: ['griswold-ct', 'sterling-ct'] },

  // ===== TOLLAND COUNTY =====
  { name: 'Vernon', slug: 'vernon-ct', county: 'tolland', tier: 2, vibe: 'family', nearby: ['manchester-ct', 'tolland-ct', 'ellington-ct', 'bolton-ct'] },
  { name: 'Tolland', slug: 'tolland-ct', county: 'tolland', tier: 2, vibe: 'family', nearby: ['vernon-ct', 'ellington-ct', 'willington-ct'] },
  { name: 'Mansfield', slug: 'mansfield-ct', county: 'tolland', tier: 2, vibe: 'family', nearby: ['willington-ct', 'coventry-ct', 'tolland-ct'] },
  { name: 'Ellington', slug: 'ellington-ct', county: 'tolland', tier: 2, vibe: 'family', nearby: ['vernon-ct', 'tolland-ct', 'somers-ct'] },
  { name: 'Coventry', slug: 'coventry-ct', county: 'tolland', tier: 2, vibe: 'rural', nearby: ['mansfield-ct', 'tolland-ct', 'bolton-ct'] },
  { name: 'Stafford', slug: 'stafford-ct', county: 'tolland', tier: 2, vibe: 'rural', nearby: ['somers-ct', 'union-ct', 'tolland-ct'] },
  { name: 'Hebron', slug: 'hebron-ct', county: 'tolland', tier: 2, vibe: 'rural', nearby: ['marlborough-ct', 'bolton-ct', 'colchester-ct'] },
  { name: 'Andover', slug: 'andover-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['bolton-ct', 'hebron-ct', 'coventry-ct'] },
  { name: 'Bolton', slug: 'bolton-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['vernon-ct', 'manchester-ct', 'andover-ct'] },
  { name: 'Columbia', slug: 'columbia-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['lebanon-ct', 'hebron-ct', 'mansfield-ct'] },
  { name: 'Somers', slug: 'somers-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['enfield-ct', 'ellington-ct', 'stafford-ct'] },
  { name: 'Union', slug: 'union-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['stafford-ct', 'woodstock-ct'] },
  { name: 'Willington', slug: 'willington-ct', county: 'tolland', tier: 3, vibe: 'rural', nearby: ['tolland-ct', 'stafford-ct', 'mansfield-ct'] },

  // ===== WINDHAM COUNTY =====
  { name: 'Putnam', slug: 'putnam-ct', county: 'windham', tier: 2, vibe: 'family', nearby: ['woodstock-ct', 'pomfret-ct', 'thompson-ct'] },
  { name: 'Woodstock', slug: 'woodstock-ct', county: 'windham', tier: 2, vibe: 'rural', nearby: ['putnam-ct', 'pomfret-ct', 'eastford-ct'] },
  { name: 'Brooklyn', slug: 'brooklyn-ct', county: 'windham', tier: 2, vibe: 'rural', nearby: ['pomfret-ct', 'canterbury-ct', 'killingly-ct'] },
  { name: 'Pomfret', slug: 'pomfret-ct', county: 'windham', tier: 2, vibe: 'rural', nearby: ['woodstock-ct', 'putnam-ct', 'brooklyn-ct'] },
  { name: 'Killingly', slug: 'killingly-ct', county: 'windham', tier: 2, vibe: 'rural', nearby: ['brooklyn-ct', 'thompson-ct', 'putnam-ct'] },
  { name: 'Plainfield', slug: 'plainfield-ct', county: 'windham', tier: 2, vibe: 'rural', nearby: ['canterbury-ct', 'sterling-ct', 'griswold-ct'] },
  { name: 'Windham', slug: 'windham-ct', county: 'windham', tier: 2, vibe: 'family', nearby: ['mansfield-ct', 'chaplin-ct', 'columbia-ct'] },
  { name: 'Thompson', slug: 'thompson-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['putnam-ct', 'killingly-ct', 'woodstock-ct'] },
  { name: 'Ashford', slug: 'ashford-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['willington-ct', 'eastford-ct', 'chaplin-ct'] },
  { name: 'Canterbury', slug: 'canterbury-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['brooklyn-ct', 'plainfield-ct', 'scotland-ct'] },
  { name: 'Chaplin', slug: 'chaplin-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['windham-ct', 'ashford-ct'] },
  { name: 'Eastford', slug: 'eastford-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['woodstock-ct', 'ashford-ct', 'pomfret-ct'] },
  { name: 'Hampton', slug: 'hampton-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['chaplin-ct', 'pomfret-ct'] },
  { name: 'Scotland', slug: 'scotland-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['windham-ct', 'canterbury-ct'] },
  { name: 'Sterling', slug: 'sterling-ct', county: 'windham', tier: 3, vibe: 'rural', nearby: ['plainfield-ct', 'voluntown-ct'] },
];

// ---------- helpers ----------

export function getTownBySlug(slug: string): Town | undefined {
  return TOWNS.find((t) => t.slug === slug);
}

export function getCountyInfo(slug: County): CountyInfo {
  const info = COUNTIES.find((c) => c.slug === slug);
  if (!info) throw new Error(`Unknown county slug: ${slug}`);
  return info;
}

export function getTownsByCounty(county: County): Town[] {
  return TOWNS.filter((t) => t.county === county);
}

export function isIndexable(town: Town): boolean {
  return town.tier === 1 || town.tier === 2;
}

export function getIndexableTowns(): Town[] {
  return TOWNS.filter(isIndexable);
}

export function getNearbyTowns(town: Town, limit = 6): Town[] {
  const explicit = town.nearby
    .map((s) => getTownBySlug(s))
    .filter((t): t is Town => !!t);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fill = TOWNS.filter(
    (t) => t.county === town.county && t.slug !== town.slug && !town.nearby.includes(t.slug)
  ).slice(0, limit - explicit.length);
  return [...explicit, ...fill];
}

/** Default intro for towns without a custom paragraph. */
export function defaultIntroFor(town: Town): string {
  return introFor(
    town.name,
    'a wedding, private party, school event, fundraiser, or corporate gathering'
  );
}

/** Title suffix that varies by vibe so indexable town titles aren't identical. */
export function titleSuffixForVibe(vibe: Vibe = 'family'): string {
  switch (vibe) {
    case 'luxury':
      return '360, Glam & Wedding Booths';
    case 'corporate':
      return 'Brand Activations & Corporate Booths';
    case 'shoreline':
      return 'Coastal Weddings & Event Booths';
    case 'family':
      return 'Sweet 16, Wedding & Party Booths';
    case 'rural':
      return 'Barn Weddings & Event Booths';
  }
}

/** Meta description that varies by vibe + town. */
export function metaDescriptionFor(town: Town): string {
  const v = town.vibe ?? 'family';
  const t = town.name;
  switch (v) {
    case 'luxury':
      return `Photo booth rental in ${t}, CT for weddings, galas, and private events. Open-air, 360, glam, mirror, and audio guestbook options designed for refined ${t} settings.`;
    case 'corporate':
      return `Photo booth rental in ${t}, CT for corporate events, brand activations, conferences, and private gatherings. Branded overlays, custom galleries, and QR sharing options.`;
    case 'shoreline':
      return `Photo booth rental in ${t}, CT for waterfront weddings, summer celebrations, and family events along the shoreline. Open-air, 360, mirror, and audio guestbook options.`;
    case 'rural':
      return `Photo booth rental in ${t}, CT for barn and farm weddings, milestone celebrations, and private gatherings. Booth setups designed to fit rural venues.`;
    case 'family':
    default:
      return `Photo booth rental in ${t}, CT for weddings, Sweet 16s, school events, milestone birthdays, and family celebrations. Open-air, 360, mirror, and audio guestbook options.`;
  }
}

// quick sanity check
export const TOWN_COUNT = TOWNS.length;
