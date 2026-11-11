import { REPO_URL, contact } from "@/lib/site";
import CookieSettingsButton from "./CookieSettingsButton";

const tiles = ["bg-brand-100", "bg-accent-100", "bg-brand-50"];

export default function SiteFooter() {
  const items = [
    { label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneIntl}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/antoine-smolar", href: contact.linkedin, external: true },
  ];

  return (
    <footer id="contact" className="bg-white border-t border-stroke scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="mb-2 text-sm font-medium text-ink-500">Contact</p>
        <h2 className="text-2xl mb-6">Let's work together</h2>
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
        <p className="text-xs text-ink-500 mt-10 flex flex-wrap gap-4">
          <span>
            © {new Date().getFullYear()} {contact.name}
          </span>
          <a href="/faq" className="underline underline-offset-2 hover:text-ink-900">
            FAQ
          </a>
          <a href={REPO_URL} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-ink-900">
            Source code
          </a>
          <CookieSettingsButton />
        </p>
      </div>
    </footer>
  );
}
