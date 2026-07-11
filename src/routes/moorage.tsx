// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor, Calendar, Phone, Mail, FileText, ShieldCheck, Fuel, Store,
  Lock, Percent, ParkingCircle, Waves, CalendarDays, Wrench, Droplets, Ship,
} from "lucide-react";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";
const PATH = "/moorage";
const CANONICAL = "https://www.silverthornresort.com/moorage";

const BOOKING_URL = "https://book.getmolo.com/silverthorn-resort";
const FEE_PDF = "https://houseboats.com/documents/silverthorn-2026-fee-schedule-amenities.pdf";
const AGREEMENT_PDF = "https://houseboats.com/documents/silverthorn-2026-moorage-license-agreement.pdf";
const PHONE = "1-800-332-3044";
const EMAIL = "silverthornmoorage@houseboats.com";

const ANNUAL = [
  { name: "Houseboat Slip – Head In No Finger", size: "15' × 56'", annual: 4140, early: 3795, monthly: 345 },
  { name: "Ski Boat Slip with Finger",          size: "10' × 24'", annual: 3120, early: 2860, monthly: 260 },
  { name: "Patio Boat Slip – Head In No Finger", size: "12'",       annual: 2820, early: 2585, monthly: 235 },
];

const SEASONAL = [
  { name: "Ski Boat Slip with Finger",           size: "10' × 24'",         season: 1560, early: 1300 },
  { name: "Patio Boat Slip – Head In No Finger", size: "12' (up to 31')",   season: 1410, early: 1175 },
];

const SERVICES = [
  { name: "Shop Labor",         rate: "$150/hr",   icon: Wrench },
  { name: "Houseboat Pump-Out", rate: "$65/tank",  icon: Droplets },
  { name: "Launch & Park",      rate: "$20/day",   icon: Ship },
];

const SPECIALS = [
  { icon: ParkingCircle, title: "Free Parking",         text: "2 parking tags included with your slip" },
  { icon: Waves,         title: "Free Small Boat Launch", text: "Complimentary launch for slip holders" },
  { icon: Lock,          title: "Locked Dock Access",   text: "Secure, gated access to your vessel 24/7" },
  { icon: Percent,       title: "10% Rental Discount",  text: "Save on boat rentals as a slip holder" },
];

const AMENITIES = [
  { icon: Store,       title: "Marina Store",     text: "Snacks, supplies, ice, and boating essentials" },
  { icon: ShieldCheck, title: "Security",         text: "On-site security for peace of mind" },
  { icon: Fuel,        title: "Fuel Dock",        text: "On-water fuel station for convenient fill-ups" },
  { icon: CalendarDays,title: "Year-Round Access",text: "Open all seasons for slip holders" },
];

const TITLE = "Silverthorn Moorage — Shasta Lake Boat Slips & Marina Storage";
const DESC = "Annual, seasonal, and monthly boat slip rentals at Silverthorn Resort on Shasta Lake's Pit River Arm. Houseboat, ski boat & patio boat slips with early-payment discounts.";
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Marina",
      "@id": `${CANONICAL}#marina`,
      name: "Silverthorn Resort Marina",
      description: DESC,
      url: CANONICAL,
      telephone: "+1-800-332-3044",
      email: EMAIL,
      address: { "@type": "PostalAddress", streetAddress: "16250 Silverthorn Rd", addressLocality: "Redding", addressRegion: "CA", postalCode: "96003", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 40.7547764, longitude: -122.242348 },
      priceRange: "$235 – $4,140",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silverthornresort.com/" },
        { "@type": "ListItem", position: 2, name: "Moorage", item: CANONICAL },
      ],
    },
  ],
};

export const Route = createFileRoute("/moorage")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: CANONICAL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ldGraph) }],
  }),
  component: MoorageePage,
});

function MoorageePage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <a href="/" className="text-gray-600 hover:opacity-75">Home</a>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Moorage</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0f1d29 100%)` }}>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5" style={{ backgroundColor: ORANGE }}>
            <Anchor className="w-4 h-4" /> Pit River Arm · Shasta Lake
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-5 max-w-4xl" style={{ fontFamily: DISPLAY }}>
            Silverthorn Resort <span style={{ color: "#FFB36B" }}>Boat Slips</span> & Marina Storage
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
            Secure moorage on the scenic Pit River Arm of Shasta Lake. Annual, seasonal, and monthly slip rentals with full marina services and slip holder perks.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-cta="moorage-hero"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-95"
              style={{ backgroundColor: ORANGE }}>
              <Calendar className="w-5 h-5" /> Book Your Slip Online
            </a>
            <a href={`tel:+1${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white/95"
              style={{ color: NAVY }}>
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white/80 text-white hover:bg-white/10">
              <Mail className="w-5 h-5" /> Email Marina
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16" style={{ backgroundColor: SAND }} id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>
              2026 Marina Pricing
            </h2>
            <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ backgroundColor: ORANGE }} />
            <p className="text-gray-600">Save with early-payment rates. Ask about availability today.</p>
          </div>

          {/* Annual */}
          <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ fontFamily: DISPLAY, color: NAVY }}>Annual Moorage Slips</h3>

          {/* Desktop */}
          <div className="hidden md:block rounded-2xl overflow-hidden shadow-sm border bg-white mb-8" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-bold tracking-wider uppercase text-white" style={{ backgroundColor: NAVY }}>
              <div className="col-span-6">Slip Type</div>
              <div className="col-span-2 text-right">Annual</div>
              <div className="col-span-2 text-right">Early Payment</div>
              <div className="col-span-2 text-right">Monthly</div>
            </div>
            {ANNUAL.map((r, i) => (
              <div key={r.name} className="grid grid-cols-12 items-center px-6 py-5 border-t"
                style={{ borderColor: "rgba(27,43,58,0.06)", backgroundColor: i % 2 ? "rgba(244,239,230,0.35)" : "white" }}>
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-sm text-gray-500">{r.size}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-semibold" style={{ color: NAVY }}>{money(r.annual)}</div>
                <div className="col-span-2 text-right font-semibold" style={{ color: ORANGE }}>{money(r.early)}</div>
                <div className="col-span-2 text-right font-semibold" style={{ color: NAVY }}>{money(r.monthly)}</div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3 mb-8">
            {ANNUAL.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-4 border shadow-sm" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-xs text-gray-500">{r.size}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: SAND }}>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Annual</div>
                    <div className="font-bold" style={{ color: NAVY }}>{money(r.annual)}</div>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${ORANGE}14` }}>
                    <div className="text-[10px] uppercase tracking-wide" style={{ color: ORANGE }}>Early Pay</div>
                    <div className="font-bold" style={{ color: ORANGE }}>{money(r.early)}</div>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: SAND }}>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Monthly</div>
                    <div className="font-bold" style={{ color: NAVY }}>{money(r.monthly)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Seasonal */}
          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: DISPLAY, color: NAVY }}>Seasonal Small Boat Slips</h3>
          <p className="text-sm text-gray-600 mb-4">May 1 – Oct 31</p>

          <div className="hidden md:block rounded-2xl overflow-hidden shadow-sm border bg-white" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-bold tracking-wider uppercase text-white" style={{ backgroundColor: NAVY }}>
              <div className="col-span-7">Slip Type</div>
              <div className="col-span-2 text-right">6-Month</div>
              <div className="col-span-3 text-right">Early Payment</div>
            </div>
            {SEASONAL.map((r, i) => (
              <div key={r.name} className="grid grid-cols-12 items-center px-6 py-5 border-t"
                style={{ borderColor: "rgba(27,43,58,0.06)", backgroundColor: i % 2 ? "rgba(244,239,230,0.35)" : "white" }}>
                <div className="col-span-7 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-sm text-gray-500">{r.size}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-semibold" style={{ color: NAVY }}>{money(r.season)}</div>
                <div className="col-span-3 text-right font-semibold" style={{ color: ORANGE }}>{money(r.early)}</div>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-3">
            {SEASONAL.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-4 border shadow-sm" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-xs text-gray-500">{r.size}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: SAND }}>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">6-Month</div>
                    <div className="font-bold" style={{ color: NAVY }}>{money(r.season)}</div>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${ORANGE}14` }}>
                    <div className="text-[10px] uppercase tracking-wide" style={{ color: ORANGE }}>Early Pay</div>
                    <div className="font-bold" style={{ color: ORANGE }}>{money(r.early)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-booking-cta="moorage-pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: ORANGE }}>
              <Calendar className="w-5 h-5" /> Book Your Slip Online
            </a>
            <a href={FEE_PDF} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2" style={{ borderColor: NAVY, color: NAVY }}>
              <FileText className="w-5 h-5" /> 2026 Fee Schedule & Amenities
            </a>
            <a href={AGREEMENT_PDF} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2" style={{ borderColor: NAVY, color: NAVY }}>
              <FileText className="w-5 h-5" /> 2026 Moorage Agreement
            </a>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">Book short-term, seasonal, or annual slips at Silverthorn Resort.</p>
        </div>
      </section>

      {/* Marina Services */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Marina Services</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: ORANGE }} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.name} className="rounded-2xl border p-6 text-center bg-white shadow-sm" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="font-semibold mb-1" style={{ color: NAVY }}>{s.name}</div>
                <div className="text-lg font-bold" style={{ color: ORANGE }}>{s.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slip Holder Specials */}
      <section className="py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Slip Holder Specials</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: ORANGE }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SPECIALS.map((s) => (
              <div key={s.title} className="rounded-2xl p-6 bg-white border shadow-sm" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: ORANGE, color: "white" }}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1" style={{ color: NAVY }}>{s.title}</h3>
                <p className="text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marina Amenities */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Marina Amenities</h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: ORANGE }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES.map((a) => (
              <div key={a.title} className="rounded-2xl p-6 border text-center" style={{ borderColor: "rgba(27,43,58,0.08)", backgroundColor: SAND }}>
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: NAVY, color: "white" }}>
                  <a.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1" style={{ color: NAVY }}>{a.title}</h3>
                <p className="text-sm text-gray-600">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form */}
      <section className="py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-3xl mx-auto px-6 space-y-5 text-gray-700 leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Boat Slip Rentals at Silverthorn Resort on Shasta Lake
          </h2>
          <p>
            Silverthorn Resort is a premier full-service marina on Shasta Lake's protected Pit River Arm.
            Whether you need year-round houseboat moorage or a seasonal ski boat slip, Silverthorn offers
            flexible rental terms with competitive rates and early-payment discounts that save you hundreds.
          </p>
          <p>
            Our houseboat slips accommodate vessels up to 15' × 56' with head-in configuration for easy access.
            Ski boat slips include finger docks for safe, hassle-free docking, while patio boat slips offer
            affordable storage for pontoon-style boats up to 31 feet. Seasonal slip holders enjoy the full
            May through October boating season on the lake.
          </p>
          <p>
            Shasta Lake's Pit River Arm is renowned for calm, warm waters, breathtaking canyon scenery, and
            world-class bass fishing. With your boat stored at Silverthorn, you skip the trailer hassle and hit
            the water in minutes. Slip holders enjoy exclusive perks including free parking, complimentary
            pump-outs, locked dock access, and a 10% discount on boat rentals.
          </p>
          <p className="pt-2">
            Explore more from the <a href="/" className="text-primary underline underline-offset-2 hover:opacity-80" style={{ color: ORANGE }}>Silverthorn Resort home page</a>,
            browse our <a href="/small-boats" className="underline underline-offset-2 hover:opacity-80" style={{ color: ORANGE }}>small boat rental fleet</a>,
            or view our <a href="/houseboats" className="underline underline-offset-2 hover:opacity-80" style={{ color: ORANGE }}>houseboat rentals</a>.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>Questions About Slip Availability?</h2>
            <p className="text-white/90">Our Silverthorn marina team is ready to help you find the perfect slip.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:+1${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white font-semibold" style={{ color: NAVY }}>
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
              <Mail className="w-5 h-5" /> Email Marina
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
