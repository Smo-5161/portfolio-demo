// Structured data (schema.org JSON-LD) shared across pages and shown on the Architecture Lab.
import { SITE_URL, contact } from "./site";
import type { Project } from "./types";

const PERSON_ID = `${SITE_URL}/#person`;
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
  sameAs: [contact.linkedin],
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
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: personJsonLd,
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
        creator: { "@id": PERSON_ID },
      },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
