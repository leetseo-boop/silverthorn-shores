import { Link } from "@tanstack/react-router";
import promoBanner from "@/assets/silverthorn-promo-summer-2026.webp.asset.json";

/**
 * Homepage "Summer Fun Sale" static banner.
 * Links to the internal Queen I vs Queen II comparison page.
 */
export function SummerPromoBanner() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-6"
      aria-label="Summer Fun Sale — 20% off Queen I and Queen II"
    >
      <Link
        to="/compare/queens"
        data-cta="home-summer-promo"
        className="block overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-400"
      >
        <img
          src={promoBanner.url}
          alt="Summer Fun Sale — 20% off Queen I and Queen II houseboats. Book July 12 through August 25, 2026 with promo code BREAK20."
          width={1920}
          height={600}
          loading="eager"
          decoding="async"
          // @ts-expect-error - fetchpriority is a valid HTML attribute
          fetchpriority="high"
          className="block h-auto w-full"
        />
      </Link>
    </section>
  );
}
