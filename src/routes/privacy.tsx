// NOTE: Template copy — have counsel review before final publication.
import { createFileRoute, Link } from "@tanstack/react-router";

const UPDATED = "July 15, 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Silverthorn Resort" },
      { name: "description", content: "How Silverthorn Resort collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy | Silverthorn Resort" },
      { property: "og:description", content: "How Silverthorn Resort collects, uses, and protects your personal information." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://silverthornresort.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-[15px] leading-relaxed" style={{ color: "#1B2B3A" }}>
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

      <Section title="1. Who we are">
        <p>
          Silverthorn Resort (“we,” “us,” “our”) operates this website and provides houseboat, cabin, and
          small-boat rentals on Shasta Lake, California. Contact us at{" "}
          <a href="mailto:reservations1@silverthornresort.com" className="underline">reservations1@silverthornresort.com</a>.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Contact information</strong> you submit through our contact or inquiry forms (name, email, phone, message).</li>
          <li><strong>Reservation information</strong> handled by our separate booking platform at rentals.silverthornresort.com (subject to its own privacy terms).</li>
          <li><strong>Usage data</strong> such as pages viewed, device, browser, and approximate location, collected via Google Analytics 4.</li>
          <li><strong>Cookies</strong> as described in Section 6.</li>
        </ul>
      </Section>

      <Section title="3. How we use your information">
        <ul className="list-disc pl-6 space-y-1">
          <li>To respond to inquiries and provide requested services.</li>
          <li>To operate, maintain, and improve the website.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </Section>

      <Section title="4. How we share information">
        <p>
          We do not sell your personal information. We share limited data with service providers who help us
          operate the site (analytics, reservation processing, email delivery), and when required by law.
        </p>
      </Section>

      <Section title="5. Data retention">
        <p>We keep personal information only as long as needed for the purposes described here or as required by law.</p>
      </Section>

      <Section title="6. Cookies & analytics">
        <p>
          We use strictly necessary cookies for site functionality and, with your consent, Google Analytics
          cookies to understand usage. Manage your preferences at any time on our{" "}
          <Link to="/cookie-settings" className="underline">Cookie Settings</Link> page.
        </p>
      </Section>

      <Section title="7. Your rights">
        <p>
          <strong>California residents (CCPA/CPRA):</strong> You may request to know, access, delete, or correct
          personal information we hold about you, and opt out of any “sale” or “sharing” of personal information.
          We do not sell personal information.
        </p>
        <p className="mt-2">
          <strong>EEA/UK residents (GDPR):</strong> You have rights of access, rectification, erasure, restriction,
          portability, and objection. Our lawful bases are consent (analytics), performance of a contract
          (reservations), and legitimate interests (site operation).
        </p>
        <p className="mt-2">To exercise any right, email us at the address above.</p>
      </Section>

      <Section title="8. Children">
        <p>The site is not directed to children under 13, and we do not knowingly collect their personal information.</p>
      </Section>

      <Section title="9. Security">
        <p>We use commercially reasonable safeguards but cannot guarantee absolute security of information transmitted online.</p>
      </Section>

      <Section title="10. Changes">
        <p>We may update this policy from time to time. The “Last updated” date reflects the current version.</p>
      </Section>

      <Section title="11. Contact">
        <p>
          Silverthorn Resort — 16250 Silverthorn Rd, Shasta Lake, CA 96019 ·{" "}
          <a href="mailto:reservations1@silverthornresort.com" className="underline">reservations1@silverthornresort.com</a>
        </p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
