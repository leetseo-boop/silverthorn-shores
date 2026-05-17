import { BookNowButton } from "./BookNowButton";

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="font-display text-2xl">Silverthorn Resort</span>
          </div>
          <p className="mt-4 text-white/70 max-w-sm">
            Shasta Lake's family-run houseboat resort since 1984. Premium fleet, cozy cabins,
            unforgettable trips.
          </p>
          <div className="mt-6">
            <BookNowButton>Book Your Trip</BookNowButton>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#fleet" className="hover:text-white">Fleet</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#testimonials" className="hover:text-white">Reviews</a></li>
            <li>
              <a
                href="https://rentals.silverthornresort.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Reservations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4">Visit</h4>
          <address className="not-italic space-y-2 text-sm text-white/70">
            <div>16250 Silverthorn Rd</div>
            <div>Lakehead, CA 96051</div>
            <div className="pt-2">
              <a href="tel:+15302385253" className="hover:text-white">(530) 238-5253</a>
            </div>
            <div>
              <a href="mailto:info@silverthornresort.com" className="hover:text-white">
                info@silverthornresort.com
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Silverthorn Resort. All rights reserved.</div>
          <div>Shasta Lake, California</div>
        </div>
      </div>
    </footer>
  );
}
