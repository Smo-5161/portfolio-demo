import Link from "next/link";

const sections = [
  { href: "/sites-web", label: "Sites Web" },
  { href: "/saas", label: "SaaS" },
  { href: "/outils-internes", label: "Outils Internes" },
  { href: "/architecture-lab", label: "Architecture & SEO/GEO/CRO Lab" },
];

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-2">Portfolio &amp; Technical Lab</h1>
      <p className="mb-6">Texte d&apos;introduction à venir.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block border border-gray-300 p-4 hover:bg-gray-100"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
