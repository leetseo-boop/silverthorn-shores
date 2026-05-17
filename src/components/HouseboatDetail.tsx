// @ts-nocheck
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Users, BedDouble, Bath, Ruler, Star, ChevronLeft, ChevronRight, Check, Calendar,
  Phone, Info, ArrowRight, Sparkles, LayoutGrid, DollarSign, Box, HelpCircle, Camera, Video,
} from "lucide-react";
import type { Houseboat } from "@/data/houseboats";
import { houseboats } from "@/data/houseboats";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const DISPLAY = "'Playfair Display', Georgia, serif";

function Lightbox({ items, alts, index, onClose, onPrev, onNext }: any) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white text-3xl z-10" onClick={onClose} aria-label="Close">✕</button>
      <button className="absolute left-4 text-white text-4xl px-3 z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">‹</button>
      <img src={items[index]} alt={alts?.[index] || ""} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
      <button className="absolute right-4 text-white text-4xl px-3 z-10" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">›</button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full text-sm">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}

export function HouseboatDetail({ boat }: { boat: Houseboat }) {
  const [heroIdx, setHeroIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState<number | null>(null);

  const hero = boat.heroImages;
  const heroAlts = boat.heroAltTexts;
  const nextHero = () => setHeroIdx((i) => (i + 1) % hero.length);
  const prevHero = () => setHeroIdx((i) => (i - 1 + hero.length) % hero.length);

  const fleet = houseboats.filter((b) => b.id !== boat.id);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      

      {/* Breadcrumb */}
      <div className="pt-20" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:text-[color:var(--foreground)]">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Houseboats</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Silverthorn Resort</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>{boat.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero gallery */}
      <section className="pb-8" style={{ backgroundColor: "#F4EFE6" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] cursor-zoom-in"
            onClick={() => setLightboxIdx(heroIdx)}
          >
            <img
              src={hero[heroIdx]}
              alt={heroAlts[heroIdx]}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <button
              onClick={(e) => { e.stopPropagation(); prevHero(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white"
              aria-label="Previous image"
            ><ChevronLeft className="w-6 h-6" style={{ color: NAVY }} /></button>
            <button
              onClick={(e) => { e.stopPropagation(); nextHero(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white"
              aria-label="Next image"
            ><ChevronRight className="w-6 h-6" style={{ color: NAVY }} /></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-sm font-medium">
              {heroIdx + 1} / {hero.length}
            </div>
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 text-sm font-bold rounded-full shadow-lg text-white" style={{ backgroundColor: ORANGE }}>
                {boat.badge}
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {hero.map((src, i) => (
              <button
                key={i}
                onClick={() => setHeroIdx(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === heroIdx ? "" : "opacity-60 hover:opacity-100"}`}
                style={{ borderColor: i === heroIdx ? ORANGE : "transparent" }}
                aria-label={`Show image ${i + 1}`}
              >
                <img src={src} alt={heroAlts[i]} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky quick-facts bar */}
      <section className="border-b bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
                {boat.name} Houseboat Rental on Shasta Lake
              </h1>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <Star className="w-4 h-4 fill-current" style={{ color: ORANGE }} />
                <span className="font-medium">{boat.rating}</span>
                <span className="text-gray-500">({boat.reviews} reviews)</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-5 text-sm">
              <div className="flex items-center gap-1.5"><Users className="w-5 h-5 text-gray-500" /><span><strong>{boat.sleeps}</strong> Guests</span></div>
              <div className="flex items-center gap-1.5"><BedDouble className="w-5 h-5 text-gray-500" /><span><strong>{boat.beds}</strong> Beds</span></div>
              <div className="flex items-center gap-1.5"><Bath className="w-5 h-5 text-gray-500" /><span><strong>{boat.bathrooms}</strong> Baths</span></div>
              <div className="flex items-center gap-1.5"><Ruler className="w-5 h-5 text-gray-500" /><span><strong>{boat.length}</strong></span></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs uppercase tracking-wide text-gray-500">From</div>
                <div className="text-xl font-bold" style={{ color: NAVY }}>${boat.priceFrom.toLocaleString()}</div>
              </div>
              <a
                href={boat.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-transform hover:scale-105 text-sm"
                style={{ backgroundColor: ORANGE }}
              >
                <Calendar className="w-4 h-4" />
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content + sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full flex-wrap h-auto justify-start gap-2 p-2 rounded-xl" style={{ backgroundColor: "#F4EFE6" }}>
                  <TabsTrigger value="overview"><Info className="w-4 h-4 mr-1.5" />Overview</TabsTrigger>
                  <TabsTrigger value="layout"><LayoutGrid className="w-4 h-4 mr-1.5" />Layout</TabsTrigger>
                  <TabsTrigger value="amenities"><Sparkles className="w-4 h-4 mr-1.5" />Amenities</TabsTrigger>
                  <TabsTrigger value="pricing"><DollarSign className="w-4 h-4 mr-1.5" />Pricing</TabsTrigger>
                  <TabsTrigger value="gallery"><Camera className="w-4 h-4 mr-1.5" />Gallery</TabsTrigger>
                  {boat.matterportId && <TabsTrigger value="tour"><Box className="w-4 h-4 mr-1.5" />3D Tour</TabsTrigger>}
                  <TabsTrigger value="faq"><HelpCircle className="w-4 h-4 mr-1.5" />FAQ</TabsTrigger>
                  {boat.youtubeVideoId && <TabsTrigger value="video"><Video className="w-4 h-4 mr-1.5" />Video</TabsTrigger>}
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="mt-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: DISPLAY, color: NAVY }}>About the {boat.name}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{boat.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: NAVY }}>Best For</h3>
                    <div className="flex flex-wrap gap-2">
                      {boat.bestFor.map((t) => (
                        <span key={t} className="px-4 py-2 rounded-full font-medium text-sm" style={{ backgroundColor: "rgba(232,100,10,0.08)", color: ORANGE }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3" style={{ color: NAVY }}>Highlights</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {boat.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-3">
                          <Check className="w-5 h-5 flex-shrink-0" style={{ color: ORANGE }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Layout */}
                <TabsContent value="layout" className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>{boat.name} Layout</h2>
                  {(["mainDeck", "upperDeck", "sleepingAreas"] as const).map((k) => (
                    <div key={k} className="p-6 rounded-xl" style={{ backgroundColor: "#F4EFE6" }}>
                      <h3 className="font-semibold mb-2 capitalize" style={{ color: NAVY }}>
                        {k === "mainDeck" ? "Main Deck" : k === "upperDeck" ? "Upper Deck" : "Sleeping Areas"}
                      </h3>
                      <p className="text-gray-700">{boat.layout[k]}</p>
                    </div>
                  ))}
                </TabsContent>

                {/* Amenities */}
                <TabsContent value="amenities" className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>Amenities & Features</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {Object.entries(boat.amenities).map(([category, items]) => (
                      <div key={category} className="p-6 rounded-xl" style={{ backgroundColor: "#F4EFE6" }}>
                        <h3 className="font-semibold mb-4" style={{ color: NAVY }}>{category}</h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Pricing */}
                <TabsContent value="pricing" className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>{boat.name} 2026 Pricing</h2>
                  <p className="text-gray-600">
                    All prices include mandatory fees. <span className="font-medium" style={{ color: ORANGE }}>Highlighted prices</span> are holiday rates. Click any rate to check availability.
                  </p>

                  {/* Desktop table */}
                  <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full border-collapse">
                      <thead style={{ backgroundColor: NAVY }}>
                        <tr className="text-white text-sm">
                          <th className="text-left py-3 px-4 font-semibold">Nights</th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <div>LOW SEASON</div>
                            <div className="text-xs font-normal text-white/70">Jan 02 – Apr 30 · Aug 20 – Nov 30</div>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <div>MAY & SEPT</div>
                            <div className="text-xs font-normal text-white/70">Regular & Holiday</div>
                          </th>
                          <th className="text-center py-3 px-4 font-semibold">
                            <div>HIGH SEASON</div>
                            <div className="text-xs font-normal text-white/70">Jun 11 – Aug 19, 2026</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {([
                          ["3", "threeNight"],
                          ["4", "fourNight"],
                          ["7", "sevenNight"],
                        ] as const).map(([label, key], i) => {
                          const p = boat.extendedPricing[key];
                          return (
                            <tr key={key} className="border-t border-gray-200" style={{ backgroundColor: i % 2 ? "#fff" : "#FAF7F1" }}>
                              <td className="py-4 px-4 font-medium">{label}</td>
                              <td className="py-4 px-4 text-center">
                                <a href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">${p.low.toLocaleString()}</a>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <a href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  <div>${p.maySept.toLocaleString()}</div>
                                  <div className="text-xs font-medium" style={{ color: ORANGE }}>${p.maySeptHoliday.toLocaleString()} Holiday</div>
                                </a>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <a href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  <div>${p.high.toLocaleString()}</div>
                                  <div className="text-xs font-medium" style={{ color: ORANGE }}>${p.holiday.toLocaleString()} Holiday</div>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden space-y-4">
                    {([
                      ["3 Nights", "threeNight"],
                      ["4 Nights", "fourNight"],
                      ["7 Nights", "sevenNight"],
                    ] as const).map(([label, key]) => {
                      const p = boat.extendedPricing[key];
                      return (
                        <a key={key} href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" className="block rounded-xl p-4 border border-gray-200 hover:shadow-md transition" style={{ backgroundColor: "#FAF7F1" }}>
                          <div className="text-center font-semibold text-lg mb-3 pb-2 border-b" style={{ color: NAVY }}>{label}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm text-center">
                            <div><div className="text-xs text-gray-500 mb-1">Low</div><div className="font-bold">${p.low.toLocaleString()}</div></div>
                            <div><div className="text-xs text-gray-500 mb-1">May/Sept</div><div className="font-bold">${p.maySept.toLocaleString()}</div><div className="text-xs font-medium" style={{ color: ORANGE }}>${p.maySeptHoliday.toLocaleString()} hol</div></div>
                            <div><div className="text-xs text-gray-500 mb-1">High</div><div className="font-bold">${p.high.toLocaleString()}</div><div className="text-xs font-medium" style={{ color: ORANGE }}>${p.holiday.toLocaleString()} hol</div></div>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl text-sm space-y-2" style={{ backgroundColor: "#F4EFE6" }}>
                    <p><strong>High Season:</strong> June 11 – August 19, 2026</p>
                    <p className="text-gray-600">May uses regular rates except Memorial Day. September uses low season rates except Labor Day. High season holiday = July 4th week.</p>
                  </div>

                  <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(232,100,10,0.3)", backgroundColor: "rgba(232,100,10,0.05)" }}>
                    <h4 className="font-semibold mb-3 text-sm" style={{ color: NAVY }}>🎆 Holiday Date Ranges</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div className="p-2 rounded bg-white"><span className="font-medium">Memorial Day</span> <span className="text-gray-500 text-xs">5/18–5/25</span></div>
                      <div className="p-2 rounded bg-white"><span className="font-medium">July 4th</span> <span className="text-gray-500 text-xs">6/29–7/6</span></div>
                      <div className="p-2 rounded bg-white"><span className="font-medium">Labor Day</span> <span className="text-gray-500 text-xs">8/31–9/7</span></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: "rgba(232,100,10,0.08)" }}>
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                    <div className="text-sm">
                      <strong style={{ color: NAVY }}>No Hidden Fees</strong>
                      <p className="text-gray-600 mt-1">Your price includes all taxes and mandatory fees.</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Gallery */}
                <TabsContent value="gallery" className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {boat.gallery.map((src, i) => (
                      <GalleryItem key={i} src={src} alt={boat.galleryAltTexts[i]} onClick={() => setGalleryLightboxIdx(i)} />
                    ))}
                  </div>
                </TabsContent>

                {/* 3D tour */}
                {boat.matterportId && (
                  <TabsContent value="tour" className="mt-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>Virtual 3D Tour</h2>
                        <p className="text-gray-600 mt-1">Explore every corner of the {boat.name} from anywhere.</p>
                      </div>
                      <a href={`https://my.matterport.com/show/?m=${boat.matterportId}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium" style={{ color: ORANGE }}>
                        Open Fullscreen <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={`https://my.matterport.com/show/?m=${boat.matterportId}`}
                          title={`${boat.name} Houseboat 3D Virtual Tour`}
                          className="absolute inset-0 w-full h-full"
                          allow="fullscreen; xr-spatial-tracking"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="rounded-xl p-6" style={{ backgroundColor: "#F4EFE6" }}>
                      <h3 className="font-semibold mb-3" style={{ color: NAVY }}>Navigation Tips</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700">
                        {["Click circles to move between rooms", "Scroll to zoom in/out", "Press play for guided walkthrough", "Switch to dollhouse view for overview", "Touch & swipe on mobile", "Works great on smart TVs"].map((t) => (
                          <div key={t} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ORANGE }} /><span>{t}</span></div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}

                {/* FAQ */}
                <TabsContent value="faq" className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {boat.faqs.map((f, i) => (
                      <AccordionItem key={i} value={`f${i}`}>
                        <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-700">{f.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>

                {/* Video */}
                {boat.youtubeVideoId && (
                  <TabsContent value="video" className="mt-8 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>Official Tour Video</h2>
                      <p className="text-gray-600 mt-1">Experience the {boat.name} in action on Shasta Lake.</p>
                    </div>
                    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${boat.youtubeVideoId}?rel=0&modestbranding=1`}
                          title={`${boat.name} Houseboat Official Video Tour`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Right: sticky booking card */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-2xl p-6 shadow-lg border border-gray-200 bg-white">
                  <div className="text-center mb-6">
                    <div className="text-xs uppercase tracking-wide text-gray-500">Starting From</div>
                    <div className="text-4xl font-bold mt-1" style={{ color: NAVY, fontFamily: DISPLAY }}>
                      ${boat.priceFrom.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 italic mt-1">3 Nights Low Season</div>
                  </div>
                  <a
                    href={boat.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-4 rounded-xl font-bold text-white text-lg transition-transform hover:scale-[1.02] mb-3"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Check Availability
                  </a>
                  <a
                    href="tel:8003323044"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold border-2 transition-colors"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    <Phone className="w-4 h-4" />
                    800-332-3044
                  </a>
                  <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-500" /><span><strong>{boat.sleeps}</strong> Guests</span></div>
                    <div className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-gray-500" /><span><strong>{boat.beds}</strong> Beds</span></div>
                    <div className="flex items-center gap-2"><Bath className="w-4 h-4 text-gray-500" /><span><strong>{boat.bathrooms}</strong> Baths</span></div>
                    <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-gray-500" /><span><strong>{boat.length}</strong></span></div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: ORANGE }}>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: DISPLAY }}>
          Ready to Book the {boat.name}?
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          Secure your dates on Shasta Lake — limited availability for the 2026 season.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-lg transition-transform hover:scale-105" style={{ color: NAVY }}>
            <Calendar className="w-5 h-5" /> Check Availability
          </a>
          <a href="tel:8003323044" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold border-2 border-white text-white text-lg transition-colors hover:bg-white/10">
            <Phone className="w-5 h-5" /> 800-332-3044
          </a>
        </div>
      </section>

      {/* Explore the fleet */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Explore the Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fleet.map((b) => (
              <Link
                key={b.id}
                to={`/houseboats/${b.slug}` as any}
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: NAVY }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#0D3A52]">
                  <img src={b.heroImages[0]} alt={b.heroAltTexts[0]} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: DISPLAY }}>{b.name}</h3>
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
          items={hero}
          alts={heroAlts}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i! - 1 + hero.length) % hero.length)}
          onNext={() => setLightboxIdx((i) => (i! + 1) % hero.length)}
        />
      )}

      {galleryLightboxIdx !== null && (
        <Lightbox
          items={boat.gallery}
          alts={boat.galleryAltTexts}
          index={galleryLightboxIdx}
          onClose={() => setGalleryLightboxIdx(null)}
          onPrev={() => setGalleryLightboxIdx((i) => (i! - 1 + boat.gallery.length) % boat.gallery.length)}
          onNext={() => setGalleryLightboxIdx((i) => (i! + 1) % boat.gallery.length)}
        />
      )}
    </div>
  );
}

function GalleryItem({ src, alt, onClick }: any) {
  return (
    <div onClick={onClick} className="aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in hover:opacity-90 transition">
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
    </div>
  );
}
