import { BookNowButton } from "./BookNowButton";
import heroImg from "@/assets/hero-lake.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden text-white">
      <img
        src={heroImg}
        alt="Houseboat on Shasta Lake at sunset with mountain backdrop"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-40 pb-24 min-h-screen flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-primary mb-6">
          <span className="h-px w-8 bg-primary" /> Shasta Lake, California
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
          Your Shasta Lake escape starts on the water.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Premium houseboats, lakeside cabins, and a full fleet of ski, fishing, and patio
          boats — all from one trusted family-run resort.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookNowButton size="lg">Book Your Trip</BookNowButton>
          <a
            href="#fleet"
            className="inline-flex items-center justify-center h-13 px-6 text-sm font-medium text-white/90 border border-white/25 rounded-md hover:bg-white/10 transition-colors"
          >
            Explore the Fleet
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 inset-x-0 z-10 flex justify-center">
        <span className="text-xs tracking-[0.3em] uppercase text-white/60">Scroll</span>
      </div>
    </section>
  );
}
