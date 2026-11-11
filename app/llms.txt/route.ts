import { SITE_URL, contact, routes } from "@/lib/site";
import { faq } from "@/lib/faq";

// /llms.txt : résumé Markdown du site destiné aux LLM (convention llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  const body = `# ${contact.name} — ${contact.jobTitle}

> Portfolio et laboratoire technique : SEO, GEO (Generative Engine Optimization), CRO (Conversion Rate Optimization), UI/UX et développement d'applications no-code.

## Pages

${routes.map((r) => `- [${r.label}](${SITE_URL}${r.path === "/" ? "" : r.path})`).join("\n")}

## FAQ

${faq
  .map(
    (f) =>
      `### ${f.question}\n\n${f.answer}\n\nSources : ${f.sources.map((s) => `[${s.label}](${s.url})`).join(", ")}`,
  )
  .join("\n\n")}

## Contact

- Téléphone : ${contact.phoneIntl}
- Email : ${contact.email}
- LinkedIn : ${contact.linkedin}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
