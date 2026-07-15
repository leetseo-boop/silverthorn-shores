import { createFileRoute } from "@tanstack/react-router";

const UPDATED = "July 15, 2026";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement | Silverthorn Resort" },
      { name: "description", content: "Silverthorn Resort's commitment to an accessible website for all guests." },
      { property: "og:title", content: "Accessibility Statement | Silverthorn Resort" },
      { property: "og:description", content: "Our commitment to WCAG 2.1 AA accessibility and how to reach us for help." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://silverthornresort.com/accessibility" }],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-[15px] leading-relaxed" style={{ color: "#1B2B3A" }}>
      <h1 className="text-4xl font-bold mb-2">Accessibility Statement</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: {UPDATED}</p>

      <p className="mb-6">
        Silverthorn Resort is committed to making our website usable and enjoyable for everyone, including
        people with disabilities. We aim to conform to the{" "}
        <a href="https://www.w3.org/TR/WCAG21/" className="underline" target="_blank" rel="noopener noreferrer">
          Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
        </a>.
      </p>

      <h2 className="text-xl font-semibold mb-3">Measures we take</h2>
      <ul className="list-disc pl-6 space-y-1 mb-6">
        <li>Semantic HTML and ARIA landmarks for assistive technologies.</li>
        <li>Meaningful alternative text on informative images.</li>
        <li>Keyboard-navigable menus and interactive controls with visible focus.</li>
        <li>Sufficient color contrast for body text and interactive elements.</li>
        <li>Responsive layouts that adapt to phones, tablets, and desktops.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Known limitations</h2>
      <p className="mb-6">
        Some third-party embeds (booking platform, maps, video, social widgets) may not fully match our
        accessibility standards. We are working with vendors to improve these areas.
      </p>

      <h2 className="text-xl font-semibold mb-3">Compatibility</h2>
      <p className="mb-6">
        The site is designed to work with recent versions of major browsers (Chrome, Safari, Firefox, Edge) and
        common screen readers (NVDA, VoiceOver, TalkBack).
      </p>

      <h2 className="text-xl font-semibold mb-3">Feedback</h2>
      <p>
        If you experience any difficulty using this site, or need content in an alternative format, please
        contact us and we'll do our best to help:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Email: <a href="mailto:reservations1@silverthornresort.com" className="underline">reservations1@silverthornresort.com</a></li>
        <li>Phone: <a href="tel:+15302382915" className="underline">(530) 238-2915</a></li>
      </ul>
    </main>
  );
}
