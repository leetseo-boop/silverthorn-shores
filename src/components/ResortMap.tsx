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
      className={`relative isolate flex min-h-[320px] overflow-hidden bg-muted ${className || ""}`}
      role="img"
      aria-label={`Illustrated location map for Silverthorn Resort at ${ADDRESS}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/25" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-primary/15" />
      <div className="absolute -left-8 bottom-8 h-28 w-[120%] -rotate-6 rounded-full border-y border-primary/20 bg-background/70 shadow-sm" />
      <div className="absolute -right-10 top-12 h-20 w-3/4 rotate-12 rounded-full border-y border-border bg-card/80 shadow-sm" />
      <div className="absolute left-8 top-8 hidden h-16 w-16 rounded-full border border-primary/20 bg-primary/10 sm:block" />
      <div className="absolute right-10 bottom-20 hidden h-24 w-24 rounded-full border border-accent/40 bg-accent/20 sm:block" />

      <div className="relative z-10 grid h-full w-full place-items-center p-4 sm:p-6">
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

      <div className="pointer-events-none absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-background/95 px-3 py-2 text-xs font-semibold text-secondary shadow-lg ring-1 ring-border backdrop-blur sm:text-sm">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-primary" />
          Map preview
        </span>
      </div>
    </div>
  );
}
