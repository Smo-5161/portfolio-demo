import { SITE_URL } from "@/lib/site";
import { aiBotCategories } from "@/lib/ai-bots";

// robots.txt written by hand (instead of app/robots.ts) so each group carries a "#" comment:
// what the crawlers in it do and why they are allowed. Single source: lib/ai-bots.ts.
export const dynamic = "force-static";

export function GET() {
  const groups = aiBotCategories.map((c) =>
    [
      `# ${c.label}: ${c.what}`,
      `# ${c.decision}`,
      ...c.bots.map((b) => `User-agent: ${b.name}${c.id === "undocumented" ? "  # undocumented, seen in logs only" : ""}`),
      "Allow: /",
    ].join("\n"),
  );

  const body = [
    "# robots.txt — antoine-smolar.vercel.app",
    "# Policy: every crawler, AI ones included, may read the whole site. Details: /architecture-lab#robots",
    "",
    groups.join("\n\n"),
    "",
    "# Every other crawler",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
