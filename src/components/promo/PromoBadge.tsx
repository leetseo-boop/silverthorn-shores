import { isPromoBoat, PROMO } from "@/lib/promo";

type Props = {
  slug?: string;
  className?: string;
  size?: "sm" | "md";
};

/**
 * Sunset "20% OFF" badge for houseboat cards.
 * Renders nothing if the boat isn't eligible — safe to drop into any card.
 */
export function PromoBadge({ slug, className = "", size = "md" }: Props) {
  if (!isPromoBoat(slug)) return null;
  const pad = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  return (
    <div
      className={`pointer-events-none absolute top-3 right-3 z-20 ${className}`}
      aria-label={`${PROMO.discount} summer promotion`}
    >
      <span
        className={`inline-flex items-center gap-1 rounded-full font-extrabold uppercase tracking-wider text-white shadow-lg ring-2 ring-white/70 promo-badge-glow ${pad}`}
        style={{
          background:
            "linear-gradient(135deg, #FFC24B 0%, #FF8A1F 45%, #E23E57 100%)",
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      >
        <span aria-hidden>☀</span>
        {PROMO.discount}
      </span>
    </div>
  );
}
