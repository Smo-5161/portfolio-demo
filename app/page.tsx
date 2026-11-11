import Link from "next/link";
import { faq, faqJsonLd } from "@/lib/faq";

const expertises = [
  {
    title: "SEO (Search Engine Optimization)",
    text: "Audit technique, architecture de l'information, performance et contenus pensés pour l'intention de recherche, afin de capter un trafic organique qualifié et durable.",
    tone: "violet",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    text: "Structurer contenus et données (JSON-LD, réponses directes, sources chiffrées) pour être compris et cité par ChatGPT, Claude, Gemini, Perplexity ou Mistral.",
    tone: "magenta",
  },
  {
    title: "CRO (Conversion Rate Optimization)",
    text: "Analyse du parcours utilisateur, tracking (GTM, server-side), heatmaps et tests A/B pour transformer davantage de visiteurs en clients sans augmenter le budget d'acquisition.",
    tone: "night",
  },
  {
    title: "UI/UX (User Interface / User Experience)",
    text: "Des interfaces claires et sans friction, conçues à partir des données d'usage pour que chaque écran serve un objectif précis.",
    tone: "magenta",
  },
  {
    title: "No-code app development",
    text: "Conception rapide de SaaS et d'outils internes avec des outils no-code et low-code, pour valider une idée ou outiller une équipe en quelques jours.",
    tone: "violet",
  },
] as const;

const toneBar = {
  violet: "bg-violet-300",
  magenta: "bg-magenta-300",
  night: "bg-night-700",
};

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section 1 : Profil */}
      <section id="profil" aria-labelledby="profil-title" className="scroll-mt-14">
        <div className="hero-gradient border-b border-stroke">
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
            <p className="eyebrow mb-3">Portfolio &amp; Technical Lab</p>
            <h1 id="profil-title" className="text-4xl sm:text-5xl mb-5 max-w-3xl">
              Growth Marketer &amp; Product Builder
            </h1>
            <p className="text-lg text-night-700 mb-3 max-w-2xl">
              Je fais grandir des produits digitaux en combinant acquisition, conversion et
              construction produit : rendre un site visible sur Google comme dans les IA
              génératives, transformer ce trafic en clients, puis livrer les applications et
              outils qui font tourner l&apos;activité.
            </p>
            <p className="text-night-500 mb-8 max-w-2xl">
              Ce site est à la fois mon portfolio et mon laboratoire : chaque optimisation y
              est appliquée, mesurée et documentée en direct.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#portfolio" className="btn btn-primary">
                Voir le portfolio
              </a>
              <a href="#contact" className="btn btn-secondary">
                Me contacter
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertises.map((e) => (
              <li key={e.title}>
                <article className="card h-full overflow-hidden">
                  <div aria-hidden="true" className={`h-1 ${toneBar[e.tone]}`} />
                  <div className="p-6">
                    <h2 className="text-lg mb-2">{e.title}</h2>
                    <p className="text-sm text-night-500 leading-relaxed">{e.text}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 2 : Portfolio */}
      <section
        id="portfolio"
        aria-labelledby="portfolio-title"
        className="scroll-mt-14 bg-white border-y border-stroke"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">Réalisations</p>
          <h2 id="portfolio-title" className="text-3xl mb-8">
            Portfolio
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`card card-interactive block h-full p-6 ${
                    i % 2 === 0 ? "bg-violet-100!" : "bg-magenta-100!"
                  }`}
                >
                  <h3 className="text-lg mb-1 flex items-center justify-between gap-2">
                    {p.label}
                    <span aria-hidden="true" className="text-violet-600">
                      →
                    </span>
                  </h3>
                  <p className="text-sm text-night-700">{p.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 3 : FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-14">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">FAQ</p>
          <h2 id="faq-title" className="text-3xl mb-8">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <article key={item.question} className="card p-6">
                <h3 className="text-base mb-2">{item.question}</h3>
                <p className="text-night-700 leading-relaxed mb-3">{item.answer}</p>
                <p className="text-xs text-night-500">
                  Source{item.sources.length > 1 ? "s" : ""} :{" "}
                  {item.sources.map((s, i) => (
                    <span key={s.url}>
                      {i > 0 && " · "}
                      <a href={s.url} className="link" target="_blank" rel="noopener">
                        {s.label}
                      </a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
