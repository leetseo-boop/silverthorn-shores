import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const LAT = 40.8419;
const LNG = -122.2489;
const BBOX = `${LNG - 0.08},${LAT - 0.05},${LNG + 0.08},${LAT + 0.05}`;
const OSM_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LNG}`;

interface ResortMapProps {
  className?: string;
}

export function ResortMap({ className }: ResortMapProps) {
  return (
    <div className={`relative overflow-hidden bg-muted ${className || ""}`}>
      <iframe
        src={OSM_SRC}
        title="Map showing Silverthorn Resort on Shasta Lake"
        aria-label="Map showing Silverthorn Resort on Shasta Lake"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
      <div className="pointer-events-none absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-xl bg-background/95 px-3 py-2 text-sm font-semibold text-secondary shadow-lg ring-1 ring-border backdrop-blur">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          Silverthorn Resort
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 max-w-[calc(100%-1.5rem)]">
        <Button
          asChild
          size="sm"
          className="pointer-events-auto h-auto rounded-full px-3 py-2 text-xs shadow-lg sm:text-sm"
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
