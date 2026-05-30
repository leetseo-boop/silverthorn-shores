import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  ShieldCheck,
  CalendarX,
  Umbrella,
  Wallet,
  Wrench,
  Fuel,
  LogIn,
  LogOut,
  AlertTriangle,
  Car,
  Dog,
  Phone,
  Mail,
  Clock,
  UserCheck,
  Ship,
  Anchor,
  Store,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/rental-policy-hero.jpg";
import { MobileToc, BackToTop } from "@/components/PolicyMobileHelpers";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const PHONE = "800-332-3044";
const EMAIL = "reserve1@houseboats.com";

type Section = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  body: React.ReactNode;
};

const DEPOSITS = [
  { boat: "Queen, Queen I, Queen II", standard: "$1,000", holiday: "$5,000 (cash)", to: "/houseboats" },
  { boat: "Presidential, Senator", standard: "$500", holiday: "$3,000 (cash)", to: "/houseboats" },
  { boat: "Wakeboard Boats", standard: "$500", holiday: "—", to: "/small-boats" },
  { boat: "Patio Boats & Fishing Boats", standard: "$200", holiday: "—", to: "/small-boats" },
  { boat: "Cabins", standard: "$100", holiday: "—", to: "/cabins" },
];

const CANCELLATION_TIERS = [
  { window: "Within 5 days of booking", detail: "Full deposit refund (if booked 75+ days before arrival)", tone: "good" },
  { window: "More than 75 days before arrival", detail: "50% of deposit refundable (written cancellation required)", tone: "ok" },
  { window: "46–74 days before arrival", detail: "Full deposit forfeited", tone: "warn" },
  { window: "Less than 45 days before arrival", detail: "Full deposit + all rental fees forfeited", tone: "bad" },
  { window: "After a date change", detail: "Full deposit + all additional rental fees forfeited", tone: "bad" },
] as const;

const PERMITS = [
  { boat: "Queen / Queen I", count: 5, to: "/houseboats" },
  { boat: "Queen II / Presidential / Senator", count: 4, to: "/houseboats" },
  
];

const SECTIONS: Section[] = [
  {
    id: "rental-deposits",
    title: "Rental Policy & Deposits",
    icon: CreditCard,
    body: (
      <>
        <p>
          The Charter Captain and Co-Captain must each be at least <strong>21 years of age</strong> and hold a valid
          driver's license to rent a boat or cabin. Rental fees must be paid in full at least <strong>75 days prior</strong>{" "}
          to your arrival date.
        </p>
        <p>
          A Booking Deposit is due at the time of booking and is applied to your rental fee. Deposits, rental fees, fuel,
          and supplies may be paid by Visa, MasterCard, American Express, Discover, or cash. Credit card payments are
          processed when received. A check is mailed for any refundable cash transaction — no cash refunds are issued.
        </p>
      </>
    ),
  },
  {
    id: "security-deposit",
    title: "Security / Damage Deposit",
    icon: ShieldCheck,
    body: (
      <>
        <p>
          A Security/Damage Deposit is required upon arrival and is <strong>fully refundable</strong> provided the boat
          is returned undamaged, clean, and with all inventory intact. Deposits may be paid by Visa, MasterCard,
          American Express, Discover, or cash. Cash deposits are refunded by mailed check.
        </p>
        {/* Mobile stacked cards */}
        <ul className="sm:hidden mt-5 space-y-2">
          {DEPOSITS.map((d) => (
            <li key={d.boat} className="rounded-xl border bg-white p-4"
              style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <Link to={d.to} className="block font-semibold underline underline-offset-2"
                style={{ color: "var(--lake)" }}>
                {d.boat}
              </Link>
              <div className="mt-2 flex justify-between gap-3 text-sm">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-gray-500">Standard</div>
                  <div className="font-semibold" style={{ color: NAVY }}>{d.standard}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500">Holiday / May</div>
                  <div className="font-semibold" style={{ color: ORANGE }}>{d.holiday}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block mt-5 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
          <div className="grid grid-cols-3 text-xs sm:text-sm font-semibold uppercase tracking-wide"
            style={{ backgroundColor: SAND, color: NAVY }}>
            <div className="px-3 sm:px-5 py-3">Rental</div>
            <div className="px-3 sm:px-5 py-3">Standard</div>
            <div className="px-3 sm:px-5 py-3">Holiday / May</div>
          </div>
          {DEPOSITS.map((d, i) => (
            <div key={d.boat}
              className="grid grid-cols-3 text-sm bg-white"
              style={{ borderTop: i === 0 ? "none" : "1px solid rgba(27,43,58,0.08)" }}>
              <div className="px-3 sm:px-5 py-3 font-medium">
                <Link to={d.to} className="underline underline-offset-2 hover:no-underline" style={{ color: "var(--lake)" }}>
                  {d.boat}
                </Link>
              </div>
              <div className="px-3 sm:px-5 py-3">{d.standard}</div>
              <div className="px-3 sm:px-5 py-3 font-semibold" style={{ color: ORANGE }}>{d.holiday}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl p-4 sm:p-5 text-sm leading-relaxed"
          style={{ backgroundColor: `${ORANGE}14`, color: NAVY, border: `1px solid ${ORANGE}55` }}>
          <strong>Holiday weekends and all weekends in May:</strong> deposits increase to $5,000 for the Queen, Queen I,
          and Queen II, and $3,000 for the Presidential and Senator — and must be paid in <strong>cash only</strong>.
          Cashier's checks and money orders are not accepted for holiday damage deposits.
        </div>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellation",
    icon: CalendarX,
    body: (
      <>
        <p>
          Cancellation terms depend on when you cancel relative to your arrival date. All cancellations must be made in
          writing.
        </p>
        <ol className="mt-5 space-y-3">
          {CANCELLATION_TIERS.map((t, i) => {
            const dot =
              t.tone === "good" ? "#16a34a" :
              t.tone === "ok" ? "#0ea5e9" :
              t.tone === "warn" ? ORANGE : "#dc2626";
            return (
              <li key={i} className="flex gap-4 rounded-xl border bg-white p-4"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}>
                <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: dot }} />
                <div>
                  <div className="font-semibold" style={{ color: NAVY }}>{t.window}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{t.detail}</div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          Pricing, terms, and availability are subject to change without notice.
        </p>
      </>
    ),
  },
  {
    id: "travel-insurance",
    title: "Travel Insurance Coverage",
    icon: Umbrella,
    body: (
      <>
        <p>
          We strongly recommend purchasing travel insurance for your houseboat vacation. Unforeseen events happen — and
          insurance helps protect the trip you've worked so hard to plan.
        </p>
        <p>
          We work with <a href="https://www.insuremytrip.com" target="_blank" rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2" style={{ color: ORANGE }}>InsureMyTrip</a>{" "}
          to offer hand-selected plans for our guests. Visit{" "}
          <a href="https://www.insuremytrip.com" target="_blank" rel="noopener noreferrer"
            className="underline" style={{ color: ORANGE }}>InsureMyTrip.com</a>{" "}
          for more information.
        </p>
        <p className="text-xs text-gray-500 italic">
          *InsureMyTrip is a third-party service we offer to our clients. Silverthorn Resort is NOT a provider of any
          insurance service. For questions, please visit InsureMyTrip.com directly.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Form of Payment",
    icon: Wallet,
    body: (
      <>
        <p>
          Deposits, rentals, fuel, and supplies may be paid by cash, Visa, MasterCard, American Express, or Discover.
          Credit card payments are processed when received. Personal checks are only accepted toward the rental fee.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Visa", "MasterCard", "American Express", "Discover", "Cash", "Personal Check*"].map((m) => (
            <span key={m} className="rounded-full border px-3 py-1.5 text-sm font-medium bg-white"
              style={{ borderColor: "rgba(27,43,58,0.18)", color: NAVY }}>{m}</span>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold" style={{ color: ORANGE }}>
          Holiday damage deposits must be paid in CASH ONLY. Cashier's checks and money orders are not accepted.
        </p>
      </>
    ),
  },
  {
    id: "repair-refund",
    title: "Repair & Refund Policy",
    icon: Wrench,
    body: (
      <>
        <p>
          Silverthorn Resort is committed to making your houseboat vacation as trouble-free as possible. A houseboat has
          many operational parts, several of which can fail unforeseeably. While <strong>no refunds are given</strong> for
          such failures, it is our responsibility to repair the problem in a timely and efficient manner.
        </p>
        <p>
          This can only happen if we know about the issue when it occurs — please notify the Resort immediately if you
          experience any failure. Refunds are not given for inconveniences due to houseboat malfunctions.
        </p>
      </>
    ),
  },
  {
    id: "fuel",
    title: "Fuel",
    icon: Fuel,
    body: (
      <p>
        Fuel tanks will be full at departure and will be filled at the primary Renter's expense upon return of the
        vessel. All gas used is the primary Renter's responsibility.
      </p>
    ),
  },
  {
    id: "check-in",
    title: "Check-In & Boarding",
    icon: LogIn,
    body: (
      <>
        <p>
          Renters may not board the houseboat or other equipment until all paperwork has been completed and instructions
          regarding operation have concluded.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>May – September</div>
            <div className="mt-1 font-bold text-lg" style={{ color: NAVY }}>3:00 – 6:00 PM</div>
          </div>
          <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>October – April</div>
            <div className="mt-1 font-bold text-lg" style={{ color: NAVY }}>1:00 – 4:00 PM</div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "check-out",
    title: "Check-Out",
    icon: LogOut,
    body: (
      <>
        <p>
          The vessel must be unloaded, cleaned, and returned to the gas dock between{" "}
          <strong>9:00 AM and 10:00 AM</strong> on your return date. A late charge may be assessed on late returns and
          deducted from the damage deposit or charged to the renter's credit card on file.
        </p>
      </>
    ),
  },
  {
    id: "no-refunds-notice",
    title: "Important Notice",
    icon: AlertTriangle,
    body: (
      <div className="rounded-xl p-5 sm:p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${NAVY}, #0d1e2c)` }}>
        <div className="font-bold uppercase tracking-wide text-sm mb-2" style={{ color: "#FFB36B" }}>
          Please Note
        </div>
        <p className="text-base sm:text-lg leading-relaxed">
          No refunds will be made for late arrival or early return. Silverthorn Resort is not responsible for loss of
          running time due to equipment failure, weather, illness, accidents, or changes in plans.
        </p>
      </div>
    ),
  },
  {
    id: "parking",
    title: "Parking Permits",
    icon: Car,
    body: (
      <>
        <p>
          Silverthorn Resort provides a set number of parking passes based on the type of houseboat rented. Due to
          limited parking during peak season, additional permits may not be available for purchase. Vehicles without a
          parking permit will be towed at the owner's expense. <strong>Please carpool when possible.</strong>
        </p>
        <ul className="sm:hidden mt-5 space-y-2">
          {PERMITS.map((p) => (
            <li key={p.boat} className="rounded-xl border bg-white p-4 flex items-center justify-between gap-3"
              style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <Link to={p.to} className="font-semibold underline underline-offset-2"
                style={{ color: "var(--lake)" }}>
                {p.boat}
              </Link>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wide text-gray-500">Permits</div>
                <div className="text-lg font-bold" style={{ color: ORANGE }}>{p.count}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block mt-5 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
          <div className="grid grid-cols-2 text-xs sm:text-sm font-semibold uppercase tracking-wide"
            style={{ backgroundColor: SAND, color: NAVY }}>
            <div className="px-3 sm:px-5 py-3">Houseboat</div>
            <div className="px-3 sm:px-5 py-3">Permits Included</div>
          </div>
          {PERMITS.map((p, i) => (
            <div key={p.boat} className="grid grid-cols-2 text-sm bg-white"
              style={{ borderTop: i === 0 ? "none" : "1px solid rgba(27,43,58,0.08)" }}>
              <div className="px-3 sm:px-5 py-3 font-medium">
                <Link to={p.to} className="underline underline-offset-2 hover:no-underline" style={{ color: "var(--lake)" }}>
                  {p.boat}
                </Link>
              </div>
              <div className="px-3 sm:px-5 py-3 font-bold" style={{ color: ORANGE }}>{p.count}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "pets",
    title: "Pet-Friendly Resort",
    icon: Dog,
    body: (
      <>
        <p>
          Silverthorn Resort is a pet-friendly resort and accommodates <strong>one pet at no charge</strong>. Each
          additional pet requires a non-refundable charge of <strong>$35.00</strong>, paid prior to occupancy/boarding.
        </p>
        <p>
          Any excessive cleaning required upon departure (pet hair, urine, etc.) will be charged to the credit card on
          file at <strong>$25.00 per hour</strong>. Any damages will be charged at replacement cost.
        </p>
      </>
    ),
  },
];

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "/houseboats/policy#webpage",
      name: "Houseboat Rental Policy — Silverthorn Resort",
      description:
        "Complete rental policy for Silverthorn Resort houseboats on Shasta Lake: deposits, cancellation, check-in, fuel, parking, pets, and more.",
      url: "/houseboats/policy",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Houseboats", item: "/houseboats" },
        { "@type": "ListItem", position: 3, name: "Rental Policy", item: "/houseboats/policy" },
      ],
    },
  ],
};

export const Route = createFileRoute("/houseboats/policy")({
  head: () => ({
    meta: [
      { title: "Houseboat Rental Policy — Silverthorn Resort" },
      {
        name: "description",
        content:
          "Silverthorn Resort houseboat rental policy: deposits, cancellation, check-in/out, fuel, parking, pet rules, and travel insurance information.",
      },
      { property: "og:title", content: "Houseboat Rental Policy — Silverthorn Resort" },
      {
        property: "og:description",
        content:
          "Everything you need to know before your Shasta Lake houseboat vacation at Silverthorn Resort.",
      },
      { property: "og:url", content: "/houseboats/policy" },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "/houseboats/policy" },
      { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as any,
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(LD) }],
  }),
  component: PolicyPage,
});

function PolicyPage() {
  return (
    <div className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="A cozy home office with a coffee cup, printer, and a Silverthorn Resort rental policy on the desk"
            className="w-full h-full object-cover"
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,32,48,0.85), rgba(13,32,48,0.5) 60%, rgba(13,32,48,0.25))" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 sm:mb-5"
              style={{ backgroundColor: ORANGE, color: "white" }}>
              Houseboats · Policy
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-white mb-4 sm:mb-5"
              style={{ fontFamily: DISPLAY }}>
              Houseboat <span style={{ color: "#FFB36B" }}>Rental Policy</span>
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 sm:mb-8">
              Everything you need to know before your Silverthorn Resort vacation on Shasta Lake.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a href={`tel:+1${PHONE.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-5 py-3 rounded-lg font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: ORANGE }}>
                <Phone className="w-4 h-4" /> Call {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-5 py-3 rounded-lg font-semibold bg-white/95 hover:bg-white transition-all"
                style={{ color: NAVY }}>
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <MobileToc sections={SECTIONS.map((s) => ({ id: s.id, title: s.title }))} />

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b" >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:opacity-75">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/houseboats" className="text-gray-600 hover:opacity-75">Houseboats</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Rental Policy</span>
          </nav>
        </div>
      </div>

      {/* Quick reference */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: LogIn, label: "Check-In", value: "3:00 – 6:00 PM", sub: "May–Sept · Oct–Apr 1–4 PM" },
            { icon: LogOut, label: "Check-Out", value: "9:00 – 10:00 AM", sub: "Cleaned & at the gas dock" },
            { icon: UserCheck, label: "Minimum Age", value: "21 years", sub: "Captain & Co-Captain" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="rounded-xl border bg-white p-5 text-center"
              style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="mx-auto w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
              <div className="font-bold text-lg mt-1" style={{ color: NAVY }}>{value}</div>
              <div className="text-xs text-gray-500 mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content + TOC */}
      <section className="py-8 md:py-14" style={{ backgroundColor: SAND }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[260px_1fr] gap-8">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-white p-4"
              style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="flex items-center gap-2 mb-3 px-2">
                <Clock className="w-4 h-4" style={{ color: ORANGE }} />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: NAVY }}>
                  On this page
                </span>
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="rounded-md px-3 py-2 text-sm whitespace-nowrap lg:whitespace-normal transition-colors hover:bg-orange-50"
                    style={{ color: NAVY }}>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <div className="space-y-5">
            {SECTIONS.map(({ id, title, icon: Icon, body }) => (
              <article key={id} id={id}
                className="scroll-mt-24 rounded-2xl border bg-white p-6 md:p-8"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
                    {title}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 leading-relaxed text-[15px] md:text-base">
                  {body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-14" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Plan the rest of your trip
          </h2>
          <p className="text-center text-gray-700 mb-8">Explore the rest of Silverthorn Resort.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: "/houseboats", icon: Ship, title: "Luxury Houseboats", desc: "Browse our fleet of Queen, Presidential & Senator houseboats." },
              { to: "/small-boats", icon: Anchor, title: "Patio & Wakeboard Boats", desc: "Add a patio boat, fishing boat, or wakeboard boat to your stay." },
              { to: "/pro-shop", icon: Store, title: "Silverthorn Pro Shop", desc: "Fuel, tackle, snacks, gear, and last-minute essentials on the main dock." },
            ].map(({ to, icon: Icon, title, desc }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg flex flex-col"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: DISPLAY, color: NAVY }}>{title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--lake)" }}>
                  Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>
              Questions about our policy?
            </h2>
            <p className="text-white/90">Our reservation team is happy to walk you through any detail.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:+1${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white font-semibold"
              style={{ color: NAVY }}>
              <Phone className="w-5 h-5" /> Call {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
              <Mail className="w-5 h-5" /> {EMAIL}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
