// End of Summer Sale 2026 — single source of truth.
// Everything promo-related renders only while this window is open and
// disappears automatically after Sept 30, 2026 at 11:59 PM Pacific.

export const PROMO = {
  id: "end-of-summer-2026",
  code: "LABOR26",
  rate: 0.2,
  percentLabel: "20% OFF",
  title: "End of Summer Sale",
  endsLabel: "Extended through September 30",
  startDate: "2026-09-01",
  validThrough: "2026-09-30",
  startsLabel: "September 1, 2026",
  endsFullLabel: "September 30, 2026 at 11:59 PM Pacific",
  fineprint: "New reservations only. Discount applies to the rental rate; taxes, fuel and deposits are not discounted.",
  // 11:59:59 PM Pacific on Sept 30, 2026 = 2026-10-01T06:59:59Z
  endsAt: Date.parse("2026-10-01T06:59:59Z"),
  startsAt: Date.parse("2026-09-01T07:00:00Z"),
  /** Small boats that are NOT part of the sale (jet skis only). */
  excludedBoatSlugs: ["jet-ski"] as string[],
} as const;


export function isPromoActive(now: number = Date.now()): boolean {
  return now <= PROMO.endsAt;
}

export function isBoatIncluded(slug: string): boolean {
  return !PROMO.excludedBoatSlugs.includes(slug);
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
export function rentalAggregateOffer(low: number, high: number, url: string) {
  const promo = isPromoActive();
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
