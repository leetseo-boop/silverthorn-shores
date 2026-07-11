import { Link } from "@tanstack/react-router";
import {
  Check,
  X,
  MapPin,
  DollarSign,
  Car,
  Users,
  Waves,
  Sun,
  Anchor,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/shasta-lake/shasta-lake-aerial-pit-river-arm.webp";
import shastaImg from "@/assets/shasta-lake/silverthorn-houseboat-jumping-shasta-lake.webp";
import marinaImg from "@/assets/shasta-lake/silverthorn-resort-marina-shasta-lake-2026.webp";

type Row = {
  label: string;
  shasta: string;
  powell: string;
  winner?: "shasta" | "powell" | "tie";
};

const COMPARE: Row[] = [
  { label: "Drive from San Francisco", shasta: "~3.5 hours", powell: "~13 hours", winner: "shasta" },
  { label: "Drive from Sacramento", shasta: "~2.5 hours", powell: "~12 hours", winner: "shasta" },
  { label: "Drive from Los Angeles", shasta: "~8 hours", powell: "~8 hours", winner: "tie" },
  { label: "Nearest major airport", shasta: "Redding (RDD) — 30 min", powell: "Page (PGA) — 20 min", winner: "tie" },
  { label: "Surface area", shasta: "30,000 acres", powell: "161,000 acres", winner: "powell" },
  { label: "Shoreline", shasta: "365 miles", powell: "1,960 miles", winner: "powell" },
  { label: "Scenery", shasta: "Forested mountains, Mt. Shasta views", powell: "Red-rock canyons, slot coves", winner: "tie" },
  { label: "Water temp (summer)", shasta: "72–78°F — warm, swimmable", powell: "75–82°F — very warm", winner: "tie" },
  { label: "Season length", shasta: "April – October", powell: "March – November", winner: "powell" },
  { label: "Houseboat rental (3 nights, peak)", shasta: "From ~$3,900", powell: "From ~$6,500+", winner: "shasta" },
  { label: "Fuel to reach lake (round-trip from CA)", shasta: "$60–$120", powell: "$300–$500", winner: "shasta" },
  { label: "Marina check-in style", shasta: "Family-run, personal service", powell: "Large corporate concessionaire", winner: "shasta" },
  { label: "Crowd level", shasta: "Quieter coves on the Pit River Arm", powell: "Busy main channel in summer", winner: "shasta" },
  { label: "Cell service on lake", shasta: "Spotty (part of the appeal)", powell: "Very limited", winner: "tie" },
  { label: "First-timer friendly", shasta: "Yes — short training, calm arms", powell: "Steeper learning curve", winner: "shasta" },
  { label: "Pets allowed", shasta: "Yes — up to 2 (1 free, 2nd $50)", powell: "Varies by operator", winner: "shasta" },
];

const WHY_SHASTA = [
  { Icon: Car, t: "Half the drive, twice the trips", d: "A weekend at Shasta is realistic from anywhere in California. Powell is a full week's commitment before you've even docked." },
  { Icon: DollarSign, t: "Real savings, same houseboat quality", d: "Our Queen I & Queen II rival Powell luxury houseboats — often at 40–50% less once you factor travel, fuel and rental." },
  { Icon: Users, t: "Family-run since 1986", d: "40 years of the same family running Silverthorn. You'll meet the owners at the dock, not a corporate front desk." },
  { Icon: Anchor, t: "The Pit River Arm advantage", d: "Silverthorn sits on the quietest arm of Shasta. Secluded coves within an hour of the marina — no long open-water crossings." },
];

const WHY_POWELL = [
  "You've always dreamed of red-rock canyons and slot coves",
  "You have 10+ days and want the biggest possible lake",
  "You're already planning a Grand Circle / Utah national parks trip",
  "You want desert scenery and don't mind the drive or the cost",
];

const COSTS = [
  { t: "Rental (3 nights, peak)", shasta: "$3,900", powell: "$6,500", note: "Comparable luxury houseboat class" },
  { t: "Round-trip fuel", shasta: "$90", powell: "$400", note: "From Sacramento, mid-size SUV" },
  { t: "Travel time (paid PTO)", shasta: "5 hours", powell: "25 hours", note: "Round-trip drive from Bay Area" },
  { t: "Marina fuel (typical trip)", shasta: "$400–$700", powell: "$800–$1,400", note: "Longer runs to coves at Powell" },
];

const FAQS = [
  {
    q: "Is Shasta Lake cheaper than Lake Powell for a houseboat trip?",
    a: "For nearly every California family, yes — significantly. Silverthorn's Queen I and Queen II luxury houseboats rent from ~$3,900 for a 3-night peak trip vs. $6,500+ for a comparable class at Powell. Add ~$300–$500 less in fuel to reach the lake and the total trip is often 40–50% less at Shasta.",
  },
  {
    q: "How long is the drive to Shasta Lake vs Lake Powell from California?",
    a: "Shasta Lake is ~2.5 hours from Sacramento and ~3.5 hours from the Bay Area. Lake Powell is ~12–13 hours from those same cities. From Los Angeles both lakes are ~8 hours, so LA is the one market where drive time is roughly even.",
  },
  {
    q: "Is Shasta Lake or Lake Powell better for first-time houseboaters?",
    a: "Shasta is easier for first-timers. The lake has four sheltered arms — the Pit River Arm at Silverthorn stays especially calm — and coves are within an hour of the marina. Powell requires longer open-water crossings and more navigation experience.",
  },
  {
    q: "How do the houseboats compare?",
    a: "The luxury houseboat class is very similar: 3 decks, hot tub, waterslide, full galley, multiple staterooms. Silverthorn's Queen I and Queen II match top-tier Powell boats feature for feature. See the Queen I vs Queen II comparison for details.",
  },
  {
    q: "Which lake has better fishing?",
    a: "Shasta wins on species variety with year-round trout, bass, salmon and catfish across 19 species. Powell is legendary for smallmouth and striper fishing. Both are excellent — Shasta is more accessible for a weekend fishing trip.",
  },
  {
    q: "What about scenery — mountains vs canyons?",
    a: "Different, both spectacular. Shasta gives you snow-capped Mt. Shasta on the horizon, forested shoreline and clear alpine water. Powell delivers red sandstone canyons and slot coves. If you want mountains and pine trees, choose Shasta. If you want desert canyons, choose Powell.",
  },
  {
    q: "When is the best time to houseboat at Shasta?",
    a: "Late June through Labor Day for warm water and long days. May–early June and September–October offer lower rates, smaller crowds and still-warm swimming. Silverthorn runs a 20% off summer sale (code BREAK20) for July 12–August 25, 2026.",
  },
  {
    q: "Are pets allowed on Shasta houseboats?",
    a: "Yes at Silverthorn — up to 2 pets per houseboat. The first pet is free, second pet is $50. Powell pet policies vary by operator and are often stricter.",
  },
  {
    q: "How reliable are water levels at Shasta vs Powell?",
    a: "Shasta typically refills each spring from Sierra snowmelt and Northern California rainfall. Powell's levels are famously lower in recent years due to long-term Colorado River basin drought. Both lakes remain fully open for houseboating.",
  },
];

const winnerChip = (w?: Row["winner"]) => {
  if (w === "shasta")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
        <Check className="w-3 h-3" /> Shasta
      </span>
    );
  if (w === "powell")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-800 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
        <Check className="w-3 h-3" /> Powell
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
      Tie
    </span>
  );
};

export function ShastaVsPowellPage() {
  return (
    <main style={{ backgroundColor: "#FBF8F3", color: "#1B2B3A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Aerial view of Shasta Lake with forested islands and Mount Shasta on the horizon — a California alternative to Lake Powell"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-[44vh] sm:h-[52vh] md:h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-5xl w-full px-6 pb-10 md:pb-16 text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-90">
              Houseboat Vacation Comparison
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-6xl leading-tight font-serif">
              Shasta Lake vs Lake Powell
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg opacity-95">
              Which houseboat trip is right for you? An honest side-by-side comparison
              from a family-run California marina.
            </p>
          </div>
        </div>
      </section>

      {/* Quick verdict */}
      <section className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Quick Verdict
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-serif">
            For most Californians, Shasta Lake wins.
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            A Silverthorn houseboat trip is a fraction of the drive, a fraction of the
            cost and — with our Queen I & Queen II luxury boats — offers the same
            three-deck, hot tub, waterslide experience you'd fly across four states for
            at Powell. If red-rock canyons are the dream you've been saving for, Powell
            is worth the trip. For everything else, Shasta gets you on the water this
            weekend.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="text-2xl font-bold text-emerald-800">3.5 hrs</div>
              <div className="text-xs text-emerald-900/70">Drive from Bay Area</div>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="text-2xl font-bold text-emerald-800">~40% less</div>
              <div className="text-xs text-emerald-900/70">Typical total trip cost</div>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <div className="text-2xl font-bold text-emerald-800">Since 1986</div>
              <div className="text-xs text-emerald-900/70">Family-owned marina</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-5xl px-6 pb-6">
        <h2 className="text-2xl md:text-3xl font-serif mb-6">Side-by-side comparison</h2>
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="hidden md:grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <div>Category</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-700" /> Shasta Lake, CA</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-600" /> Lake Powell, AZ/UT</div>
            <div>Edge</div>
          </div>
          <ul className="divide-y divide-black/5">
            {COMPARE.map((row) => (
              <li
                key={row.label}
                className="grid md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2 md:gap-4 px-5 md:px-6 py-4 md:py-5"
              >
                <div className="text-sm font-semibold text-slate-900">{row.label}</div>
                <div className="text-sm text-slate-700">
                  <span className="md:hidden text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block mb-0.5">Shasta</span>
                  {row.shasta}
                </div>
                <div className="text-sm text-slate-700">
                  <span className="md:hidden text-[10px] uppercase tracking-wider text-orange-700 font-semibold block mb-0.5">Powell</span>
                  {row.powell}
                </div>
                <div className="md:self-center">{winnerChip(row.winner)}</div>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Prices, drive times and lake stats are typical estimates for planning purposes.
          Contact each marina for confirmed 2026 rates.
        </p>
      </section>

      {/* Why Shasta */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <img
            src={shastaImg}
            alt="Friends jumping off a Silverthorn houseboat into Shasta Lake on a warm California summer day"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="rounded-2xl w-full h-auto shadow-md"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold">
              Why Californians choose Shasta
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-serif">
              The lake that fits real life.
            </h2>
            <p className="mt-3 text-slate-700">
              Powell is a bucket-list trip. Shasta is the trip you can actually take —
              this summer, next summer, and the summer after that.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {WHY_SHASTA.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{t}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="bg-white border-y border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-serif">Total-trip cost breakdown</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            The rental sticker price is only part of the story. Here's what a comparable
            3-night trip actually costs a family from Northern California.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-black/10">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] px-4 md:px-6 py-3 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <div>Line item</div>
              <div className="text-emerald-700">Shasta / Silverthorn</div>
              <div className="text-orange-700">Lake Powell</div>
            </div>
            <ul className="divide-y divide-black/5">
              {COSTS.map((c) => (
                <li key={c.t} className="grid grid-cols-[1.4fr_1fr_1fr] px-4 md:px-6 py-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{c.t}</div>
                    <div className="text-xs text-slate-500">{c.note}</div>
                  </div>
                  <div className="text-sm text-slate-800">{c.shasta}</div>
                  <div className="text-sm text-slate-800">{c.powell}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* When Powell wins */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-700 font-semibold">
              Choose Lake Powell if…
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-serif">
              When Powell is actually the right call.
            </h2>
            <p className="mt-3 text-slate-700">
              We'll be honest: for some trips, Powell is the answer. Here's when we'd
              tell a friend to make the drive.
            </p>
            <ul className="mt-5 space-y-3">
              {WHY_POWELL.map((line) => (
                <li key={line} className="flex gap-3 text-slate-800">
                  <Sun className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              For everyone else — the summer weekend, the family reunion, the bachelor
              trip, the church group — Shasta gets you more days on the water for less
              money and less driving.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-6">
            <div className="flex items-center gap-2 text-orange-700 text-xs font-semibold uppercase tracking-wider">
              <Waves className="w-4 h-4" /> Bottom line
            </div>
            <p className="mt-3 text-slate-800 leading-relaxed">
              Powell is a once-in-a-decade destination. Shasta is a lake you'll come
              back to every summer.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="px-2 py-1 rounded-full bg-white border border-orange-100">Red-rock canyons</span>
              <span className="px-2 py-1 rounded-full bg-white border border-orange-100">Longer trips</span>
              <span className="px-2 py-1 rounded-full bg-white border border-orange-100">Bucket list</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-black/10">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-serif">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-black/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-slate-900">{f.q}</h3>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="rounded-3xl overflow-hidden relative bg-slate-900 text-white shadow-xl">
          <img
            src={marinaImg}
            alt="Silverthorn Resort marina and houseboats on the Pit River Arm of Shasta Lake"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            loading="lazy"
            decoding="async"
          />
          <div className="relative p-8 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-serif">
              Skip the 13-hour drive.
            </h2>
            <p className="mt-3 text-white/90 max-w-2xl mx-auto">
              Book a Queen I or Queen II houseboat at Silverthorn and use promo code{" "}
              <span className="font-bold text-amber-300">BREAK20</span> for 20% off
              summer 2026 stays.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/compare/queens"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 font-semibold px-6 py-3 hover:bg-amber-300 transition"
              >
                Compare Queen I & II <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/houseboats"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 hover:bg-white/20 transition"
              >
                Browse all houseboats
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 hover:bg-white/20 transition"
              >
                Talk to the marina
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-white/70">
              <Link to="/shasta-lake" className="underline hover:text-white">About Shasta Lake</Link>
              <Link to="/exploring-shasta-lake" className="underline hover:text-white">Exploring the arms</Link>
              <Link to="/planning" className="underline hover:text-white">Planning your trip</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const SHASTA_VS_POWELL_FAQS = FAQS;
