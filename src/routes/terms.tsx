// NOTE: Template copy — have counsel review before final publication.
import { createFileRoute, Link } from "@tanstack/react-router";

const UPDATED = "July 15, 2026";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Silverthorn Resort" },
      { name: "description", content: "Terms and conditions for using the Silverthorn Resort website." },
      { property: "og:title", content: "Terms of Service | Silverthorn Resort" },
      { property: "og:description", content: "Terms and conditions for using the Silverthorn Resort website." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://silverthornresort.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-[15px] leading-relaxed" style={{ color: "#1B2B3A" }}>
      <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

      <S title="1. Acceptance">
        <p>By accessing silverthornresort.com (the “Site”) you agree to these Terms. If you don't agree, do not use the Site.</p>
      </S>

      <S title="2. The service">
        <p>
          The Site provides information about Silverthorn Resort's houseboats, cabins, small-boat rentals, and Shasta Lake.
          Reservations are handled on our separate booking platform and are governed by our signed rental agreements and
          policies (see <Link to="/houseboats/policy" className="underline">Houseboat Policy</Link> and{" "}
          <Link to="/cabins/policy" className="underline">Cabin Policy</Link>).
        </p>
      </S>

      <S title="3. Eligibility">
        <p>The primary renter must be at least 21 years of age and hold a valid state-issued driver's license.</p>
      </S>

      <S title="4. Reservations & cancellations">
        <p>All reservations are subject to availability, our posted rental policies, and the terms of the signed rental contract for your specific rental.</p>
      </S>

      <S title="5. Assumption of risk">
        <p>
          Boating, swimming, and lake activities involve inherent risks including injury or death. You voluntarily assume
          all such risks. Additional waivers apply and must be signed at check-in.
        </p>
      </S>

      <S title="6. Intellectual property">
        <p>All content on the Site is the property of Silverthorn Resort or its licensors and is protected by copyright and trademark law. You may not reproduce it without written permission.</p>
      </S>

      <S title="7. Acceptable use">
        <p>You agree not to misuse the Site, attempt to breach its security, scrape it, or use it for any unlawful purpose.</p>
      </S>

      <S title="8. Third-party links">
        <p>The Site links to third-party websites (e.g., our reservations platform, maps, review platforms). We are not responsible for their content or practices.</p>
      </S>

      <S title="9. Disclaimers">
        <p>
          THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
        </p>
      </S>

      <S title="10. Limitation of liability">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, SILVERTHORN RESORT WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE.
        </p>
      </S>

      <S title="11. Indemnification">
        <p>You agree to indemnify and hold Silverthorn Resort harmless from any claims arising out of your use of the Site or breach of these Terms.</p>
      </S>

      <S title="12. Governing law">
        <p>These Terms are governed by the laws of the State of California. Venue for any dispute is Shasta County, California.</p>
      </S>

      <S title="13. Changes">
        <p>We may update these Terms from time to time. Continued use of the Site constitutes acceptance of the updated Terms.</p>
      </S>

      <S title="14. Contact">
        <p>
          Silverthorn Resort — 16250 Silverthorn Rd, Shasta Lake, CA 96019 ·{" "}
          <a href="mailto:reservations1@silverthornresort.com" className="underline">reservations1@silverthornresort.com</a>
        </p>
      </S>
    </main>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
