import { PROMO } from "@/lib/promo";

const BOOK_URL = "https://rentals.silverthornresort.com/category/13";

/**
 * Homepage "Summer Fun Sale" banner. Sits below the hero.
 * Animated sunset gradient background with tasteful inline SVG art.
 * Fully responsive; honors prefers-reduced-motion via .promo-* utility classes.
 */
export function SummerPromoBanner() {
  return (
    <section
      className="relative isolate overflow-hidden promo-sunset-bg"
      aria-label="Summer Fun Sale — 20% off Queen I and Queen II"
    >
      {/* Decorative sun */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 opacity-70 promo-spin-slow"
        viewBox="0 0 200 200"
      >
        <defs>
          <radialGradient id="promo-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFD166" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8A1F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#promo-sun)" />
      </svg>

      {/* Wave silhouette bottom */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 w-full text-white/25"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,90 L0,90 Z"
        />
      </svg>

      {/* Houseboat silhouette */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-6 hidden h-16 w-40 text-white/40 sm:block"
        viewBox="0 0 200 80"
      >
        <path
          fill="currentColor"
          d="M10,55 h180 l-15,15 h-150 z M25,30 h150 v20 h-150 z M35,10 h130 v18 h-130 z M55,5 h20 v5 h-20 z"
        />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="rounded-3xl bg-white/15 p-6 sm:p-10 shadow-xl ring-1 ring-white/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
              <span aria-hidden>🌞</span> Limited Time
            </span>

            <h2
              className="promo-shimmer font-black leading-[0.95] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 6vw, 4rem)",
              }}
            >
              SUMMER FUN SALE
            </h2>

            <p className="max-w-2xl text-base sm:text-lg font-medium text-white/95 drop-shadow">
              Book your houseboat vacation between{" "}
              <strong className="whitespace-nowrap">{PROMO.dateLabel}</strong>{" "}
              and receive <strong>{PROMO.discount}</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-md">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-700">
                  Promo Code
                </span>
                <code
                  className="rounded-md bg-orange-100 px-2.5 py-1 text-base font-black tracking-widest text-orange-800"
                  style={{ fontFamily: "'Menlo', ui-monospace, monospace" }}
                >
                  {PROMO.code}
                </code>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-800 shadow-md">
                <span aria-hidden>⛵</span>
                Selected Houseboats: {PROMO.eligibleNames}
              </div>
            </div>

            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="home-summer-promo"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-orange-700 shadow-lg transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                📅 Book Now
              </a>
              <a
                href="/houseboats"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                View Eligible Boats →
              </a>
            </div>

            <p className="text-xs text-white/85">{PROMO.fineprint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
