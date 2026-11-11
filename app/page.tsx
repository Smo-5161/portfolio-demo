import Link from "next/link";
import { faq, faqJsonLd } from "@/lib/faq";
import SkillsCarousel, { type Skill } from "@/components/SkillsCarousel";

const skills: Skill[] = [
  {
    title: "SEO (Search Engine Optimization)",
    text: "Technical audits, information architecture, performance and content built around search intent, to capture qualified, lasting organic traffic.",
    tone: "blue",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    text: "Structuring content and data (JSON-LD, direct answers, sourced figures) so it can be understood and cited by ChatGPT, Claude, Gemini, Perplexity or Mistral.",
    tone: "red",
  },
  {
    title: "CRO (Conversion Rate Optimization)",
    text: "User journey analysis, tracking (GTM, server-side), heatmaps and A/B testing to turn more visitors into customers without increasing acquisition spend.",
    tone: "yellow",
  },
  {
    title: "UI/UX (User Interface / User Experience)",
    text: "Clear, frictionless interfaces designed from usage data, so every screen serves a specific goal.",
    tone: "green",
  },
  {
    title: "No-code app development",
    text: "Fast delivery of SaaS products and internal tools with no-code and low-code platforms, to validate an idea or equip a team within days.",
    tone: "blue",
  },
];

const faqHover = [
  "hover:bg-gblue-100 focus-within:bg-gblue-100",
  "hover:bg-gred-100 focus-within:bg-gred-100",
  "hover:bg-gyellow-100 focus-within:bg-gyellow-100",
  "hover:bg-ggreen-100 focus-within:bg-ggreen-100",
];

const projectTones = ["bg-gblue-100!", "bg-gred-100!", "bg-gyellow-100!", "bg-ggreen-100!"];

const projects = [
  {
    href: "/websites",
    label: "Websites",
    text: "Showcase and e-commerce sites built for search visibility and conversion.",
  },
  {
    href: "/saas",
    label: "SaaS",
    text: "Software products built from idea to launch.",
  },
  {
    href: "/internal-tools",
    label: "Internal Tools",
    text: "Business apps that automate and centralize the way teams work.",
  },
  {
    href: "/architecture-lab",
    label: "Architecture & SEO/GEO/CRO Lab",
    text: "Behind the scenes of this site: tracking, structured data and metrics.",
  },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section 1: Profile */}
      <section id="profile" aria-labelledby="profile-title" className="scroll-mt-14">
        <div className="hero-gradient border-b border-stroke">
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
            <p className="eyebrow mb-3">Portfolio &amp; Technical Lab</p>
            <h1 id="profile-title" className="text-4xl sm:text-5xl mb-5 max-w-3xl">
              Growth Marketer &amp; Product Builder
            </h1>
            <p className="text-lg text-ink-700 mb-3 max-w-2xl">
              I grow digital products by combining acquisition, conversion and product
              building: making a site visible on Google and in generative AI, turning that
              traffic into customers, then shipping the apps and tools that keep the business
              running.
            </p>
            <p className="text-ink-500 mb-8 max-w-2xl">
              This site is both my portfolio and my lab: every optimization is applied,
              measured and documented live.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#portfolio" className="btn btn-primary">
                View portfolio
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">Expertise</p>
          <h2 id="skills-title" className="text-3xl mb-8">
            My skills
          </h2>
          <SkillsCarousel skills={skills} />
        </div>
      </section>

      {/* Section 2: Portfolio */}
      <section
        id="portfolio"
        aria-labelledby="portfolio-title"
        className="scroll-mt-14 bg-white border-y border-stroke"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">Work</p>
          <h2 id="portfolio-title" className="text-3xl mb-8">
            Portfolio
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`card card-interactive block h-full p-6 border-transparent! ${
                    projectTones[i % projectTones.length]
                  }`}
                >
                  <h3 className="text-lg mb-1 flex items-center justify-between gap-2">
                    {p.label}
                    <span aria-hidden="true" className="grid place-items-center w-8 h-8 rounded-full bg-white text-ink-900">
                      →
                    </span>
                  </h3>
                  <p className="text-sm text-ink-700">{p.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-14">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">FAQ</p>
          <h2 id="faq-title" className="text-3xl mb-8">
            Frequently asked questions
          </h2>
          {/* Only the question shows; the answer expands on hover, tap or keyboard focus.
              It is never display:none — just a collapsed grid row — so crawlers and LLMs read it. */}
          <div className="space-y-3">
            {faq.map((item, i) => (
              <article
                key={item.question}
                tabIndex={0}
                className={`group card px-6 py-5 transition-colors duration-300 ${faqHover[i % faqHover.length]}`}
              >
                <h3 className="flex items-center justify-between gap-4 text-base">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="grid place-items-center w-8 h-8 shrink-0 rounded-full bg-surface text-ink-700 transition-transform duration-300 group-hover:rotate-45 group-focus-within:rotate-45"
                  >
                    +
                  </span>
                </h3>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-3 text-ink-700 leading-relaxed mb-3">{item.answer}</p>
                    <p className="text-xs text-ink-500">
                      Source{item.sources.length > 1 ? "s" : ""}:{" "}
                      {item.sources.map((s, j) => (
                        <span key={s.url}>
                          {j > 0 && " · "}
                          <a href={s.url} className="link" target="_blank" rel="noopener">
                            {s.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
