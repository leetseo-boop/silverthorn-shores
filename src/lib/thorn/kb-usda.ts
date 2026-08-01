// Shasta-Trinity National Forest (USDA) knowledge, ported from the Boatie
// scrape of https://www.fs.usda.gov/r05/shasta-trinity (public domain).
// Summaries + highlights carry the fees, limits and access rules Thorn quotes.
import type { KEntry } from "./kb-types";

const u = (p: string) => `https://www.fs.usda.gov/r05/shasta-trinity/${p}`;

export const USDA_SHASTA_TRINITY: KEntry[] = [
  {
    slug: "usda-shasta-lake-area",
    type: "local",
    name: "Shasta Lake Area (USDA Forest Service)",
    url: u("recreation/shasta-lake-area"),
    summary:
      "Shasta Lake offers motorized boating, swimming, fishing, hiking and camping as part of the Whiskeytown-Shasta-Trinity National Recreation Area. Visitors should check water levels for campground closures and must follow invasive mussel certification protocols.",
    highlights: [
      "Invasive Mussel-Free Certification required before launching a private boat",
      "20+ campgrounds and 8 specialized boating sites around the lake",
      "Free summer interpretive programs at Antlers Amphitheater",
      "Shasta Recreation Company 530-275-8113; Shasta Lake Ranger Station 530-275-1587",
      "Bear precautions apply to houseboating and shoreline camping",
    ],
  },
  {
    slug: "usda-shasta-lake",
    type: "local",
    name: "Shasta Lake Recreation (USDA)",
    url: u("recreation/shasta-lake"),
    summary:
      "Shasta Lake is open year-round for fishing, developed camping and remote shoreline camping. Developed sites allow 8 people per single unit; remote boat-in sites such as Chirpchatter and Deadlun are fee-free but pack-in/pack-out.",
    highlights: [
      "Open all year for fishing and camping",
      "Developed camping: 8 people and 1 vehicle per single unit",
      "Fish species: rainbow and brown trout, chinook salmon, largemouth and smallmouth bass, catfish, crappie, bluegill, white sturgeon",
      "Clean, drain and dry protocols are mandatory to prevent invasive mussels",
    ],
  },
  {
    slug: "usda-water-activities",
    type: "local",
    name: "Shasta-Trinity Water Activities (USDA)",
    url: u("recreation/opportunities/water-activities"),
    summary:
      "Motorized boating, houseboating, swimming and waterskiing on Shasta, Trinity and Lewiston Lakes, with drive-in and boat-in campgrounds and public ramps at Antlers and Bailey Cove.",
    highlights: [
      "Antlers ramp: four lanes usable to a 75-foot drawdown",
      "Bailey Cove: two lanes usable to a 50-foot drawdown",
      "Arbuckle Flat is one of four boat-access-only campgrounds, far up the Pit Arm",
      "No fireworks; bear precautions and mussel prohibitions apply to houseboaters",
    ],
  },
  {
    slug: "usda-antlers-campground",
    type: "local",
    name: "Antlers Campground (USDA)",
    url: u("recreation/antlers-campground"),
    summary:
      "59 drive-in sites on a bluff above the upper Sacramento Arm, 22 miles north of Redding. Flush toilets, tables and fire rings; no potable water. Boat ramp and amphitheater nearby.",
    highlights: [
      "Single sites $28, double sites $58 per night",
      "Loop 1 open March 1 – Oct 31; Loops 2 and 3 May 10 – Sept 12",
      "No potable water — bring your own",
      "50% discount for Senior and Access Pass holders",
    ],
  },
  {
    slug: "usda-bailey-cove-campground",
    type: "local",
    name: "Bailey Cove Campground (USDA)",
    url: u("recreation/bailey-cove-campground"),
    summary:
      "Forested campground on the McCloud Arm with a boat ramp, day-use area and hiking trail. Sites include tent pad, table, raised fire ring, bear box and paved spur.",
    highlights: [
      "Boat ramp usable from full pool to a 50-foot drawdown",
      "Reservations required May 13 – Sept 15 via Recreation.gov or 1-877-444-6777",
      "Scan & Pay available on site",
    ],
  },
  {
    slug: "usda-ellery-creek-campground",
    type: "local",
    name: "Ellery Creek Campground (USDA)",
    url: u("recreation/ellery-creek-campground"),
    summary:
      "19 forested sites on the McCloud Arm, open April 1 – Sept 12. Boats can moor on the shoreline within sight of camp when the lake is high.",
    highlights: [
      "$28 per night, max 8 people and 1 vehicle per single site",
      "Extra vehicle $12 per night if space allows",
      "Vault toilets, bear boxes, no potable water",
    ],
  },
  {
    slug: "usda-hirz-bay-campground",
    type: "local",
    name: "Hirz Bay Campground (USDA)",
    url: u("recreation/hirz-bay-campground"),
    summary:
      "Open year-round 20 miles northeast of Redding beside the Hirz Bay boat ramp and hiking trail. Flush toilets, fire rings and bear boxes; no potable water.",
    highlights: [
      "Single sites $28 (1 vehicle, 8 people); double sites $56 (2 vehicles, 12 people)",
      "Extra vehicle $12 per night",
      "I-5 exit 698 (Salt Creek/Gilman Road), then 9 miles east",
    ],
  },
  {
    slug: "usda-hirz-bay-1-group",
    type: "local",
    name: "Hirz Bay 1 Group Campground (USDA)",
    url: u("recreation/hirz-bay-1-group-campground"),
    summary:
      "Drive-in group camp on the McCloud Arm for up to 120 people, with two pedestal grills, a fire ring, sinks, vault toilets and 21 paved parking spaces.",
    highlights: [
      "Maximum 120 people; reservations via Recreation.gov",
      "Hirz Bay boat launch about 1 mile away",
      "2-mile Hirz Bay hiking trail from camp",
    ],
  },
  {
    slug: "usda-hirz-bay-2-group",
    type: "local",
    name: "Hirz Bay 2 Group Campground (USDA)",
    url: u("recreation/hirz-bay-2-group-campground"),
    summary:
      "Group camp on the McCloud Arm for up to 80 people with 9 picnic tables, pedestal grill, open fire ring, vault toilets, bear lockers and two water hydrants.",
    highlights: [
      "Maximum 80 people; 23 paved parking spaces",
      "Boat launch 1/2 mile away",
      "Reservations through Recreation.gov",
    ],
  },
  {
    slug: "usda-lakeshore-east",
    type: "local",
    name: "Lakeshore East Campground (USDA)",
    url: u("recreation/lakeshore-east-campground"),
    summary:
      "Paved campsites plus two yurts near the Antlers and Sugarloaf boat ramps, with picnic tables, raised fire rings and an on-site host during reservation season.",
    highlights: ["Two reservable yurts", "Scan & Pay on-site payment", "Close to Antlers and Sugarloaf ramps"],
  },
  {
    slug: "usda-mccloud-bridge",
    type: "local",
    name: "McCloud Bridge Campground (USDA)",
    url: u("recreation/mccloud-bridge-campground"),
    summary:
      "14 drive-in sites on the McCloud Arm with easy water access, set among old ranch fruit trees. Open April 1 – Oct 31. Bear boxes and vault toilets; no potable water.",
    highlights: [
      "Single $28 (8 people), double $56 (12 people); extra vehicle $12",
      "I-5 exit 698, then 20 miles east on Gilman Road",
    ],
  },
  {
    slug: "usda-nelson-point",
    type: "local",
    name: "Nelson Point Campground (USDA)",
    url: u("recreation/nelson-point-campground-group-family"),
    summary:
      "Sacramento Arm campground with walk-in family sites and whole-campground group reservations. Bear boxes, fire rings, vault toilets; water system inoperable.",
    highlights: [
      "Family sites are walk-in only; reservations only for the full group site",
      "Antlers boat ramp about 6 miles away",
    ],
  },
  {
    slug: "usda-pine-point",
    type: "local",
    name: "Pine Point Campground (USDA)",
    url: u("recreation/pine-point-campground-group-family"),
    summary:
      "McCloud Arm group site for up to 100 people, or single-family sites as needed. Vault toilets, drinking water, bear boxes and paved spurs for trailers to 24 feet.",
    highlights: [
      "Group holders call Shasta Recreation Office 530-275-8113 a week ahead for the gate code",
      "Hirz Bay boat ramp 4 miles away",
    ],
  },
  {
    slug: "usda-upper-jones-valley",
    type: "local",
    name: "Upper Jones Valley Campground (USDA)",
    url: u("recreation/upper-jones-valley-campground"),
    summary:
      "8 campsites 9 miles east of Shasta Lake City, opened as needed by Shasta Recreation Company. Tables, fire rings and vault toilets; no potable water.",
    highlights: ["$28 per night", "Trailers up to about 16 feet on unpaved spurs"],
  },
  {
    slug: "usda-lower-jones-valley",
    type: "local",
    name: "Lower Jones Valley Campground (USDA)",
    url: u("recreation/lower-jones-valley-campground"),
    summary:
      "Year-round campground on the Pit River Arm near the Jones Valley boat ramp and Clikapudi Trail — the closest Forest Service camping to Silverthorn. 9 single and 2 double drive-in sites with potable water and bear boxes.",
    highlights: [
      "First-come, first-served — no reservations",
      "Single $26, double $56, extra vehicle $12 per night",
      "Pay by Iron Ranger or Recreation.gov Scan & Pay",
    ],
  },
  {
    slug: "usda-jones-valley-inlet",
    type: "local",
    name: "Jones Valley Inlet Shoreline (USDA)",
    url: u("recreation/jones-valley-inlet-shoreline-campground"),
    summary:
      "Year-round shoreline camping east of Shasta Lake City, pack-in/pack-out with no potable water. Portable restrooms and trash service March 1 – Oct 31.",
    highlights: [
      "$17 per night camping, $12 day use",
      "California campfire permit required during fire season",
      "Fires must be 50 ft from vegetation and within 10 ft of the water during restrictions",
    ],
  },
  {
    slug: "usda-dekkas-rock-group",
    type: "local",
    name: "Dekkas Rock Group Campground (USDA)",
    url: u("recreation/dekkas-rock-group-campground"),
    summary:
      "McCloud Arm group camp for up to 60 people with 8 large tables, 2 campfire rings, drinking water, vault toilets and bear lockers. Reservations year-round.",
    highlights: ["Up to 60 people", "Hirz Bay ramp and 1-mile Hirz Bay Trail nearby"],
  },
  {
    slug: "usda-gregory-creek-group",
    type: "local",
    name: "Gregory Creek Group Campground (USDA)",
    url: u("recreation/gregory-creek-group-campground"),
    summary:
      "Shady drive-in group site on the upper Sacramento Arm with lake access for swimming and fishing. Flush toilets; no potable water. Season May 10 – Sept 12.",
    highlights: ["$160 per night group site", "Nearest ramp at Antlers", "Dates can shift for bald eagle protection"],
  },
  {
    slug: "usda-mariners-point-group",
    type: "local",
    name: "Mariners Point Group Campground (USDA)",
    url: u("recreation/mariners-point-group-campground"),
    summary:
      "Drive-in group campground at the opening of the Pit Arm, currently CLOSED after a slide caused a failure on Silverthorn Road (FS Road 33N8).",
    highlights: ["Currently closed", "$130 per night per loop when open", "No potable water"],
  },
  {
    slug: "usda-chirpchatter",
    type: "local",
    name: "Chirpchatter Campground (USDA)",
    url: u("recreation/chirpchatter-campground"),
    summary:
      "Free remote campground east of Shasta Lake on Fenders Ferry Road, popular with OHV riders and hunters. No lake access and no potable water.",
    highlights: ["No fees, first-come first-served, open year-round", "Rough unimproved dirt road access"],
  },
  {
    slug: "usda-bushytail",
    type: "local",
    name: "Bushytail Campground (USDA, Trinity Lake)",
    url: u("recreation/bushytail-campground"),
    summary:
      "Drive-in multi-group campground near Trinity Lake and a boat ramp, with electric and water hookups at most sites, a two-stall shower and bear lockers.",
    highlights: ["Single, double, triple and quad sites", "Group social area with barbecue pit"],
  },
  {
    slug: "usda-arbuckle-flat-boat",
    type: "local",
    name: "Arbuckle Flat Boat Camp (USDA)",
    url: u("recreation/arbuckle-flat-boat-campground"),
    summary:
      "Free boat-access-only campground far up the Pit Arm — a favourite overnight stop for houseboaters. Vault toilets and tables; pack it in, pack it out.",
    highlights: ["Boat access only", "No fees or reservations", "Campfire permit required"],
  },
  {
    slug: "usda-gooseneck-cove-boat",
    type: "local",
    name: "Gooseneck Cove Boat Camp (USDA)",
    url: u("recreation/gooseneck-cove-boat-campground"),
    summary: "Fee-free boat-in campground on the upper Sacramento Arm with vault toilets and tables; no piped water.",
    highlights: ["Boat access only", "Open 24 hours", "Pack it in, pack it out"],
  },
  {
    slug: "usda-greens-creek-boat",
    type: "local",
    name: "Greens Creek Boat Camp (USDA)",
    url: u("recreation/greens-creek-boat-campground"),
    summary: "Free boat-in campground on the McCloud Arm with vault toilets and tables; no piped water.",
    highlights: ["Boat access only", "No fees", "Pack it in, pack it out"],
  },
  {
    slug: "usda-ski-island-boat",
    type: "local",
    name: "Ski Island Boat Camp (USDA)",
    url: u("recreation/ski-island-boat-campground"),
    summary:
      "Free boat-in campground on the Pit Arm near Mariners Point — very popular in summer with houseboat groups. Vault toilets and tables; no potable water.",
    highlights: ["Boat access only, Pit Arm", "No fees", "Access depends on lake level"],
  },
  {
    slug: "usda-gregory-beach-shoreline",
    type: "local",
    name: "Gregory Beach Shoreline Area (USDA)",
    url: u("recreation/gregory-beach-shoreline-area"),
    summary:
      "Shoreline camping and day use on the upper Sacramento River Arm, open year-round with services May 10 – Sept 12. Pack-in/pack-out, no potable water.",
    highlights: ["$17 per night camping, $12 day use", "I-5 exit 698 then 4 miles on Salt Creek/Gregory Creek Road"],
  },
  {
    slug: "usda-beehive-point-shoreline",
    type: "local",
    name: "Beehive Point Shoreline Area (USDA)",
    url: u("recreation/beehive-point-shoreline-area"),
    summary:
      "Primitive drive-in shoreline camping near Lakehead with no tables or fire rings and no potable water. Campfire permit required.",
    highlights: ["$17 per night camping, $12 day use", "I-5 exit 702 then 3 miles on Lakeshore Drive"],
  },
  {
    slug: "usda-lower-salt-creek-shoreline",
    type: "local",
    name: "Lower Salt Creek Shoreline (USDA)",
    url: u("recreation/lower-salt-creek-shoreline-area"),
    summary: "Year-round shoreline camping and day use off I-5 exit 698 via Gilman Road. No potable water.",
    highlights: ["$17 per night camping, $12 day use", "About 1 mile west of I-5"],
  },
  {
    slug: "usda-fishermans-point-day-use",
    type: "local",
    name: "Fisherman's Point Day-Use Area (USDA)",
    url: u("recreation/fishermans-point-day-use-area"),
    summary:
      "Free day-use and picnic area near Shasta Dam and the Centimudi boat ramp with seven tables and flush toilets; no potable water.",
    highlights: ["No fees", "Closed nightly 10:00 PM – 6:00 AM", "I-5 exit 685 (Shasta Dam Blvd)"],
  },
  {
    slug: "usda-jones-valley-boat-ramp",
    type: "local",
    name: "Jones Valley Public Boat Ramp (USDA)",
    url: u("recreation/jones-valley-public-boat-ramp"),
    summary:
      "Paved year-round day-use ramp on the Pit River Arm near Silverthorn, with four ramps covering drawdowns to 210 feet and flush toilets. No overnight camping.",
    highlights: [
      "4 lanes to 50 ft drawdown, 2 lanes to 140 ft, 1 lane to 210 ft",
      "$17–$18 per vehicle daily fee",
      "Nearby camping: Upper and Lower Jones Valley, Jones Valley Inlet",
    ],
  },
  {
    slug: "usda-hirz-bay-boat-ramp",
    type: "local",
    name: "Hirz Bay Public Boat Ramp (USDA)",
    url: u("recreation/hirz-bay-public-boat-ramp"),
    summary:
      "Paved ramp on the McCloud Arm 20 miles northeast of Redding with three lanes, 61 lit parking spaces, flush toilets and a courtesy dock. Day use only.",
    highlights: ["Three-lane ramp to 75 ft drawdown, two-lane to 95 ft", "$17–$18 per vehicle daily fee"],
  },
  {
    slug: "usda-stnf-alerts",
    type: "local",
    name: "Shasta-Trinity Alerts & Notices (USDA)",
    url: u("alerts-notices"),
    summary:
      "Current alerts for the Shasta-Trinity National Forest including Shasta Lake: mussel prohibition, 2026 fire restrictions forest order, and fire danger rated Moderate at the last scrape. Always tell guests to check the live page for today's status.",
    highlights: [
      "Fireworks and explosives are always prohibited",
      "Mussel prohibition in effect",
      "2026 Fire Restrictions Forest Order active",
    ],
  },
  {
    slug: "usda-camping-stay-limits",
    type: "local",
    name: "Forest-Wide Camping Stay Limits Order (USDA)",
    url: u("alerts/forest-wide-camping-stay-limits-order"),
    summary:
      "Forest Order 14-25-24 limits camping to 30 cumulative days per 12 months forest-wide. Dispersed camping at Shasta Lake is limited to 7 days; other areas allow 15 days per 30-day period.",
    highlights: [
      "7-day dispersed limit in the Shasta Lake area",
      "30-day annual limit at developed sites",
      "In effect Sept 30, 2025 – Sept 30, 2027; fines up to $5,000",
    ],
  },
];
