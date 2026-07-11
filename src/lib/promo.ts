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

export function isPromoBoat(slug?: string | null): boolean {
  if (!slug) return false;
  const s = slug.replace(/^\/houseboats\//, "");
  return (PROMO.eligibleSlugs as readonly string[]).includes(s);
}
