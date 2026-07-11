import { Link } from "@tanstack/react-router";
import {
  Users,
  BedDouble,
  Bath,
  Ruler,
  DoorOpen,
  Star,
  Flame,
  Waves,
  UtensilsCrossed,
  Wine,
  Tv,
  Snowflake,
  Crown,
  Check,
  Minus,
  ExternalLink,
  Sun,
  Palmtree,
  IceCreamCone,
  LifeBuoy,
  Sailboat,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import type { Houseboat } from "@/data/houseboats";
import { getHouseboatBySlug } from "@/data/houseboats";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PROMO } from "@/lib/promo";
import { PromoBadge } from "@/components/promo/PromoBadge";
import { PromoCardFrame } from "@/components/promo/PromoCardFrame";

const q1 = getHouseboatBySlug("queen-i")!;
const q2 = getHouseboatBySlug("queen-ii")!;

const fmt = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

type Row = { label: string; icon: React.ComponentType<{ className?: string }>; q1: string | number; q2: string | number };

const specRows: Row[] = [
  { label: "Sleeps", icon: Users, q1: `${q1.sleeps} guests`, q2: `${q2.sleeps} guests` },
  { label: "Staterooms", icon: DoorOpen, q1: `${q1.staterooms} + bonus`, q2: `${q2.staterooms} + bonus` },
  { label: "Beds", icon: BedDouble, q1: `${q1.beds} full-size`, q2: `${q2.beds} full-size` },
  { label: "Bathrooms", icon: Bath, q1: `${q1.bathrooms} full baths`, q2: `${q2.bathrooms} full baths` },
  { label: "Length", icon: Ruler, q1: q1.length, q2: q2.length },
  { label: "Guest rating", icon: Star, q1: `${q1.rating} ★ (${q1.reviews})`, q2: `${q2.rating} ★ (${q2.reviews})` },
];

type Feature = { label: string; icon: React.ComponentType<{ className?: string }>; q1: boolean | string; q2: boolean | string };

const features: Feature[] = [
  { label: "Hot tub (upper deck)", icon: Waves, q1: true, q2: true },
  { label: "Waterslide off top deck", icon: Waves, q1: true, q2: true },
  { label: "Fireplace in living area", icon: Flame, q1: true, q2: true },
  { label: "Private penthouse suite", icon: Crown, q1: false, q2: "With bathroom & sundeck" },
  { label: "Wet bar upstairs", icon: Wine, q1: "Wet bar + 2 BBQ areas", q2: "Wet bar + BBQ" },
  { label: "Kitchen refrigeration", icon: UtensilsCrossed, q1: "25 cu. ft. side-by-side", q2: "2× 8 cu. ft. RV fridges" },
  { label: "Dining setup", icon: UtensilsCrossed, q1: "Standard dinette", q2: "Double dinette" },
  { label: "A/C throughout", icon: Snowflake, q1: true, q2: true },
  { label: "Satellite TV (tracking)", icon: Tv, q1: true, q2: true },
  { label: "Side walk-space for PWC / small boat", icon: Waves, q1: false, q2: true },
];

function Cell({ value }: { value: boolean | string | number }) {
  if (value === true) return <Check className="h-5 w-5 text-primary" aria-label="Included" />;
  if (value === false) return <Minus className="h-5 w-5 text-muted-foreground" aria-label="Not included" />;
  return <span className="text-sm text-foreground">{value}</span>;
}

function BookButton({
  boat,
  variant = "solid",
  size = "md",
}: {
  boat: Houseboat;
  variant?: "solid" | "outline";
  size?: "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40";
  const sizes = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2.5 text-sm";
  const styles =
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
      : "border-2 border-primary text-primary hover:bg-primary/10";
  return (
    <a
      href={boat.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={`compare-book-${boat.slug}`}
      className={`${base} ${sizes} ${styles}`}
    >
      Book {boat.name}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}

type SeasonKey = "low" | "high" | "holiday";
const seasons: { key: SeasonKey; label: string; blurb: string }[] = [
  { key: "low", label: "Low season", blurb: "Spring & fall — best value on Shasta Lake." },
  { key: "high", label: "High season", blurb: "Peak summer: June through August." },
  { key: "holiday", label: "Holiday", blurb: "4th of July & major-holiday weeks." },
];

function PricingTable({ season }: { season: SeasonKey }) {
  const rows: { nights: string; key: "threeNight" | "fourNight" | "sevenNight" }[] = [
    { nights: "3 nights", key: "threeNight" },
    { nights: "4 nights", key: "fourNight" },
    { nights: "7 nights", key: "sevenNight" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Queen I</th>
            <th className="px-4 py-3">Queen II</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key} className={i % 2 ? "bg-muted/20" : ""}>
              <td className="px-4 py-3 font-medium text-foreground">{r.nights}</td>
              <td className="px-4 py-3 text-foreground">{fmt(q1.extendedPricing[r.key][season])}</td>
              <td className="px-4 py-3 text-foreground">{fmt(q2.extendedPricing[r.key][season])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function QueenComparePage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Sunset wash */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,194,75,0.22) 0%, rgba(255,138,31,0.14) 40%, rgba(226,62,87,0.08) 70%, hsl(var(--background)) 100%)",
          }}
        />
        {/* Floating summer icons (desktop/tablet only) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          <Sun className="absolute left-[4%] top-6 h-10 w-10 text-amber-400/70 promo-float" />
          <Palmtree className="absolute right-[6%] top-10 h-9 w-9 text-emerald-500/50 promo-bob" />
          <LifeBuoy className="absolute left-[8%] bottom-8 h-8 w-8 text-rose-500/50 promo-float" style={{ animationDelay: "1.2s" }} />
          <IceCreamCone className="absolute right-[10%] bottom-16 h-8 w-8 text-pink-500/50 promo-bob" style={{ animationDelay: "0.6s" }} />
          <Sailboat className="absolute left-1/2 top-4 h-7 w-7 -translate-x-1/2 text-sky-500/50 promo-float" style={{ animationDelay: "2s" }} />
          <Waves className="absolute right-1/3 bottom-4 h-8 w-8 text-sky-500/40 promo-bob" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
          <span
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md ring-2 ring-white/60 promo-badge-glow"
            style={{
              background: "linear-gradient(135deg, #FFC24B 0%, #FF8A1F 45%, #E23E57 100%)",
              textShadow: "0 1px 2px rgba(0,0,0,0.25)",
            }}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden />
            Summer Fun Sale · {PROMO.discount} · Code {PROMO.code}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Queen I <span className="text-primary">vs</span> Queen II
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Two luxury Silverthorn Resort houseboats, side by side. Compare capacity,
            features, and seasonal pricing to pick the right Shasta Lake getaway.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Promo valid {PROMO.dateLabel}. {PROMO.fineprint}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[q1, q2].map((boat) => (
              <PromoCardFrame key={boat.slug} slug={boat.slug}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  {/* Top-right 20% OFF badge */}
                  <PromoBadge slug={boat.slug} />
                  {/* Top-left "Save 20%" ribbon */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-[-38px] top-4 z-20 -rotate-45 px-10 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #FFC24B 0%, #FF8A1F 60%, #E23E57 100%)",
                      textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                    }}
                  >
                    ☀ Save 20%
                  </div>
                  <img
                    src={boat.heroImages[0]}
                    alt={boat.heroAltTexts[0]}
                    width={800}
                    height={500}
                    loading="eager"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-xl font-bold text-foreground">{boat.name}</h2>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {boat.badge}
                      </span>
                    </div>

                  <p className="mt-1 text-sm text-muted-foreground">{boat.tagline}</p>
                  <p className="mt-3 text-sm text-foreground">
                    Sleeps {boat.sleeps} · {boat.staterooms} staterooms · {boat.bathrooms} baths ·
                    from <strong>{fmt(boat.priceFrom)}</strong>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <BookButton boat={boat} />
                    <Link
                      to={boat.slug === "queen-i" ? "/houseboats/queen-i" : "/houseboats/queen-ii"}
                      className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      See full details
                    </Link>
                  </div>
                  </div>
                </div>
              </PromoCardFrame>
            ))}
          </div>
        </div>
      </section>

      {/* At-a-glance specs */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">At a glance</h2>
        <p className="mt-1 text-sm text-muted-foreground">Key specs, head to head.</p>

        {/* Desktop table */}
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-border bg-card md:block">
          <table className="w-full">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Feature</th>
                <th className="px-5 py-3">Queen I</th>
                <th className="px-5 py-3">Queen II</th>
              </tr>
            </thead>
            <tbody>
              {specRows.map((r, i) => {
                const Icon = r.icon;
                return (
                  <tr key={r.label} className={i % 2 ? "bg-muted/20" : ""}>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-2 font-medium text-foreground">
                        <Icon className="h-4 w-4 text-primary" />
                        {r.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-foreground">{r.q1}</td>
                    <td className="px-5 py-3 text-foreground">{r.q2}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-6 grid gap-3 md:hidden">
          {specRows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.label} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {r.label}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">Queen I</div>
                    <div className="text-foreground">{r.q1}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-muted-foreground">Queen II</div>
                    <div className="text-foreground">{r.q2}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features & amenities */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Features & amenities</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What each boat brings on board.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] items-center bg-muted/60 px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground md:grid-cols-[2fr_1fr_1fr] md:px-5">
              <span>Feature</span>
              <span className="text-center md:text-left">Queen I</span>
              <span className="text-center md:text-left">Queen II</span>
            </div>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className={`grid grid-cols-[1.5fr_1fr_1fr] items-center gap-2 px-4 py-3 md:grid-cols-[2fr_1fr_1fr] md:px-5 ${
                    i % 2 ? "bg-muted/20" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    {f.label}
                  </span>
                  <span className="flex justify-center md:justify-start">
                    <Cell value={f.q1} />
                  </span>
                  <span className="flex justify-center md:justify-start">
                    <Cell value={f.q2} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">Seasonal pricing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Rates below are total per trip. Mid-season (May–September) rates are available on each
          boat's detail page.
        </p>

        <Tabs defaultValue="high" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            {seasons.map((s) => (
              <TabsTrigger key={s.key} value={s.key}>
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {seasons.map((s) => (
            <TabsContent key={s.key} value={s.key} className="mt-4">
              <p className="mb-3 text-sm text-muted-foreground">{s.blurb}</p>
              <PricingTable season={s.key} />
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-3 text-xs text-muted-foreground">
          Prices shown before taxes, fees, and fuel. Use code <strong>{PROMO.code}</strong> at
          checkout for {PROMO.discount} on eligible {PROMO.dateLabel} bookings.
        </p>
      </section>

      {/* Which should you pick? */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Which one is right for you?</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Choose Queen I if…</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> You need to sleep up to <strong>20 guests</strong> — the largest capacity of the pair.</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Cooking for a crowd: one <strong>25 cu. ft. side-by-side</strong> fridge/freezer.</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> You love outdoor entertaining — <strong>wet bar with two BBQ areas</strong> upstairs.</li>
              </ul>
              <div className="mt-5">
                <BookButton boat={q1} size="lg" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Choose Queen II if…</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground">
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> You want a <strong>private penthouse suite</strong> with its own bath & sundeck.</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> A group of <strong>16</strong> is your sweet spot and you want the best per-guest rate.</li>
                <li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> You're bringing a <strong>PWC or small boat</strong> — dedicated side walk-space.</li>
              </ul>
              <div className="mt-5">
                <BookButton boat={q2} size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Ready to book?</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Reserve directly with Silverthorn Resort — apply promo code <strong>{PROMO.code}</strong>{" "}
            at checkout on eligible dates.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton boat={q1} size="lg" />
            <BookButton boat={q2} size="lg" />
          </div>
        </div>
      </section>

      {/* Sticky mobile book bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <a
            href={q1.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="compare-sticky-queen-i"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Book Queen I
          </a>
          <a
            href={q2.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="compare-sticky-queen-ii"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-3 py-2.5 text-sm font-semibold text-primary"
          >
            Book Queen II
          </a>
        </div>
      </div>
    </div>
  );
}
