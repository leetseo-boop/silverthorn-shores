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
