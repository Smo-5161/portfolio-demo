import Link from "next/link";

const anchors = [
  { href: "/#profil", label: "Profil" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-300">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white"
      >
        Aller au contenu
      </a>
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-bold">
          Antoine Smolar
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap gap-4 text-sm">
            {anchors.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="hover:underline">
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
