import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Navigation, Waves } from "lucide-react";

const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const ADDRESS = "16250 Silverthorn Road, Redding, CA 96003";

interface ResortMapProps {
  className?: string;
}

export function ResortMap({ className }: ResortMapProps) {
  return (
    <div
      className={`flex min-h-[280px] items-center justify-center bg-background p-4 sm:p-6 ${className || ""}`}
      role="img"
      aria-label={`Location information for Silverthorn Resort at ${ADDRESS}`}
    >
      <div className="grid h-full w-full place-items-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-background/95 p-5 text-center shadow-xl backdrop-blur sm:p-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <MapPin className="h-7 w-7" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Shasta Lake · Pit River Arm
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-secondary sm:text-3xl">
            Silverthorn Resort
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {ADDRESS}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-left text-xs text-muted-foreground">
            <div className="rounded-xl border border-border bg-card p-3">
              <Waves className="mb-2 h-4 w-4 text-primary" />
              <span className="font-semibold text-secondary">Marina on the lake</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <Navigation className="mb-2 h-4 w-4 text-primary" />
              <span className="font-semibold text-secondary">Open directions</span>
            </div>
          </div>

          <Button asChild className="mt-5 w-full rounded-full">
            <a href={MAPS_DEEP_LINK} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Open in Google Maps
            </a>
          </Button>
        </div>
      </div>

    </div>
  );
}
