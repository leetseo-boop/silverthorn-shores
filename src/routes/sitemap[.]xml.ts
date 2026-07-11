import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BOATS } from "@/data/silverthorn-boats";

const BASE_URL = "https://silverthornresort.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/houseboats", changefreq: "weekly", priority: "0.9" },
  { path: "/houseboats/queen-i", changefreq: "weekly", priority: "0.9" },
  { path: "/houseboats/queen-ii", changefreq: "weekly", priority: "0.9" },
  { path: "/houseboats/queen", changefreq: "monthly", priority: "0.7" },
  { path: "/houseboats/senator", changefreq: "monthly", priority: "0.7" },
  { path: "/houseboats/policy", changefreq: "monthly", priority: "0.5" },
  { path: "/compare/queens", changefreq: "weekly", priority: "0.9" },
  { path: "/cabins", changefreq: "weekly", priority: "0.9" },
  { path: "/cabins/policy", changefreq: "monthly", priority: "0.5" },
  { path: "/small-boats", changefreq: "weekly", priority: "0.9" },
  { path: "/shasta-lake", changefreq: "monthly", priority: "0.7" },
  { path: "/exploring-shasta-lake", changefreq: "monthly", priority: "0.7" },
  { path: "/planning", changefreq: "monthly", priority: "0.7" },
  { path: "/about/history", changefreq: "yearly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/directions", changefreq: "yearly", priority: "0.5" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/guest-info", changefreq: "monthly", priority: "0.5" },
  { path: "/pro-shop", changefreq: "monthly", priority: "0.6" },
  { path: "/employment", changefreq: "monthly", priority: "0.5" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...STATIC_ENTRIES,
          ...BOATS.map((b) => ({
            path: `/small-boats/${b.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
