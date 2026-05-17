import aboutImg from "@/assets/about-resort.jpg";
import { BookNowButton } from "./BookNowButton";

export function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img
            src={aboutImg}
            alt="Family enjoying a houseboat deck on Shasta Lake"
            loading="lazy"
            width={1280}
            height={960}
            className="rounded-lg w-full h-auto object-cover aspect-[4/3]"
          />
          <div className="hidden md:block absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-5 rounded-lg shadow-lg max-w-[220px]">
            <div className="font-display text-3xl leading-none">Est. 1984</div>
            <p className="text-xs mt-2 text-white/90">Family-owned, three generations on the lake.</p>
          </div>
        </div>

        <div>
          <span className="text-xs tracking-[0.25em] uppercase text-primary">Our Story</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-navy leading-tight">
            A Shasta Lake institution since 1984.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Silverthorn Resort has been welcoming guests to Shasta Lake for more than four
            decades. What started as a small marina has grown into Northern California's most
            trusted houseboat destination — still family-run, still focused on the same thing:
            getting you on the water with everything you need and nothing you don't.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
            {[
              "Newest fleet on Shasta Lake",
              "On-site fuel, store & service",
              "Full pre-trip orientation",
              "Concierge planning team",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-navy/90">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BookNowButton>Plan Your Visit</BookNowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
