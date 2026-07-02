import { createFileRoute } from "@tanstack/react-router";
import { ExploringShastaLakePage } from "@/components/ExploringShastaLakePage";
import heroSunset from "@/assets/exploring-shasta-lake/shasta-lake-sunset-hero.webp";

const SITE = "https://silver-shasta-dreams.lovable.app";
const url = `${SITE}/exploring-shasta-lake`;
const title = "Exploring Shasta Lake — Sacramento, McCloud, Squaw & Pit Arms";
const description =
  "Your guide to Shasta Lake's four arms: history, hiking trails, caverns, boat-in campgrounds and the best fishing spots on each arm. From Silverthorn Resort.";
const ogImage = `${SITE}${heroSunset}`;

export const Route = createFileRoute("/exploring-shasta-lake")({
  component: ExploringShastaLakePage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "preload", as: "image", href: heroSunset, fetchPriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: "Shasta Lake — Sacramento, McCloud, Squaw Creek & Pit River Arms",
          description,
          image: [ogImage],
          url,
          geo: { "@type": "GeoCoordinates", latitude: 40.7857, longitude: -122.3886 },
          address: {
            "@type": "PostalAddress",
            addressRegion: "CA",
            addressCountry: "US",
            addressLocality: "Lakehead",
          },
          touristType: ["Boaters", "Anglers", "Hikers", "Houseboaters", "History enthusiasts"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "About Shasta Lake", item: `${SITE}/shasta-lake` },
            { "@type": "ListItem", position: 3, name: "Exploring Shasta Lake", item: url },
          ],
        }),
      },
    ],
  }),
});
