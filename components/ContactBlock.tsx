// Contact block (phone, email, LinkedIn). Rendered once per page; the A/B test only moves it
// visually (CSS order, see globals.css), so every visitor and crawler gets the same HTML.
import { contact } from "@/lib/site";

const tiles = ["bg-brand-100", "bg-accent-100", "bg-brand-50"];

export default function ContactBlock() {
  const items = [
    { label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneIntl}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/antoine-smolar", href: contact.linkedin, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-block bg-white border-t border-stroke scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <p className="mb-2 text-sm font-medium text-ink-500">Contact</p>
        <h2 id="contact-title" className="text-2xl mb-6">
          Let's work together
        </h2>
        <address className="not-italic">
          <ul className="grid gap-4 sm:grid-cols-3">
            {items.map((i, n) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  {...(i.external && { target: "_blank", rel: "noopener me" })}
                  className={`block rounded-2xl p-4 transition-shadow hover:shadow-md ${tiles[n % tiles.length]}`}
                >
                  <span className="block text-xs text-ink-500 mb-1">{i.label}</span>
                  <span className="block font-semibold break-all">{i.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </address>
      </div>
    </section>
  );
}
