// Structured data (schema.org JSON-LD) shared across pages and shown on the Architecture Lab.
import { REPO_URL, SITE_URL, contact, pageUpdated, periodInterval } from "./site";
import type { Project } from "./types";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_CREATED = "2026-11-11";
const WEBSITE_ID = `${SITE_URL}/#website`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: contact.name,
  jobTitle: contact.jobTitle,
  url: SITE_URL,
  email: `mailto:${contact.email}`,
  telephone: contact.phoneIntl,
  image: `${SITE_URL}/antoine-smolar.jpg`,
  sameAs: [contact.linkedin, "https://github.com/Smo-5161"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "NEOMA Business School" },
    { "@type": "CollegeOrUniversity", name: "Akita International University" },
  ],
  hasCredential: [
    ["Google Ads Search Professional Certification", "Google"],
    ["Google Ads Measurement Certification", "Google"],
    ["Google Analytics Certification", "Google"],
    ["Technical SEO and AI Search Essentials", "Semrush"],
    ["International SEO", "Semrush"],
    ["Inbound Marketing Optimization", "HubSpot"],
  ].map(([name, issuer]) => ({
    "@type": "EducationalOccupationalCredential",
    name,
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: issuer },
  })),
  knowsAbout: [
    "Search Engine Optimization",
    "Generative Engine Optimization",
    "Conversion Rate Optimization",
    "UI/UX Design",
    "No-code app development",
    "Digital transformation",
    "AI integration",
    "ERP and CRM integration (Odoo)",
    "Workflow automation (n8n)",
  ],
};

/** On every page: the site itself, published by the person. */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: `${contact.name} — Portfolio`,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

/** Home page: Google's recommended type for a page about one person. */
export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  dateCreated: SITE_CREATED,
  dateModified: pageUpdated("/"),
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: personJsonLd,
};

/** The Architecture Lab is a technical write-up: TechArticle with author and dates. */
export const labArticleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How this portfolio is built: architecture, SEO, GEO and tracking",
  url: `${SITE_URL}/architecture-lab`,
  author: { "@id": PERSON_ID },
  datePublished: SITE_CREATED,
  dateModified: pageUpdated("/architecture-lab"),
  isPartOf: { "@id": WEBSITE_ID },
  codeRepository: REPO_URL,
};

export function breadcrumbJsonLd(path: string, label: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_URL}${path}` },
    ],
  };
}

export function projectListJsonLd(title: string, items: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        ...(p.url && { url: p.url }),
        ...(p.description && { description: p.description }),
        ...(p.period && { dateCreated: p.period.start, temporalCoverage: periodInterval(p.period) }),
        creator: { "@id": PERSON_ID },
        ...(p.slides && { hasPart: deckJsonLd(p) }),
      },
    })),
  };
}

/** A slide deck as a PresentationDigitalDocument. Team work: Antoine is a contributor, not the sole author. */
function deckJsonLd(p: Project) {
  const s = p.slides!;
  return {
    "@type": "PresentationDigitalDocument",
    name: `${p.name} — ${s.title}`,
    inLanguage: "en",
    numberOfPages: s.images.length,
    contributor: { "@id": PERSON_ID },
    ...(s.pdf && { url: `${SITE_URL}${s.pdf}`, encodingFormat: "application/pdf" }),
    ...(s.transcript && {
      hasPart: s.transcript.map((t, i) => ({
        "@type": "CreativeWork",
        position: i + 1,
        name: t.title,
        image: `${SITE_URL}${s.images[i]}`,
      })),
    }),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
