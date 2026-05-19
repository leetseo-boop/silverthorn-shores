import { Link } from "@tanstack/react-router";
import heroDam from "@/assets/shasta-lake/shasta-dam-mount-shasta-hero.jpg";
import aerial from "@/assets/shasta-lake/shasta-lake-aerial-pit-river-arm.webp";
import fishing from "@/assets/shasta-lake/shasta-lake-fishing-boat-shoreline.jpg";
import dog from "@/assets/shasta-lake/shasta-lake-houseboat-dog.jpg";
import jumping from "@/assets/shasta-lake/silverthorn-houseboat-jumping-shasta-lake.jpg";
import couple from "@/assets/shasta-lake/couple-sundeck-houseboat-shasta-lake.png";
import marina from "@/assets/shasta-lake/silverthorn-resort-marina-shasta-lake-2026.webp";

const facts: [string, string][] = [
  ["365 mi", "Shoreline"],
  ["35 mi", "Lake length"],
  ["30,000", "Surface acres"],
  ["517 ft", "Greatest depth"],
  ["4.55M", "Acre-feet capacity"],
  ["6.2M", "Avg annual flow (af)"],
  ["602 ft", "Shasta Dam height"],
  ["1,067 ft", "Spillway elevation"],
];

const activities = [
  { t: "On the water", d: "Houseboating, wakeboarding, water-skiing, tubing, swimming and paddle days in secluded coves." },
  { t: "Land & trail", d: "Hiking, mountain biking, sightseeing, waterfalls and trout-pond swims minutes from the marina." },
  { t: "Fishing year-round", d: "Trout and bass are biting in every month — bring the rods and the kids." },
  { t: "Nature watching", d: "Bald eagles, osprey, deer and shoreline wildlife across 365 miles of unspoiled shore." },
];

const fishSpecies = [
  "Rainbow trout", "Brown trout", "Chinook salmon", "Largemouth bass", "Spotted bass",
  "Smallmouth bass", "Black crappie", "Bluegill", "White sturgeon", "Channel catfish",
  "White catfish", "Brown bullhead", "Threadfin shad", "Golden shiner", "Green sunfish",
  "Hardhead minnow", "Sacramento sucker", "Sacramento pikeminnow", "Riffle sculpin",
];

const audiences = [
  { t: "Whole-family getaways", d: "Activities for the most active kids and easy hangs for the grandparents — all on one boat." },
  { t: "Bachelor & bachelorette", d: "Three full decks, hot tubs and waterslides make for an unforgettable weekend with the crew." },
  { t: "Friends weekend", d: "Anchor in a hidden cove, fire up the grill, jump off the top deck — repeat for three days." },
];

const gallery = [
  { src: aerial, alt: "Aerial view of Shasta Lake with Mount Shasta on the horizon and forested islands", caption: "Shasta Lake from above" },
  { src: marina, alt: "Silverthorn Resort marina and houseboats on the Pit River Arm of Shasta Lake", caption: "Silverthorn Resort Marina" },
  { src: jumping, alt: "Group of friends jumping off the back of a Silverthorn houseboat on Shasta Lake", caption: "Houseboat life" },
  { src: couple, alt: "Couple sunbathing on the top deck of a houseboat on Shasta Lake with mountains behind", caption: "Top-deck sundeck" },
  { src: fishing, alt: "Small fishing boat cruising past forested shoreline on Shasta Lake", caption: "Fishing the shoreline" },
  { src: dog, alt: "Happy French bulldog enjoying the view from a houseboat on Shasta Lake", caption: "Bring the whole family" },
];

export function ShastaLakePage() {
  return (
    <main style={{ backgroundColor: "#FBF8F3", color: "#1B2B3A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroDam}
          alt="Shasta Dam holding back Shasta Lake with snow-capped Mount Shasta on the horizon"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-[44vh] sm:h-[52vh] md:h-[62vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-5xl w-full px-6 pb-10 md:pb-16 text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-90">
              Northern California
            </p>
            <h1
              className="mt-3 text-3xl sm:text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              About Shasta Lake
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg opacity-95">
              30,000 acres of clear water, 365 miles of unspoiled shoreline,
              and a houseboat waiting for you at the base of the Pit River Arm.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-start">
        <article className="md:col-span-3 space-y-5 text-[1.05rem] leading-relaxed">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            One of Northern California's greatest getaways
          </h2>
          <p>
            Northern California has many great places to get away — one of the
            most popular is <strong>Shasta Lake</strong>. Its 30,000 acres of
            clear water surround hundreds of miles of unspoiled shoreline.
          </p>
          <p>
            Located on the southeast side of the lake, at the base of the
            Pit River Arm, you'll find <Link to="/" className="underline" style={{ color: "#E8640A" }}>Silverthorn Resort Marina</Link> —
            the ideal setting for your summer memories. Shasta Lake offers
            something for everyone.
          </p>
          <p>
            With the reservoir elevation changing year over year, no two
            visits look the same. Come in spring and again in fall for two
            completely different experiences — but no matter the season,
            there's always something fun to see and do around the lake.
          </p>
        </article>

        <figure className="md:col-span-2 md:sticky md:top-24">
          <img
            src={aerial}
            alt="Aerial view of Shasta Lake with islands and Mount Shasta in the distance"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl shadow-lg object-cover"
          />
          <figcaption className="mt-3 text-sm opacity-70">
            Shasta Lake — four major arms and 365 miles of shoreline.
          </figcaption>
        </figure>
      </section>

      {/* Facts */}
      <section style={{ backgroundColor: "#0D2030", color: "#ffffff" }}>
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase opacity-70">By the numbers</p>
            <h2
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Shasta Lake & Shasta Dam
            </h2>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {facts.map(([n, l]) => (
              <div key={l}>
                <dt
                  className="text-2xl md:text-4xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#E8640A" }}
                >
                  {n}
                </dt>
                <dd className="mt-2 text-xs md:text-sm uppercase tracking-widest opacity-80">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.3em] uppercase opacity-70">What to do</p>
          <h2
            className="mt-3 text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Something for everyone
          </h2>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activities.map((a) => (
            <li
              key={a.t}
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "1px solid #ECE5D6" }}
            >
              <h3 className="text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                {a.t}
              </h3>
              <p className="text-[0.98rem] leading-relaxed opacity-90">{a.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Fish */}
      <section style={{ backgroundColor: "#F1ECE2" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <p className="text-xs tracking-[0.3em] uppercase opacity-70">For the angler</p>
              <h2
                className="mt-3 text-3xl md:text-4xl"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
              >
                The fish are always biting
              </h2>
              <p className="mt-4 opacity-90 leading-relaxed">
                Shasta Lake holds an unusually rich mix of warm- and cold-water
                species. <strong>Bass and trout</strong> are most frequently
                caught — but bring a few rigs and you may be surprised at what
                ends up on the line.
              </p>
            </div>
            <ul className="md:col-span-3 flex flex-wrap gap-2">
              {fishSpecies.map((f) => (
                <li
                  key={f}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ backgroundColor: "#ffffff", border: "1px solid #E0D8C5" }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.3em] uppercase opacity-70">Who it's for</p>
          <h2
            className="mt-3 text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Plan a getaway your way
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {audiences.map((a) => (
            <li
              key={a.t}
              className="rounded-xl p-6 shadow-sm"
              style={{ backgroundColor: "#ffffff", border: "1px solid #ECE5D6" }}
            >
              <h3 className="text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                {a.t}
              </h3>
              <p className="text-[0.98rem] leading-relaxed opacity-90">{a.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section style={{ backgroundColor: "#F1ECE2" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] uppercase opacity-70">Photo Gallery</p>
            <h2
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Shasta Lake in Pictures
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {gallery.map((img) => (
              <li key={img.src} className="group">
                <figure className="overflow-hidden rounded-xl shadow-md bg-white">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-3 sm:p-4">
                    <p className="text-sm font-medium">{img.caption}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2030", color: "#ffffff" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Make Shasta Lake your next memory
          </h2>
          <p className="mt-4 opacity-90 max-w-2xl mx-auto">
            Book a houseboat or a lakeside cabin at Silverthorn Resort and
            see why families come back year after year.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/houseboats"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8640A" }}
            >
              Browse Houseboats
            </Link>
            <Link
              to="/cabins"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
            >
              View Cabins
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShastaLakePage;
