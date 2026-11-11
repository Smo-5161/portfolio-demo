import Link from "next/link";
import { faq, faqJsonLd } from "@/lib/faq";

const sections = [
  { href: "/sites-web", label: "Sites Web" },
  { href: "/saas", label: "SaaS" },
  { href: "/outils-internes", label: "Outils Internes" },
  { href: "/architecture-lab", label: "Architecture & SEO/GEO/CRO Lab" },
];

const expertises = [
  {
    title: "SEO (Search Engine Optimization)",
    text: "Audit technique, architecture de l'information, performance et contenus pensés pour l'intention de recherche, afin de capter un trafic organique qualifié et durable.",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    text: "Structurer contenus et données (JSON-LD, réponses directes, sources chiffrées) pour être compris et cité par les moteurs génératifs comme ChatGPT, Gemini ou Perplexity.",
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

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Growth Marketer &amp; Product Builder</h1>
        <p className="mb-2">
          Je fais grandir des produits digitaux en combinant acquisition, conversion et
          construction produit : rendre un site visible sur Google comme dans les IA
          génératives, transformer ce trafic en clients, puis livrer les applications et
          outils qui font tourner l&apos;activité.
        </p>
        <p>
          Ce site est à la fois mon portfolio et mon laboratoire : chaque optimisation y
          est appliquée, mesurée et documentée en direct.
        </p>
      </header>

      <div className="space-y-6 mb-12">
        {expertises.map((e) => (
          <section key={e.title}>
            <h2 className="text-xl font-bold mb-1">{e.title}</h2>
            <p>{e.text}</p>
          </section>
        ))}
      </div>

      <nav aria-label="Sections du portfolio" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block border border-gray-300 p-4 hover:bg-gray-100"
          >
            {s.label}
          </Link>
        ))}
      </nav>

      <section id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-xl font-bold mb-4">
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
