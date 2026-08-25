// Summer Fun Sale — single source of truth for the 20% OFF promotion.
export const PROMO = {
  code: "BREAK20",
  discount: "20% OFF",
  startsOn: "2026-07-12",
  endsOn: "2026-08-25",
  dateLabel: "July 12 – August 25, 2026",
  eligibleSlugs: ["queen-i", "queen-ii"] as const,
  eligibleNames: "Queen I & Queen II",
  fineprint: "New reservations only.",
} as const;

// Promo ends 11:59:59 pm Pacific (PDT, UTC-7) on Aug 25, 2026.
const PROMO_ENDS_AT = Date.parse("2026-08-26T06:59:59Z");

export function isPromoActive(): boolean {
  return Date.now() <= PROMO_ENDS_AT;
}

export function isPromoBoat(slug?: string | null): boolean {
  if (!slug) return false;
  if (!isPromoActive()) return false;
  const s = slug.replace(/^\/houseboats\//, "");
  return (PROMO.eligibleSlugs as readonly string[]).includes(s);
}
