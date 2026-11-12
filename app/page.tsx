import Link from "next/link";
import { isEmptySection } from "@/lib/portfolio-data";
import Image from "next/image";
import cvPreview from "@/public/cv/cv-preview.webp";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, profilePageJsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata("/");

const CV_PDF = "/cv/Antoine-Smolar-CV.pdf";
const LETTERS_PDF = "/cv/Antoine-Smolar-Recommendation-Letters.pdf";

type Skill = { short: string; name: string; text: string };

// Kept short on purpose so all six fit on one line on desktop.
const skills: Skill[] = [
  {
    short: "SEO",
    name: "Search Engine Optimization",
    text: "Technical audits, site architecture and content that ranks.",
  },
  {
    short: "GEO",
    name: "Generative Engine Optimization",
    text: "Content and data that AI engines understand and cite.",
  },
  {
    short: "CRO",
    name: "Conversion Rate Optimization",
    text: "Tracking, heatmaps and A/B tests that turn visits into leads.",
  },
  {
    short: "UI/UX",
    name: "User Interface & Experience",
    text: "Clear, frictionless interfaces built from usage data.",
  },
  {
    short: "No-code",
    name: "App development",
    text: "SaaS products and internal tools shipped in days.",
  },
  {
    short: "Digital & AI",
    name: "Transformation",
    text: "Odoo, n8n and Claude/Mistral rolled out, with team training.",
  },
];

const projectTones = ["bg-brand-100!", "bg-accent-100!", "bg-accent-50!", "bg-brand-50!"];

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
    label: "Internal Tools & Digital Transformation",
    text: "Business apps and digital projects that automate and modernize the way teams work.",
  },
  {
    href: "/workshops",
    label: "Workshops & Talks",
    text: "Workshops and conferences I have led on AI, vibe coding and growth.",
  },
  {
    href: "/research",
    label: "Research & School Projects",
    text: "Research and school projects: the question, the method and the deliverable.",
  },
  {
    href: "/hackathons",
    label: "Hackathons",
    text: "Challenges tackled in limited time: the team, the prototype and the outcome.",
  },
  {
    href: "/traditional-marketing",
    label: "Traditional Marketing",
    text: "The human side of marketing: brand, events, partnerships and field campaigns.",
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
      <JsonLd data={profilePageJsonLd} />

      {/* Section 1: Profile */}
      <section id="profile" aria-labelledby="profile-title" className="scroll-mt-14">
        <div className="hero-gradient border-b border-stroke">
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center">
            <div>
              <h1 id="profile-title" className="text-4xl sm:text-5xl mb-5 max-w-3xl">
                Growth Marketer &amp; Product Builder
              </h1>
              <p className="text-lg text-ink-700 mb-8 max-w-2xl">
                I grow digital products by combining acquisition, conversion and product
                building: making a site visible on Google and in generative AI, turning that
                traffic into customers, then shipping the apps and tools that keep the business
                running.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#portfolio" className="btn btn-primary">
                  View portfolio
                </a>
                <a href={CV_PDF} className="btn btn-secondary" download>
                  Download my CV (PDF)
                </a>
                <a href={LETTERS_PDF} className="btn btn-secondary" target="_blank" rel="noopener">
                  Recommendation letters (PDF)
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Get in touch
                </a>
              </div>
            </div>

            {/* CV preview: image of page 1, links to the full PDF (also crawlable by Google). */}
            <figure className="mx-auto w-full max-w-sm lg:max-w-none">
              <a
                href={CV_PDF}
                target="_blank"
                rel="noopener"
                className="group block overflow-hidden rounded-[20px] border border-stroke bg-white shadow-[var(--shadow-elev-2)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={cvPreview}
                  alt="CV of Antoine Smolar, Digital Transformation & Operations Project Manager: education at NEOMA and Akita International University, experience at AK Company, Kryptosphere AI Division, Helmo Rénovation and SIRTOM, certifications from Google, Semrush and HubSpot, and skills in SEO, GEO, CRO, UX/UI and no-code."
                  priority
                  sizes="(min-width: 1024px) 400px, 90vw"
                  className="h-auto w-full"
                />
              </a>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-ink-500">
                <span>
                  Recommended by{" "}
                  <a href={LETTERS_PDF} target="_blank" rel="noopener" className="link">
                    HELMO Rénovation, SIRTOM Flers-Condé and NEOMA Business School
                  </a>
                </span>
                <a href={CV_PDF} target="_blank" rel="noopener" className="link shrink-0">
                  Open full size ↗
                </a>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="eyebrow mb-2">Expertise</p>
          <h2 id="skills-title" className="text-3xl mb-6">
            My skills
          </h2>
          {/* One line of titles; hovering (or tapping / focusing) a card zooms it like a magnifying
              glass and reveals its text. The text is always in the HTML, only folded on screen. */}
          <ul className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {skills.map((s, i) => (
              <li key={s.short} className="relative h-24">
                <article
                  tabIndex={0}
                  className={`group card absolute inset-x-0 top-0 z-0 min-h-24 cursor-default p-4 border-t-4! outline-none transition-[scale,box-shadow] duration-300 ease-out hover:z-30 hover:scale-[1.45] hover:shadow-xl focus-within:z-30 focus-within:scale-[1.45] focus-within:shadow-xl ${
                    i === 0 ? "origin-top-left" : i === skills.length - 1 ? "origin-top-right" : "origin-top"
                  }`}
                  style={{ borderTopColor: i % 2 === 0 ? "var(--color-brand-700)" : "var(--color-accent-500)" }}
                >
                  <h3 className="text-lg leading-tight">
                    {s.short}
                    <span className="block text-xs font-normal text-ink-500 mt-0.5">{s.name}</span>
                  </h3>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                    <p className="overflow-hidden text-xs text-ink-700 leading-snug">
                      <span className="block pt-2">{s.text}</span>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 2: Portfolio */}
      <section
        id="portfolio"
        aria-labelledby="portfolio-title"
        className="scroll-mt-14 bg-white border-t border-stroke"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">Work</p>
          <h2 id="portfolio-title" className="text-3xl mb-8">
            Portfolio
          </h2>
          <ul className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) =>
              isEmptySection(p.href) ? (
                // No content yet: shown as upcoming, not linked to an empty page.
                <li key={p.href}>
                  <div className="card block h-full p-6 border-dashed! bg-surface!">
                    <h3 className="text-lg mb-1 flex items-start justify-between gap-3">
                      <span>{p.label}</span>
                      <span className="chip shrink-0 whitespace-nowrap mt-0.5">Coming soon</span>
                    </h3>
                    <p className="text-sm text-ink-500">{p.text}</p>
                  </div>
                </li>
              ) : (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className={`card card-interactive block h-full p-6 border-transparent! ${
                      projectTones[i % projectTones.length]
                    }`}
                  >
                    <h3 className="text-lg mb-1 flex items-start justify-between gap-3">
                      <span>{p.label}</span>
                      <span
                        aria-hidden="true"
                        className="grid place-items-center w-8 h-8 shrink-0 rounded-full bg-white text-ink-900"
                      >
                        →
                      </span>
                    </h3>
                    <p className="text-sm text-ink-700">{p.text}</p>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

    </main>
  );
}
