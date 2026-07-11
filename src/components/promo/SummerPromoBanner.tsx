import promoBanner from "@/assets/silverthorn-promo-summer-2026.webp.asset.json";

const BOOK_URL = "https://rentals.silverthornresort.com/category/13";

/**
 * Homepage "Summer Fun Sale" static banner.
 * Full-width clickable image linking to the Queen I / Queen II booking category.
 */
export function SummerPromoBanner() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-6"
      aria-label="Summer Fun Sale — 20% off Queen I and Queen II"
    >
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    </section>
  );
}
