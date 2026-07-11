import { PROMO, isPromoBoat } from "@/lib/promo";

type Props = {
  slug: string;
  boatName: string;
  bookingUrl: string;
};

/**
 * Per-boat promo section shown on Queen I and Queen II detail pages.
 */
export function HouseboatPromoSection({ slug, boatName, bookingUrl }: Props) {
  if (!isPromoBoat(slug)) return null;
  return (
    <section
      className="relative isolate overflow-hidden promo-sunset-bg my-8"
      aria-label={`Summer Fun Sale — 20% off ${boatName}`}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-56 w-56 opacity-70 promo-spin-slow"
        viewBox="0 0 200 200"
      >
        <defs>
          <radialGradient id={`promo-sun-${slug}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFD166" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8A1F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill={`url(#promo-sun-${slug})`} />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full text-white/30"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,90 L0,90 Z"
        />
      </svg>

      {/* Floating summer emoji chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute right-[6%] top-6 text-3xl promo-float" style={{ animationDelay: "0.2s" }}>🌴</span>
        <span className="absolute right-[18%] bottom-8 text-2xl promo-float" style={{ animationDelay: "1.1s" }}>🛟</span>
        <span className="absolute left-[8%] bottom-10 text-2xl promo-float" style={{ animationDelay: "1.6s" }}>🩴</span>
        <span className="absolute left-[36%] top-4 text-xl promo-float" style={{ animationDelay: "0.8s" }}>🕶️</span>
        <span className="absolute right-[36%] top-8 text-xl promo-float" style={{ animationDelay: "2.2s" }}>🍹</span>
      </div>

      {/* Houseboat silhouette bobbing */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 hidden h-14 w-36 text-white/60 md:block promo-bob"
        viewBox="0 0 200 80"
      >
        <path
          fill="currentColor"
          d="M10,55 h180 l-15,15 h-150 z M25,30 h150 v20 h-150 z M35,10 h130 v18 h-130 z M55,5 h20 v5 h-20 z"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="rounded-3xl bg-black/25 p-6 sm:p-8 ring-1 ring-white/40 backdrop-blur-sm shadow-xl">

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
                🌞 Summer Fun Sale
              </span>
              <h2
                className="promo-shimmer mt-3 font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.75rem)",
                }}
              >
                {PROMO.discount} on the {boatName} This Summer
              </h2>
              <p className="mt-3 text-base font-medium text-white/95">
                Book between <strong className="whitespace-nowrap">{PROMO.dateLabel}</strong>. Use promo code{" "}
                <code
                  className="rounded-md bg-white/95 px-2 py-0.5 text-orange-800 font-black tracking-widest"
                  style={{ fontFamily: "'Menlo', ui-monospace, monospace" }}
                >
                  {PROMO.code}
                </code>{" "}
                at checkout.
              </p>
              <p className="mt-2 text-xs text-white/85">{PROMO.fineprint}</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`houseboat-promo-${slug}`}
                data-boat-id={slug}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold uppercase tracking-wider text-orange-700 shadow-lg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                📅 Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
