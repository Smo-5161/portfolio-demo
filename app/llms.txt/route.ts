import { SITE_URL, contact } from "@/lib/site";
import { publishedRoutes } from "@/lib/portfolio-data";
import { faq } from "@/lib/faq";

// /llms.txt: Markdown summary of the site for LLMs (llmstxt.org convention).
export const dynamic = "force-static";

export function GET() {
  const body = `# ${contact.name}

> ${contact.tagline}. Portfolio and technical lab: SEO, GEO (Generative Engine Optimization), tracking setup, UI/UX and no-code app development. A skills showcase reached from his CV and LinkedIn, vibe-coded with Claude under his direction; not built to attract search traffic.

## Pages

${publishedRoutes.map((r) => `- [${r.label}](${SITE_URL}${r.path === "/" ? "" : r.path})`).join("\n")}

## FAQ

${faq
  .map(
    (f) =>
      `### ${f.question}\n\n${f.answer}\n\nSources: ${f.sources.map((s) => `[${s.label}](${s.url})`).join(", ")}`,
  )
  .join("\n\n")}

## CV

- [Antoine Smolar — CV (PDF)](${SITE_URL}/cv/Antoine-Smolar-CV.pdf)
- [Recommendation letters (PDF)](${SITE_URL}/cv/Antoine-Smolar-Recommendation-Letters.pdf): HELMO Rénovation (founder & CEO, 2026 internship), SIRTOM de la région Flers-Condé (general director, 2024 internship; English translation followed by the signed French original), NEOMA Business School (professor, Live Business Transition Case course)

## Contact

- Phone: ${contact.phoneIntl}
- Email: ${contact.email}
- LinkedIn: ${contact.linkedin}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
