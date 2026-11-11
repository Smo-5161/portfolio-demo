import { contact } from "@/lib/site";

export default function SiteFooter() {
  const items = [
    { label: "Téléphone", value: contact.phoneDisplay, href: `tel:${contact.phoneIntl}` },
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/antoine-smolar", href: contact.linkedin, external: true },
  ];

  return (
    <footer id="contact" className="mt-24 bg-night-900 text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-magenta-300">Contact</p>
        <h2 className="text-2xl mb-6">Travaillons ensemble</h2>
        <address className="not-italic">
          <ul className="grid gap-4 sm:grid-cols-3">
            {items.map((i) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  {...(i.external && { target: "_blank", rel: "noopener me" })}
                  className="block rounded-lg border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <span className="block text-xs text-violet-300 mb-1">{i.label}</span>
                  <span className="block font-semibold break-all">{i.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </address>
        <p className="text-xs text-violet-300 mt-10">
          © {new Date().getFullYear()} {contact.name}
        </p>
      </div>
    </footer>
  );
}
