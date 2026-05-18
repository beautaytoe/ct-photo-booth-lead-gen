/**
 * Connecticut towns dataset for Gold Coast Photo Booth Co.
 *
 * Tier 1: Positive search volume in keyword data OR top-priority Fairfield County markets. Indexable.
 * Tier 2: Other meaningful CT population centers. Indexable with localized content.
 * Tier 3: Very small towns. Routes generated but noindex until expanded.
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

export interface Town {
  name: string;
  slug: string;
  county: County;
  tier: Tier;
  nearby: string[];
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
      "Connecticut's Gold Coast — home to Stamford, Greenwich, Westport, Darien, New Canaan, Fairfield, and Norwalk. Our highest-volume service region for weddings, corporate events, and luxury private parties.",
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
      'Greater New Haven and the Naugatuck Valley — including New Haven, Cheshire, Derby, Branford, Guilford, Madison, Milford, and Wallingford. Strong demand from university events, corporate offices, and shoreline weddings.',
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
      'Greater Hartford and the central corridor — including Hartford, West Hartford, Bristol, Berlin, Burlington, Glastonbury, Farmington, Simsbury, and Manchester. Major corporate and wedding venue market.',
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
      'The Litchfield Hills — including Litchfield, Torrington, Kent, New Milford, Woodbury, and Watertown. Premier wedding country for barn, vineyard, and estate venues in the northwest corner of CT.',
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
      'The lower Connecticut River Valley and shoreline — including Middletown, Old Saybrook, Essex, Durham, and Killingworth. A favorite for shoreline weddings and waterfront corporate events.',
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
      'Southeastern Connecticut and the Mystic shoreline — including New London, Norwich, Groton, Stonington, and Mystic. Strong demand from waterfront weddings, casino-adjacent events, and submarine-base corporate activations.',
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
      'Northeastern CT and the UConn corridor — including Vernon, Tolland, Mansfield, and Ellington. Strong demand from university events, school galas, and rural barn weddings.',
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
      "Connecticut's Quiet Corner — including Putnam, Woodstock, Brooklyn, and Pomfret. Picturesque farm and vineyard weddings, prep-school galas, and intimate private events.",
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

export const TOWNS: Town[] = [
  // ===== FAIRFIELD COUNTY =====
  {
    name: 'Stamford',
    slug: 'stamford-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['greenwich-ct', 'darien-ct', 'new-canaan-ct', 'norwalk-ct'],
    intro:
      "Stamford is the largest city on Connecticut's Gold Coast and our single highest-demand market. We serve downtown corporate events, hotel weddings, harborside galas, and Sweet 16s across every Stamford neighborhood from Shippan and Cove to High Ridge and North Stamford.",
  },
  {
    name: 'Greenwich',
    slug: 'greenwich-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['stamford-ct', 'darien-ct', 'new-canaan-ct', 'westport-ct'],
    intro:
      'Greenwich is the heart of luxury event production in Connecticut. We serve estate weddings in backcountry Greenwich, club events in Belle Haven and Riverside, and corporate activations along the Post Road. Our 360 and glam booths are popular at high-end Greenwich weddings.',
  },
  {
    name: 'Norwalk',
    slug: 'norwalk-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['westport-ct', 'darien-ct', 'wilton-ct', 'new-canaan-ct'],
    intro:
      'Norwalk anchors central Fairfield County with SoNo waterfront venues, Maritime Aquarium events, downtown lofts, and East Norwalk corporate parties. 360 photo booth rental in Norwalk is one of our most-requested services.',
  },
  {
    name: 'Fairfield',
    slug: 'fairfield-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['westport-ct', 'bridgeport-ct', 'easton-ct', 'trumbull-ct'],
    intro:
      'Fairfield blends shoreline weddings near Penfield, Fairfield U. campus events, Greenfield Hill estates, and downtown private parties. Our open-air and glam booths are the most popular pick for Fairfield weddings.',
  },
  {
    name: 'Westport',
    slug: 'westport-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['norwalk-ct', 'weston-ct', 'wilton-ct', 'fairfield-ct'],
    intro:
      'Westport is a premium Fairfield County wedding and corporate event market. We work Compo Beach, downtown Westport restaurants, the Saugatuck waterfront, and estate weddings off Sylvan Road.',
  },
  {
    name: 'Darien',
    slug: 'darien-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['new-canaan-ct', 'stamford-ct', 'norwalk-ct', 'greenwich-ct'],
    intro:
      'Darien is one of the most consistent wedding and Sweet 16 markets in Fairfield County. Country club receptions, Tokeneke estate events, and Noroton waterfront parties make up the bulk of our Darien work.',
  },
  {
    name: 'New Canaan',
    slug: 'new-canaan-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['darien-ct', 'stamford-ct', 'wilton-ct', 'norwalk-ct'],
    intro:
      'New Canaan is a high-end private-event market with country clubs, mid-century estates, downtown galas, and prep-school events at venues across town. Our glam and mirror booths are the most-requested for New Canaan weddings.',
  },
  {
    name: 'Bridgeport',
    slug: 'bridgeport-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['fairfield-ct', 'trumbull-ct', 'stratford-ct', 'shelton-ct'],
    intro:
      'Bridgeport is the largest city in Connecticut and a major venue for weddings, quinceañeras, Sweet 16s, corporate launches, and fundraisers — from downtown ballrooms to Black Rock waterfront events to North End school galas.',
  },
  {
    name: 'Trumbull',
    slug: 'trumbull-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['fairfield-ct', 'bridgeport-ct', 'shelton-ct', 'monroe-ct'],
    intro:
      'Trumbull is a high-volume town for school dances, Sweet 16s, bar/bat mitzvahs, fundraisers, and country-club weddings. Our open-air and 360 booths are the most popular Trumbull pick.',
  },
  {
    name: 'Shelton',
    slug: 'shelton-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['trumbull-ct', 'monroe-ct', 'derby-ct', 'stratford-ct'],
    intro:
      'Shelton anchors the Lower Naugatuck Valley with major corporate parks, hotel ballrooms, country-club weddings, and Huntington Center private parties — a strong corporate and wedding photo booth market.',
  },
  {
    name: 'Stratford',
    slug: 'stratford-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['bridgeport-ct', 'milford-ct', 'shelton-ct', 'trumbull-ct'],
    intro:
      'Stratford serves Long Island Sound waterfront weddings, Sikorsky-adjacent corporate events, Lordship beach parties, and downtown banquet halls. "Stratford photo booth" and "Stratford photo booth rental" are among our highest-volume town searches.',
  },
  {
    name: 'Danbury',
    slug: 'danbury-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['bethel-ct', 'brookfield-ct', 'new-fairfield-ct', 'newtown-ct'],
    intro:
      'Danbury is the largest market in northern Fairfield County, with hotel ballrooms, Western CT State University events, downtown lofts, and lake-area weddings on Candlewood. Photo booth rental in Danbury is a top search in our keyword data.',
  },
  {
    name: 'Ridgefield',
    slug: 'ridgefield-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['wilton-ct', 'redding-ct', 'danbury-ct', 'new-canaan-ct'],
    intro:
      'Ridgefield is one of the most picturesque wedding towns in Connecticut, with downtown inns, country clubs, and Main Street historic venues. Glam and open-air photo booths dominate our Ridgefield bookings.',
  },
  {
    name: 'Wilton',
    slug: 'wilton-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['norwalk-ct', 'ridgefield-ct', 'weston-ct', 'new-canaan-ct'],
    intro:
      'Wilton is a strong wedding, school-event, and corporate market — Cannondale-area estate weddings, country-club receptions, and corporate office parks all book consistently.',
  },
  {
    name: 'Weston',
    slug: 'weston-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['westport-ct', 'wilton-ct', 'easton-ct', 'redding-ct'],
    intro:
      'Weston is a quiet, premium estate-wedding and Sweet 16 market. Most of our Weston bookings are private residences and country-club events.',
  },
  {
    name: 'Newtown',
    slug: 'newtown-ct',
    county: 'fairfield',
    tier: 1,
    nearby: ['bethel-ct', 'monroe-ct', 'brookfield-ct', 'danbury-ct'],
    intro:
      'Newtown serves the area around Sandy Hook and Hawleyville with hotel weddings, country-club events, school galas, and large private parties. "Photo booth Newtown" is a confirmed search term in our data.',
  },
  { name: 'Bethel', slug: 'bethel-ct', county: 'fairfield', tier: 2, nearby: ['danbury-ct', 'newtown-ct', 'redding-ct', 'brookfield-ct'] },
  { name: 'Brookfield', slug: 'brookfield-ct', county: 'fairfield', tier: 2, nearby: ['danbury-ct', 'bethel-ct', 'new-fairfield-ct', 'newtown-ct'] },
  { name: 'Easton', slug: 'easton-ct', county: 'fairfield', tier: 2, nearby: ['fairfield-ct', 'weston-ct', 'redding-ct', 'monroe-ct'] },
  { name: 'Monroe', slug: 'monroe-ct', county: 'fairfield', tier: 2, nearby: ['trumbull-ct', 'shelton-ct', 'newtown-ct', 'easton-ct'] },
  { name: 'New Fairfield', slug: 'new-fairfield-ct', county: 'fairfield', tier: 2, nearby: ['danbury-ct', 'sherman-ct', 'brookfield-ct'] },
  { name: 'Redding', slug: 'redding-ct', county: 'fairfield', tier: 2, nearby: ['bethel-ct', 'ridgefield-ct', 'easton-ct', 'weston-ct'] },
  { name: 'Sherman', slug: 'sherman-ct', county: 'fairfield', tier: 3, nearby: ['new-fairfield-ct', 'new-milford-ct'] },

  // ===== NEW HAVEN COUNTY =====
  {
    name: 'New Haven',
    slug: 'new-haven-ct',
    county: 'new-haven',
    tier: 1,
    nearby: ['hamden-ct', 'west-haven-ct', 'east-haven-ct', 'orange-ct'],
    intro:
      'New Haven is a major university, hospital, and corporate event market — Yale-area receptions, Long Wharf and Wooster Square weddings, downtown lofts, and East Rock private parties. Photo booth rental in New Haven is one of our most-searched town keywords.',
  },
  {
    name: 'Cheshire',
    slug: 'cheshire-ct',
    county: 'new-haven',
    tier: 1,
    nearby: ['wallingford-ct', 'southington-ct', 'meriden-ct', 'prospect-ct'],
    intro:
      'Cheshire is a consistent town for Sweet 16s, school events, country-club weddings, and corporate parties. "Photo booth Cheshire" is a confirmed positive-volume search.',
  },
  {
    name: 'Derby',
    slug: 'derby-ct',
    county: 'new-haven',
    tier: 1,
    nearby: ['shelton-ct', 'ansonia-ct', 'seymour-ct', 'orange-ct'],
    intro:
      'Derby is the smallest city in Connecticut by area but a strong Lower Naugatuck Valley event market — downtown banquet halls, riverside weddings, and school galas. "Photo booth Derby" appears in our keyword data.',
  },
  {
    name: 'Milford',
    slug: 'milford-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['stratford-ct', 'orange-ct', 'west-haven-ct', 'woodbridge-ct'],
  },
  {
    name: 'Branford',
    slug: 'branford-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['guilford-ct', 'east-haven-ct', 'north-branford-ct', 'new-haven-ct'],
  },
  {
    name: 'Guilford',
    slug: 'guilford-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['madison-ct', 'branford-ct', 'north-branford-ct', 'durham-ct'],
  },
  {
    name: 'Madison',
    slug: 'madison-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['guilford-ct', 'clinton-ct', 'killingworth-ct', 'durham-ct'],
  },
  {
    name: 'Hamden',
    slug: 'hamden-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['new-haven-ct', 'north-haven-ct', 'cheshire-ct', 'woodbridge-ct'],
  },
  {
    name: 'Wallingford',
    slug: 'wallingford-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['meriden-ct', 'cheshire-ct', 'north-haven-ct', 'durham-ct'],
  },
  {
    name: 'Waterbury',
    slug: 'waterbury-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['naugatuck-ct', 'wolcott-ct', 'middlebury-ct', 'cheshire-ct'],
  },
  {
    name: 'Meriden',
    slug: 'meriden-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['wallingford-ct', 'cheshire-ct', 'southington-ct', 'berlin-ct'],
  },
  {
    name: 'Orange',
    slug: 'orange-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['milford-ct', 'derby-ct', 'woodbridge-ct', 'west-haven-ct'],
  },
  {
    name: 'West Haven',
    slug: 'west-haven-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['new-haven-ct', 'orange-ct', 'milford-ct'],
  },
  {
    name: 'East Haven',
    slug: 'east-haven-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['new-haven-ct', 'branford-ct', 'north-branford-ct'],
  },
  {
    name: 'North Haven',
    slug: 'north-haven-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['hamden-ct', 'wallingford-ct', 'new-haven-ct'],
  },
  {
    name: 'Ansonia',
    slug: 'ansonia-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['derby-ct', 'seymour-ct', 'shelton-ct'],
  },
  {
    name: 'Seymour',
    slug: 'seymour-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['ansonia-ct', 'derby-ct', 'oxford-ct', 'beacon-falls-ct'],
  },
  {
    name: 'Naugatuck',
    slug: 'naugatuck-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['waterbury-ct', 'beacon-falls-ct', 'prospect-ct', 'middlebury-ct'],
  },
  {
    name: 'Southbury',
    slug: 'southbury-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['middlebury-ct', 'woodbury-ct', 'oxford-ct', 'newtown-ct'],
  },
  {
    name: 'Woodbridge',
    slug: 'woodbridge-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['orange-ct', 'bethany-ct', 'hamden-ct', 'new-haven-ct'],
  },
  {
    name: 'Middlebury',
    slug: 'middlebury-ct',
    county: 'new-haven',
    tier: 2,
    nearby: ['waterbury-ct', 'southbury-ct', 'watertown-ct', 'naugatuck-ct'],
  },
  { name: 'Prospect', slug: 'prospect-ct', county: 'new-haven', tier: 2, nearby: ['cheshire-ct', 'waterbury-ct', 'naugatuck-ct'] },
  { name: 'Oxford', slug: 'oxford-ct', county: 'new-haven', tier: 2, nearby: ['southbury-ct', 'seymour-ct', 'beacon-falls-ct'] },
  { name: 'Beacon Falls', slug: 'beacon-falls-ct', county: 'new-haven', tier: 3, nearby: ['seymour-ct', 'naugatuck-ct', 'oxford-ct'] },
  { name: 'Bethany', slug: 'bethany-ct', county: 'new-haven', tier: 3, nearby: ['woodbridge-ct', 'cheshire-ct'] },
  { name: 'North Branford', slug: 'north-branford-ct', county: 'new-haven', tier: 3, nearby: ['branford-ct', 'east-haven-ct'] },
  { name: 'Wolcott', slug: 'wolcott-ct', county: 'new-haven', tier: 3, nearby: ['waterbury-ct', 'bristol-ct', 'cheshire-ct'] },

  // ===== HARTFORD COUNTY =====
  {
    name: 'Hartford',
    slug: 'hartford-ct',
    county: 'hartford',
    tier: 2,
    nearby: ['west-hartford-ct', 'east-hartford-ct', 'newington-ct', 'wethersfield-ct'],
  },
  {
    name: 'West Hartford',
    slug: 'west-hartford-ct',
    county: 'hartford',
    tier: 2,
    nearby: ['hartford-ct', 'farmington-ct', 'newington-ct', 'avon-ct'],
  },
  {
    name: 'Bristol',
    slug: 'bristol-ct',
    county: 'hartford',
    tier: 1,
    nearby: ['burlington-ct', 'plainville-ct', 'plymouth-ct', 'southington-ct'],
    intro:
      'Bristol anchors the central CT corridor with downtown banquet halls, country-club weddings, ESPN-area corporate events, and school galas. "Photo booth Bristol" and "photo booth rental Bristol" are both confirmed positive-volume terms.',
  },
  {
    name: 'Berlin',
    slug: 'berlin-ct',
    county: 'hartford',
    tier: 1,
    nearby: ['new-britain-ct', 'meriden-ct', 'newington-ct', 'cromwell-ct'],
    intro:
      "Berlin sits at Connecticut's geographic center and serves central corridor weddings, corporate events, and Sweet 16s. \"Photo booth Berlin\" is a confirmed search term in our data.",
  },
  {
    name: 'Burlington',
    slug: 'burlington-ct',
    county: 'hartford',
    tier: 1,
    nearby: ['bristol-ct', 'farmington-ct', 'harwinton-ct', 'plymouth-ct'],
    intro:
      'Burlington is a quieter Hartford-County town with strong farm-wedding, school-event, and private-residence demand. "Photo booth Burlington" appears in our keyword data.',
  },
  { name: 'Avon', slug: 'avon-ct', county: 'hartford', tier: 2, nearby: ['simsbury-ct', 'farmington-ct', 'canton-ct', 'west-hartford-ct'] },
  { name: 'Bloomfield', slug: 'bloomfield-ct', county: 'hartford', tier: 2, nearby: ['hartford-ct', 'west-hartford-ct', 'windsor-ct'] },
  { name: 'Canton', slug: 'canton-ct', county: 'hartford', tier: 2, nearby: ['avon-ct', 'simsbury-ct', 'burlington-ct'] },
  { name: 'East Granby', slug: 'east-granby-ct', county: 'hartford', tier: 3, nearby: ['granby-ct', 'windsor-locks-ct', 'suffield-ct'] },
  { name: 'East Hartford', slug: 'east-hartford-ct', county: 'hartford', tier: 2, nearby: ['hartford-ct', 'manchester-ct', 'glastonbury-ct'] },
  { name: 'East Windsor', slug: 'east-windsor-ct', county: 'hartford', tier: 3, nearby: ['windsor-ct', 'south-windsor-ct', 'enfield-ct'] },
  { name: 'Enfield', slug: 'enfield-ct', county: 'hartford', tier: 2, nearby: ['suffield-ct', 'east-windsor-ct', 'somers-ct'] },
  { name: 'Farmington', slug: 'farmington-ct', county: 'hartford', tier: 2, nearby: ['avon-ct', 'west-hartford-ct', 'burlington-ct', 'plainville-ct'] },
  { name: 'Glastonbury', slug: 'glastonbury-ct', county: 'hartford', tier: 2, nearby: ['east-hartford-ct', 'manchester-ct', 'south-windsor-ct'] },
  { name: 'Granby', slug: 'granby-ct', county: 'hartford', tier: 3, nearby: ['simsbury-ct', 'east-granby-ct', 'suffield-ct'] },
  { name: 'Hartland', slug: 'hartland-ct', county: 'hartford', tier: 3, nearby: ['barkhamsted-ct', 'granby-ct'] },
  { name: 'Manchester', slug: 'manchester-ct', county: 'hartford', tier: 2, nearby: ['east-hartford-ct', 'south-windsor-ct', 'vernon-ct', 'glastonbury-ct'] },
  { name: 'Marlborough', slug: 'marlborough-ct', county: 'hartford', tier: 3, nearby: ['glastonbury-ct', 'hebron-ct', 'colchester-ct'] },
  { name: 'New Britain', slug: 'new-britain-ct', county: 'hartford', tier: 2, nearby: ['berlin-ct', 'plainville-ct', 'newington-ct', 'southington-ct'] },
  { name: 'Newington', slug: 'newington-ct', county: 'hartford', tier: 2, nearby: ['hartford-ct', 'wethersfield-ct', 'west-hartford-ct', 'new-britain-ct'] },
  { name: 'Plainville', slug: 'plainville-ct', county: 'hartford', tier: 2, nearby: ['new-britain-ct', 'bristol-ct', 'farmington-ct'] },
  { name: 'Rocky Hill', slug: 'rocky-hill-ct', county: 'hartford', tier: 2, nearby: ['wethersfield-ct', 'cromwell-ct', 'newington-ct'] },
  { name: 'Simsbury', slug: 'simsbury-ct', county: 'hartford', tier: 2, nearby: ['avon-ct', 'canton-ct', 'granby-ct', 'bloomfield-ct'] },
  { name: 'Southington', slug: 'southington-ct', county: 'hartford', tier: 2, nearby: ['plainville-ct', 'cheshire-ct', 'bristol-ct', 'meriden-ct'] },
  { name: 'South Windsor', slug: 'south-windsor-ct', county: 'hartford', tier: 2, nearby: ['manchester-ct', 'east-windsor-ct', 'east-hartford-ct'] },
  { name: 'Suffield', slug: 'suffield-ct', county: 'hartford', tier: 3, nearby: ['enfield-ct', 'east-granby-ct', 'windsor-locks-ct'] },
  { name: 'Wethersfield', slug: 'wethersfield-ct', county: 'hartford', tier: 2, nearby: ['hartford-ct', 'newington-ct', 'rocky-hill-ct'] },
  { name: 'Windsor', slug: 'windsor-ct', county: 'hartford', tier: 2, nearby: ['windsor-locks-ct', 'bloomfield-ct', 'east-windsor-ct'] },
  { name: 'Windsor Locks', slug: 'windsor-locks-ct', county: 'hartford', tier: 3, nearby: ['windsor-ct', 'east-granby-ct', 'suffield-ct'] },

  // ===== LITCHFIELD COUNTY =====
  {
    name: 'Kent',
    slug: 'kent-ct',
    county: 'litchfield',
    tier: 1,
    nearby: ['warren-ct', 'cornwall-ct', 'sharon-ct', 'new-milford-ct'],
    intro:
      'Kent is one of the most-loved barn and estate wedding towns in northwest CT. Our 360 and glam booths are popular at Kent weddings, Kent School events, and private Kent residences. "Wedding photo booth Kent" is a confirmed positive-volume term.',
  },
  { name: 'Litchfield', slug: 'litchfield-ct', county: 'litchfield', tier: 2, nearby: ['morris-ct', 'goshen-ct', 'thomaston-ct', 'bethlehem-ct'] },
  { name: 'Torrington', slug: 'torrington-ct', county: 'litchfield', tier: 2, nearby: ['harwinton-ct', 'winchester-ct', 'litchfield-ct'] },
  { name: 'New Milford', slug: 'new-milford-ct', county: 'litchfield', tier: 2, nearby: ['kent-ct', 'sherman-ct', 'brookfield-ct', 'washington-ct'] },
  { name: 'Woodbury', slug: 'woodbury-ct', county: 'litchfield', tier: 2, nearby: ['southbury-ct', 'bethlehem-ct', 'watertown-ct', 'washington-ct'] },
  { name: 'Watertown', slug: 'watertown-ct', county: 'litchfield', tier: 2, nearby: ['middlebury-ct', 'thomaston-ct', 'woodbury-ct'] },
  { name: 'Thomaston', slug: 'thomaston-ct', county: 'litchfield', tier: 2, nearby: ['watertown-ct', 'plymouth-ct', 'litchfield-ct'] },
  { name: 'Bethlehem', slug: 'bethlehem-ct', county: 'litchfield', tier: 2, nearby: ['woodbury-ct', 'litchfield-ct', 'morris-ct'] },
  { name: 'Washington', slug: 'washington-ct', county: 'litchfield', tier: 2, nearby: ['woodbury-ct', 'roxbury-ct', 'warren-ct'] },
  { name: 'Plymouth', slug: 'plymouth-ct', county: 'litchfield', tier: 2, nearby: ['thomaston-ct', 'bristol-ct', 'burlington-ct'] },
  { name: 'Harwinton', slug: 'harwinton-ct', county: 'litchfield', tier: 2, nearby: ['burlington-ct', 'torrington-ct', 'litchfield-ct'] },
  { name: 'Goshen', slug: 'goshen-ct', county: 'litchfield', tier: 2, nearby: ['litchfield-ct', 'cornwall-ct', 'norfolk-ct'] },
  { name: 'Morris', slug: 'morris-ct', county: 'litchfield', tier: 3, nearby: ['litchfield-ct', 'bethlehem-ct', 'goshen-ct'] },
  { name: 'Barkhamsted', slug: 'barkhamsted-ct', county: 'litchfield', tier: 3, nearby: ['new-hartford-ct', 'hartland-ct', 'colebrook-ct'] },
  { name: 'Bridgewater', slug: 'bridgewater-ct', county: 'litchfield', tier: 3, nearby: ['new-milford-ct', 'roxbury-ct'] },
  { name: 'Canaan', slug: 'canaan-ct', county: 'litchfield', tier: 3, nearby: ['salisbury-ct', 'north-canaan-ct', 'cornwall-ct'] },
  { name: 'Colebrook', slug: 'colebrook-ct', county: 'litchfield', tier: 3, nearby: ['norfolk-ct', 'barkhamsted-ct'] },
  { name: 'Cornwall', slug: 'cornwall-ct', county: 'litchfield', tier: 3, nearby: ['kent-ct', 'sharon-ct', 'goshen-ct'] },
  { name: 'New Hartford', slug: 'new-hartford-ct', county: 'litchfield', tier: 3, nearby: ['canton-ct', 'barkhamsted-ct', 'winchester-ct'] },
  { name: 'Norfolk', slug: 'norfolk-ct', county: 'litchfield', tier: 3, nearby: ['canaan-ct', 'goshen-ct', 'colebrook-ct'] },
  { name: 'North Canaan', slug: 'north-canaan-ct', county: 'litchfield', tier: 3, nearby: ['canaan-ct', 'salisbury-ct'] },
  { name: 'Roxbury', slug: 'roxbury-ct', county: 'litchfield', tier: 3, nearby: ['washington-ct', 'bridgewater-ct'] },
  { name: 'Salisbury', slug: 'salisbury-ct', county: 'litchfield', tier: 3, nearby: ['canaan-ct', 'sharon-ct', 'north-canaan-ct'] },
  { name: 'Sharon', slug: 'sharon-ct', county: 'litchfield', tier: 3, nearby: ['kent-ct', 'salisbury-ct', 'cornwall-ct'] },
  { name: 'Warren', slug: 'warren-ct', county: 'litchfield', tier: 3, nearby: ['kent-ct', 'washington-ct', 'cornwall-ct'] },
  { name: 'Winchester', slug: 'winchester-ct', county: 'litchfield', tier: 3, nearby: ['torrington-ct', 'norfolk-ct', 'new-hartford-ct'] },

  // ===== MIDDLESEX COUNTY =====
  {
    name: 'Durham',
    slug: 'durham-ct',
    county: 'middlesex',
    tier: 1,
    nearby: ['middlefield-ct', 'middletown-ct', 'guilford-ct', 'wallingford-ct'],
    intro:
      'Durham is a small Middlesex County town, but "Durham photo booth" appears in our keyword data — driven by Coginchaug-area school events, the Durham Fair, and rural farm weddings.',
  },
  { name: 'Middletown', slug: 'middletown-ct', county: 'middlesex', tier: 2, nearby: ['cromwell-ct', 'portland-ct', 'durham-ct', 'middlefield-ct'] },
  { name: 'Old Saybrook', slug: 'old-saybrook-ct', county: 'middlesex', tier: 2, nearby: ['essex-ct', 'westbrook-ct', 'old-lyme-ct'] },
  { name: 'Essex', slug: 'essex-ct', county: 'middlesex', tier: 2, nearby: ['old-saybrook-ct', 'deep-river-ct', 'chester-ct'] },
  { name: 'Clinton', slug: 'clinton-ct', county: 'middlesex', tier: 2, nearby: ['madison-ct', 'killingworth-ct', 'westbrook-ct'] },
  { name: 'Cromwell', slug: 'cromwell-ct', county: 'middlesex', tier: 2, nearby: ['middletown-ct', 'rocky-hill-ct', 'berlin-ct'] },
  { name: 'East Hampton', slug: 'east-hampton-ct', county: 'middlesex', tier: 2, nearby: ['portland-ct', 'colchester-ct', 'middletown-ct'] },
  { name: 'Portland', slug: 'portland-ct', county: 'middlesex', tier: 2, nearby: ['middletown-ct', 'east-hampton-ct', 'cromwell-ct'] },
  { name: 'Chester', slug: 'chester-ct', county: 'middlesex', tier: 3, nearby: ['deep-river-ct', 'essex-ct', 'killingworth-ct'] },
  { name: 'Deep River', slug: 'deep-river-ct', county: 'middlesex', tier: 3, nearby: ['essex-ct', 'chester-ct', 'haddam-ct'] },
  { name: 'East Haddam', slug: 'east-haddam-ct', county: 'middlesex', tier: 3, nearby: ['haddam-ct', 'east-hampton-ct', 'colchester-ct'] },
  { name: 'Haddam', slug: 'haddam-ct', county: 'middlesex', tier: 3, nearby: ['east-haddam-ct', 'middletown-ct', 'killingworth-ct'] },
  { name: 'Killingworth', slug: 'killingworth-ct', county: 'middlesex', tier: 3, nearby: ['clinton-ct', 'madison-ct', 'durham-ct'] },
  { name: 'Middlefield', slug: 'middlefield-ct', county: 'middlesex', tier: 3, nearby: ['middletown-ct', 'durham-ct'] },
  { name: 'Westbrook', slug: 'westbrook-ct', county: 'middlesex', tier: 3, nearby: ['old-saybrook-ct', 'clinton-ct'] },

  // ===== NEW LONDON COUNTY =====
  { name: 'New London', slug: 'new-london-ct', county: 'new-london', tier: 2, nearby: ['groton-ct', 'waterford-ct', 'east-lyme-ct'] },
  { name: 'Norwich', slug: 'norwich-ct', county: 'new-london', tier: 2, nearby: ['montville-ct', 'preston-ct', 'lisbon-ct', 'bozrah-ct'] },
  { name: 'Groton', slug: 'groton-ct', county: 'new-london', tier: 2, nearby: ['new-london-ct', 'stonington-ct', 'ledyard-ct'] },
  { name: 'Stonington', slug: 'stonington-ct', county: 'new-london', tier: 2, nearby: ['groton-ct', 'north-stonington-ct'] },
  { name: 'East Lyme', slug: 'east-lyme-ct', county: 'new-london', tier: 2, nearby: ['waterford-ct', 'new-london-ct', 'old-lyme-ct'] },
  { name: 'Waterford', slug: 'waterford-ct', county: 'new-london', tier: 2, nearby: ['new-london-ct', 'east-lyme-ct', 'montville-ct'] },
  { name: 'Old Lyme', slug: 'old-lyme-ct', county: 'new-london', tier: 2, nearby: ['old-saybrook-ct', 'east-lyme-ct', 'lyme-ct'] },
  { name: 'Ledyard', slug: 'ledyard-ct', county: 'new-london', tier: 2, nearby: ['groton-ct', 'preston-ct', 'montville-ct'] },
  { name: 'Montville', slug: 'montville-ct', county: 'new-london', tier: 2, nearby: ['norwich-ct', 'waterford-ct', 'ledyard-ct'] },
  { name: 'Colchester', slug: 'colchester-ct', county: 'new-london', tier: 2, nearby: ['east-hampton-ct', 'marlborough-ct', 'salem-ct'] },
  { name: 'Bozrah', slug: 'bozrah-ct', county: 'new-london', tier: 3, nearby: ['norwich-ct', 'lebanon-ct', 'salem-ct'] },
  { name: 'Franklin', slug: 'franklin-ct', county: 'new-london', tier: 3, nearby: ['norwich-ct', 'lebanon-ct', 'lisbon-ct'] },
  { name: 'Griswold', slug: 'griswold-ct', county: 'new-london', tier: 3, nearby: ['lisbon-ct', 'plainfield-ct', 'preston-ct'] },
  { name: 'Lebanon', slug: 'lebanon-ct', county: 'new-london', tier: 3, nearby: ['colchester-ct', 'franklin-ct', 'bozrah-ct'] },
  { name: 'Lisbon', slug: 'lisbon-ct', county: 'new-london', tier: 3, nearby: ['norwich-ct', 'griswold-ct', 'franklin-ct'] },
  { name: 'Lyme', slug: 'lyme-ct', county: 'new-london', tier: 3, nearby: ['old-lyme-ct', 'salem-ct', 'east-lyme-ct'] },
  { name: 'North Stonington', slug: 'north-stonington-ct', county: 'new-london', tier: 3, nearby: ['stonington-ct', 'preston-ct'] },
  { name: 'Preston', slug: 'preston-ct', county: 'new-london', tier: 3, nearby: ['norwich-ct', 'ledyard-ct', 'griswold-ct'] },
  { name: 'Salem', slug: 'salem-ct', county: 'new-london', tier: 3, nearby: ['colchester-ct', 'bozrah-ct', 'lyme-ct'] },
  { name: 'Sprague', slug: 'sprague-ct', county: 'new-london', tier: 3, nearby: ['norwich-ct', 'franklin-ct'] },
  { name: 'Voluntown', slug: 'voluntown-ct', county: 'new-london', tier: 3, nearby: ['griswold-ct', 'sterling-ct'] },

  // ===== TOLLAND COUNTY =====
  { name: 'Vernon', slug: 'vernon-ct', county: 'tolland', tier: 2, nearby: ['manchester-ct', 'tolland-ct', 'ellington-ct', 'bolton-ct'] },
  { name: 'Tolland', slug: 'tolland-ct', county: 'tolland', tier: 2, nearby: ['vernon-ct', 'ellington-ct', 'willington-ct'] },
  { name: 'Mansfield', slug: 'mansfield-ct', county: 'tolland', tier: 2, nearby: ['willington-ct', 'coventry-ct', 'tolland-ct'] },
  { name: 'Ellington', slug: 'ellington-ct', county: 'tolland', tier: 2, nearby: ['vernon-ct', 'tolland-ct', 'somers-ct'] },
  { name: 'Coventry', slug: 'coventry-ct', county: 'tolland', tier: 2, nearby: ['mansfield-ct', 'tolland-ct', 'bolton-ct'] },
  { name: 'Stafford', slug: 'stafford-ct', county: 'tolland', tier: 2, nearby: ['somers-ct', 'union-ct', 'tolland-ct'] },
  { name: 'Hebron', slug: 'hebron-ct', county: 'tolland', tier: 2, nearby: ['marlborough-ct', 'bolton-ct', 'colchester-ct'] },
  { name: 'Andover', slug: 'andover-ct', county: 'tolland', tier: 3, nearby: ['bolton-ct', 'hebron-ct', 'coventry-ct'] },
  { name: 'Bolton', slug: 'bolton-ct', county: 'tolland', tier: 3, nearby: ['vernon-ct', 'manchester-ct', 'andover-ct'] },
  { name: 'Columbia', slug: 'columbia-ct', county: 'tolland', tier: 3, nearby: ['lebanon-ct', 'hebron-ct', 'mansfield-ct'] },
  { name: 'Somers', slug: 'somers-ct', county: 'tolland', tier: 3, nearby: ['enfield-ct', 'ellington-ct', 'stafford-ct'] },
  { name: 'Union', slug: 'union-ct', county: 'tolland', tier: 3, nearby: ['stafford-ct', 'woodstock-ct'] },
  { name: 'Willington', slug: 'willington-ct', county: 'tolland', tier: 3, nearby: ['tolland-ct', 'stafford-ct', 'mansfield-ct'] },

  // ===== WINDHAM COUNTY =====
  { name: 'Putnam', slug: 'putnam-ct', county: 'windham', tier: 2, nearby: ['woodstock-ct', 'pomfret-ct', 'thompson-ct'] },
  { name: 'Woodstock', slug: 'woodstock-ct', county: 'windham', tier: 2, nearby: ['putnam-ct', 'pomfret-ct', 'eastford-ct'] },
  { name: 'Brooklyn', slug: 'brooklyn-ct', county: 'windham', tier: 2, nearby: ['pomfret-ct', 'canterbury-ct', 'killingly-ct'] },
  { name: 'Pomfret', slug: 'pomfret-ct', county: 'windham', tier: 2, nearby: ['woodstock-ct', 'putnam-ct', 'brooklyn-ct'] },
  { name: 'Killingly', slug: 'killingly-ct', county: 'windham', tier: 2, nearby: ['brooklyn-ct', 'thompson-ct', 'putnam-ct'] },
  { name: 'Plainfield', slug: 'plainfield-ct', county: 'windham', tier: 2, nearby: ['canterbury-ct', 'sterling-ct', 'griswold-ct'] },
  { name: 'Windham', slug: 'windham-ct', county: 'windham', tier: 2, nearby: ['mansfield-ct', 'chaplin-ct', 'columbia-ct'] },
  { name: 'Thompson', slug: 'thompson-ct', county: 'windham', tier: 3, nearby: ['putnam-ct', 'killingly-ct', 'woodstock-ct'] },
  { name: 'Ashford', slug: 'ashford-ct', county: 'windham', tier: 3, nearby: ['willington-ct', 'eastford-ct', 'chaplin-ct'] },
  { name: 'Canterbury', slug: 'canterbury-ct', county: 'windham', tier: 3, nearby: ['brooklyn-ct', 'plainfield-ct', 'scotland-ct'] },
  { name: 'Chaplin', slug: 'chaplin-ct', county: 'windham', tier: 3, nearby: ['windham-ct', 'ashford-ct'] },
  { name: 'Eastford', slug: 'eastford-ct', county: 'windham', tier: 3, nearby: ['woodstock-ct', 'ashford-ct', 'pomfret-ct'] },
  { name: 'Hampton', slug: 'hampton-ct', county: 'windham', tier: 3, nearby: ['chaplin-ct', 'pomfret-ct'] },
  { name: 'Scotland', slug: 'scotland-ct', county: 'windham', tier: 3, nearby: ['windham-ct', 'canterbury-ct'] },
  { name: 'Sterling', slug: 'sterling-ct', county: 'windham', tier: 3, nearby: ['plainfield-ct', 'voluntown-ct'] },
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
  // Pad with other towns from same county.
  const fill = TOWNS.filter(
    (t) => t.county === town.county && t.slug !== town.slug && !town.nearby.includes(t.slug)
  ).slice(0, limit - explicit.length);
  return [...explicit, ...fill];
}

// quick sanity check: 169 CT towns
export const TOWN_COUNT = TOWNS.length;
