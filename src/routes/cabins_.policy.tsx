import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  ShieldCheck,
  CalendarX,
  Wallet,
  Wrench,
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
  Receipt,
  Trees,
  Home,
  Ban,
  Key,
  Briefcase,
  Scale,
  ClipboardCheck,
  Calendar,
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
  { boat: "Cabin", amount: "$100", to: "/cabins", highlight: true },
  { boat: "Queen, Queen I, Queen II", amount: "$1,000", to: "/houseboats" },
  { boat: "Presidential, Senator, Executive", amount: "$500", to: "/houseboats" },
  { boat: "Wakeboard Boats", amount: "$500", to: "/small-boats" },
  { boat: "Tahoe Boats", amount: "$500", to: "/small-boats" },
  { boat: "Patio & Fishing Boats", amount: "$200", to: "/small-boats" },
];

const CANCELLATION_TIERS = [
  { window: "Within 5 days of booking", detail: "Full refund (if booked 75+ days before arrival)", tone: "good" },
  { window: "More than 75 days before arrival", detail: "50% of deposit refundable (written cancellation required)", tone: "ok" },
  { window: "46–74 days before arrival", detail: "Full deposit forfeited", tone: "warn" },
  { window: "Less than 45 days before arrival", detail: "Entire rental fee retained", tone: "bad" },
] as const;

const SECTIONS: Section[] = [
  {
    id: "rental-payment",
    title: "Rental Policy & Payment",
    icon: CreditCard,
    body: (
      <>
        <p>
          The Primary Renter must be at least <strong>21 years of age</strong> and hold a valid state-issued driver's
          license to rent a cabin. Rental fees plus the security/damage deposit must be paid in full at least{" "}
          <strong>75 days prior</strong> to your arrival date.
        </p>
        <p>
          Payment for deposits, rentals, fuel, and supplies may be made by Visa, MasterCard, American Express, Discover,
          or cash. A check will be issued for any refundable cash payment — <strong>no cash refunds</strong> are issued.
        </p>
      </>
    ),
  },
  {
    id: "deposits",
    title: "Deposits",
    icon: Wallet,
    body: (
      <>
        <p>
          We charge the booking deposit as a portion of the total cost of the reservation, and place a hold on a card
          for the damage deposit upon arrival.
        </p>
        <ul className="sm:hidden mt-5 space-y-2">
          {DEPOSITS.map((d) => (
            <li key={d.boat} className="rounded-xl border p-4 flex items-center justify-between gap-3"
              style={{
                borderColor: "rgba(27,43,58,0.1)",
                backgroundColor: d.highlight ? `${ORANGE}10` : "white",
              }}>
              <Link to={d.to} className="font-semibold underline underline-offset-2"
                style={{ color: "var(--lake)" }}>
                {d.boat}
              </Link>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wide text-gray-500">Deposit</div>
                <div className="font-bold" style={{ color: d.highlight ? ORANGE : NAVY }}>{d.amount}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block mt-5 overflow-hidden rounded-xl border" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
          <div className="grid grid-cols-2 text-xs sm:text-sm font-semibold uppercase tracking-wide"
            style={{ backgroundColor: SAND, color: NAVY }}>
            <div className="px-3 sm:px-5 py-3">Rental</div>
            <div className="px-3 sm:px-5 py-3">Booking Deposit</div>
          </div>
          {DEPOSITS.map((d, i) => (
            <div key={d.boat}
              className="grid grid-cols-2 text-sm"
              style={{
                backgroundColor: d.highlight ? `${ORANGE}10` : "white",
                borderTop: i === 0 ? "none" : "1px solid rgba(27,43,58,0.08)",
              }}>
              <div className="px-3 sm:px-5 py-3 font-medium">
                <Link to={d.to} className="underline underline-offset-2 hover:no-underline" style={{ color: "var(--lake)" }}>
                  {d.boat}
                </Link>
              </div>
              <div className="px-3 sm:px-5 py-3 font-semibold" style={{ color: d.highlight ? ORANGE : NAVY }}>
                {d.amount}
              </div>
            </div>
          ))}
        </div>
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
          Upon arrival we require a Security/Damage Deposit. This deposit is <strong>fully refundable</strong> providing
          the cabin and any boats are returned undamaged, clean, and with all boat inventory intact. Deposits may be
          paid by Visa, MasterCard, American Express, Discover, or cash —{" "}
          <strong>no personal checks will be accepted</strong>.
        </p>
        <p>
          Cash deposits are refunded by check sent by mail. Standard deposit amounts: $1,000 for the Queen, Queen I, and
          Queen II; $500 for Presidential, Senator, Executive, and Wakeboard Boats; <strong>$100 for cabins</strong>;
          and $200 for Patio Boats and Fishing Boats.
        </p>
        <div className="mt-5 rounded-xl p-4 sm:p-5 text-sm leading-relaxed"
          style={{ backgroundColor: `${ORANGE}14`, color: NAVY, border: `1px solid ${ORANGE}55` }}>
          <strong>Holiday weekends and all weekends in May:</strong> security/damage deposits increase to $5,000 for the
          Queen, Queen I, and Queen II, and $3,000 for the Presidential, Senator, and Executive — and must be paid in{" "}
          <strong>cash only</strong>.
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
        <p className="mt-4 text-xs text-gray-500 italic">*Personal checks accepted toward rental fee only.</p>
      </>
    ),
  },
  {
    id: "taxes",
    title: "Taxes & Fees",
    icon: Receipt,
    body: (
      <p>
        Published nightly rates are <strong>not inclusive of applicable sales tax</strong>, and additional fees may be
        applied at the time of booking.
      </p>
    ),
  },
  {
    id: "repair-refund",
    title: "Repair & Refund Policy",
    icon: Wrench,
    body: (
      <>
        <p>
          Silverthorn Resort is committed to making your vacation as trouble-free as possible. This can only happen if
          we are made aware of any problem at the time it occurs — please notify the resort immediately should you
          experience a failure of any kind.
        </p>
        <p>
          Refunds are not given for inconveniences due to cabin malfunction including, but not limited to, weather
          conditions, power outages, water outages, or mechanical failure of appliances, electronics, plumbing,
          heating, or A/C units.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Availability",
    icon: Calendar,
    body: (
      <p>
        Guest understands that the availability of a specific cabin cannot be guaranteed, and Silverthorn Resort may
        find it necessary to move a guest to a <strong>comparable cabin rental</strong>.
      </p>
    ),
  },
  {
    id: "check-in",
    title: "Check-In",
    icon: LogIn,
    body: (
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>May – September</div>
          <div className="mt-1 font-bold text-lg" style={{ color: NAVY }}>3:00 – 6:00 PM</div>
        </div>
        <div className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
          <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: ORANGE }}>October – April</div>
          <div className="mt-1 font-bold text-lg" style={{ color: NAVY }}>1:00 – 4:00 PM</div>
        </div>
      </div>
    ),
  },
  {
    id: "check-out",
    title: "Check-Out",
    icon: LogOut,
    body: (
      <>
        <p>
          The cabin must be cleaned and the renter checked-out no later than <strong>11:00 AM</strong> on the departure
          date.
        </p>
        <div className="mt-4 rounded-xl border bg-white p-4 flex gap-3" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
          <ClipboardCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
          <p className="text-sm text-gray-700 leading-relaxed">
            Upon departure, guests are required to leave the property in the same general condition as it was when they
            arrived.
          </p>
        </div>
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
          No refunds will be made for late arrival or early departure. Silverthorn Resort is not responsible for loss of
          time due to equipment failure, weather, illness, accidents, or changes in plans.
        </p>
      </div>
    ),
  },
  {
    id: "parking",
    title: "Parking Permits",
    icon: Car,
    body: (
      <p>
        Silverthorn Resort provides a <strong>set number of parking passes</strong> to guests based on the type of cabin
        rented.
      </p>
    ),
  },
  {
    id: "pets",
    title: "Pet-Friendly Resort",
    icon: Dog,
    body: (
      <>
        <p>
          Silverthorn Resort is a pet-friendly resort and will accommodate <strong>one pet at no charge</strong>. Each
          additional pet requires a non-refundable charge of <strong>$35.00</strong> to be paid prior to occupancy.
        </p>
        <p>
          Any excessive cleaning required upon departure (pet hair, urine, etc.) will be charged to the credit card on
          file at <strong>$25.00 per hour</strong>. Any damages will be charged at replacement cost.
        </p>
      </>
    ),
  },
  {
    id: "wildlife",
    title: "Wildlife",
    icon: Trees,
    body: (
      <p>
        All cabins are located in the <strong>Shasta-Trinity National Forest</strong>. As such, you are likely to
        encounter wildlife (deer, bears, raccoons, turkeys, snakes, and insects of various types — including, but not
        limited to, ants, spiders, scorpions, wasps, and hornets). Neither Silverthorn Resort nor the property owner
        will accept responsibility for any inconvenience, injury, or death caused by said wildlife.
      </p>
    ),
  },
  {
    id: "furnishings",
    title: "Cabin Furnishings, Decor & Equipment",
    icon: Home,
    body: (
      <p>
        All cabins are <strong>privately owned</strong> with furnishings and equipment provided by the cabin owner.
        Moving of furniture or re-arranging of pre-wired home electronic equipment is prohibited. If you require special
        appliances or equipment, please bring them with you. Decor, style, color, and themes will vary between cabins.
        Furnishings are subject to change without notice.
      </p>
    ),
  },
  {
    id: "damage",
    title: "Damage to Cabin / Decor / Furnishings",
    icon: ShieldCheck,
    body: (
      <p>
        Rental guests are <strong>solely responsible</strong> for damages to the cabin, decor, equipment, and/or
        furnishings, or removal of said items during the reservation period — caused by any member of their party,
        regardless of whether the member is duly authorized (i.e. unauthorized guest or pet) by the reservation invoice.
      </p>
    ),
  },
  {
    id: "no-smoking",
    title: "No Smoking",
    icon: Ban,
    body: (
      <p>
        This is a <strong>non-smoking cabin</strong>. If it is found that any member of the rental party, or a guest of
        the rental party, has smoked inside the cabin, <strong>half of your $200.00 damage deposit will be forfeited</strong>.
        The entire cabin is designated as a No Smoking Area. Guests may smoke in the outside deck/patio areas. Cigarette
        butts must not be disposed of in the yard or anywhere on the property.
      </p>
    ),
  },
  {
    id: "keys",
    title: "Keys",
    icon: Key,
    body: (
      <p>
        Our cabins are privately owned and guests are responsible for lost keys. The property must be <strong>re-keyed</strong>{" "}
        in the event keys are lost, misplaced, or not returned. Guests will be responsible for the cost of this procedure.
      </p>
    ),
  },
  {
    id: "personal-property",
    title: "Personal Property",
    icon: Briefcase,
    body: (
      <p>
        Silverthorn Resort shall not be liable for loss of, or damage to, any property left, stored, or transported in
        or on the cabin or any boat — either before or after return thereof to Silverthorn Resort — whether or not such
        loss or damage was caused by or related to the negligence of Silverthorn Resort, its agents, or employees. The
        contract holder assumes all risk of such loss or damage and waives all claims against Silverthorn Resort.
      </p>
    ),
  },
  {
    id: "compliance",
    title: "Compliance with Laws",
    icon: Scale,
    body: (
      <p>
        During the term of this Agreement, the renter agrees to comply with all laws and regulations of the United
        States, the State of California, and local jurisdictions. Silverthorn Resort reserves the right to cancel the
        remaining period of the rental — with resulting <strong>forfeiture of any fees paid</strong> — if, in the
        opinion of a representative of Silverthorn Resort, the use of the cabin contravenes regulations and presents a
        hazard to people or property or unduly interferes with the rights of others.
      </p>
    ),
  },
  {
    id: "responsibility",
    title: "Responsibility",
    icon: UserCheck,
    body: (
      <p>
        For the duration of the Agreement, the renter is <strong>fully responsible</strong> for the cabin rental and all
        equipment — including, but not limited to, appliances, appurtenances, and supplies. The renter is not in any way
        an agent, servant, or employee of Silverthorn Resort and will not permit any repairs to be made, or liens or
        accessories to be placed against the cabin, without first obtaining express written permission from Silverthorn
        Resort.
      </p>
    ),
  },
];

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "/cabins/policy#webpage",
      name: "Cabin Rental Policy — Silverthorn Resort",
      description:
        "Complete cabin rental policy for Silverthorn Resort on Shasta Lake: deposits, cancellation, check-in, pets, wildlife, smoking, keys, and more.",
      url: "/cabins/policy",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Cabins", item: "/cabins" },
        { "@type": "ListItem", position: 3, name: "Rental Policy", item: "/cabins/policy" },
      ],
    },
  ],
};

export const Route = createFileRoute("/cabins_/policy")({
  head: () => ({
    meta: [
      { title: "Cabin Rental Policy — Silverthorn Resort" },
      {
        name: "description",
        content:
          "Silverthorn Resort cabin rental policy on Shasta Lake: deposits, cancellation, check-in/out, pet rules, wildlife notice, smoking policy, and more.",
      },
      { property: "og:title", content: "Cabin Rental Policy — Silverthorn Resort" },
      {
        property: "og:description",
        content: "Everything you need to know before your Shasta Lake cabin stay at Silverthorn Resort.",
      },
      { property: "og:url", content: "/cabins/policy" },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: "/cabins/policy" },
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
            alt="Silverthorn Resort cabin rental policy"
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
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-5"
              style={{ backgroundColor: ORANGE, color: "white" }}>
              Cabins · Policy
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-white mb-5"
              style={{ fontFamily: DISPLAY }}>
              Cabin <span style={{ color: "#FFB36B" }}>Rental Policy</span>
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-8">
              Everything you need to know before your Silverthorn Resort cabin stay on Shasta Lake.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:+1${PHONE.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: ORANGE }}>
                <Phone className="w-4 h-4" /> Call {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold bg-white/95 hover:bg-white transition-all"
                style={{ color: NAVY }}>
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:opacity-75">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/cabins" className="text-gray-600 hover:opacity-75">Cabins</Link>
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
            { icon: LogOut, label: "Check-Out", value: "By 11:00 AM", sub: "Cabin cleaned at departure" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { to: "/cabins" as const, icon: Home, title: "Lake Cabins", desc: "See all 8 lakeside cabins, photos, amenities, and the resort map." },
              { to: "/houseboats" as const, icon: Ship, title: "Luxury Houseboats", desc: "Browse our fleet of Queen, Presidential, Senator & Executive houseboats." },
              { to: "/small-boats" as const, icon: Anchor, title: "Patio & Wakeboard Boats", desc: "Add a patio boat, fishing boat, or wakeboard boat to your stay." },
              { to: "/pro-shop" as const, icon: Store, title: "Silverthorn Pro Shop", desc: "Fuel, tackle, snacks, gear, and last-minute essentials on the main dock." },
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
              Questions about our cabin policy?
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
