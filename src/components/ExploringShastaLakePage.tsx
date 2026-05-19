import { Link } from "@tanstack/react-router";
import { Mountain, Fish, Tent, Waves, MapPin, ArrowRight } from "lucide-react";
import heroSunset from "@/assets/exploring-shasta-lake/shasta-lake-sunset-hero.jpg";
import rainbowMarina from "@/assets/exploring-shasta-lake/shasta-lake-rainbow-marina.jpg";
import boating from "@/assets/exploring-shasta-lake/shasta-lake-boating-houseboats.jpg";
import campingMap from "@/assets/exploring-shasta-lake/shasta-lake-camping-map.png";
import kennett from "@/assets/exploring-shasta-lake/kennett-historic-town-1900s.webp";
import baird from "@/assets/exploring-shasta-lake/baird-fish-hatchery-historic.webp";

const HEAD_FONT = "'Playfair Display', serif";

const arms = [
  { id: "sacramento", label: "Sacramento Arm" },
  { id: "mccloud", label: "McCloud Arm" },
  { id: "squaw", label: "Squaw Creek Arm" },
  { id: "pit", label: "Pit River Arm" },
];

type CampgroundProps = { name: string; sites: string; amenities: string; fee: string; note?: string };
function CampgroundCard({ name, sites, amenities, fee, note }: CampgroundProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Tent size={20} style={{ color: "#E8640A" }} aria-hidden="true" />
        <h4 className="text-lg" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>{name}</h4>
      </div>
      <dl className="text-sm space-y-1 opacity-90">
        <div><dt className="inline font-medium">Sites: </dt><dd className="inline">{sites}</dd></div>
        <div><dt className="inline font-medium">Amenities: </dt><dd className="inline">{amenities}</dd></div>
        <div><dt className="inline font-medium">Fee: </dt><dd className="inline">{fee}</dd></div>
        {note && <p className="pt-1 opacity-80">{note}</p>}
      </dl>
    </div>
  );
}

type TrailProps = { name: string; distance: string; difficulty: string; description: string };
function TrailCard({ name, distance, difficulty, description }: TrailProps) {
  return (
    <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: "#ffffff", border: "1px solid #ECE5D6" }}>
      <div className="flex items-center gap-2 mb-2">
        <Mountain size={20} style={{ color: "#E8640A" }} aria-hidden="true" />
        <h4 className="text-lg" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>{name}</h4>
      </div>
      <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
        {distance} · {difficulty}
      </p>
      <p className="text-[0.95rem] leading-relaxed opacity-90">{description}</p>
    </div>
  );
}

function FishingCard({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="rounded-xl p-6 mt-8"
      style={{ backgroundColor: "#F1ECE2", border: "1px solid #E0D8C5" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Fish size={22} style={{ color: "#E8640A" }} aria-hidden="true" />
        <h3 className="text-xl" style={{ fontFamily: HEAD_FONT, fontWeight: 600, color: "#1B2B3A" }}>
          Fishing tips
        </h3>
      </div>
      <div className="text-[0.98rem] leading-relaxed text-[#1B2B3A]/90 space-y-2">{children}</div>
    </aside>
  );
}

function ArmHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <header className="mb-10 md:mb-14">
      <p className="text-xs tracking-[0.3em] uppercase opacity-70">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed opacity-90">{lead}</p>
    </header>
  );
}

export function ExploringShastaLakePage() {
  return (
    <main style={{ backgroundColor: "#FBF8F3", color: "#1B2B3A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroSunset}
          alt="Fiery orange sunset over Shasta Lake silhouetted by pine trees in Northern California"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-[48vh] sm:h-[58vh] md:h-[68vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-5xl w-full px-6 pb-10 md:pb-16 text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-90">
              A guide to the four arms
            </p>
            <h1
              className="mt-3 text-3xl sm:text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}
            >
              Exploring Shasta Lake
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg opacity-95">
              Four arms, 365 miles of shoreline and a century of gold-rush, railroad
              and fish-hatchery history hidden beneath the water.
            </p>
            <nav aria-label="Lake arms" className="mt-6 flex flex-wrap gap-2">
              {arms.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="px-4 py-2 rounded-full text-sm backdrop-blur transition-colors hover:bg-white/20"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Intro + Map */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-start">
        <article className="md:col-span-3 space-y-5 text-[1.05rem] leading-relaxed">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
            One lake, four very different worlds
          </h2>
          <p>
            Shasta Lake is shaped like a giant four-fingered hand — the
            <strong> Sacramento</strong>, <strong>McCloud</strong>,
            <strong> Squaw Creek</strong> and <strong>Pit River</strong> arms — each
            with its own personality, history and hidden corners. Some you'll
            share with weekend boaters; others you can have all to yourself.
          </p>
          <p>
            This guide walks you through every arm: where to stake the
            houseboat, which trails to hike, what the fish are biting on, and
            the surprising stories that lie beneath 30,000 acres of clear water.
          </p>
          <p className="opacity-80">
            Use the chips above to jump to an arm, or scroll through the whole
            lake in one go.
          </p>
        </article>

        <figure className="md:col-span-2 md:sticky md:top-24">
          <img
            src={campingMap}
            alt="Map of Shasta Lake showing the Sacramento, McCloud, Squaw Creek and Pit River arms with marinas and campgrounds"
            width={905}
            height={780}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl shadow-lg bg-white"
          />
          <figcaption className="mt-3 text-sm opacity-70 flex items-center gap-2">
            <MapPin size={14} aria-hidden="true" />
            Shasta Lake — marinas and campgrounds across all four arms.
          </figcaption>
        </figure>
      </section>

      {/* Sacramento Arm */}
      <section id="sacramento" style={{ backgroundColor: "#0D2030", color: "#ffffff" }} aria-labelledby="sacramento-h">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <ArmHeader
            eyebrow="Arm 1 of 4"
            title="The Sacramento Arm"
            lead="The busiest and most developed arm of Shasta Lake — home to the historic Oregon Trail and the Central Pacific Railroad, both now submerged beneath the surface."
          />

          {/* Kennett */}
          <article className="grid md:grid-cols-2 gap-10 items-center mb-14">
            <figure>
              <img
                src={kennett}
                alt="Historic black and white photograph of Kennett California gold rush mining town in the early 1900s"
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-lg object-cover"
              />
              <figcaption className="mt-3 text-sm opacity-70">
                Kennett, CA — once one of the largest mining towns of the 1850s, now under 400 ft of water.
              </figcaption>
            </figure>
            <div>
              <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
                Kennett, CA — a town beneath the water
              </h3>
              <p className="opacity-90 leading-relaxed">
                Founded during the gold rush of the 1850s, Kennett lies directly
                north of Shasta Dam under about 400 feet of water. It was home
                to five copper smelters whose sulfur fumes destroyed nearly all
                surrounding vegetation. Millions of trees were later planted to
                restore the landscape — a scenic cruise up Big Backbone Creek
                shows off those rehabilitation efforts beautifully.
              </p>
            </div>
          </article>

          {/* Slaughterhouse Island */}
          <article className="mb-14 max-w-3xl">
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              Slaughterhouse Island
            </h3>
            <p className="opacity-90 leading-relaxed">
              Named after the Endicott Slaughterhouse and Meat Market that once
              sat in the saddle between Slaughterhouse and Thunderbolt islands,
              this spot at the mouth of the Sacramento Arm is now a favorite
              with college students on spring break. Old boat-in campsites are
              gone, and no facilities remain on the island today.
            </p>
          </article>

          {/* Basalt & Gooseneck */}
          <article className="grid md:grid-cols-2 gap-8 mb-2">
            <div>
              <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
                Basalt columns at the Goosenecks
              </h3>
              <p className="opacity-90 leading-relaxed">
                North of the Goosenecks, the west shoreline turns rusty-red:
                basalt rock, formed from lava that cooled quickly near the
                surface, stained by the iron in the surrounding ground. Near
                Antlers Resort the basalt has crystallized into crude "fence
                post" columns — a smaller cousin of Devils Postpile.
              </p>
            </div>
            <CampgroundCard
              name="Gooseneck Cove Boat-In"
              sites="8 sites · picnic tables, fire grills"
              amenities="Outhouse toilets · no drinking water · pack it in, pack it out"
              fee="Free"
              note="Tucked deep in the cove on the west side of the Sacramento Arm — well hidden from the main lake."
            />
          </article>

          {/* Lakehead / Gregory */}
          <article className="mt-14 max-w-3xl">
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              Lakehead & the Gregory House
            </h3>
            <p className="opacity-90 leading-relaxed">
              At the end of the Sacramento Arm you'll find Lakehead /
              Lakeshore, Gregory Creek, Antlers Resort and Indian Creek. In
              the early 1900s the Gregory home served meals for 25 cents and
              all-you-can-eat plus a bed for 50 cents. Roy Rogers, Rex Beach
              and Renny Renfro all stayed here, and Martha Gregory operated
              the first telephone switchboard between Redding and Dunsmuir.
              The ranch was flooded when the dam came online in 1945; today
              Riverview is a day-use area with one of the few remaining
              sandy beaches on the lake.
            </p>
          </article>

          <FishingCard>
            <p>
              Summer trolling for trout at the headwaters is excellent. In
              spring, bass take plastic worms and live bait — try a
              <em> Dives II to 10 feet</em> at 15–20 ft. Spinners, spoons,
              silver-black minnows, gold/red or nickel/blue trolling spoons,
              Rapalas, Cripplures and blue/silver shad imitations all work.
            </p>
            <p>
              From shore, fish the outlet of Gregory Creek toward the bridge
              with Texas-rig rubber worms — switch to <strong>white</strong>{" "}
              rubber worms in the willows.
            </p>
          </FishingCard>
        </div>
      </section>

      {/* McCloud Arm */}
      <section id="mccloud" className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="mccloud-h">
        <ArmHeader
          eyebrow="Arm 2 of 4"
          title="The McCloud Arm"
          lead="Named for the McCloud River — originally the “McLeod,” after Scottish fur trapper Alexander Roderick McLeod, who was snowbound on its banks in the winter of 1829."
        />

        {/* Baird */}
        <article className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              Baird Fish Hatchery — the first on the West Coast
            </h3>
            <p className="opacity-90 leading-relaxed">
              In 1872 Livingston Stone established the first West Coast
              salmon hatchery where the Pit and McCloud rivers meet, naming
              it after Spencer Fullerton Baird. Over its decades of operation
              more than 50 million eyed salmon eggs were shipped worldwide,
              even seeding salmon runs in New Zealand. The hatchery now lies
              under hundreds of feet of water — ironic for the place that
              launched the largest hatchery complex in the world.
            </p>
            <p className="opacity-90 leading-relaxed mt-3">
              Seven years later Stone built a trout hatchery upstream at
              Green's Creek; most rainbow trout fished today descend from
              that original McCloud River stock.
            </p>
          </div>
          <figure>
            <img
              src={baird}
              alt="Historic photograph of the Baird Fish Hatchery on the McCloud River — the first federal fish hatchery on the West Coast"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl shadow-lg object-cover"
            />
            <figcaption className="mt-3 text-sm opacity-70">
              Baird Fish Hatchery — the first West Coast salmon hatchery, now submerged.
            </figcaption>
          </figure>
        </article>

        {/* Grey Rocks & Caverns */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <article>
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              The Grey Rocks
            </h3>
            <p className="opacity-90 leading-relaxed">
              Towering grey limestone walls formed from ocean sediments laid
              down 200–300 million years ago. Tie off your boat and spend
              the day hunting for fossilized coral, snails and clams in the
              cliffs.
            </p>
          </article>
          <article>
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              Lake Shasta Caverns
            </h3>
            <p className="opacity-90 leading-relaxed">
              Just past Bailey Cove on the east side, tours run every half
              hour 9am–3pm Memorial Day through Labor Day. Inside you'll
              find stalactites, stalagmites and a hand-written 1878
              signature from discoverer J.A. Richardson, still visible in
              carbide on the wall. Don't miss the Sandy Creek Mining Sluice
              or the Rock Box climbing wall on your way out.
            </p>
          </article>
        </div>

        {/* Trails */}
        <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
          Hiking trails of the McCloud Arm
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <TrailCard
            name="Bailey Cove Trail"
            distance="2.8 miles loop"
            difficulty="Easy"
            description="Circles a former mountain. Manzanita and knobcone pine on the sunny south face; pine, oak and Douglas fir on the cool north. Hike counter-clockwise. Pets on leash."
          />
          <TrailCard
            name="Greens Creek Trail"
            distance="5.85 miles point-to-point"
            difficulty="Strenuous"
            description="Boat-in only. Climbs 1,230 ft to a ridge of limestone separating the McCloud and Squaw arms, then descends to Bear Cove. Best in spring and fall — bring water."
          />
          <TrailCard
            name="Hirz Bay Trail"
            distance="1.6 miles point-to-point"
            difficulty="Easy"
            description="Hikers only. From the Hirz Bay amphitheater to Dekkas Rock Campground. Have non-hikers meet you at the Dekkas picnic area for lunch."
          />
        </div>

        {/* Samwel */}
        <article
          className="rounded-xl p-6 md:p-10 mb-14"
          style={{ backgroundColor: "#F1ECE2", border: "1px solid #E0D8C5" }}
        >
          <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
            Samwel Cave — the Cave of the Lost Maiden
          </h3>
          <p className="opacity-90 leading-relaxed">
            Two miles south of the McCloud Bridge at Point McCloud, a
            one-mile trail leads up to a cave the Wintu called <em>Sa-Wal</em>
            {" "}— Grizzly Bear Cave — and revered as a holy place. Legend says
            three maidens went to bathe in its pool for strength; one fell
            to her death.
          </p>
          <blockquote className="mt-5 pl-5 border-l-4 italic opacity-90" style={{ borderColor: "#E8640A" }}>
            "A long time ago, three Indian girls went to an old woman and
            asked her where they could find good, strong men. She told them
            to go to the cave and bathe in the pool. There they would find
            brave men. And so, the three maidens went to the cave, but in
            the darkness, one of them fell to her death."
          </blockquote>
          <p className="opacity-90 leading-relaxed mt-5">
            In the early 1900s UC Berkeley anthropologists found a young
            woman's skeleton 70 ft down in Furlong's Room, alongside Ice
            Age fossils whose preservation rivals the La Brea Tar Pits.
            Putnam Hall is open to the public; deeper rooms require a
            permit from the Shasta Lake Visitor Center.
          </p>
        </article>

        {/* Campgrounds */}
        <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
          Where to camp on the McCloud Arm
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          <div
            className="rounded-xl p-5 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #ECE5D6" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Tent size={20} style={{ color: "#E8640A" }} aria-hidden="true" />
              <h4 className="text-lg" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>Greens Creek Boat-In</h4>
            </div>
            <p className="text-[0.95rem] leading-relaxed opacity-90">
              9 boat-in sites at the foot of limestone formations. Picnic
              tables, bear lockers, fire grills, outhouse toilets — bring
              your own water. Free. A great base camp for hikers.
            </p>
          </div>
          <div
            className="rounded-xl p-5 shadow-sm"
            style={{ backgroundColor: "#ffffff", border: "1px solid #ECE5D6" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Tent size={20} style={{ color: "#E8640A" }} aria-hidden="true" />
              <h4 className="text-lg" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>Ski Island Boat-In</h4>
            </div>
            <p className="text-[0.95rem] leading-relaxed opacity-90">
              3-acre island east of Silverthorn with 23 boat-in sites.
              Picnic tables, fire grills, outhouse toilets — no drinking
              water. Free. Rent a fishing or patio boat from Silverthorn
              and make a weekend of it.
            </p>
          </div>
        </div>

        <FishingCard>
          <p>
            Some of the lake's best shore fishing is near the McCloud River
            Bridge — summer trout, fall German browns, spring spotted bass.
            Anywhere water flows hard into the lake is bass country.
          </p>
          <p>
            From shore: Texas-rig rubber worms (white in the willows).
            Trolling fall/spring: <em>Dives II to 10 feet</em> at 15–20 ft.
          </p>
        </FishingCard>
      </section>

      {/* Squaw Creek Arm */}
      <section id="squaw" style={{ backgroundColor: "#0D2030", color: "#ffffff" }} aria-labelledby="squaw-h">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <ArmHeader
            eyebrow="Arm 3 of 4"
            title="The Squaw Creek Arm"
            lead="Squaw Creek begins on Mount Shasta in a series of natural springs and winds down through Squaw Valley before flowing into the lake. Flat shorelines and quiet fingers make it a houseboater favorite."
          />

          <article className="grid md:grid-cols-2 gap-10 items-center mb-14">
            <figure>
              <img
                src={boating}
                alt="Boaters and houseboats cruising the calm waters of the Squaw Creek Arm of Shasta Lake"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl shadow-lg object-cover"
              />
              <figcaption className="mt-3 text-sm opacity-70">
                Quiet coves and flat shorelines on the Squaw Creek Arm.
              </figcaption>
            </figure>
            <div>
              <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
                Wildlife and easy staking
              </h3>
              <p className="opacity-90 leading-relaxed">
                The first few miles are some of the flattest shoreline on
                Shasta Lake — perfect for staking a houseboat or pitching a
                tent at one of the scattered undeveloped campsites. Keep an
                eye out for eagles, osprey, otters, the occasional bear and
                even Rocky Mountain elk. Closed shorelines protect critical
                habitat — please respect them.
              </p>
            </div>
          </article>

          <article className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              Bully Hill Mine
            </h3>
            <p className="opacity-90 leading-relaxed">
              Gold was discovered on Squaw Creek in 1853; a year later a
              silver and copper mining settlement followed. In 1901 the
              Bully Hill Copper Mining & Smelter Company built a giant
              smelter processing 150 tons of ore a day — expanded to 400
              tons by 1907, producing 2-foot copper ingots. Ore was even
              shipped in on an 8.5-mile aerial tramway from the Afterthought
              Mine in Ingot.
            </p>
            <p className="opacity-90 leading-relaxed mt-3">
              Lawsuits over toxic fumes shut the smelter in 1910. Today, old
              rustic gates mark the entrance — inside you'll still find a
              stone hydroelectric powerhouse, a winery, hard milling stones
              from Sweden, the blast furnace foundations and piles of
              burnt slag.
            </p>
          </article>

          <FishingCard>
            <p>
              Monday Flat and North Fork Creek both produce. Troll spinners,
              spoons, silver-black minnows, Rapalas, Cripplures or blue/silver
              shad imitations — <em>Dives II to 10 feet</em> at 15–20 ft in
              fall and spring. For catfish, toss a chunk of meat at Second
              Creek by Monday Flat and wait.
            </p>
          </FishingCard>
        </div>
      </section>

      {/* Pit River Arm */}
      <section id="pit" className="mx-auto max-w-6xl px-6 py-16 md:py-24" aria-labelledby="pit-h">
        <ArmHeader
          eyebrow="Arm 4 of 4"
          title="The Pit River Arm"
          lead="The largest river in Northern California — and considered by many to hold the best bass fishing on Shasta Lake. The Atsuegewi and Ajumawi dug large pits along the river to trap game; that's where the name comes from."
        />

        <article className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <figure>
            <img
              src={rainbowMarina}
              alt="Double rainbow over Silverthorn Resort marina on the Pit River Arm of Shasta Lake after a storm"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl shadow-lg object-cover"
            />
            <figcaption className="mt-3 text-sm opacity-70 flex items-center gap-2">
              <Waves size={14} aria-hidden="true" />
              Silverthorn Resort sits on the Pit River Arm.
            </figcaption>
          </figure>
          <div>
            <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
              The outback of Shasta Lake
            </h3>
            <p className="opacity-90 leading-relaxed">
              Past Jones Valley Inlet there are no services — which is
              exactly why houseboaters love it. Countless coves and forested
              fingers hide secluded campsites; eagles, osprey, otters, deer
              and bear are all regular sights along the shoreline.
            </p>
          </div>
        </article>

        <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
          Clikapudi Trail
        </h3>
        <p className="opacity-90 leading-relaxed mb-4 max-w-3xl">
          An 8-mile loop accessible from three trailheads at Jones Valley
          Marina — great for mountain biking, horseback riding, running
          and hiking. The name comes from the Wintu <em>Klukupuda</em> —
          "to kill" — referring to an 1800s battle between Wintu and local
          traders. Expect mixed conifer, black oak, small meadows and
          breathtaking lake views. Bring plenty of water; there's none on
          the trail and summer temps are punishing — hike mornings or
          evenings.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-10">
          <CampgroundCard
            name="Arbuckle Flat Boat-In"
            sites="11 sites · picnic tables, fire grills"
            amenities="Outhouse toilets · no drinking water · pack it in, pack it out"
            fee="Free"
            note="~5 miles up the Pit Arm from Jones Valley Inlet, set back in a deep cove on the south side. Carry your gear up the hill."
          />
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "#F1ECE2", border: "1px solid #E0D8C5" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Waves size={20} style={{ color: "#E8640A" }} aria-hidden="true" />
              <h4 className="text-lg" style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}>
                Waterfalls & dead snags
              </h4>
            </div>
            <p className="text-[0.95rem] leading-relaxed opacity-90">
              The upper Pit Arm was never cleared of trees — WWII pulled the
              crews away — so dead snags fill the water (great for fish,
              hazardous for boats). Past Arbuckle Flat, water-skiing is
              prohibited. Look for <strong>Bear Creek Falls</strong> off the
              south shore and the bigger <strong>Potem Falls</strong> on
              Potem Creek near Fenders Flat.
            </p>
          </div>
        </div>

        <FishingCard>
          <p>
            Many fishermen rank the Pit Arm the best bass water on the
            lake — fish in and among the standing trees. Every spring the
            plankton run draws fat trout that boil the surface; this is the
            only arm where you'll see it. Golden Humdingers and Cripplers
            are the go-to lures.
          </p>
        </FishingCard>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2030", color: "#ffffff" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: HEAD_FONT, fontWeight: 600 }}
          >
            Plan your Shasta Lake adventure
          </h2>
          <p className="mt-4 opacity-90 max-w-2xl mx-auto">
            Whether you're chasing bass on the Pit, hunting fossils in the
            Grey Rocks or staking your houseboat in a Squaw Creek cove —
            Silverthorn Resort is your launching point.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/houseboats"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8640A" }}
            >
              Browse Houseboats
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ExploringShastaLakePage;
