// Shasta Lake Fall Sale 2026 — single source of truth.
// Everything promotion-related is limited to the October Pacific-time window.

export const PROMO = {
  id: "shasta-lake-fall-sale-2026",
  code: "fall26",
  rate: 0.2,
  percentLabel: "20% OFF",
  title: "Shasta Lake Fall Sale 2026",
  endsLabel: "October 1–31, 2026",
  startDate: "2026-10-01",
  validThrough: "2026-10-31",
  startsLabel: "October 1, 2026",
  endsFullLabel: "October 31, 2026 at 11:59 PM Pacific",
  fineprint: "New reservations only. Restrictions apply. Discount applies to the rental rate; taxes, fuel and deposits are not discounted.",
  // Activated early at 10:36 PM PDT on September 30 so the October campaign is visible immediately.
  startsAt: Date.parse("2026-10-01T05:36:00Z"),
  endsAt: Date.parse("2026-11-01T06:59:59Z"),
  includedHouseboatSlugs: ["queen"] as string[],
  includedBoatSlugs: ["sun-tracker", "patio-boat", "party-cruiser-i", "fishing-boat", "kayak"] as string[],
} as const;


export function isPromoActive(now: number = Date.now()): boolean {
  return now >= PROMO.startsAt && now <= PROMO.endsAt;
}

export function isBoatIncluded(slug: string): boolean {
  return PROMO.includedBoatSlugs.includes(slug);
}

export function isHouseboatIncluded(slug: string): boolean {
  return PROMO.includedHouseboatSlugs.includes(slug);
}

/** Discounted value for a price. */
export function discounted(price: number): number {
  return price * (1 - PROMO.rate);
}

export function money(n: number, decimals = false): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
  })}`;
}

/* ------------------------------------------------------------------ */
/* Structured data helpers — shared by every promo page.               */
/* Reuses the resort's real NAP so Google can tie the offer to the     */
/* Silverthorn Resort local entity.                                    */
/* ------------------------------------------------------------------ */

export const RESORT_PLACE = {
  "@type": "Place",
  name: "Silverthorn Resort",
  telephone: "+1-800-332-3044",
  address: {
    "@type": "PostalAddress",
    streetAddress: "16250 Silverthorn Road",
    addressLocality: "Redding",
    addressRegion: "CA",
    postalCode: "96003",
    addressCountry: "US",
  },
} as const;

export const RESORT_ORG = {
  "@type": "Organization",
  name: "Silverthorn Resort",
  url: "https://silverthornresort.com",
  telephone: "+1-800-332-3044",
} as const;

export const PROMO_OFFER_DESCRIPTION = `${PROMO.percentLabel} with code ${PROMO.code}. New reservations only; discount applies to the rental rate.`;

/** SaleEvent node for a specific page. Returns null when the promo is over. */
export function saleEventJsonLd(opts: { url: string; name: string; description: string }) {
  if (!isPromoActive()) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SaleEvent",
    name: opts.name,
    description: opts.description,
    startDate: PROMO.startDate,
    endDate: PROMO.validThrough,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: RESORT_PLACE,
    organizer: RESORT_ORG,
    offers: {
      "@type": "Offer",
      url: opts.url,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: PROMO.startDate,
      validThrough: PROMO.validThrough,
      priceValidUntil: PROMO.validThrough,
      description: PROMO_OFFER_DESCRIPTION,
    },
  };
}

/** AggregateOffer for a rental, discounted while the promo runs. */
export function rentalAggregateOffer(low: number, high: number, url: string, eligible = true) {
  const promo = eligible && isPromoActive();
  return {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: Math.round(promo ? discounted(low) : low),
    highPrice: Math.round(promo ? discounted(high) : high),
    url,
    availability: "https://schema.org/InStock",
    ...(promo
      ? {
          validFrom: PROMO.startDate,
          validThrough: PROMO.validThrough,
          priceValidUntil: PROMO.validThrough,
          description: PROMO_OFFER_DESCRIPTION,
          offeredBy: RESORT_ORG,
        }
      : {}),
  };
}
