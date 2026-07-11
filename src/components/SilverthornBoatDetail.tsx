import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar, Phone, MapPin, Users, Clock, Shield, Sun, Zap, Anchor, Heart,
  Music, Fish, Compass, Waves, Gauge, ChevronDown, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import { BOATS, bookingUrl, type BoatConfig } from "@/data/silverthorn-boats";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const ICON_MAP: Record<BoatConfig["highlights"][number]["icon"], React.ComponentType<{ className?: string }>> = {
  speed: Gauge,
  sun: Sun,
  spark: Zap,
  users: Users,
  anchor: Anchor,
  shield: Shield,
  wave: Waves,
  music: Music,
  fish: Fish,
  compass: Compass,
  heart: Heart,
};

export function SilverthornBoatDetail({ boat }: { boat: BoatConfig }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const url = bookingUrl(boat.bookingId);
  const related = BOATS.filter((b) => b.slug !== boat.slug).slice(0, 3);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? 0 : (i + 1) % boat.gallery.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : (i - 1 + boat.gallery.length) % boat.gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, boat.gallery.length]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:opacity-75">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/small-boats" className="text-gray-600 hover:opacity-75">Small Boats</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>{boat.shortName}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={boat.hero}
            alt={boat.heroAlt}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,32,48,0.82), rgba(13,32,48,0.55) 50%, rgba(13,32,48,0.3))" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5" style={{ backgroundColor: ORANGE, color: "white" }}>
              <MapPin className="w-4 h-4" /> Silverthorn Resort · Pit River Arm
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-white mb-5" style={{ fontFamily: DISPLAY }}>
              {boat.name} <span style={{ color: "#FFB36B" }}>Rental</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">{boat.tagline}</p>
            <div className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-2 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 mb-8">
              <span className="text-3xl font-bold" style={{ color: "#FFB36B" }}>${boat.dailyPrice.toFixed(2)}</span>
              <span className="text-white/80">/day</span>
              <span className="text-white/30 mx-1">|</span>
              <span className="text-xl font-semibold text-white">${boat.weeklyPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              <span className="text-white/80">/week</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:brightness-110"
                style={{ backgroundColor: ORANGE }}>
                <Calendar className="w-5 h-5" /> Reserve Now
              </a>
              <a href="tel:+18003323044"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white/95 transition-all hover:bg-white"
                style={{ color: NAVY }}>
                <Phone className="w-5 h-5" /> 1-800-332-3044
              </a>
              <Link to="/small-boats"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
                ← View All Boats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: DISPLAY, color: NAVY }}>
            2026 {boat.shortName} Rates
          </h2>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 text-sm font-semibold uppercase tracking-wide" style={{ backgroundColor: SAND, color: NAVY }}>
              <div className="px-5 py-3">Rental</div>
              <div className="px-5 py-3">Deposit</div>
              <div className="px-5 py-3">Daily</div>
              <div className="px-5 py-3">Weekly</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 bg-white">
              <div className="px-5 py-4 font-medium">{boat.name} ({boat.capacity})</div>
              <div className="px-5 py-4">${boat.deposit.toFixed(2)}</div>
              <div className="px-5 py-4 font-bold" style={{ color: ORANGE }}>${boat.dailyPrice.toFixed(2)}</div>
              <div className="px-5 py-4 font-bold" style={{ color: ORANGE }}>${boat.weeklyPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">Prices per day plus tax. Refundable deposit required at booking. Weekly rate applies to 7-day rentals (subject to availability).</p>
        </div>
      </section>

      {/* Why + highlights */}
      <section className="py-12 md:py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Why Rent the {boat.shortName} from Silverthorn
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed mb-10">
            {boat.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {boat.highlights.map((h) => {
              const Icon = ICON_MAP[h.icon];
              return (
                <div key={h.title} className="bg-white rounded-xl p-5 border" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ color: NAVY }}>{h.title}</h3>
                  <p className="text-sm text-gray-600">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: DISPLAY, color: NAVY }}>
            {boat.shortName} Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {boat.gallery.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
                aria-label={`Open photo ${i + 1}: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Policies + Safety */}
      <section className="py-12 md:py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: NAVY }}>
              <Clock className="w-5 h-5" style={{ color: ORANGE }} /> Rental Hours &amp; Policies
            </h3>
            <ul className="space-y-2 text-gray-700">
              {boat.policies.map((p) => <li key={p}>• {p}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: NAVY }}>
              <Shield className="w-5 h-5" style={{ color: ORANGE }} /> Safety &amp; Requirements
            </h3>
            <ul className="space-y-2 text-gray-700">
              {boat.safety.map((p) => <li key={p}>• {p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {boat.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open}>
                    <span className="font-semibold" style={{ color: NAVY }}>{f.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: ORANGE }} />
                  </button>
                  {open && <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related boats */}
      <section className="py-12 md:py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Explore Other Boats
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to="/small-boats/$slug" params={{ slug: r.slug }} className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={r.hero} alt={r.heroAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow" style={{ backgroundColor: ORANGE }}>
                    From ${r.dailyPrice.toFixed(0)}/day
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: NAVY, fontFamily: DISPLAY }}>{r.shortName}</h3>
                  <p className="text-sm text-gray-600">{r.category} · Up to {r.capacityShort}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>Ready to book the {boat.shortName}?</h2>
            <p className="text-white/90">Reserve directly through Silverthorn Resort's booking system.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={url} target="_blank" rel="noopener noreferrer" data-cta="boat-detail-cta" data-boat-id={boat.slug}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white font-semibold"
              style={{ color: NAVY }}>
              <Calendar className="w-5 h-5" /> Reserve Now
            </a>
            <a href="tel:+18003323044"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
              <Phone className="w-5 h-5" /> Call 1-800-332-3044
            </a>
          </div>
        </div>
      </section>

      

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} aria-label="Close" className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + boat.gallery.length) % boat.gallery.length)); }} aria-label="Previous" className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % boat.gallery.length)); }} aria-label="Next" className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronRight className="w-6 h-6" />
          </button>
          <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={boat.gallery[lightbox].src} alt={boat.gallery[lightbox].alt} decoding="async" className="w-full h-auto max-h-[85vh] object-contain rounded-lg" />
            <figcaption className="text-center text-white/80 text-sm mt-3">{boat.gallery[lightbox].alt} · {lightbox + 1} / {boat.gallery.length}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export function buildBoatHeadConfig(boat: BoatConfig) {
  const path = `/small-boats/${boat.slug}`;
  const url = bookingUrl(boat.bookingId);
  const graph = [
    {
      "@type": "Product",
      "@id": `${path}#product`,
      name: boat.name,
      description: boat.metaDescription,
      image: boat.gallery.map((g) => g.src),
      brand: { "@type": "Brand", name: "Silverthorn Resort" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", bestRating: "5", reviewCount: "167" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: boat.dailyPrice.toFixed(2),
        highPrice: boat.weeklyPrice.toFixed(2),
        offerCount: 2,
        offers: [
          { "@type": "Offer", name: "Daily Rental", price: boat.dailyPrice.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url },
          { "@type": "Offer", name: "Weekly Rental", price: boat.weeklyPrice.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url },
        ],
      },
    },
    {
      "@type": "ImageGallery",
      "@id": `${path}#gallery`,
      name: `${boat.shortName} Photo Gallery — Silverthorn Resort`,
      image: boat.gallery.map((g) => ({ "@type": "ImageObject", contentUrl: g.src, name: g.alt, description: g.alt })),
    },
    {
      "@type": "FAQPage",
      "@id": `${path}#faq`,
      mainEntity: boat.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${path}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Small Boats", item: "/small-boats" },
        { "@type": "ListItem", position: 3, name: boat.shortName, item: path },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${path}#silverthorn`,
      name: "Silverthorn Resort & Marina",
      telephone: "+1-800-332-3044",
      url: path,
      priceRange: "$$",
      address: { "@type": "PostalAddress", streetAddress: "16250 Silverthorn Rd", addressLocality: "Redding", addressRegion: "CA", postalCode: "96003", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 40.7547764, longitude: -122.242348 },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "16:30" },
    },
  ];
  const ld = { "@context": "https://schema.org", "@graph": graph };
  return {
    meta: [
      { title: boat.metaTitle },
      { name: "description", content: boat.metaDescription },
      { property: "og:title", content: boat.metaTitle },
      { property: "og:description", content: boat.metaDescription },
      { property: "og:type", content: "product" },
      { property: "og:url", content: path },
      { property: "og:image", content: boat.hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: boat.metaTitle },
      { name: "twitter:description", content: boat.metaDescription },
      { name: "twitter:image", content: boat.hero },
    ],
    links: [
      { rel: "canonical", href: path },
      { rel: "preload", as: "image", href: boat.hero, fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
  };
}
