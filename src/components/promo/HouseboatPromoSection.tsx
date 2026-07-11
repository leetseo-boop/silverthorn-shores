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
        className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 opacity-70 promo-spin-slow sm:-top-12 sm:-left-12 sm:h-56 sm:w-56"
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

      {/* Floating summer emoji — kept in the top strip so they never overlap the copy card */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 sm:block">
        <span className="absolute right-[4%] top-3 text-3xl promo-float" style={{ animationDelay: "0.2s" }}>🌴</span>
        <span className="absolute left-[38%] top-2 text-xl promo-float hidden md:inline" style={{ animationDelay: "0.8s" }}>🕶️</span>
        <span className="absolute right-[38%] top-3 text-xl promo-float hidden lg:inline" style={{ animationDelay: "1.4s" }}>🍹</span>
      </div>

      {/* Houseboat silhouette bobbing (desktop only) */}
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
        <div className="rounded-3xl bg-black/45 p-6 sm:p-8 ring-1 ring-white/40 backdrop-blur-sm shadow-xl">

          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0 text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
                🌞 Summer Fun Sale
              </span>
              <h2
                className="promo-shimmer mt-3 font-black leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                }}
              >
                {PROMO.discount} on the {boatName} This Summer
              </h2>
              <p className="mt-3 text-base font-medium text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                Book between <strong className="whitespace-nowrap">{PROMO.dateLabel}</strong>. Use promo code{" "}
                <code
                  className="rounded-md bg-white/95 px-2 py-0.5 text-orange-800 font-black tracking-widest"
                  style={{ fontFamily: "'Menlo', ui-monospace, monospace" }}
                >
                  {PROMO.code}
                </code>{" "}
                at checkout.
              </p>
              <p className="mt-2 text-xs text-white/90">{PROMO.fineprint}</p>
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
