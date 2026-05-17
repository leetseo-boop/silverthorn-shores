// @ts-nocheck
import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import {
  Users, Bath, Layers, Waves, ChefHat, Tv, Flame, UtensilsCrossed, Droplets,
} from "lucide-react";

export const Route = createFileRoute("/houseboats/queen")({
  head: () => ({
    meta: [
      { title: "Queen Houseboat — Elite of the Fleet | Silverthorn Resort" },
      {
        name: "description",
        content:
          "Book the Queen, Silverthorn Resort's elite houseboat on Shasta Lake. Sleeps 20, hot tub, waterslide, 3 decks, master penthouse suite.",
      },
      { property: "og:title", content: "Queen Houseboat — Silverthorn Resort" },
      {
        property: "og:description",
        content: "The elite of the Silverthorn fleet — sleeps 20, hot tub, waterslide, 3 decks.",
      },
      { property: "og:image", content: "/images/queen-hero.jpg" },
      { property: "og:url", content: "/houseboats/queen" },
    ],
    links: [{ rel: "canonical", href: "/houseboats/queen" }],
  }),
  component: QueenPage,
});

const BOOK_URL = "https://rentals.silverthornresort.com/details/18";
const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const DISPLAY = "'Playfair Display', Georgia, serif";

const GALLERY = [
  { src: "/images/queen-gallery-1.jpg", alt: "Queen houseboat exterior on Shasta Lake" },
  { src: "/images/queen-gallery-2.jpg", alt: "Queen houseboat upper deck hot tub and sun deck" },
  { src: "/images/queen-gallery-3.jpg", alt: "Queen houseboat master penthouse suite interior" },
  { src: "/images/queen-gallery-4.jpg", alt: "Queen houseboat waterslide off the top deck" },
];

const SPECS = [
  { icon: Users, label: "Sleeps 20" },
  { icon: Bath, label: "4.5 Bathrooms" },
  { icon: Layers, label: "3 Decks" },
  { icon: Droplets, label: "Hot Tub" },
  { icon: Waves, label: "Waterslide" },
  { icon: ChefHat, label: "Full Kitchen" },
  { icon: Tv, label: "FireTV" },
  { icon: Flame, label: "Fireplace" },
  { icon: UtensilsCrossed, label: "BBQ Grill" },
];

const PRICING = [
  {
    season: "Low Season",
    months: "Jan–Apr & Aug–Nov",
    price: "$4,247",
    nights: "3 nights",
  },
  {
    season: "Shoulder Season",
    months: "May & September",
    price: "$4,793",
    nights: "3 nights",
  },
  {
    season: "High Season",
    months: "June–August",
    price: "$6,322",
    nights: "3 nights",
  },
];

const FLEET_LINKS = [
  { name: "Queen I", tagline: "The Ultimate", to: "/houseboats/queen-i", img: "/images/queen-i-thumb.jpg" },
  { name: "Queen II", tagline: "Luxury on the Lake", to: "/houseboats/queen-ii", img: "/images/queen-ii-thumb.jpg" },
  { name: "Senator", tagline: "Destination Vacation", to: "/houseboats/senator", img: "/images/senator-thumb.jpg" },
];

function BookButton({ children = "Book Now →", className = "", variant = "primary" }: any) {
  const bg = variant === "primary" ? ORANGE : "#fff";
  const color = variant === "primary" ? "#fff" : NAVY;
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-base transition-transform hover:scale-[1.03] ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </a>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }: any) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);
  const item = items[index];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl"
        onClick={onClose}
        aria-label="Close"
      >✕</button>
      <button
        className="absolute left-4 text-white text-4xl px-3"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >‹</button>
      <img
        src={item.src}
        alt={item.alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 text-white text-4xl px-3"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >›</button>
    </div>
  );
}

function QueenPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      <Nav />

      {/* 1. Hero */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <img
          src="/images/queen-hero.jpg"
          alt="Queen houseboat elite of the fleet on Shasta Lake at Silverthorn Resort"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/80 uppercase tracking-[0.3em] text-xs mb-4">
            Silverthorn Resort · Shasta Lake
          </p>
          <h1
            className="text-white text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            Queen: Elite of the Fleet
          </h1>
          <BookButton />
        </div>
      </section>

      {/* 2. Gallery */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ fontFamily: DISPLAY }}
          >
            Step Aboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setLightboxIdx(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md cursor-zoom-in"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Specs */}
      <section className="py-20 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            style={{ fontFamily: DISPLAY }}
          >
            What's Onboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {SPECS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: ORANGE }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-lg font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Description */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: DISPLAY }}
          >
            About the Queen
          </h2>
          <p className="text-lg leading-relaxed text-[color:var(--muted-foreground)]">
            Our Queen houseboat is the most elite in our fleet. Features a master penthouse
            suite on the 2nd deck with private bathroom, four private staterooms on the main
            deck, a large hot tub on the 3rd deck, sun deck, water slide, wet bar, 25 cu ft
            refrigerator, fireplace, and flat screen TV with DirectTV.
          </p>
        </div>
      </section>

      {/* 5. Pricing */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-3"
            style={{ fontFamily: DISPLAY }}
          >
            2026 Pricing
          </h2>
          <p className="text-center text-[color:var(--muted-foreground)] mb-12">
            Click any rate to check availability and book.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <a
                key={p.season}
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-8 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 border-t-4"
                style={{ borderTopColor: ORANGE }}
              >
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: DISPLAY, color: NAVY }}
                >
                  {p.season}
                </h3>
                <p className="text-sm text-[color:var(--muted-foreground)] mb-6">{p.months}</p>
                <div className="text-4xl font-bold mb-1" style={{ color: ORANGE, fontFamily: DISPLAY }}>
                  {p.price}
                </div>
                <p className="text-sm text-[color:var(--muted-foreground)]">{p.nights}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-[color:var(--muted-foreground)] mt-8 italic">
            Holiday rates apply; contact us for details.
          </p>
        </div>
      </section>

      {/* 6. CTA banner */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: ORANGE }}>
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-8"
          style={{ fontFamily: DISPLAY }}
        >
          Ready to Book the Queen?
        </h2>
        <BookButton variant="secondary">Book Now →</BookButton>
      </section>

      {/* 7. Explore the Fleet */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: DISPLAY }}
          >
            Explore the Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLEET_LINKS.map((b) => (
              <Link
                key={b.name}
                to={b.to}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: NAVY }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#0D3A52]">
                  <img
                    src={b.img}
                    alt={`${b.name} houseboat at Silverthorn Resort`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-2xl font-bold text-white mb-1"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {b.name}
                  </h3>
                  <p className="text-white/70 text-sm">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {lightboxIdx !== null && (
        <Lightbox
          items={GALLERY}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i: any) => (i! - 1 + GALLERY.length) % GALLERY.length)}
          onNext={() => setLightboxIdx((i: any) => (i! + 1) % GALLERY.length)}
        />
      )}
    </div>
  );
}
