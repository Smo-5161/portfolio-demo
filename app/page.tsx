import Link from "next/link";
import { faq, faqJsonLd } from "@/lib/faq";

const expertises = [
  {
    title: "SEO (Search Engine Optimization)",
    text: "Audit technique, architecture de l'information, performance et contenus pensés pour l'intention de recherche, afin de capter un trafic organique qualifié et durable.",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    text: "Structurer contenus et données (JSON-LD, réponses directes, sources chiffrées) pour être compris et cité par ChatGPT, Claude, Gemini, Perplexity ou Mistral.",
  },
  {
    title: "CRO (Conversion Rate Optimization)",
    text: "Analyse du parcours utilisateur, tracking (GTM, server-side), heatmaps et tests A/B pour transformer davantage de visiteurs en clients sans augmenter le budget d'acquisition.",
  },
  {
    title: "UI/UX (User Interface / User Experience)",
    text: "Des interfaces claires et sans friction, conçues à partir des données d'usage pour que chaque écran serve un objectif précis.",
  },
  {
    title: "No-code app development",
    text: "Conception rapide de SaaS et d'outils internes avec des outils no-code et low-code, pour valider une idée ou outiller une équipe en quelques jours.",
  },
];

const projects = [
  {
    href: "/sites-web",
    label: "Sites Web",
    text: "Sites vitrines et e-commerce conçus pour le référencement et la conversion.",
  },
  {
    href: "/saas",
    label: "SaaS",
    text: "Produits logiciels construits de l'idée au lancement.",
  },
  {
    href: "/outils-internes",
    label: "Outils Internes",
    text: "Applications métier qui automatisent et centralisent le travail des équipes.",
  },
  {
    href: "/architecture-lab",
    label: "Architecture & SEO/GEO/CRO Lab",
    text: "Les coulisses techniques de ce site : tracking, données structurées et métriques.",
  },
];

export default function Home() {
  return (
    <main className="space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section 1 : Profil */}
      <section id="profil" aria-labelledby="profil-title" className="scroll-mt-20">
        <h1 id="profil-title" className="text-3xl font-bold mb-3">
          Growth Marketer &amp; Product Builder
        </h1>
        <p className="mb-2 max-w-3xl">
          Je fais grandir des produits digitaux en combinant acquisition, conversion et
          construction produit : rendre un site visible sur Google comme dans les IA
          génératives, transformer ce trafic en clients, puis livrer les applications et
          outils qui font tourner l&apos;activité.
        </p>
        <p className="mb-8 max-w-3xl">
          Ce site est à la fois mon portfolio et mon laboratoire : chaque optimisation y
          est appliquée, mesurée et documentée en direct.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertises.map((e) => (
            <li key={e.title}>
              <article className="h-full border border-gray-300 rounded p-5">
                <h2 className="text-lg font-bold mb-2">{e.title}</h2>
                <p className="text-sm">{e.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2 : Portfolio */}
      <section id="portfolio" aria-labelledby="portfolio-title" className="scroll-mt-20">
        <h2 id="portfolio-title" className="text-2xl font-bold mb-6">
          Portfolio
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block h-full border border-gray-300 rounded p-5 hover:bg-gray-100"
              >
                <h3 className="font-bold mb-1">{p.label} →</h3>
                <p className="text-sm">{p.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3 : FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20">
        <h2 id="faq-title" className="text-2xl font-bold mb-6">
          Questions fréquentes
        </h2>
        <div className="space-y-6">
          {faq.map((item) => (
            <article key={item.question} className="border-b border-gray-300 pb-4">
              <h3 className="font-bold mb-1">{item.question}</h3>
              <p className="mb-2">{item.answer}</p>
              <p className="text-sm text-gray-600">
                Source{item.sources.length > 1 ? "s" : ""} :{" "}
                {item.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && " · "}
                    <a href={s.url} className="underline" target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
