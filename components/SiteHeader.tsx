import Link from "next/link";

const anchors = [
  { href: "/#profile", label: "Profile" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-white/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded-full focus:bg-brand-100 focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        <Link href="/" aria-label="Antoine Smolar, home" className="flex shrink-0 items-center gap-2 font-medium text-ink-900">
          <span
            aria-hidden="true"
            className="relative grid h-8 w-8 place-items-center rounded-lg bg-brand-700 text-xs font-semibold tracking-wide text-white"
          >
            AS
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-2 ring-white" />
          </span>
          {/* On narrow phones the monogram alone stands for the name, so the nav keeps one line. */}
          <span className="hidden min-[400px]:inline whitespace-nowrap">Antoine Smolar</span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-0.5 sm:gap-1 text-sm">
            {anchors.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="block whitespace-nowrap px-3 sm:px-4 py-2 sm:py-1.5 rounded-full text-ink-700 hover:bg-brand-100 hover:text-ink-900 transition-colors"
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
