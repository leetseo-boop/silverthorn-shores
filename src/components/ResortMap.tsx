import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    __resortMapInitCallbacks?: Array<() => void>;
    __resortMapInit?: () => void;
  }
}

const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const RESORT_POS = { lat: 40.8419, lng: -122.2489 };
const RESORT_TITLE = "Silverthorn Resort";

function loadMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.google?.maps?.Map) return resolve();

    window.__resortMapInitCallbacks = window.__resortMapInitCallbacks || [];
    window.__resortMapInitCallbacks.push(() => resolve());

    if (document.getElementById("resort-gmaps-script")) return; // loading

    window.__resortMapInit = () => {
      (window.__resortMapInitCallbacks || []).forEach((cb) => cb());
      window.__resortMapInitCallbacks = [];
    };

    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) return reject(new Error("missing maps key"));

    const s = document.createElement("script");
    s.id = "resort-gmaps-script";
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__resortMapInit${
      channel ? `&channel=${channel}` : ""
    }`;
    s.onerror = () => reject(new Error("failed to load Google Maps"));
    document.head.appendChild(s);
  });
}

interface ResortMapProps {
  className?: string;
}

export function ResortMap({ className }: ResortMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMapsScript()
      .then(() => {
        if (cancelled || !ref.current || !window.google?.maps) return;
        const map = new window.google.maps.Map(ref.current, {
          center: RESORT_POS,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        new window.google.maps.Marker({
          position: RESORT_POS,
          map,
          title: RESORT_TITLE,
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-muted/40 p-8 text-center ${
          className || ""
        }`}
      >
        <p className="text-sm text-muted-foreground">
          Map couldn't load. Open Silverthorn Resort directly in Google Maps.
        </p>
        <Button asChild size="sm" className="rounded-full">
          <a href={MAPS_DEEP_LINK} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Open in Google Maps
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="application"
      aria-label="Map showing Silverthorn Resort on Shasta Lake"
      className={className}
    />
  );
}
