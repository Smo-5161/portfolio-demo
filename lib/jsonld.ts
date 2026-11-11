// Structured data (schema.org JSON-LD) shared across pages and shown on the Architecture Lab.
import { SITE_URL, contact } from "./site";
import type { Project } from "./types";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
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
  ],
};

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
        creator: { "@type": "Person", name: contact.name },
      },
    })),
  };
}
