import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Heart } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import heroMarina from "@/assets/home-hero-marina.webp";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const SITE = "https://silverthornresort.com";
const URL = `${SITE}/thorn`;
const TITLE = "Meet Thorn — The Dog of Silverthorn Resort | Shasta Lake";
const DESCRIPTION =
  "Meet Thorn, the resident dog of Silverthorn Resort on Shasta Lake. She has been greeting guests, posing for photos, and watching over the marina for the past 10 years.";

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": URL,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      image: `${SITE}${heroMarina}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Meet Thorn", item: URL },
      ],
    },
  ],
};

export const Route = createFileRoute("/thorn")({
  component: ThornPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${SITE}${heroMarina}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE}${heroMarina}` },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "preload", as: "image", href: heroMarina, fetchPriority: "high" } as any,
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ldGraph) }],
  }),
});

function ThornPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:opacity-75">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Meet Thorn</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroMarina}
            alt="Thorn, the white fluffy Silverthorn Resort dog, relaxing on the marina beach with houseboats and Shasta Lake in the background"
            className="w-full h-full object-cover object-[center_70%] md:object-[center_60%]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(27,43,58,0.45) 0%, rgba(27,43,58,0.25) 50%, rgba(27,43,58,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-28 text-center text-white">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
          >
            <Heart className="w-3.5 h-3.5" style={{ color: ORANGE }} />
            <span>Resident Good Girl</span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: DISPLAY }}
          >
            Meet Thorn
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
            The dog of Silverthorn Resort — your unofficial Shasta Lake host, photo model, and marina supervisor.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: ORANGE, letterSpacing: "0.14em" }}
        >
          A Silverthorn Original
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ fontFamily: DISPLAY, color: NAVY }}
        >
          Meet Thorn, the Dog of Silverthorn Resort 🐾
        </h2>

        <div className="space-y-6 text-base md:text-lg leading-relaxed" style={{ color: "rgba(27,43,58,0.85)" }}>
          <p>
            If you have visited Silverthorn Resort during the past 10 years, there is a good chance you have seen Thorn — either in one of our social media videos, posing for pictures, walking around the marina, or relaxing near the docks while watching everything like she owns the place. 😊
          </p>
          <p>
            Thorn lives at the marina and is completely at home around the guests, boats, busy summer seasons, and the changing water levels of Shasta Lake. Whether she is enjoying a cool breeze or quietly observing the daily marina activity, Thorn is always close by.
          </p>
          <p>
            It was easy to pick the AI assistant personality and name. After all, who better to show you the ropes at Silverthorn Resort than Thorn herself?
          </p>
          <p className="font-medium" style={{ color: NAVY }}>
            When you see her, snap a picture and tag us on social media. She may even stop long enough to pose! 🐶📸
          </p>
        </div>
      </section>

      {/* Social CTA */}
      <section className="px-6 pb-20">
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8 md:p-10 text-center"
          style={{ backgroundColor: SAND }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(232,100,10,0.12)" }}
          >
            <Camera className="w-6 h-6" style={{ color: ORANGE }} />
          </div>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: DISPLAY, color: NAVY }}
          >
            Share Your Thorn Sightings
          </h3>
          <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: "rgba(27,43,58,0.75)" }}>
            Caught Thorn on camera? Tag us and she might become the next star of our social feed.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <SocialLinks />
          </div>
        </div>
      </section>
    </div>
  );
}
