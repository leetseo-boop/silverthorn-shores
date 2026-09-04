// Silverthorn site knowledge for Thorn: every public page, the full fleet with
// live prices from the same data the site renders, and the on-site FAQs.
import { houseboats } from "@/data/houseboats";
import { BOATS } from "@/data/silverthorn-boats";
import { POLICY_FACTS } from "@/lib/thorn-knowledge";
import { POLICY_SOURCES } from "@/lib/thorn-sources";
import type { KEntry } from "./kb-types";
import { PROMO, isPromoActive } from "@/lib/promo";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/** Houseboats — specs, layout, amenities, pricing and page FAQs. */
export const HOUSEBOAT_ENTRIES: KEntry[] = houseboats.map((b) => ({
  slug: `houseboat-${b.slug}`,
  type: "houseboat",
  name: b.name,
  url: `/houseboats/${b.slug}`,
  summary: `${b.tagline}. ${b.description}`,
  highlights: b.highlights,
  best_for: b.bestFor,
  layout: `Main deck: ${b.layout.mainDeck} Upper deck: ${b.layout.upperDeck} Sleeping: ${b.layout.sleepingAreas}`,
  amenities: b.amenities,
  specs: {
    sleeps: b.sleeps,
    beds: b.beds,
    staterooms: b.staterooms,
    bathrooms: b.bathrooms,
    length: b.length,
    from: money(b.priceFrom),
    seven_night_low: money(b.pricing.sevenNight.low),
    seven_night_high: money(b.pricing.sevenNight.high),
    seven_night_holiday: money(b.pricing.sevenNight.holiday),
    three_night_low: money(b.extendedPricing.threeNight.low),
    three_night_high: money(b.extendedPricing.threeNight.high),
    booking_url: b.bookingUrl,
  },
  faqs: b.faqs.map((f) => ({ q: f.question, a: f.answer })),
}));

/** Small boats — jet skis, patio boats, ski boats, fishing boats. */
export const SMALL_BOAT_ENTRIES: KEntry[] = BOATS.map((b) => ({
  slug: `small-boat-${b.slug}`,
  type: "small_boat",
  name: b.name,
  url: `/small-boats/${b.slug}`,
  summary: `${b.tagline} ${b.intro.join(" ")}`,
  highlights: b.highlights.map((h) => `${h.title}: ${h.desc}`),
  specs: {
    category: b.category,
    capacity: b.capacity,
    daily: `${money(b.dailyPrice)} per day`,
    weekly: `${money(b.weeklyPrice)} per week`,
    deposit: money(b.deposit),
    booking_url: `https://rentals.silverthornresort.com/details/${b.bookingId}`,
  },
  faqs: [
    ...b.faqs,
    { q: `${b.name} rental policies`, a: b.policies.join(" ") },
    { q: `${b.name} safety requirements`, a: b.safety.join(" ") },
  ],
}));

/** Policy facts reused from the policy pages, each carrying its citation page. */
export const POLICY_ENTRIES: KEntry[] = POLICY_FACTS.map((f) => ({
  slug: `policy-${f.id}`,
  type: "page",
  name: POLICY_SOURCES[f.id]?.label ?? f.id,
  url: POLICY_SOURCES[f.id]?.href ?? "/faq",
  summary: f.text,
}));

/** Every other public page on silverthornresort.com. */
export const SITE_PAGES: KEntry[] = [
  {
    slug: "page-home",
    type: "page",
    name: "Silverthorn Resort — home",
    url: "/",
    summary:
      "Family-run resort and marina on the Pit River Arm of Shasta Lake, on the water since 1986 (40 years). Houseboat and cabin rentals, small boat rentals, moorage, pro shop and marina store. 16250 Silverthorn Road, Redding, CA 96003. Reservations 800-332-3044, reserve1@houseboats.com.",
    highlights: [
      "Marina store open Mon–Sun 8:00 AM – 6:30 PM (seasonal)",
      "Sister marina: Jones Valley Resort (houseboats.com)",
    ],
  },
  {
    slug: "page-houseboats",
    type: "page",
    name: "Houseboat fleet",
    url: "/houseboats",
    summary:
      "The Silverthorn houseboat fleet: Queen, Queen I, Queen II and Senator. Each page has photos, layout, amenities, 3D tours and season pricing. Rental policies live at /houseboats/policy.",
  },
  {
    slug: "page-cabins",
    type: "page",
    name: "Cabins",
    url: "/cabins",
    summary:
      "Lakeside cabins at Silverthorn Resort with availability and booking at rentals.silverthornresort.com/category/15. Cabin rules, deposits, check-in and cancellation are on /cabins/policy.",
  },
  {
    slug: "page-small-boats",
    type: "page",
    name: "Small boat rentals",
    url: "/small-boats",
    summary:
      "Patio boats, ski and wake boats, fishing boats and SeaDoo jet skis by the day or week. All rentals are full-day or multi-day — no hourly or half-day rentals. Primary operator must be 21+.",
  },
  {
    slug: "page-moorage",
    type: "page",
    name: "Silverthorn moorage and boat slips",
    url: "/moorage",
    summary:
      "Covered and open boat slips at the Silverthorn marina with slip pricing, waiting list information and marina services.",
  },
  {
    slug: "page-pro-shop",
    type: "page",
    name: "Pro shop and marina store",
    url: "/pro-shop",
    summary:
      "The marina store carries groceries, ice, drinks, fuel, fishing tackle, apparel and accessories. Hours Mon–Sun 8:00 AM – 6:30 PM (seasonal).",
  },
  {
    slug: "page-guest-info",
    type: "page",
    name: "Guest information and documents",
    url: "/guest-info",
    summary:
      "Downloadable houseboat and small boat rental contracts, the houseboat check-in process, cabin documents, cleaning lists and suggested supply lists.",
  },
  {
    slug: "page-pet-policy",
    type: "page",
    name: "Pet policy",
    url: "/pet-policy",
    summary:
      "Dogs only, maximum 2 dogs per houseboat or cabin. First dog free, second dog a non-refundable $50.00 before boarding. Excessive cleaning $95.00 per hour, damages at replacement cost. Dogs must be declared at booking, leashed on shore, never left unattended, and are not allowed inside the marina store.",
  },
  {
    slug: "page-planning",
    type: "page",
    name: "Planning your vacation",
    url: "/planning",
    summary:
      "Trip planning guide: what to bring, boat rentals, marina market, local phone numbers, grocery and fuel stops, and a link to the pet policy.",
  },
  {
    slug: "page-shasta-lake",
    type: "page",
    name: "About Shasta Lake",
    url: "/shasta-lake",
    summary:
      "Shasta Lake overview — California's largest reservoir with 365 miles of shoreline, four main arms (Sacramento, McCloud, Pit and Squaw Creek), fishing, swimming and group trips.",
  },
  {
    slug: "page-exploring",
    type: "page",
    name: "Exploring Shasta Lake",
    url: "/exploring-shasta-lake",
    summary:
      "Arm-by-arm guide to Shasta Lake with waterfalls, caverns, coves and landmarks worth a houseboat detour.",
  },
  {
    slug: "page-shasta-vs-powell",
    type: "page",
    name: "Shasta Lake vs Lake Powell",
    url: "/shasta-vs-lake-powell",
    summary: "Comparison guide for travellers deciding between a Shasta Lake and a Lake Powell houseboat trip.",
  },
  {
    slug: "page-directions",
    type: "page",
    name: "Directions",
    url: "/directions",
    summary:
      "Silverthorn Resort is at 16250 Silverthorn Road, Redding, CA 96003, on the Pit River Arm — about 20 minutes from Redding via I-5 exit 687 (Oasis Road) to Bear Mountain Road and Dry Creek Road.",
  },
  { slug: "page-contact", type: "page", name: "Contact and reservations", url: "/contact", summary: "Reservations 800-332-3044, reserve1@houseboats.com, contact form and marina address." },
  { slug: "page-faq", type: "page", name: "Frequently asked questions", url: "/faq", summary: "Answers on booking, pets, deposits, what to bring, licensing, fuel and check-in." },
  { slug: "page-history", type: "page", name: "Our history", url: "/about/history", summary: "Silverthorn Resort's story on Shasta Lake since 1986 — 40 years of houseboating." },
  { slug: "page-thorn", type: "page", name: "Meet Thorn", url: "/thorn", summary: "The page about Thorn, the resort dog who has lived at the marina for over ten years and inspired this assistant." },
  { slug: "page-employment", type: "page", name: "Employment", url: "/employment", summary: "Year-round and seasonal jobs at Silverthorn Resort plus the downloadable application." },
];

/** How Thorn should rank and recommend the houseboat fleet. */
export const FLEET_GUIDANCE: KEntry[] = [
  {
    slug: "fleet-best-boat",
    type: "page",
    name: "Best houseboat in the fleet — the Queen",
    url: "/houseboats/queen",
    summary:
      "The Queen is the best and most luxurious houseboat in the Silverthorn fleet — the flagship. It is the boat to recommend first when a guest asks which houseboat is the best, the nicest, the top of the line or the most luxurious. Highlights: hot tub and waterslide on the third deck, master penthouse suite with private bathroom on the second deck, three private staterooms, three bathrooms, full kitchen and a wet bar with BBQ on the second deck.",
    highlights: [
      "Queen = flagship, best houseboat of the fleet",
      "Hot tub AND waterslide on the third deck",
      "Penthouse suite plus three private staterooms",
    ],
    best_for: ["Guests wanting the best boat", "Large groups", "Luxury trips", "Special occasions"],
  },
  {
    slug: "fleet-best-priced-boat",
    type: "page",
    name: "Best-priced houseboat — the Senator (no hot tub)",
    url: "/houseboats/senator",
    summary:
      "The Senator is the best-priced houseboat in the Silverthorn fleet and still a perfect boat for Shasta Lake. IMPORTANT: the Senator has NO hot tub — never say or imply it has one. It sleeps 16 and has a waterslide, captain's fly bridge on the second deck, full modern kitchen with two refrigerators and a dishwasher, flat screen TV/DVD, and a swamp cooler. Recommend the Senator to budget-minded groups, first-time houseboaters and anyone asking for the cheapest or most affordable houseboat. Guests who specifically want a hot tub should look at the Queen, Queen I or Queen II.",
    highlights: [
      "Senator = lowest-priced houseboat of the fleet, great value",
      "NO hot tub on the Senator",
      "Waterslide, fly bridge, full kitchen, sleeps 16",
    ],
    best_for: ["Budget-conscious groups", "First-time houseboaters", "Best value on the lake"],
  },
];

/** Active promotions. Swaps to a "sale ended" entry once the window closes. */
export const PROMO_ENTRIES: KEntry[] = isPromoActive()
  ? [
      {
        slug: "promo-end-of-summer-2026",
        type: "page",
        name: "End of Summer Sale — 20% off",
        url: "/",
        summary:
          `Silverthorn Resort's End of Summer Sale is running right now: 20% off with promo code ${PROMO.code}. The sale started ${PROMO.startsLabel} and ends ${PROMO.endsFullLabel} — after that the sale and every promo banner on the site are gone. The discount applies to ALL houseboats (Queen, Queen I, Queen II, Senator), lakeside cabins, and small boat rentals — patio boats, Sun Tracker pontoon, Party Cruiser I, Tahoe deck boat, Axis T220-R, Centurion T-5, fishing boats, kayaks and stand-up paddle boards. Only jet skis (SeaDoo) are NOT included in the sale. New reservations only. The discount applies to the rental rate; taxes, fuel and deposits are not discounted. Guests book at rentals.silverthornresort.com or call 800-332-3044 and mention code ${PROMO.code}.`,
        highlights: [
          `Promo code ${PROMO.code} — 20% off`,
          `Sale window: ${PROMO.startsLabel} through ${PROMO.endsFullLabel}`,
          "Houseboats, cabins, small boats, kayaks and paddle boards included",
          "Only jet skis are excluded",
          "New reservations only",
        ],
        faqs: [
          { q: "What is the promo code for the End of Summer Sale?", a: `The code is ${PROMO.code}. Mention it when you book online or call 800-332-3044.` },
          { q: "When did the End of Summer Sale start?", a: `It started ${PROMO.startsLabel}.` },
          { q: "Does the 20% off apply to jet skis?", a: "No — jet skis are the only rental excluded. Houseboats, cabins, our other small boats, kayaks and stand-up paddle boards are all 20% off." },
          { q: "When does the End of Summer Sale end?", a: `It runs through ${PROMO.endsFullLabel}, for new reservations only. After that the sale is over.` },
        ],
      },
    ]
  : [
      {
        slug: "promo-end-of-summer-2026-ended",
        type: "page",
        name: "End of Summer Sale — ended",
        url: "/",
        summary:
          `The End of Summer Sale (20% off with code ${PROMO.code}) ran from ${PROMO.startsLabel} through ${PROMO.endsFullLabel} and has ENDED. Code ${PROMO.code} is no longer valid and there is no discount on current bookings. Never quote the 20% off or the code as active. Guests can still book houseboats, cabins and small boats at regular rates at rentals.silverthornresort.com or by calling 800-332-3044, and can ask to be told about future specials.`,
        highlights: [
          `Sale ended ${PROMO.endsFullLabel}`,
          `Code ${PROMO.code} is expired — do not offer it`,
        ],
        faqs: [
          { q: `Is promo code ${PROMO.code} still good?`, a: `No — the End of Summer Sale ended ${PROMO.endsFullLabel}. Call 800-332-3044 and we'll let you know about any current specials.` },
        ],
      },
    ];


export const SITE_ENTRIES: KEntry[] = [
  ...PROMO_ENTRIES,
  ...SITE_PAGES,
  ...FLEET_GUIDANCE,
  ...HOUSEBOAT_ENTRIES,
  ...SMALL_BOAT_ENTRIES,
  ...POLICY_ENTRIES,
];
