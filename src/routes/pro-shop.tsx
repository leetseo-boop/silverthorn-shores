// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";

import {
  Calendar, Phone, MapPin, ShoppingBag, Waves, Anchor, Wind,
  Circle, LifeBuoy, Sailboat, Shirt,
} from "lucide-react";
import heroImg from "@/assets/proshop-hero.webp";
import tubingImg from "@/assets/proshop-tubing.webp";
import groupImg from "@/assets/proshop-group.webp";
import apparelStoreImg from "@/assets/proshop-apparel-store-interior.webp";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";
const BOOKING_URL = "https://rentals.silverthornresort.com/category/14";
const PATH = "/pro-shop";

const RENTALS = [
  { name: "Large Tube",   daily: 80,  weekly: 480, icon: LifeBuoy, note: "Towable fun for 1–4 riders" },
  { name: "Wakeboard",    daily: 100, weekly: 600, icon: Waves,    note: "Brand-name boards & bindings" },
  { name: "Water Ski",    daily: 50,  weekly: 300, icon: Sailboat, note: "Combo & slalom skis available" },
  { name: "Kayak",        daily: 75,  weekly: 450, icon: Anchor,   note: "Single-rider sit-on-top" },
  { name: "Paddleboard",  daily: 75,  weekly: 450, icon: Wind,     note: "Stand-up paddle boards" },
  { name: "Wake Surf",    daily: 80,  weekly: 480, icon: Circle,   note: "Surf the wake — rope-free riding" },
];

const CATEGORIES = [
  { title: "Wakeboards & Skis", text: "Brand-name boards, skis and bindings for purchase or rent.", img: heroImg,    tag: "Pro Gear" },
  { title: "Tubes & Towables",  text: "Large tubes built for laughter and high-speed wipeouts.",    img: tubingImg,  tag: "Family Fun" },
  { title: "Floats, SUPs & Kayaks", text: "Everything you need for a lazy cove day on Shasta Lake.", img: groupImg,   tag: "Cove Days" },
];

const TITLE = "Pro Shop & Rentals — Silverthorn Resort on Shasta Lake";
const DESC  = "Wakeboards, water skis, tubes, kayaks, paddleboards & wake surf rentals at Silverthorn Resort Pro Shop. Apparel, swim suits & accessories. Daily & weekly rates from $50.";

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${PATH}#proshop`,
      name: "Silverthorn Resort Pro Shop",
      description: DESC,
      url: PATH,
      telephone: "+1-800-332-3044",
      image: heroImg,
      address: { "@type": "PostalAddress", streetAddress: "16250 Silverthorn Rd", addressLocality: "Redding", addressRegion: "CA", postalCode: "96003", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 40.7547764, longitude: -122.242348 },
      priceRange: "$50 – $600",
    },
    {
      "@type": "ItemList",
      name: "Pro Shop Rental Equipment",
      numberOfItems: RENTALS.length,
      itemListElement: RENTALS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: r.name,
          description: r.note,
          offers: [
            { "@type": "Offer", price: r.daily.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url: BOOKING_URL, name: "Daily rate" },
            { "@type": "Offer", price: r.weekly.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url: BOOKING_URL, name: "Weekly rate" },
          ],
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Pro Shop", item: PATH },
      ],
    },
  ],
};

export const Route = createFileRoute("/pro-shop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PATH },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: heroImg },
    ],
    links: [
      { rel: "canonical", href: PATH },
      { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ldGraph) }],
  }),
  component: ProShopPage,
});

function ProShopPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <a href="/" className="text-gray-600 hover:opacity-75">Home</a>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Pro Shop</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Wakeboarder catching air at sunset on Shasta Lake behind a Silverthorn Resort boat"
            className="w-full h-full object-cover"
            width={1600}
            height={1200}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,32,48,0.82), rgba(13,32,48,0.45) 55%, rgba(13,32,48,0.25))" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5" style={{ backgroundColor: ORANGE, color: "white" }}>
              <ShoppingBag className="w-4 h-4" /> Pro Shop & Rentals · Silverthorn Marina
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-white mb-5" style={{ fontFamily: DISPLAY }}>
              Gear up for <span style={{ color: "#FFB36B" }}>Shasta Lake</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Brand-name wakeboards, skis, tubes, kayaks and paddleboards — plus swim suits, apparel and accessories at our on-site Pro Shop.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="hero"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-95"
                style={{ backgroundColor: ORANGE }}>
                <Calendar className="w-5 h-5" /> Reserve Gear
              </a>
              <a href="tel:+18003323044"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white/95 transition-all"
                style={{ color: NAVY }}>
                <Phone className="w-5 h-5" /> 1-800-332-3044
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Everything you need at the marina
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Stop by our Apparel & Pro Shop for the latest summer styles — swim suits, cover-ups, shorts,
            T-shirts, shoes and accessories. The Pro Shop is also stocked with brand-name wakeboards and skis
            for purchase or rent, so you can step off the dock fully equipped.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {["Swim Suits","Cover-Ups","Shorts","T-Shirts","Shoes","Accessories"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full" style={{ backgroundColor: SAND, color: NAVY }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Price Table */}
      <section className="py-16" style={{ backgroundColor: SAND }} id="rates">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Rental Rates</h2>
            <div className="w-16 h-1 mx-auto mb-4 rounded-full" style={{ backgroundColor: ORANGE }} />
            <p className="text-gray-600">Daily and weekly pricing for all on-site rentals.</p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl overflow-hidden shadow-sm border bg-white" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-bold tracking-wider uppercase text-white" style={{ backgroundColor: NAVY }}>
              <div className="col-span-6">Equipment</div>
              <div className="col-span-3 text-right">Daily Rate</div>
              <div className="col-span-3 text-right">Weekly Rate</div>
            </div>
            {RENTALS.map((r, i) => (
              <div key={r.name}
                className="grid grid-cols-12 items-center px-6 py-5 border-t transition-colors hover:bg-orange-50/40"
                style={{ borderColor: "rgba(27,43,58,0.06)", backgroundColor: i % 2 ? "rgba(244,239,230,0.35)" : "white" }}>
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <r.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-sm text-gray-500">{r.note}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right font-semibold" style={{ color: NAVY }}>${r.daily.toFixed(2)}</div>
                <div className="col-span-3 text-right font-semibold" style={{ color: ORANGE }}>${r.weekly.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {RENTALS.map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-4 border shadow-sm" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    <r.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: NAVY }}>{r.name}</div>
                    <div className="text-xs text-gray-500">{r.note}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: SAND }}>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Daily</div>
                    <div className="font-bold" style={{ color: NAVY }}>${r.daily.toFixed(2)}</div>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={{ backgroundColor: `${ORANGE}14` }}>
                    <div className="text-xs uppercase tracking-wide" style={{ color: ORANGE }}>Weekly</div>
                    <div className="font-bold" style={{ color: ORANGE }}>${r.weekly.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-5">
            Rates subject to availability and seasonal change. Tax not included.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From boards to bikinis — outfitted for every kind of lake day.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => (
              <article key={c.title} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={c.img}
                    alt={`${c.title} at Silverthorn Resort Pro Shop`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={1200}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,20,32,0.88) 0%, rgba(13,20,32,0.25) 55%, rgba(13,20,32,0) 100%)" }} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: ORANGE }}>{c.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1.5" style={{ fontFamily: DISPLAY }}>{c.title}</h3>
                  <p className="text-sm text-white/85 mb-4">{c.text}</p>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta={`category-${c.tag}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold border-b border-white/70 pb-0.5 hover:border-white">
                    Reserve now <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Apparel callout */}
      <section className="py-14" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src={apparelStoreImg}
              alt="Inside the Silverthorn Resort apparel and pro shop with snacks, sunglasses, hats, swimwear and souvenirs on Shasta Lake"
              className="w-full h-full object-cover aspect-[4/3]"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-col items-start gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ORANGE, color: "white" }}>
              <Shirt className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY, color: NAVY }}>Apparel & Accessories in-store</h3>
              <p className="text-gray-700">Forgot your sunscreen, hat, sunglasses or swim trunks? We've got you covered at the marina.</p>
            </div>
            <a href="tel:+18003323044"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: NAVY }}>
              <Phone className="w-4 h-4" /> Call the Shop
            </a>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>Rent your gear. Hit the lake.</h2>
            <p className="text-white/90">Reserve online or pick up at the marina — daily & weekly rentals available.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="final-cta"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white font-semibold"
              style={{ color: NAVY }}>
              <Calendar className="w-5 h-5" /> Book Now
            </a>
            <a href="/directions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
              <MapPin className="w-5 h-5" /> Get Directions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
