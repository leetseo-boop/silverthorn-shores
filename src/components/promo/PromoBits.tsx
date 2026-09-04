import promoBanner from "@/assets/promo/end-of-summer-2026.webp.asset.json";
import { PROMO, isPromoActive, discounted, money } from "@/lib/promo";

const ORANGE = "#E8640A";
const NAVY = "#0D2030";
const TEAL = "#3FBFB0";

/** Vivid strip that sits at the very top of a hero. */
export function PromoHeroStrip({ href = "/houseboats" }: { href?: string }) {
  if (!isPromoActive()) return null;
  return (
    <a
      href={href}
      className="group relative z-30 block w-full text-center px-4 py-2.5 sm:py-3 text-white no-underline"
      style={{
        background: `linear-gradient(90deg, ${ORANGE} 0%, #F59E0B 35%, ${TEAL} 100%)`,
      }}
    >
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] sm:text-sm font-semibold leading-tight">
        <span aria-hidden="true">🌞</span>
        <span className="uppercase tracking-wide">{PROMO.title}</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>{PROMO.percentLabel} select houseboats &amp; small boats</span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-bold tracking-wider"
          style={{ backgroundColor: NAVY, color: "#FFD9A0" }}
        >
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
    <section className="bg-white px-3 sm:px-6 py-5 sm:py-8" aria-label="End of Summer Sale">
      <a href={href} className="block max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
        <img
          src={promoBanner.url}
          alt="Silverthorn Resort End of Summer Deals — 20% off all houseboats, 20% off small boats except jet skis, and 20% off cabins, extended through September 30, code LABOR26"
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
      className={`relative overflow-hidden rounded-2xl px-5 py-5 sm:px-7 sm:py-6 text-white shadow-md ${className}`}
      style={{ background: `linear-gradient(115deg, ${NAVY} 0%, #14486B 55%, ${ORANGE} 130%)` }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#7FE3D6" }}>
            {PROMO.title} · {PROMO.endsLabel}
          </p>
          <p className="mt-1.5 text-xl sm:text-2xl font-black leading-tight">
            <span style={{ color: "#FFB36B" }}>{PROMO.percentLabel}</span> {what}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-white/80">{PROMO.fineprint}</p>
        </div>
        <div className="shrink-0">
          <div
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-black tracking-widest"
            style={{ backgroundColor: "#fff", color: NAVY }}
          >
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
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow ${className}`}
      style={{ background: `linear-gradient(90deg, ${ORANGE}, #F59E0B)` }}
    >
      🌞 {PROMO.percentLabel}
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
  const strike = tone === "dark" ? "rgba(255,255,255,0.6)" : "#8A94A0";
  const accent = tone === "dark" ? "#FFB36B" : ORANGE;
  const sizes = { sm: "text-sm", md: "text-lg", lg: "text-3xl" }[size];

  if (!active) {
    return (
      <span className={`font-bold ${sizes}`} style={{ color: tone === "dark" ? "#FFB36B" : NAVY }}>
        {money(price, decimals)}
        {suffix ? <span className="text-xs font-medium opacity-70">{suffix}</span> : null}
      </span>
    );
  }

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="line-through text-xs sm:text-sm font-medium" style={{ color: strike }}>
        {money(price, decimals)}
      </span>
      <span className={`font-black ${sizes}`} style={{ color: accent }}>
        {money(discounted(price), decimals)}
        {suffix ? <span className="text-xs font-medium opacity-80">{suffix}</span> : null}
      </span>
    </span>
  );
}
