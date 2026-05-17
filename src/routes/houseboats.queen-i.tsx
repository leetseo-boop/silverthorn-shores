// @ts-nocheck
import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import {
  Users, BedDouble, Bath, Droplets, Waves, Flame, ChefHat, Sparkles, Phone,
} from "lucide-react";

export const Route = createFileRoute("/houseboats/queen-i")({
  head: () => ({
    meta: [
      { title: "Queen I Houseboat — The Ultimate Adventure | Silverthorn Resort" },
      {
        name: "description",
        content:
          "Book the Queen I houseboat on Shasta Lake. Sleeps 20, 4 staterooms + bonus room, hot tub, waterslide, 2 BBQ areas. The most popular boat for large groups.",
      },
      { property: "og:title", content: "Queen I Houseboat — Silverthorn Resort" },
      {
        property: "og:description",
        content: "The most popular boat in our fleet for large groups and reunions.",
      },
      { property: "og:image", content: "/images/queen-i-hero.jpg" },
      { property: "og:url", content: "/houseboats/queen-i" },
    ],
    links: [{ rel: "canonical", href: "/houseboats/queen-i" }],
  }),
  component: QueenIPage,
});

const BOOK_URL = "https://rentals.silverthornresort.com/details/19";
const PHONE = "800-332-3044";
const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const DISPLAY = "'Playfair Display', Georgia, serif";

const GALLERY = [
  { src: "/images/queen-i-gallery-1.jpg", alt: "Queen I houseboat exterior on Shasta Lake" },
  { src: "/images/queen-i-gallery-2.jpg", alt: "Queen I houseboat upper deck hot tub Shasta Lake" },
  { src: "/images/queen-i-gallery-3.jpg", alt: "Queen I houseboat spacious interior with kitchen and wet bar" },
  { src: "/images/queen-i-gallery-4.jpg", alt: "Queen I houseboat waterslide and sun deck" },
];

const SPECS = [
  { icon: Users, label: "Sleeps 20" },
  { icon: BedDouble, label: "4 Staterooms + Bonus Room" },
  { icon: Bath, label: "2.5 Bathrooms" },
  { icon: Droplets, label: "Hot Tub" },
  { icon: Waves, label: "Waterslide" },
  { icon: Flame, label: "2 BBQ Areas" },
  { icon: ChefHat, label: "Full Kitchen" },
  { icon: Sparkles, label: "Fireplace + Wet Bar" },
];

const PRICING_ROWS = [
  { nights: 3, low: "$4,029.57", mid: "$4,575.58", midHoliday: "$5,124.66", high: "$5,340.00", highHoliday: "$5,980.81" },
  { nights: 4, low: "$4,466.38", mid: "$4,575.58", midHoliday: "$5,124.66", high: "$5,886.02", highHoliday: "$6,592.34" },
  { nights: 7, low: "$6,234.37", mid: "$6,234.37", midHoliday: "$6,982.50", high: "$9,477.68", highHoliday: "$10,615.01" },
];

const FLEET_LINKS = [
  { name: "Queen", tagline: "Elite of the Fleet", to: "/houseboats/queen", img: "/images/queen-thumb.jpg" },
  { name: "Queen II", tagline: "Luxury on the Lake", to: "/houseboats/queen-ii", img: "/images/queen-ii-thumb.jpg" },
  { name: "Senator", tagline: "Destination Vacation", to: "/houseboats/senator", img: "/images/senator-thumb.jpg" },
];

function BookButton({ children = "Check Availability →", variant = "primary", className = "" }: any) {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white text-3xl" onClick={onClose} aria-label="Close">✕</button>
      <button className="absolute left-4 text-white text-4xl px-3" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">‹</button>
      <img src={item.src} alt={item.alt} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <button className="absolute right-4 text-white text-4xl px-3" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">›</button>
    </div>
  );
}

function QueenIPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      <Nav />

      {/* 1. Hero */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <img
          src="/images/queen-i-hero.jpg"
          alt="Queen I houseboat the ultimate luxury houseboat rental on Shasta Lake at Silverthorn Resort"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/80 uppercase tracking-[0.3em] text-xs mb-4">
            Silverthorn Resort · Shasta Lake
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 max-w-4xl leading-tight" style={{ fontFamily: DISPLAY }}>
            Queen I: The Ultimate Adventure
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            The most popular boat in our fleet for large groups and reunions.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <BookButton />
            <a href={`tel:${PHONE.replace(/-/g, "")}`} className="inline-flex items-center gap-2 text-white font-medium hover:text-white/80">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Gallery */}
      <section className="py-16 px-6" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ fontFamily: DISPLAY }}>
            Step Aboard
          </h2>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setLightboxIdx(i)}
                className="group relative flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%] aspect-[4/3] overflow-hidden rounded-xl shadow-md cursor-zoom-in snap-start"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ fontFamily: DISPLAY }}>
            What's Onboard
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SPECS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-base font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Description */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: DISPLAY }}>
            About the Queen I
          </h2>
          <p className="text-lg leading-relaxed text-[color:var(--muted-foreground)]">
            Custom designed for the most luxurious houseboat experience on Shasta Lake, the Queen I
            sleeps up to 20 guests and features 4 private staterooms plus a bonus room, 2.5 bathrooms,
            a spacious kitchen with 25 cubic foot refrigerator/freezer, wet bar, two BBQ areas,
            fireplace, satellite TV with DVD, hot tub, and waterslide. This houseboat was built for
            unforgettable large-group adventures.
          </p>
        </div>
      </section>

      {/* 5. Pricing */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3" style={{ fontFamily: DISPLAY }}>
            2026 Pricing
          </h2>
          <p className="text-center text-[color:var(--muted-foreground)] mb-10">
            Click any rate to check availability and book.
          </p>
          <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
            <table className="w-full text-left">
              <thead style={{ backgroundColor: NAVY }} className="text-white">
                <tr>
                  <th className="p-4 font-semibold">Nights</th>
                  <th className="p-4 font-semibold">Low Season<br /><span className="text-xs font-normal text-white/70">Jan–Apr & Aug–Nov</span></th>
                  <th className="p-4 font-semibold">May & Sept</th>
                  <th className="p-4 font-semibold">High Season<br /><span className="text-xs font-normal text-white/70">Jun 11–Aug 19</span></th>
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((r, idx) => (
                  <tr key={r.nights} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}>
                    <td className="p-4 font-bold text-lg" style={{ color: NAVY }}>{r.nights}</td>
                    <td className="p-4">
                      <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: ORANGE }}>
                        {r.low}
                      </a>
                    </td>
                    <td className="p-4">
                      <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: ORANGE }}>
                        {r.mid}
                      </a>
                      <div className="text-sm text-red-600 mt-1">({r.midHoliday} holiday)</div>
                    </td>
                    <td className="p-4">
                      <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: ORANGE }}>
                        {r.high}
                      </a>
                      <div className="text-sm text-red-600 mt-1">({r.highHoliday} holiday)</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[color:var(--muted-foreground)] mt-6 italic">
            High Season: June 11–August 19, 2026. All mandatory fees included. <span className="text-red-600 not-italic font-medium">Red = Holiday rate.</span>
          </p>
        </div>
      </section>

      {/* 6. CTA banner */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: ORANGE }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: DISPLAY }}>
          Ready to Book the Queen I?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <BookButton variant="secondary">Check Availability →</BookButton>
          <a href={`tel:${PHONE.replace(/-/g, "")}`} className="inline-flex items-center gap-2 text-white font-medium hover:text-white/80 underline-offset-4 hover:underline">
            <Phone className="w-4 h-4" /> Call {PHONE}
          </a>
        </div>
      </section>

      {/* 7. Explore the Fleet */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: DISPLAY }}>
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
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: DISPLAY }}>
                    {b.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{b.tagline}</p>
                  <span className="inline-block px-5 py-2 rounded-lg font-semibold text-sm" style={{ backgroundColor: ORANGE, color: "#fff" }}>
                    View →
                  </span>
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
