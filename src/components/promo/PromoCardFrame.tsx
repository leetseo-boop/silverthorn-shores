import type { ReactNode } from "react";
import { isPromoBoat } from "@/lib/promo";

type Props = {
  slug?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a card with an animated sunset border/glow when the boat is eligible.
 * Renders children unchanged for non-promo boats so layout stays identical.
 */
export function PromoCardFrame({ slug, children, className = "" }: Props) {
  if (!isPromoBoat(slug)) return <>{children}</>;
  return (
    <div className={`promo-frame relative rounded-2xl ${className}`}>
      <div className="promo-frame-inner relative rounded-2xl">{children}</div>
    </div>
  );
}
