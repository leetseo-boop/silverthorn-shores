import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

// 'unsafe-inline' script-src is required by the inline GA bootstrap in __root.tsx;
// frame-src covers video embeds and Matterport 3D houseboat tours.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://my.matterport.com https://discover.matterport.com",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

function withSecurityHeaders(response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const secured = new Response(response.body, response);
  secured.headers.set("Content-Security-Policy", CSP);
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("X-Frame-Options", "DENY");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  secured.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(self \"https://my.matterport.com\"), gyroscope=(self \"https://my.matterport.com\"), xr-spatial-tracking=(self \"https://my.matterport.com\")",
  );
  return secured;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const LEGACY_REDIRECTS: Record<string, string> = {
  // Static/legacy Bluehost paths
  "/index.html": "/",
  "/home": "/",
  "/home.html": "/",
  "/index.php": "/",
  "/history": "/about/history",
  "/history.html": "/about/history",
  "/about": "/about/history",
  "/about.html": "/about/history",
  "/contact.html": "/contact",
  "/directions.html": "/directions",
  "/faq.html": "/faq",
  "/houseboats.html": "/houseboats",
  "/cabins.html": "/cabins",
  "/small-boats.html": "/small-boats",
  "/smallboats": "/small-boats",
  "/pro-shop.html": "/pro-shop",
  "/proshop": "/pro-shop",
  "/employment.html": "/employment",
  "/guest-info.html": "/guest-info",
  "/shasta-lake.html": "/shasta-lake",
  "/planning.html": "/planning",

  // Legacy WordPress slugs still linked from rentals.silverthornresort.com
  "/cabin-reservations": "/cabins",
  "/cabin-rental-policy": "/cabins/policy",
  "/our-houseboats": "/houseboats",
  "/houseboat-reservations": "/houseboats",
  "/houseboat-rental-policy": "/houseboats/policy",
  "/queen-elite-of-the-fleet": "/houseboats/queen",
  "/queen-i-the-ultimate": "/houseboats/queen-i",
  "/queen-ii-luxury-on-the-lake": "/houseboats/queen-ii",
  "/senator-destination-vacation": "/houseboats/senator",
  "/small-boat-rentals": "/small-boats",
  "/small-boat-reservations": "/small-boats",
  "/planning-your-vacation": "/planning",
  "/silverthorn-marina": "/planning",
  "/silverthorn-moorage": "/planning",
  "/our-history": "/about/history",
  "/guest-information": "/guest-info",
};

// Known route prefixes served by the app — anything else legacy falls back to "/".
const KNOWN_PREFIXES = [
  "/houseboats",
  "/cabins",
  "/small-boats",
  "/shasta-lake",
  "/exploring-shasta-lake",
  "/planning",
  "/about",
  "/contact",
  "/directions",
  "/faq",
  "/guest-info",
  "/pro-shop",
  "/employment",
  "/compare",
  "/auth",
  "/admin",
  "/api",
  "/_",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon",
  "/assets",
];

function resolveLegacyRedirect(url: URL): string | null {
  const rawPath = url.pathname;
  if (rawPath === "/") return null;

  // Normalize trailing slash before lookup so /our-history and /our-history/ both match.
  const path =
    rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  // Exact match against legacy map
  const exact = LEGACY_REDIRECTS[path];
  if (exact) return exact;

  // Strip trailing .html for any legacy static page
  if (path.endsWith(".html")) {
    const stripped = path.slice(0, -5);
    if (KNOWN_PREFIXES.some((p) => stripped === p || stripped.startsWith(p + "/"))) {
      return stripped;
    }
    return "/";
  }

  // Trailing slash on an otherwise-known route → canonical no-slash form
  if (rawPath !== path && KNOWN_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))) {
    return path;
  }

  return null;
}


const CANONICAL_HOST = "silverthornresort.com";
const HOST_ALIASES = new Set(["www.silverthornresort.com"]);

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Canonical host redirect (www → apex). Only for known aliases so
      // preview/lovable.app hosts are unaffected.
      if (HOST_ALIASES.has(url.hostname)) {
        const target = new URL(url.toString());
        target.hostname = CANONICAL_HOST;
        return new Response(null, {
          status: 301,
          headers: {
            location: target.toString(),
            "cache-control": "public, max-age=3600",
          },
        });
      }

      const redirectTo = resolveLegacyRedirect(url);
      if (redirectTo) {
        const target = new URL(redirectTo, url.origin);
        target.search = url.search;
        return new Response(null, {
          status: 301,
          headers: {
            location: target.toString(),
            "cache-control": "public, max-age=3600",
          },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);

      // Force correct content-type for sitemap.xml — hosting layer otherwise
      // rewrites application/xml to text/html.
      if (url.pathname === "/sitemap.xml" && response.status === 200) {
        const body = await response.text();
        return new Response(body, {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
            "x-content-type-options": "nosniff",
          },
        });
      }

      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(brandedErrorResponse());
    }
  },
};

