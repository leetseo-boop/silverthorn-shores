import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const LAT = 40.8419;
const LNG = -122.2489;
// Small bounding box around the resort for a nice zoom level
const BBOX = `${LNG - 0.08},${LAT - 0.05},${LNG + 0.08},${LAT + 0.05}`;
const OSM_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${LAT},${LNG}`;

interface ResortMapProps {
  className?: string;
}

export function ResortMap({ className }: ResortMapProps) {
  return (
    <div className={`relative ${className || ""}`}>
      <iframe
        src={OSM_SRC}
        title="Map showing Silverthorn Resort on Shasta Lake"
        aria-label="Map showing Silverthorn Resort on Shasta Lake"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
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
