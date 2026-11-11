import { contact } from "@/lib/site";

export default function SiteFooter() {
  const items = [
    { label: "Phone", value: contact.phoneDisplay, href: `tel:${contact.phoneIntl}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/antoine-smolar", href: contact.linkedin, external: true },
  ];

  return (
    <footer id="contact" className="mt-24 bg-ink-900 text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="mb-2 text-sm font-medium text-gyellow-300">Contact</p>
        <h2 className="text-2xl mb-6">Let's work together</h2>
        <address className="not-italic">
          <ul className="grid gap-4 sm:grid-cols-3">
            {items.map((i) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  {...(i.external && { target: "_blank", rel: "noopener me" })}
                  className="block rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <span className="block text-xs text-gblue-300 mb-1">{i.label}</span>
                  <span className="block font-semibold break-all">{i.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </address>
        <p className="text-xs text-gblue-300 mt-10">
          © {new Date().getFullYear()} {contact.name}
        </p>
      </div>
    </footer>
  );
}
