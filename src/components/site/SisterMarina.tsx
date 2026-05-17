import marinaImg from "@/assets/sister-marina.jpg";

export function SisterMarina() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative rounded-xl overflow-hidden bg-navy text-white min-h-[420px] grid lg:grid-cols-2">
          <img
            src={marinaImg}
            alt="Sister marina with docked boats on Shasta Lake"
            loading="lazy"
            width={1600}
            height={900}
            className="absolute inset-0 lg:relative lg:inset-auto h-full w-full object-cover opacity-40 lg:opacity-100"
          />
          <div className="absolute inset-0 lg:hidden bg-navy/60" />
          <div className="relative p-10 sm:p-14 flex flex-col justify-center">
            <span className="text-xs tracking-[0.25em] uppercase text-primary">
              Sister Marina
            </span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 leading-tight">
              Exploring the north end? Visit Holiday Harbor.
            </h2>
            <p className="mt-5 text-white/80 max-w-md">
              Our sister marina on the McCloud Arm offers another stunning launch point —
              same fleet quality, same family standards.
            </p>
            <a
              href="https://holidayharbor.net"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center self-start h-11 px-6 rounded-md border border-white/30 text-sm hover:bg-white/10 transition-colors"
            >
              Visit Holiday Harbor
              <span aria-hidden className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
