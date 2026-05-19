import { createFileRoute } from "@tanstack/react-router";
import SilverthornHomePage from "@/components/SilverthornHomePage";
import heroMarina from "@/assets/home-hero-marina.webp";

const SITE = "https://silver-shasta-dreams.lovable.app";
const URL = `${SITE}/`;
const TITLE = "Silverthorn Resort — Shasta Lake Houseboat Rentals, Cabins & Marina";
const DESCRIPTION =
  "Family-run Shasta Lake resort on the Pit River Arm. Premium houseboat rentals, lakeside cabins, jet skis, wakeboard & patio boats. Booking 2026 now.";
const OG_IMAGE = `${SITE}${heroMarina}`;

export const Route = createFileRoute("/")({
  component: SilverthornHomePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "preload", as: "image", href: heroMarina, fetchPriority: "high" } as any,
    ],
  }),
});
