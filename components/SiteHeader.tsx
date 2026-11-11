import Link from "next/link";

const anchors = [
  { href: "/#profil", label: "Profil" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-white/80 backdrop-blur-md">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-night-900">
          <span
            aria-hidden="true"
            className="block w-6 h-6 rounded-md bg-linear-to-br from-violet-300 to-magenta-300"
          />
          Antoine Smolar
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap items-center gap-1 text-sm">
            {anchors.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="block px-3 py-1.5 rounded text-night-700 hover:bg-violet-100 hover:text-night-900 transition-colors"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
