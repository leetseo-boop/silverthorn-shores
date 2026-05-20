// @ts-nocheck
/**
 * Silverthorn Resort — Homepage
 * Stack: React + Tailwind CSS (Lovable)
 * Fonts: Add to index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
 * Then add to tailwind.config.js:
 *   fontFamily: { display: ['Playfair Display', 'Georgia', 'serif'], body: ['DM Sans', 'system-ui', 'sans-serif'] }
 */

import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import silverthornLogo from "@/assets/silverthorn-logo.webp";
import heroMarina from "@/assets/home-hero-marina.webp";
import cabinImg from "@/assets/home-cabin.webp";
import smallBoatsImg from "@/assets/home-small-boats.webp";
import fleetQueen from "@/assets/fleet-queen.webp";
import fleetQueenI from "@/assets/fleet-queen-i.webp";
import fleetQueenII from "@/assets/fleet-queen-ii.webp";
import fleetSenator from "@/assets/fleet-senator.webp";

// ─── Constants ───────────────────────────────────────────────────────────────
const BOOKING_URL   = "https://rentals.silverthornresort.com";
const JONES_URL     = "https://houseboats.com";
const PHONE         = "800-332-3044";
const EMAIL         = "reserve1@houseboats.com";
const ADDRESS       = "16250 Silverthorn Road, Redding, CA 96003";

const FLEET = [
  {
    id: "queen",
    name: "Queen",
    tagline: "Elite of the Fleet",
    badge: "Elite",
    sleeps: 14,
    beds: 4,
    feature: "Hot tub + waterslide",
    slug: "/houseboats/queen",
    imgBg: "#0D3A52",
    image: fleetQueen,
  },
  {
    id: "queen-i",
    name: "Queen I",
    tagline: "The Ultimate",
    badge: "Ultimate",
    sleeps: 12,
    beds: 3,
    feature: "Hot tub + sundeck",
    slug: "/houseboats/queen-i",
    imgBg: "#1A4A6A",
    image: fleetQueenI,
  },
  {
    id: "queen-ii",
    name: "Queen II",
    tagline: "Luxury on the Lake",
    badge: "Luxury",
    sleeps: 12,
    beds: 3,
    feature: "Waterslide + fireplace",
    slug: "/houseboats/queen-ii",
    imgBg: "#1A5A7A",
    image: fleetQueenII,
  },
  {
    id: "senator",
    name: "Senator",
    tagline: "Destination Vacation",
    badge: "Classic",
    sleeps: 10,
    beds: 3,
    feature: "Sun deck + BBQ",
    slug: "/houseboats/senator",
    imgBg: "#2F4A38",
    image: fleetSenator,
  },
];

const STATS = [
  { num: "1975", label: "On Shasta Lake Since" },
  { num: "4",    label: "Houseboat Models" },
  { num: "7",    label: "Lakeside Cabins" },
  { num: "365",  label: "Miles of Shoreline" },
];

const REVIEWS = [
  {
    text: "Absolutely incredible experience. The Queen houseboat exceeded every expectation — the kids still talk about the waterslide. We'll be back every summer.",
    author: "The Martinez Family",
    location: "Sacramento, CA",
    source: "Google Review",
  },
  {
    text: "Third year in a row renting the Senator. The staff is incredible, the lake is stunning, and there's truly nothing like waking up on the water at Shasta.",
    author: "Dave & Linda K.",
    location: "San Jose, CA",
    source: "Google Review",
  },
  {
    text: "We rented a cabin and spent days on rented day boats. Perfect family vacation — peaceful, beautiful, and surprisingly affordable for what you get.",
    author: "The Johnson Crew",
    location: "Portland, OR",
    source: "Yelp",
  },
];

const NAV_LINKS = [
  {
    label: "Houseboats",
    children: [
      { label: "Our Fleet",    href: "/houseboats" },
      { label: "Queen",        href: "/houseboats/queen" },
      { label: "Queen I",      href: "/houseboats/queen-i" },
      { label: "Queen II",     href: "/houseboats/queen-ii" },
      { label: "Senator",      href: "/houseboats/senator" },
      { label: "Rental Policy",href: "/houseboats/policy" },
      { label: "Guest Info",   href: "/houseboats/guest-info" },
    ],
  },
  {
    label: "Cabins",
    children: [
      { label: "Lake Cabins",    href: "/cabins" },
      { label: "Cabin Policy",   href: "/cabins/policy" },
    ],
  },
  {
    label: "Small Boats",
    children: [
      { label: "All Rentals", href: "/small-boats" },
      { label: "Pro Shop",    href: "/pro-shop" },
    ],
  },
  {
    label: "Shasta Lake",
    children: [
      { label: "Shasta Lake",         href: "/shasta-lake" },
      { label: "Explore Shasta Lake", href: "/exploring-shasta-lake" },
      { label: "Planning Guide",      href: "/planning" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Our History", href: "/about/history" },
      { label: "Contact",     href: "/contact" },
      { label: "Directions",  href: "/directions" },
    ],
  },
  { label: "FAQ", href: "/faq" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b"
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(27,43,58,0.1)" }}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center h-20 gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0" aria-label="Silverthorn Resort Marina — Home">
          <img
            src={silverthornLogo}
            alt="Silverthorn Resort Marina"
            width={200}
            height={64}
            className="h-16 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="text-sm flex items-center gap-1 transition-colors font-medium py-2"
                  style={{ color: openDropdown === item.label ? "#E8640A" : "#1B2B3A" }}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                >
                  {item.label} <span className="text-xs opacity-60">▾</span>
                </button>
                {openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 pt-3 z-50"
                    style={{ minWidth: "16rem" }}
                  >
                    <div
                      className="rounded-xl overflow-hidden shadow-xl border py-1"
                      style={{
                        backgroundColor: "#ffffff",
                        borderColor: "rgba(27,43,58,0.12)",
                      }}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="block px-4 py-2 text-sm whitespace-nowrap transition-colors"
                          style={{ color: "#1B2B3A" }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#E8640A";
                            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(232,100,10,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#1B2B3A";
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          }}
                        >
                          {child.label}
                          {child.external && " ↗"}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm transition-colors font-medium py-2"
                style={{ color: "#1B2B3A" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E8640A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#1B2B3A")}
              >
                {item.label}
              </a>
            )
          )}
        </div>

        {/* Book CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="nav"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all flex-shrink-0"
          style={{ backgroundColor: "#E8640A" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4520A")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8640A")}
        >
          Book Now →
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto text-xl"
          style={{ color: "#1B2B3A" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "rgba(27,43,58,0.1)",
          }}
        >
          {NAV_LINKS.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b last:border-b-0" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <button
                  className="w-full flex items-center justify-between py-3 text-sm font-medium"
                  style={{ color: "#1B2B3A" }}
                  onClick={() =>
                    setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)
                  }
                  aria-expanded={mobileSubmenu === item.label}
                >
                  <span>{item.label}</span>
                  <span
                    className="text-xs transition-transform"
                    style={{
                      transform: mobileSubmenu === item.label ? "rotate(180deg)" : "none",
                    }}
                  >
                    ▾
                  </span>
                </button>
                {mobileSubmenu === item.label && (
                  <div className="pb-3 pl-3 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        target={child.external ? "_blank" : undefined}
                        rel={child.external ? "noopener noreferrer" : undefined}
                        className="block py-1.5 text-sm"
                        style={{ color: "rgba(27,43,58,0.75)" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                        {child.external && " ↗"}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium border-b last:border-b-0"
                style={{ color: "#1B2B3A", borderColor: "rgba(27,43,58,0.08)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-center py-3 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: "#E8640A" }}
          >
            Book Now →
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-5 sm:px-6 py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: "#0D2030",
        minHeight: "min(720px, 90vh)",
        backgroundImage: `url(${heroMarina})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* YouTube video background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/ISEDmsezjSM?autoplay=1&mute=1&loop=1&playlist=ISEDmsezjSM&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3"
          title="Shasta Lake background video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          tabIndex={-1}
          aria-hidden="true"
          loading="eager"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
          style={{
            width: "max(100vw, 177.78vh)",
            height: "max(56.25vw, 100vh)",
          }}
        />
      </div>

      {/* Subtle dark gradient for text legibility only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
        <p
          className="text-xs font-medium tracking-widest uppercase mb-5"
          style={{ color: "#E8A855", letterSpacing: "0.18em" }}
        >
          Shasta Lake · Redding, California
        </p>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your Shasta Lake{" "}
          <span style={{ color: "#E8640A" }}>Houseboat Adventure</span>{" "}
          Starts Here
        </h1>

        <p
          className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Four luxury houseboat models, seven lakeside cabins, and a
          full-service marina — all on California's premier inland lake.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium text-sm transition-all"
            style={{ backgroundColor: "#E8640A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4520A")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8640A")}
          >
            📅 Book Season 2026
          </a>
          <a
            href="/houseboats"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}
          >
            View Our Fleet
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs border"
          style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.25)" }}
        >
          📞 Call us: {PHONE}
        </div>
      </div>

      {/* Wave bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 z-10"
        style={{ backgroundColor: "#fff", borderRadius: "100% 100% 0 0 / 40px 40px 0 0" }}
      />
    </section>
  );
}

function FleetCard({ boat }: { boat: any }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-1"
      style={{ backgroundColor: "#fff", borderColor: "#E2DED6" }}
    >
      <div
        className="h-56 relative overflow-hidden"
        style={{ backgroundColor: boat.imgBg }}
      >
        <img
          src={boat.image}
          alt={`${boat.name} houseboat at Silverthorn Resort on Shasta Lake`}
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span
          className="absolute top-2.5 left-2.5 text-white text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded"
          style={{ backgroundColor: "#E8640A", fontSize: "10px" }}
        >
          {boat.badge}
        </span>
      </div>

      <div className="p-4">
        <h3
          className="text-xl font-bold mb-0.5"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#1B2B3A",
          }}
        >
          {boat.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: "#7a8a9a" }}>
          {boat.tagline}
        </p>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="text-xs flex items-center gap-1" style={{ color: "#5a6a7a" }}>
            👥 Sleeps {boat.sleeps}
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: "#5a6a7a" }}>
            🛏 {boat.beds} beds
          </span>
          <span className="text-xs flex items-center gap-1" style={{ color: "#5a6a7a" }}>
            ✨ {boat.feature}
          </span>
        </div>

        <a
          href={boat.slug}
          className="block w-full text-center px-4 py-2.5 rounded-lg text-white text-sm font-semibold tracking-wide transition-colors"
          style={{ backgroundColor: "#E8640A" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4520A")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8640A")}
        >
          Explore the {boat.name} →
        </a>
      </div>
    </div>
  );
}

function FleetSection() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-center text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "#E8640A", letterSpacing: "0.14em" }}
        >
          Our fleet
        </p>
        <h2
          className="text-4xl font-bold text-center mb-3"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#1B2B3A",
          }}
        >
          Choose Your Lake Escape
        </h2>
        <p className="text-center text-sm leading-relaxed max-w-lg mx-auto mb-12" style={{ color: "#5a6a7a" }}>
          From our elite Queen houseboat to the intimate Senator, every vessel is fully equipped for an unforgettable Shasta Lake experience.
        </p>

        {/* Houseboats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {FLEET.map((boat) => (
            <FleetCard key={boat.id} boat={boat} />
          ))}
        </div>

        {/* Bridge heading between houseboats and cabins/small boats */}
        <div className="text-center mt-16 mb-8 max-w-2xl mx-auto">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "#E8640A", letterSpacing: "0.14em" }}
          >
            Complete your Shasta Lake stay
          </p>
          <h3
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#1B2B3A",
            }}
          >
            Beyond the Houseboats — Stay Longer, Play More
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5a6a7a" }}>
            Settle into a pine-shaded lakeside cabin or grab a ski, fishing, or patio boat for the day. Mix and match your Shasta Lake adventure — on the water by day, by the fire at night.
          </p>
        </div>

        {/* Cabins + Small Boats — image-led showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              src: cabinImg,
              alt: "Lake cabin nestled in the pines at Silverthorn Resort, Shasta Lake",
              chip: "Cabins",
              chipBg: "#2F4A38",
              title: "Lake Cabins",
              tagline: "Nestled in the pines · 7 cabins · Studio to Family",
              cta: "See Our Lake Cabins →",
              learn: "/cabins",
            },
            {
              src: smallBoatsImg,
              alt: "Axis wakeboard boat rental on Shasta Lake at sunset",
              chip: "Day Boats",
              chipBg: "#1A6FA8",
              title: "Small Boat Rentals",
              tagline: "Half or full day · Fishing gear · Pro Shop",
              cta: "Browse Boat Rentals →",
              learn: "/small-boats",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
              style={{ borderColor: "#E2DED6" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={c.src}
                  alt={c.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm z-10"
                  style={{ backgroundColor: c.chipBg + "E6" }}
                >
                  {c.chip}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16">
                  <h3
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-xs text-white/85">{c.tagline}</p>
                </div>
              </div>
              <div className="px-5 py-4">
                <a
                  href={c.learn}
                  className="block w-full text-center px-4 py-2.5 rounded-lg text-white text-sm font-semibold tracking-wide transition-colors"
                  style={{ backgroundColor: "#E8640A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4520A")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8640A")}
                >
                  {c.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="py-10 px-6" style={{ backgroundColor: "#F5EFE4" }}>
      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {STATS.map((s, i) => (
          <div
            key={s.num}
            className="text-center py-4 px-4"
            style={{ borderLeft: i > 0 ? "0.5px solid #D4C9BA" : "none" }}
          >
            <div
              className="text-4xl font-black leading-none mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#E8640A",
              }}
            >
              {s.num}
            </div>
            <div className="text-xs tracking-wide" style={{ color: "#6a7a5a" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image — replace with actual photo */}
        <div
          className="rounded-2xl overflow-hidden relative flex items-end p-5"
          style={{ backgroundColor: "#0D3A52", minHeight: "300px" }}
        >
          <img
            src="/images/shasta-lake-about.jpg"
            alt="Shasta Lake aerial view with mountains"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <span
            className="relative z-10 text-sm font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Shasta Lake, California
          </span>
        </div>

        {/* Copy */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#E8640A", letterSpacing: "0.14em" }}>
            About the resort
          </p>
          <h2
            className="text-3xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1B2B3A" }}
          >
            California's Premier<br />Lake Destination
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a6a7a" }}>
            Silverthorn Resort sits on the shores of Shasta Lake — California's largest reservoir — offering houseboat rentals, lake cabins, and boat rentals in a stunning mountain setting. With nearly 50 years of history, we've helped families and groups create unforgettable lake memories.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#5a6a7a" }}>
            Whether you're looking for a week-long houseboat adventure or a peaceful cabin retreat in the pines, Silverthorn is your home on the lake.
          </p>
          <a
            href="/about/history"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-all"
            style={{ backgroundColor: "#1B2B3A" }}
          >
            Our History →
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#F5EFE4" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#E8640A", letterSpacing: "0.14em" }}>
          Guest reviews
        </p>
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1B2B3A" }}
        >
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <div
              key={r.author}
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: "#fff", borderColor: "#E2DED6" }}
            >
              <div className="text-base mb-3" style={{ color: "#E8A855", letterSpacing: "2px" }}>
                ★★★★★
              </div>
              <p className="text-sm leading-relaxed italic mb-4" style={{ color: "#444" }}>
                "{r.text}"
              </p>
              <div className="text-xs font-semibold" style={{ color: "#1B2B3A" }}>{r.author}</div>
              <div className="text-xs mt-0.5" style={{ color: "#9a8a7a" }}>
                {r.location} · {r.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SisterMarina() {
  return (
    <section className="px-6 py-16 text-center" style={{ backgroundColor: "#1B2B3A" }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#E8A855", letterSpacing: "0.14em" }}>
          Sister Marina · Jones Valley Resort
        </p>
        <h2
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Can't Get Silverthorn Dates?
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
          Our sister marina, Jones Valley Resort, offers four additional houseboat models on the same beautiful Shasta Lake. When Silverthorn is booked, we'll point you to Jones Valley — same team, same lake, same experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href={JONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-medium transition-all"
            style={{ backgroundColor: "#E8640A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C4520A")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#E8640A")}
          >
            Explore Jones Valley →
          </a>
          <a
            href={JONES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Visit houseboats.com
          </a>
        </div>
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs border"
          style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          ⚓ Both marinas managed by the same team on Shasta Lake since 1975
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(27,43,58,0.1)" }} className="px-8 pt-14 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          {/* Brand */}
          <div className="flex-shrink-0">
            <img
              src={silverthornLogo}
              alt="Silverthorn Resort Marina"
              width={200}
              height={96}
              loading="lazy"
              decoding="async"
              className="h-24 w-auto mb-4"
            />
            <div className="text-xs leading-relaxed" style={{ color: "rgba(27,43,58,0.7)" }}>
              {ADDRESS}<br /><br />
              📞 {PHONE}<br />
              ✉️ {EMAIL}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-10 flex-1 justify-start md:justify-end flex-wrap">
            {[
              {
                title: "Houseboats",
                links: [
                  { label: "Queen",         href: "/houseboats/queen" },
                  { label: "Queen I",       href: "/houseboats/queen-i" },
                  { label: "Queen II",      href: "/houseboats/queen-ii" },
                  { label: "Senator",       href: "/houseboats/senator" },
                  { label: "Rental Policy", href: "/houseboats/policy" },
                  { label: "Guest Info",    href: "/houseboats/guest-info" },
                ],
              },
              {
                title: "Small Boats",
                links: [
                  { label: "All Rentals", href: "/small-boats" },
                  { label: "ProShop",     href: "/small-boats/pro-shop" },
                ],
              },
              {
                title: "Stay",
                links: [
                  { label: "Lake Cabins",   href: "/cabins" },
                  { label: "Cabin Policy",  href: "/cabins/policy" },
                ],
              },
              {
                title: "Resort",
                links: [
                  { label: "Our History",    href: "/about/history" },
                  { label: "Shasta Lake",    href: "/shasta-lake" },
                  { label: "Planning Guide", href: "/planning" },
                  { label: "Directions",     href: "/directions" },
                  { label: "FAQ",            href: "/faq" },
                  { label: "Contact",        href: "/contact" },
                  { label: "Employment",     href: "/employment" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#1B2B3A" }}>
                  {col.title}
                </div>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    {...((l as any).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="block text-xs mb-1.5 transition-colors"
                    style={{ color: "rgba(27,43,58,0.65)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E8640A")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(27,43,58,0.65)")}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t"
          style={{ borderColor: "rgba(27,43,58,0.1)" }}
        >
          <div className="text-xs" style={{ color: "rgba(27,43,58,0.55)" }}>
            Silverthorn Resort ™ 2026 · All rights reserved
          </div>
          <div className="flex gap-2">
            {["f", "📷", "𝕏", "▶"].map((icon, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all"
                style={{
                  backgroundColor: "rgba(27,43,58,0.08)",
                  color: "#1B2B3A",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(27,43,58,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(27,43,58,0.08)")}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export const HOME_FAQS = [
  {
    q: "Which houseboat is right for my group?",
    a: "The Queen and Queen I both sleep 20 and are our flagship picks for large families. The Queen II sleeps 16 with a private penthouse suite, and the Senator sleeps 16 and is our best value. Compare them all on our houseboats page.",
    href: "/houseboats",
    linkLabel: "Compare all houseboats",
  },
  {
    q: "What's included with a lake cabin?",
    a: "Every cabin comes with a full kitchen, BBQ, DirecTV, linens, and one private boat slip at the marina. Sleep 4–8 guests depending on the cabin. Bring your own boat or rent one from us.",
    href: "/cabins",
    linkLabel: "See all cabins",
  },
  {
    q: "Can I rent a small boat just for the day?",
    a: "Yes — daily rentals include pontoons, jet skis, wakeboard & deck boats, fishing boats, kayaks and SUPs, starting from $78/day at the marina.",
    href: "/small-boats",
    linkLabel: "Browse boat rentals",
  },
  {
    q: "When should I book for the 2026 season?",
    a: "Holiday weeks and prime summer dates (mid-June through Labor Day) typically fill 6–9 months in advance. We recommend reserving as early as possible to lock in your preferred boat and week.",
  },
  {
    q: "Where exactly is Silverthorn Resort?",
    a: "We're on the Pit River Arm of Shasta Lake in Northern California — about 15 minutes north of Redding, just off I-5.",
    href: "/directions",
    linkLabel: "Get directions",
  },
  {
    q: "Do I need a boating license or prior experience?",
    a: "No license required. Every houseboat rental includes a full hands-on orientation before you leave the dock, and our team is available by radio throughout your stay.",
  },
];

function HomeFAQ() {
  return (
    <section className="px-6 py-20" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-3xl mx-auto">
        <p
          className="text-center text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "#E8640A", letterSpacing: "0.14em" }}
        >
          Common questions
        </p>
        <h2
          className="text-4xl font-bold text-center mb-10"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1B2B3A" }}
        >
          Plan Your Shasta Lake Stay
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {HOME_FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} style={{ borderColor: "#E2DED6" }}>
              <AccordionTrigger
                className="text-left text-base font-semibold py-5"
                style={{ color: "#1B2B3A", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed pb-5" style={{ color: "#5a6a7a" }}>
                <p>{f.a}</p>
                {f.href && (
                  <a
                    href={f.href}
                    className="inline-block mt-3 text-xs font-semibold"
                    style={{ color: "#E8640A" }}
                  >
                    {f.linkLabel} →
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-center text-sm mt-8" style={{ color: "#7a8a9a" }}>
          Still deciding? Call{" "}
          <a href={`tel:${PHONE.replace(/[^0-9]/g, "")}`} className="font-semibold" style={{ color: "#1B2B3A" }}>
            {PHONE}
          </a>{" "}
          or visit our{" "}
          <a href="/faq" className="font-semibold underline" style={{ color: "#1B2B3A" }}>
            full FAQ
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function SilverthornHomePage() {
  return (
    <main>
      
      <Hero />
      <FleetSection />
      <StatsBar />
      <AboutSection />
      <Testimonials />
      <HomeFAQ />
      <SisterMarina />
      
    </main>
  );
}
