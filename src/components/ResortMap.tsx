import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const LAT = 40.8419;
const LNG = -122.2489;
const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as string | undefined;

// OSM fallback if the Google key isn't available at runtime.
const BBOX = `${LNG - 0.08},${LAT - 0.05},${LNG + 0.08},${LAT + 0.05}`;
const OSM_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LNG}`;

const SCRIPT_ID = "google-maps-js";
const CALLBACK_NAME = "__silverthornInitMap";

declare global {
  interface Window {
    google?: any;
    [key: string]: any;
  }
}

function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve();

  return new Promise((resolve, reject) => {
    // Chain onto any in-flight load
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const prevCb = window[CALLBACK_NAME];
    window[CALLBACK_NAME] = () => {
      try { prevCb?.(); } catch {}
      resolve();
    };
    if (existing) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    const params = new URLSearchParams({
      key: BROWSER_KEY || "",
      loading: "async",
      callback: CALLBACK_NAME,
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

interface ResortMapProps {
  className?: string;
}

export function ResortMap({ className }: ResortMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!BROWSER_KEY) {
      setFailed(true);
      return;
    }
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !containerRef.current || !window.google?.maps) return;
        const map = new window.google.maps.Map(containerRef.current, {
          center: { lat: LAT, lng: LNG },
          zoom: 13,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          gestureHandling: "greedy",
        });
        const marker = new window.google.maps.Marker({
          position: { lat: LAT, lng: LNG },
          map,
          title: "Silverthorn Resort",
        });
        const info = new window.google.maps.InfoWindow({
          content:
            '<div style="font-family:system-ui,sans-serif;padding:2px 4px;max-width:220px">' +
            '<strong>Silverthorn Resort</strong><br/>' +
            '16250 Silverthorn Rd<br/>Lakehead, CA 96051' +
            '</div>',
        });
        marker.addListener("click", () => info.open({ map, anchor: marker }));
        // Open once on load for context
        info.open({ map, anchor: marker });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`relative ${className || ""}`}>
      {failed ? (
        <iframe
          src={OSM_SRC}
          title="Map showing Silverthorn Resort on Shasta Lake"
          aria-label="Map showing Silverthorn Resort on Shasta Lake"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <div
          ref={containerRef}
          role="application"
          aria-label="Map showing Silverthorn Resort on Shasta Lake"
          className="h-full w-full"
        />
      )}
      <div className="pointer-events-none absolute bottom-3 right-3">
        <Button
          asChild
          size="sm"
          className="pointer-events-auto rounded-full shadow-lg"
        >
          <a href={MAPS_DEEP_LINK} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Open in Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
}
