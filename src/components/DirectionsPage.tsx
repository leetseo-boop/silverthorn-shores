import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Plane,
  ExternalLink,
} from "lucide-react";

const PHONE = "1-800-332-3044";
const PHONE_TEL = "+18003323044";
const EMAIL = "reserve@silverthornresort.com";
const ADDRESS = "16250 Silverthorn Road, Redding, CA 96003";
const MAPS_DEEP_LINK = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";
const MAP_EMBED =
  "https://www.google.com/maps?q=16250+Silverthorn+Road,+Redding,+CA+96003&output=embed";

const DRIVE_TIMES = [
  { from: "From Redding, CA", time: "≈ 15 min", tip: "Take I-5 north to the Lakehead area, then follow Silverthorn Rd to the marina." },
  { from: "From Sacramento", time: "≈ 2.5 hr", tip: "Straight up I-5 north — an easy and scenic drive directly to the resort." },
  { from: "From the Bay Area", time: "≈ 3.5 hr", tip: "I-80 east to I-505 north, then I-5 north all the way to Shasta Lake." },
];

export function DirectionsPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Visit Us</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Getting to Silverthorn Resort
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Tucked along the Pit River Arm of Shasta Lake — just off I-5 near Lakehead, California, and about 15 minutes north of Redding.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone className="mr-1.5 h-4 w-4" />
                Call {PHONE}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={MAPS_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* MAP + INFO */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <iframe
                src={MAP_EMBED}
                title="Map showing Silverthorn Resort, 16250 Silverthorn Road, Redding CA"
                className="block aspect-[4/3] w-full md:aspect-[16/10]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <Card className="lg:col-span-2 p-6 md:p-8">
            <h2 className="font-serif text-2xl font-semibold">Silverthorn Resort</h2>
            <p className="mt-1 text-sm text-muted-foreground">Shasta Lake · Pit River Arm</p>

            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Address</div>
                  <div className="text-muted-foreground">{ADDRESS}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Phone</div>
                  <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-primary">{PHONE}</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Reservations</div>
                  <a href={`mailto:${EMAIL}`} className="break-all text-muted-foreground hover:text-primary">{EMAIL}</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Marina Hours</div>
                  <div className="text-muted-foreground">Open 7 days a week, 8am – 4:30pm<br />Summer until 6pm</div>
                </div>
              </li>
            </ul>

            <Button asChild className="mt-7 w-full rounded-full">
              <a href={MAPS_DEEP_LINK} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-1.5 h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* DRIVE TIMES */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Drive Times</h2>
            <p className="mt-3 text-muted-foreground">Silverthorn Resort is one of the most accessible marinas on Shasta Lake.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {DRIVE_TIMES.map((d) => (
              <Card key={d.from} className="p-6">
                <Clock className="h-5 w-5 text-primary" />
                <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{d.from}</div>
                <div className="mt-1 font-serif text-2xl font-semibold">{d.time}</div>
                <p className="mt-3 text-sm text-muted-foreground">{d.tip}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TURN-BY-TURN */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Turn-by-Turn Directions</h2>
          <p className="mt-3 text-muted-foreground">Follow the route that matches your approach.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Navigation className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold">From the North</h3>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Take Interstate 5 South towards Redding. Exit at the Shasta Dam Blvd exit 685 and make a Right at the light. Turn Right at the next light onto Cascade Blvd. Cascade turns into Union School Rd as you go over the overpass. Union School Rd will dead end at Old Oregon Trail. At the stop sign, turn Right onto Old Oregon Trail. Turn left at Bear Mountain Rd. Follow until Bear Mountain Rd dead ends at Dry Creek Rd. Make a left at the stop sign onto Dry Creek Rd. You'll come to a fork in the road — veer up to the left onto Silverthorn Rd. Keep left as the 2-lane road turns into 1 lane and continue on until you reach the Silverthorn Resort entrance. Check-in is located on the marina main dock.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Navigation className="h-5 w-5 rotate-180" />
              </div>
              <h3 className="font-serif text-xl font-semibold">From the South</h3>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Take Interstate 5 North towards Redding. Exit at Oasis Rd exit 681 and turn Right at the light onto Oasis Rd. Continue on Oasis Rd, which becomes Old Oregon Trail. Turn left onto Bear Mountain Rd. Follow Bear Mountain Rd until it dead-ends at Dry Creek Rd, then turn left. At the fork, veer up to the left onto Silverthorn Rd and keep left as the road narrows to 1 lane. Continue until you reach the Silverthorn Resort entrance. Check-in is located on the marina main dock.
            </p>
          </Card>
        </div>
      </section>

      {/* AIRPORTS */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:text-left">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Plane className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Nearby airports:</span>{" "}
            Redding Municipal (RDD) is closest with connecting flights through major California hubs. Sacramento (SMF) and San Francisco (SFO) offer more direct flight options.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-20">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Questions about your arrival?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Our reservations team is happy to help with directions, check-in details, or anything you need before your trip.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone className="mr-1.5 h-4 w-4" />
                Call {PHONE}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={`mailto:${EMAIL}`}>
                <Mail className="mr-1.5 h-4 w-4" />
                Email Reservations
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
