import Link from "next/link";

const anchors = [
  { href: "/#profile", label: "Profile" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-white/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded-full focus:bg-gblue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-medium text-ink-900">
          <span aria-hidden="true" className="flex gap-0.5">
            <span className="block w-2 h-2 rounded-full bg-gblue-500" />
            <span className="block w-2 h-2 rounded-full bg-gred-500" />
            <span className="block w-2 h-2 rounded-full bg-gyellow-500" />
            <span className="block w-2 h-2 rounded-full bg-ggreen-500" />
          </span>
          Antoine Smolar
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-1 text-sm">
            {anchors.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="block px-4 py-1.5 rounded-full text-ink-700 hover:bg-gblue-100 hover:text-ink-900 transition-colors"
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
