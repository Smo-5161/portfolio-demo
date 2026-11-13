import Link from "next/link";
import { isEmptySection } from "@/lib/portfolio-data";
import Image from "next/image";
import cvPreview from "@/public/cv/cv-preview.webp";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, profilePageJsonLd } from "@/lib/jsonld";
import { contact } from "@/lib/site";

export const metadata = pageMetadata("/");

const CV_PDF = "/cv/Antoine-Smolar-CV.pdf";
const LETTERS_PDF = "/cv/Antoine-Smolar-Recommendation-Letters.pdf";

type Skill = { short: string; name: string; text: string };

// Kept short on purpose so all six fit on one line on desktop.
// Wording rule: describe what Antoine has actually done or trained on, never more.
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
    text: "Tracking setup (GTM, GA4, Clarity) and the fundamentals of reading heatmaps and funnels.",
  },
  {
    short: "UI/UX",
    name: "User Interface & Experience",
    text: "Clear, frictionless interfaces, designed to be measured and improved.",
  },
  {
    short: "No-code",
    name: "App development",
    text: "SaaS products and internal tools shipped in days, vibe coded with Claude Code.",
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
              <h1 id="profile-title" className="text-4xl sm:text-5xl mb-3 max-w-3xl">
                {contact.name}
              </h1>
              <p className="text-xl text-ink-900 mb-5 max-w-2xl">{contact.tagline}</p>
              <p className="text-lg text-ink-700 mb-8 max-w-2xl">
                I combine marketing and product building: making a site visible on Google and in
                generative AI, measuring what visitors do, and building the apps and tools a
                business runs on. This portfolio gathers my internships, school projects and side
                builds, with what worked and what is still unfinished.
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
            </figure>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="eyebrow mb-2">Expertise</p>
          <h2 id="skills-title" className="text-3xl mb-6">
            My skills
          </h2>
          {/* Same look as the portfolio cards (tonal backgrounds, no border). Every card shows its
              full text and stays in the grid flow. They are not links, so they have no hover effect
              (a lift made visitors click them, see the Clarity heatmap in the Lab). */}
          <ul className="grid auto-rows-fr gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {skills.map((s, i) => (
              <li key={s.short}>
                <article
                  className={`card h-full p-4 border-transparent! ${
                    projectTones[i % projectTones.length]
                  }`}
                >
                  <h3 className="text-lg leading-tight">{s.short}</h3>
                  <p className="text-xs font-medium text-ink-700 mt-0.5">{s.name}</p>
                  <p className="text-xs text-ink-700 leading-snug mt-2">{s.text}</p>
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
                    {/* Badge kept outside the heading so the h3 text is just the section name. */}
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <h3 className="text-lg">{p.label}</h3>
                      <span className="chip shrink-0 whitespace-nowrap mt-0.5">Coming soon</span>
                    </div>
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
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <h3 className="text-lg">{p.label}</h3>
                      <span
                        aria-hidden="true"
                        className="grid place-items-center w-8 h-8 shrink-0 rounded-full bg-white text-ink-900"
                      >
                        →
                      </span>
                    </div>
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
