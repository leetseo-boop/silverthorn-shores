import promoBanner from "@/assets/promo/fall-lake-getaway-2026.png.asset.json";
import { PROMO, isPromoActive, discounted, money } from "@/lib/promo";

/** Vivid strip that sits at the very top of a hero. */
export function PromoHeroStrip({ href = "/houseboats" }: { href?: string }) {
  if (!isPromoActive()) return null;
  return (
    <a
      href={href}
      className="group relative z-30 block w-full bg-fall-rust px-4 py-2.5 text-center text-fall-cream no-underline sm:py-3"
    >
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] sm:text-sm font-semibold leading-tight">
        <span aria-hidden="true">🍂</span>
        <span className="uppercase tracking-wide">{PROMO.title}</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>{PROMO.percentLabel} Queen, select boats &amp; cabins</span>
        <span className="rounded-full bg-navy px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-fall-cream sm:text-xs">
          CODE {PROMO.code}
        </span>
      </span>
    </a>
  );
}

/** The uploaded campaign banner image. */
export function PromoBannerImage({ href = "/houseboats" }: { href?: string }) {
  if (!isPromoActive()) return null;
  return (
    <section className="bg-fall-cream px-3 py-5 sm:px-6 sm:py-8" aria-label="Shasta Lake Fall Sale 2026">
      <a href={href} className="mx-auto block max-w-6xl overflow-hidden rounded-lg shadow-lg ring-1 ring-border">
        <img
          src={promoBanner.url}
          alt="Shasta Lake Fall Sale 2026 at Silverthorn Resort — 20% off the Queen houseboat, selected boats and cabins, October 1 through 31, code fall26"
          width={1920}
          height={630}
          loading="lazy"
          decoding="async"
          className="w-full h-auto"
        />
      </a>
    </section>
  );
}

/** Compact in-page promo block for individual boat / category pages. */
export function PromoBanner({
  what = "this rental",
  className = "",
}: {
  what?: string;
  className?: string;
}) {
  if (!isPromoActive()) return null;
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-fall-forest px-5 py-5 text-fall-cream shadow-md sm:px-7 sm:py-6 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fall-gold">
            🍁 {PROMO.title} · {PROMO.endsLabel}
          </p>
          <p className="mt-1.5 text-xl sm:text-2xl font-black leading-tight">
            <span className="text-fall-gold">{PROMO.percentLabel}</span> {what}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-white/80">{PROMO.fineprint}</p>
        </div>
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 rounded-lg bg-fall-cream px-4 py-3 font-black tracking-widest text-fall-forest">
            <span className="text-[10px] font-semibold tracking-normal uppercase opacity-70">Code</span>
            <span className="text-lg">{PROMO.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Corner badge for cards. */
export function PromoBadge({ className = "" }: { className?: string }) {
  if (!isPromoActive()) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-fall-rust px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-fall-cream shadow ${className}`}
    >
      🍂 {PROMO.percentLabel}
    </span>
  );
}

/** Struck original price + discounted price. */
export function PromoPrice({
  price,
  decimals = false,
  suffix,
  size = "md",
  tone = "light",
}: {
  price: number;
  decimals?: boolean;
  suffix?: string;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
}) {
  const active = isPromoActive();
  const strike = tone === "dark" ? "text-fall-cream/65" : "text-muted-foreground";
  const accent = tone === "dark" ? "text-fall-gold" : "text-fall-rust";
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }[size];

  if (!active) {
    return (
      <span className={`font-bold ${sizes} ${tone === "dark" ? "text-fall-gold" : "text-navy"}`}>
        {money(price, decimals)}
        {suffix ? <span className="text-xs font-medium opacity-70">{suffix}</span> : null}
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`text-xs font-medium line-through sm:text-sm ${strike}`}>
        {money(price, decimals)}
      </span>
      <span className={`font-black ${sizes} ${accent}`}>
        {money(discounted(price), decimals)}
        {suffix ? <span className="text-xs font-medium opacity-80">{suffix}</span> : null}
      </span>
    </span>
  );
}
