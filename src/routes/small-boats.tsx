// @ts-nocheck
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import {
  Anchor, Car, Fuel, ShoppingBag, Users, MapPin, Phone, Heart, Fish,
  Calendar, Home, ChevronDown, Zap, Waves,
} from "lucide-react";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";
const BOOKING_URL = "https://rentals.silverthornresort.com";
const HERO = "/images/small-boats/hero.jpg";
const PATH = "/small-boats";

const fleet = [
  { id: "jet-ski", name: "SeaDoo GTX 130 Jet Ski", price: 548.63, capacity: "1–2", use: "High-speed lake adventure", img: "/images/small-boats/jet-ski.webp", alt: "SeaDoo GTX 130 jet ski rental at Silverthorn Resort on Shasta Lake" },
  { id: "axis-t220r", name: "Axis T220-R Wakeboard Boat", price: 1243.55, capacity: "8", use: "Premium wakeboarding & wake surfing", img: "/images/small-boats/axis-t220r.webp", alt: "Axis T220-R wakeboard boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "centurion-t5", name: "Centurion T-5 Wakeboard Boat", price: 637.45, capacity: "8", use: "Wakeboarding & water sports", img: "/images/small-boats/centurion-t5.webp", alt: "Centurion T-5 wakeboard boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "tahoe-deck", name: "Tahoe Deck Boat 150", price: 543.40, capacity: "8", use: "Family cruising & swimming", img: "/images/small-boats/tahoe-deck.webp", alt: "Tahoe 150 deck boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "patio-boat", name: "Patio Boat", price: 323.95, capacity: "8", use: "Relaxed cove cruising", img: "/images/small-boats/patio-boat.webp", alt: "Patio boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "sun-tracker", name: "Sun Tracker Pontoon", price: 438.90, capacity: "10", use: "Family pontoon cruising", img: "/images/small-boats/sun-tracker.jpg", alt: "Sun Tracker pontoon boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "party-cruiser-i", name: "Party Cruiser I", price: 830.78, capacity: "12+", use: "Group parties & celebrations", img: "/images/small-boats/party-cruiser-i.webp", alt: "Party Cruiser I large pontoon rental at Silverthorn Resort, Shasta Lake" },
  { id: "fishing-boat", name: "Fishing Boat", price: 78.38, capacity: "3–4", use: "Bass fishing on Pit River Arm", img: "/images/small-boats/fishing-boat.webp", alt: "Aluminum fishing boat rental at Silverthorn Resort, Shasta Lake" },
  { id: "kayak", name: "Kayak", price: 78.38, capacity: "1–2", use: "Solo paddling & cove exploration", img: "/images/small-boats/kayak.jpg", alt: "Kayak rental at Silverthorn Resort on Shasta Lake" },
  { id: "sup", name: "Stand Up Paddle Board", price: 78.38, capacity: "1", use: "Fitness & calm-water fun", img: "/images/small-boats/sup.webp", alt: "Stand-up paddle board rental at Silverthorn Resort, Shasta Lake" },
];

const benefits = [
  { icon: Anchor, title: "Direct Lake Access", text: "Launch straight onto Shasta Lake from our private marina on the Pit River Arm." },
  { icon: Car, title: "On-Site Parking", text: "Convenient parking right at the marina for easy access." },
  { icon: Fuel, title: "Fuel Dock", text: "Full-service fuel dock for hassle-free refueling." },
  { icon: ShoppingBag, title: "Marina Store", text: "Snacks, drinks, gear and everything you need on the water." },
  { icon: Users, title: "Pro Staff", text: "Expert team to handle orientation, safety and lake guidance." },
  { icon: MapPin, title: "Prime Location", text: "Scenic Pit River Arm — a quiet, wide arm of Shasta Lake." },
];

const audiences = [
  { icon: Users, title: "Families", text: "Safe pontoons and deck boats perfect for kids and parents to enjoy the lake together." },
  { icon: Heart, title: "Couples", text: "Jet skis and kayaks for romantic adventures exploring hidden coves and shoreline." },
  { icon: Fish, title: "Anglers", text: "Fishing boats ready for bass on the Pit River Arm, a prime Shasta Lake fishing area." },
  { icon: Calendar, title: "Weekenders", text: "Quick, no-commitment rentals — perfect for spontaneous lake getaways." },
  { icon: Home, title: "Houseboat Guests", text: "The perfect add-on for cove exploration and water sports while staying on a houseboat." },
];

const faqs = [
  { q: "What types of boats can I rent at Silverthorn Resort?", a: "We offer kayaks, stand-up paddle boards, SeaDoo jet skis, Axis and Centurion wakeboard boats, Tahoe deck boats, patio and Sun Tracker pontoon boats, the Party Cruiser I, and aluminum fishing boats — covering everything from relaxed cruising to high-speed water sports." },
  { q: "Do I need a California Boater Card to rent at Silverthorn?", a: "No. A California Boater Card is not required. All operators must pass a brief safety questionnaire based on our orientation video and receive a comprehensive boat orientation before departure. Minimum primary-operator age is 21. Call 1-800-332-3044 with any questions." },
  { q: "What are the rental hours at Silverthorn Marina?", a: "Daily rentals typically run 8:00 AM – 4:30 PM (extended summer hours until 6:00 PM). Half-day rentals are also available. Contact us for specific availability and extended-rental options." },
  { q: "Is fuel included in the rental price?", a: "Fuel is not included. Our on-site fuel dock makes it easy to fill up before returning — you only pay for the fuel you use." },
  { q: "Can I rent a boat for multiple days?", a: "Yes — multi-day rentals are available for most boats in our fleet, often with discounted daily rates. Contact our team for multi-day pricing and availability." },
  { q: "How do I get to Silverthorn Resort on Shasta Lake?", a: "Silverthorn Resort is at 16250 Silverthorn Rd, Redding, CA 96003. From I-5 northbound, take the Gilman Road exit and follow signs (~8 miles). Drive times: Redding ~15 min, Sacramento ~3 hrs, San Francisco ~4 hrs." },
];

const TITLE = "Silverthorn Resort Boat Rentals on Shasta Lake | Pontoons, Jet Skis & Wakeboard Boats";
const DESC = "Rent pontoon boats, jet skis, wakeboard boats, fishing boats, kayaks & SUPs at Silverthorn Resort on Shasta Lake's Pit River Arm. 10 boats from $78/day. Book 2026!";

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${PATH}#silverthorn`,
      name: "Silverthorn Resort & Marina — Boat Rentals",
      description: DESC,
      url: PATH,
      telephone: "+1-800-332-3044",
      image: HERO,
      address: { "@type": "PostalAddress", streetAddress: "16250 Silverthorn Rd", addressLocality: "Redding", addressRegion: "CA", postalCode: "96003", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 40.7547764, longitude: -122.242348 },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "08:00", closes: "16:30" },
      priceRange: "$78 – $1,244",
    },
    {
      "@type": "Service",
      "@id": `${PATH}#service`,
      name: "Boat Rental Service",
      serviceType: "Boat Rental",
      provider: { "@id": `${PATH}#silverthorn` },
      areaServed: { "@type": "Place", name: "Shasta Lake, California" },
      description: "Daily and multi-day rentals of pontoon boats, jet skis, wakeboard boats, deck boats, fishing boats, kayaks and stand-up paddle boards at Silverthorn Resort.",
    },
    {
      "@type": "ItemList",
      "@id": `${PATH}#fleet`,
      name: "Silverthorn Resort Small Boat Fleet",
      numberOfItems: fleet.length,
      itemListElement: fleet.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: b.name,
          image: b.img,
          description: b.use,
          brand: { "@type": "Brand", name: "Silverthorn Resort" },
          offers: { "@type": "Offer", price: b.price.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url: BOOKING_URL },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Small Boats", item: PATH },
        { "@type": "ListItem", position: 3, name: "Rentals", item: PATH },
      ],
    },
  ],
};

export const Route = createFileRoute("/small-boats")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PATH },
      { property: "og:image", content: HERO },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: HERO },
    ],
    links: [
      { rel: "canonical", href: PATH },
      { rel: "preload", as: "image", href: HERO, fetchPriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ldGraph) },
    ],
  }),
  component: SmallBoatsPage,
});

function SmallBoatsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      <Nav />

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b" >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <a href="/" className="text-gray-600 hover:opacity-75">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Small Boats</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Rentals</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={HERO}
            alt="Silverthorn Resort small-boat fleet on Shasta Lake — wakeboard boats, pontoons and party cruiser at the Pit River Arm marina"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,32,48,0.78), rgba(13,32,48,0.5) 50%, rgba(13,32,48,0.3))" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5" style={{ backgroundColor: ORANGE, color: "white" }}>
              <MapPin className="w-4 h-4" /> Silverthorn Resort · Pit River Arm
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight text-white mb-5" style={{ fontFamily: DISPLAY }}>
              Shasta Lake Boat Rentals <span style={{ color: "#FFB36B" }}>— Pontoons, Jet Skis & Wakeboard Boats</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Ten boats, one private marina. Cruise, ski, fish or paddle Shasta Lake's calm Pit River Arm — from $78/day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: ORANGE }}>
                <Calendar className="w-5 h-5" /> Book a Boat
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

      {/* Benefits */}
      <section className="py-16" style={{ backgroundColor: SAND }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Why Rent at Silverthorn Marina
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Direct lake access, full-service marina, and a fleet sized for every adventure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1.5" style={{ color: NAVY }}>{b.title}</h3>
                <p className="text-sm text-gray-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-16 bg-white" id="fleet">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>The Fleet</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Ten boats covering every speed, group size and budget — all bookable online.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((b) => (
              <article key={b.id} className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={b.img} alt={b.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow" style={{ backgroundColor: ORANGE }}>
                    From ${b.price.toFixed(0)}/day
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1" style={{ color: NAVY, fontFamily: DISPLAY }}>{b.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{b.use}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="inline-flex items-center gap-1 text-gray-700"><Users className="w-4 h-4" /> Up to {b.capacity}</span>
                    <span className="font-bold" style={{ color: NAVY }}>${b.price.toFixed(2)}</span>
                  </div>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-lg text-white font-medium transition-all"
                    style={{ backgroundColor: ORANGE }}>
                    Book Now →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-16" style={{ backgroundColor: NAVY, color: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY }}>Who It's For</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Whether you're chasing wake spray or sunset paddles, there's a boat with your name on it.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-xl p-5 bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: ORANGE }}>
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1.5">{a.title}</h3>
                <p className="text-sm text-white/70">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know before launch day.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="rounded-xl border bg-white" style={{ borderColor: "rgba(27,43,58,0.12)" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
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

      {/* CTA band */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>Ready for your day on Shasta Lake?</h2>
            <p className="text-white/90">Reserve your boat in minutes — daily and multi-day rentals available.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white font-semibold"
              style={{ color: NAVY }}>
              <Calendar className="w-5 h-5" /> Book Now
            </a>
            <a href="tel:+18003323044"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white">
              <Phone className="w-5 h-5" /> Call 1-800-332-3044
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
