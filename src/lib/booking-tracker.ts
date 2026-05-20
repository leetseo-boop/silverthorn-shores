// Global click tracker for outbound "Book Now" links.
// - Rewrites the link's href to include UTM params just before navigation.
// - Sends a GA4 `book_now_click` event.
// - Inserts a row into Lovable Cloud `booking_clicks` (fire-and-forget).
//
// To attribute clicks to a section, add data attributes on (or near) the <a>:
//   <a data-cta="hero" data-boat-id="queen-i" href="https://rentals.silverthornresort.com/...">
//
// The tracker matches any anchor whose hostname is rentals.silverthornresort.com.

import { supabase } from "@/integrations/supabase/client";

const BOOKING_HOST = "rentals.silverthornresort.com";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __bookingTrackerInit?: boolean;
  }
}

function withUTM(
  url: string,
  params: { source_page: string; cta_location: string; boat_id: string | null },
): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "website");
    u.searchParams.set("utm_medium", "book_now");
    u.searchParams.set("utm_campaign", params.source_page.replace(/^\//, "") || "home");
    u.searchParams.set("utm_content", params.cta_location);
    if (params.boat_id) u.searchParams.set("utm_term", params.boat_id);
    return u.toString();
  } catch {
    return url;
  }
}

function findAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  let el = target as HTMLElement | null;
  while (el && el.nodeType === 1) {
    if (el.tagName === "A") return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}

function readAttr(a: HTMLAnchorElement, name: string): string | null {
  const v = a.getAttribute(name);
  if (v) return v;
  const ancestor = a.closest(`[${name}]`);
  return ancestor?.getAttribute(name) ?? null;
}

export function initBookingTracker() {
  if (typeof window === "undefined") return;
  if (window.__bookingTrackerInit) return;
  window.__bookingTrackerInit = true;

  document.addEventListener(
    "click",
    (e) => {
      const a = findAnchor(e.target);
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;

      let parsed: URL;
      try {
        parsed = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (parsed.hostname !== BOOKING_HOST) return;

      const source_page = window.location.pathname || "/";
      const cta_location = readAttr(a, "data-cta") || "unspecified";
      const boat_id = readAttr(a, "data-boat-id");

      const finalUrl = withUTM(parsed.toString(), { source_page, cta_location, boat_id });
      a.setAttribute("href", finalUrl);

      // GA4 event
      try {
        window.gtag?.("event", "book_now_click", {
          source_page,
          cta_location,
          boat_id: boat_id ?? undefined,
          destination_url: finalUrl,
        });
      } catch {
        /* ignore */
      }

      // Lovable Cloud insert (fire and forget)
      try {
        void supabase.from("booking_clicks").insert({
          source_page,
          cta_location,
          boat_id,
          destination_url: finalUrl,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
        });
      } catch {
        /* ignore */
      }
    },
    { capture: true },
  );
}
