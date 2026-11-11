import { SITE_URL, contact, routes } from "@/lib/site";
import { faq } from "@/lib/faq";

// /llms.txt: Markdown summary of the site for LLMs (llmstxt.org convention).
export const dynamic = "force-static";

export function GET() {
  const body = `# ${contact.name} — ${contact.jobTitle}

> Portfolio and technical lab: SEO, GEO (Generative Engine Optimization), CRO (Conversion Rate Optimization), UI/UX and no-code app development.

## Pages

${routes.map((r) => `- [${r.label}](${SITE_URL}${r.path === "/" ? "" : r.path})`).join("\n")}

## FAQ

${faq
  .map(
    (f) =>
      `### ${f.question}\n\n${f.answer}\n\nSources: ${f.sources.map((s) => `[${s.label}](${s.url})`).join(", ")}`,
  )
  .join("\n\n")}

## Contact

- Phone: ${contact.phoneIntl}
- Email: ${contact.email}
- LinkedIn: ${contact.linkedin}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
