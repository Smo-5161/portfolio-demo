import Link from "next/link";
import Image from "next/image";
import cvPreview from "@/public/cv/cv-preview.webp";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, profilePageJsonLd } from "@/lib/jsonld";
import SkillsCarousel, { type Skill } from "@/components/SkillsCarousel";

export const metadata = pageMetadata("/");

const CV_PDF = "/cv/Antoine-Smolar-CV.pdf";

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
              <figcaption className="mt-3 flex items-center justify-between text-sm text-ink-500">
                <span>My CV</span>
                <a href={CV_PDF} target="_blank" rel="noopener" className="link">
                  Open full size ↗
                </a>
              </figcaption>
            </figure>
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

    </main>
  );
}
