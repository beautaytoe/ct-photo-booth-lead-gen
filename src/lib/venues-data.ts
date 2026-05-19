/**
 * Tier-1 town venue dataset.
 *
 * Each entry lists publicly-known event venues in the town so the location
 * pages can:
 *   1. Send users to useful third-party info (good UX + good for local SEO
 *      topical relevance signals)
 *   2. Demonstrate local awareness without claiming partnerships
 *
 * Framing on the page is intentional: "Common event venues in {Town}".
 * We are NOT claiming an exclusive relationship with any venue. URLs
 * point to each venue's primary public website.
 *
 * Verify-before-launch:
 *   - URLs occasionally change (especially for clubs/private venues).
 *   - If a venue closes or changes name, update or remove the row.
 *
 * Schema relevance:
 *   - These outbound links signal topical relevance to Google's algorithm.
 *   - Set rel="noopener" (not nofollow) — these are organic editorial
 *     references, not paid links.
 */

export type VenueType =
  | 'club'           // country club, yacht club, beach club
  | 'hotel'          // hotel ballroom / event venue
  | 'museum'         // museum or historical site
  | 'estate'         // estate / mansion / historic house
  | 'university'     // university or prep school
  | 'theatre'        // theatre / playhouse
  | 'restaurant'     // restaurant / brewery / banquet hall
  | 'park'           // park / outdoor venue
  | 'civic';         // library, town hall, community center

export interface Venue {
  name: string;
  url: string;
  type: VenueType;
}

/** Keyed by town slug. Only Tier 1 towns populated. */
export const VENUES: Record<string, Venue[]> = {
  'stamford-ct': [
    { name: 'Stamford Marriott Hotel & Spa', url: 'https://www.marriott.com/hotels/travel/hpnct-stamford-marriott-hotel-and-spa/', type: 'hotel' },
    { name: 'Hilton Stamford Hotel & Executive Meeting Center', url: 'https://www.hilton.com/en/hotels/stfcthf-hilton-stamford-hotel-and-executive-meeting-center/', type: 'hotel' },
    { name: 'Stamford Yacht Club', url: 'https://www.stamfordyc.com/', type: 'club' },
    { name: 'The Italian Center of Stamford', url: 'https://www.italiancenter.org/', type: 'civic' },
    { name: 'The Avon Theatre Film Center', url: 'https://www.avontheatre.org/', type: 'theatre' },
    { name: 'Stamford Museum & Nature Center', url: 'https://www.stamfordmuseum.org/', type: 'museum' },
  ],
  'greenwich-ct': [
    { name: 'Belle Haven Club', url: 'https://www.bellehavenclub.com/', type: 'club' },
    { name: 'Greenwich Country Club', url: 'https://www.greenwichcountryclub.org/', type: 'club' },
    { name: 'Riverside Yacht Club', url: 'https://www.riversideyc.com/', type: 'club' },
    { name: 'The Stanwich Club', url: 'https://www.stanwichclub.com/', type: 'club' },
    { name: 'Round Hill Club', url: 'https://www.roundhillclub.org/', type: 'club' },
    { name: 'Bruce Museum', url: 'https://brucemuseum.org/', type: 'museum' },
    { name: 'Hyatt Regency Greenwich', url: 'https://www.hyatt.com/en-US/hotel/connecticut/hyatt-regency-greenwich/grnrg', type: 'hotel' },
    { name: 'Delamar Greenwich Harbor', url: 'https://www.thedelamar.com/', type: 'hotel' },
  ],
  'norwalk-ct': [
    { name: 'The Maritime Aquarium at Norwalk', url: 'https://www.maritimeaquarium.org/', type: 'museum' },
    { name: 'Stepping Stones Museum for Children', url: 'https://www.steppingstonesmuseum.org/', type: 'museum' },
    { name: 'Lockwood-Mathews Mansion Museum', url: 'https://www.lockwoodmathewsmansion.com/', type: 'museum' },
    { name: 'Norwalk Inn & Conference Center', url: 'https://www.norwalkinn.com/', type: 'hotel' },
    { name: 'Continental Manor', url: 'https://continentalmanor.com/', type: 'restaurant' },
    { name: 'The Wall Street Theater', url: 'https://thewallst.com/', type: 'theatre' },
  ],
  'fairfield-ct': [
    { name: 'Fairfield University', url: 'https://www.fairfield.edu/', type: 'university' },
    { name: 'Brooklawn Country Club', url: 'https://www.brooklawncc.com/', type: 'club' },
    { name: 'Patterson Club', url: 'https://www.pattersonclub.com/', type: 'club' },
    { name: 'Pequot Library', url: 'https://www.pequotlibrary.org/', type: 'civic' },
    { name: 'Fairfield Museum and History Center', url: 'https://fairfieldhistory.org/', type: 'museum' },
  ],
  'westport-ct': [
    { name: 'The Inn at Longshore', url: 'https://www.innatlongshore.com/', type: 'hotel' },
    { name: 'Saugatuck Rowing Club', url: 'https://saugatuckrowing.com/', type: 'club' },
    { name: 'Birchwood Country Club', url: 'https://www.birchwoodcc.com/', type: 'club' },
    { name: 'Westport Country Playhouse', url: 'https://www.westportplayhouse.org/', type: 'theatre' },
    { name: 'The Westport Library', url: 'https://westportlibrary.org/', type: 'civic' },
  ],
  'darien-ct': [
    { name: 'Wee Burn Country Club', url: 'https://www.weeburn.org/', type: 'club' },
    { name: 'Darien Country Club', url: 'https://www.dccdarien.org/', type: 'club' },
    { name: 'Woodway Country Club', url: 'https://www.woodwaycc.com/', type: 'club' },
    { name: 'Mather Homestead', url: 'https://matherhomestead.org/', type: 'estate' },
    { name: 'Darien Library', url: 'https://www.darienlibrary.org/', type: 'civic' },
  ],
  'new-canaan-ct': [
    { name: 'Country Club of New Canaan', url: 'https://www.theccnc.com/', type: 'club' },
    { name: 'Waveny House', url: 'https://www.newcanaan.info/254/Waveny-House', type: 'estate' },
    { name: 'The Glass House', url: 'https://theglasshouse.org/', type: 'estate' },
    { name: 'New Canaan Country School', url: 'https://www.countryschool.net/', type: 'university' },
    { name: 'New Canaan Library', url: 'https://www.newcanaanlibrary.org/', type: 'civic' },
  ],
  'bridgeport-ct': [
    { name: 'Connecticut\'s Beardsley Zoo', url: 'https://www.beardsleyzoo.org/', type: 'park' },
    { name: 'The Klein Memorial Auditorium', url: 'https://www.theklein.org/', type: 'theatre' },
    { name: 'Discovery Museum and Planetarium', url: 'https://www.discoverymuseum.org/', type: 'museum' },
    { name: 'Bijou Theatre', url: 'https://thebijoutheatre.com/', type: 'theatre' },
    { name: 'University of Bridgeport', url: 'https://www.bridgeport.edu/', type: 'university' },
  ],
  'trumbull-ct': [
    { name: 'Tashua Knolls Golf Course', url: 'https://www.tashuaknolls.com/', type: 'club' },
    { name: 'Trumbull Marriott Shelton', url: 'https://www.marriott.com/hotels/travel/hpnct-trumbull-marriott-shelton/', type: 'hotel' },
    { name: 'Trumbull Library', url: 'https://www.trumbull-ct.gov/161/Library', type: 'civic' },
    { name: 'Indian Ledge Park', url: 'https://www.trumbull-ct.gov/214/Indian-Ledge-Park', type: 'park' },
  ],
  'shelton-ct': [
    { name: 'Brownson Country Club', url: 'https://www.brownsoncountryclub.com/', type: 'club' },
    { name: 'The Mountainside Club', url: 'https://www.themountainsideclub.com/', type: 'club' },
    { name: 'Hyatt House Shelton', url: 'https://www.hyatt.com/en-US/hotel/connecticut/hyatt-house-shelton/hpnxs', type: 'hotel' },
    { name: 'Echo Hose Hose Hook & Ladder Banquet Hall', url: 'https://www.echohose.org/', type: 'civic' },
    { name: 'Shelton Public Library — Plumb Memorial', url: 'https://www.sheltonlibrarysystem.org/', type: 'civic' },
  ],
  'stratford-ct': [
    { name: 'Two Roads Brewing Company', url: 'https://tworoadsbrewing.com/', type: 'restaurant' },
    { name: 'Boothe Memorial Park & Museum', url: 'https://www.boothememorialpark.com/', type: 'park' },
    { name: 'Sterling House Community Center', url: 'https://sterlinghousecc.org/', type: 'civic' },
    { name: 'Stratford Library Association', url: 'https://www.stratfordlibrary.org/', type: 'civic' },
  ],
  'danbury-ct': [
    { name: 'Ethan Allen Hotel', url: 'https://www.ethanallenhotel.com/', type: 'hotel' },
    { name: 'Western Connecticut State University', url: 'https://www.wcsu.edu/', type: 'university' },
    { name: 'Tarrywile Mansion & Park', url: 'https://www.tarrywile.com/', type: 'estate' },
    { name: 'The Maron Hotel & Suites', url: 'https://www.maronhotel.com/', type: 'hotel' },
    { name: 'Danbury Public Library', url: 'https://www.danburylibrary.org/', type: 'civic' },
  ],
  'ridgefield-ct': [
    { name: 'The Lounsbury House', url: 'https://lounsburyhouse.org/', type: 'estate' },
    { name: 'The Aldrich Contemporary Art Museum', url: 'https://aldrichart.org/', type: 'museum' },
    { name: 'The Ridgefield Playhouse', url: 'https://ridgefieldplayhouse.org/', type: 'theatre' },
    { name: 'Ridgefield Library', url: 'https://www.ridgefieldlibrary.org/', type: 'civic' },
    { name: 'Silver Spring Country Club', url: 'https://www.silverspringcc.com/', type: 'club' },
  ],
  'wilton-ct': [
    { name: 'Rolling Hills Country Club', url: 'https://www.rhccwilton.org/', type: 'club' },
    { name: 'Ambler Farm', url: 'https://www.amblerfarm.org/', type: 'estate' },
    { name: 'Weir Farm National Historical Park', url: 'https://www.nps.gov/wefa/', type: 'park' },
    { name: 'Wilton Library Association', url: 'https://www.wiltonlibrary.org/', type: 'civic' },
  ],
  'weston-ct': [
    { name: 'Aspetuck Valley Country Club', url: 'https://www.avcc.org/', type: 'club' },
    { name: 'Lachat Town Farm', url: 'https://www.lachattownfarm.org/', type: 'estate' },
    { name: 'Weston Historical Society', url: 'https://westonhistoricalsociety.org/', type: 'museum' },
    { name: 'Weston Public Library', url: 'https://www.westonpubliclibrary.org/', type: 'civic' },
  ],
  'newtown-ct': [
    { name: 'Edmond Town Hall', url: 'https://www.edmondtownhall.org/', type: 'civic' },
    { name: 'The Country Club of Newtown', url: 'https://www.ccofnewtown.com/', type: 'club' },
    { name: 'Newtown Meeting House', url: 'https://www.newtownmeetinghouse.org/', type: 'civic' },
    { name: 'Cherry Grove Farm', url: 'https://www.cherrygrovefarm.com/', type: 'estate' },
  ],
  'new-haven-ct': [
    { name: 'Yale University', url: 'https://www.yale.edu/', type: 'university' },
    { name: 'Omni New Haven Hotel at Yale', url: 'https://www.omnihotels.com/hotels/new-haven-yale', type: 'hotel' },
    { name: 'The Lawn Club', url: 'https://www.lawnclub.com/', type: 'club' },
    { name: 'New Haven Museum', url: 'https://www.newhavenmuseum.org/', type: 'museum' },
    { name: 'Race Brook Country Club', url: 'https://www.racebrookcc.com/', type: 'club' },
    { name: 'The Country Club of New Haven', url: 'https://www.ccnewhaven.org/', type: 'club' },
  ],
  'cheshire-ct': [
    { name: 'The Aqua Turf Club', url: 'https://www.aquaturf.com/', type: 'restaurant' },
    { name: 'Cheshire Public Library', url: 'https://www.cheshirelibrary.org/', type: 'civic' },
    { name: 'Cheshire Park', url: 'https://www.cheshirect.org/government/departments/parks-and-recreation', type: 'park' },
  ],
  'derby-ct': [
    { name: 'Sterling Opera House', url: 'https://www.sterlingoperahouse.com/', type: 'theatre' },
    { name: 'Derby Public Library', url: 'https://www.derbypubliclibrary.org/', type: 'civic' },
    { name: 'Osbornedale State Park', url: 'https://portal.ct.gov/DEEP/State-Parks/Parks/Osbornedale-State-Park', type: 'park' },
  ],
  'bristol-ct': [
    { name: 'Lake Compounce', url: 'https://www.lakecompounce.com/', type: 'park' },
    { name: 'Imagine Nation Museum Early Childhood Learning Center', url: 'https://www.imaginenation.org/', type: 'museum' },
    { name: 'New England Carousel Museum', url: 'https://www.thecarouselmuseum.org/', type: 'museum' },
    { name: 'Bristol Public Library', url: 'https://www.bristollib.com/', type: 'civic' },
  ],
  'berlin-ct': [
    { name: 'Timberlin Park & Golf Course', url: 'https://www.town.berlin.ct.us/timberlin-golf-course', type: 'park' },
    { name: 'Berlin-Peck Memorial Library', url: 'https://www.berlinpeck.org/', type: 'civic' },
    { name: 'Berlin Fairgrounds', url: 'https://www.ctberlinfair.com/', type: 'park' },
  ],
  'burlington-ct': [
    { name: 'Sessions Woods Wildlife Management Area', url: 'https://portal.ct.gov/DEEP/Wildlife/Sessions-Woods/Sessions-Woods-Conservation-Education-Center', type: 'park' },
    { name: 'Burlington Public Library', url: 'https://www.burlingtonctlibrary.info/', type: 'civic' },
  ],
  'durham-ct': [
    { name: 'The Durham Fair', url: 'https://www.durhamfair.com/', type: 'park' },
    { name: 'Durham Public Library', url: 'https://www.durhamlibrary.org/', type: 'civic' },
    { name: 'Powder Ridge Mountain Park & Resort', url: 'https://www.powderridgepark.com/', type: 'park' },
  ],
  'kent-ct': [
    { name: 'Kent School', url: 'https://www.kent-school.edu/', type: 'university' },
    { name: 'Kent Memorial Library', url: 'https://www.kentmemoriallibrary.org/', type: 'civic' },
    { name: 'Kent Falls State Park', url: 'https://portal.ct.gov/DEEP/State-Parks/Parks/Kent-Falls-State-Park', type: 'park' },
    { name: 'Kent Falls Brewing Co.', url: 'https://www.kentfallsbrewing.com/', type: 'restaurant' },
  ],
};

const TYPE_LABEL: Record<VenueType, string> = {
  club: 'Country club',
  hotel: 'Hotel & ballroom',
  museum: 'Museum',
  estate: 'Estate & historic site',
  university: 'University & academic',
  theatre: 'Theatre & playhouse',
  restaurant: 'Restaurant & banquet',
  park: 'Park & outdoor',
  civic: 'Civic & community',
};

export function venueTypeLabel(t: VenueType): string {
  return TYPE_LABEL[t];
}

export function getVenuesForTown(slug: string): Venue[] {
  return VENUES[slug] ?? [];
}
