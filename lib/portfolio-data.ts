// Which portfolio sections have content yet. Empty sections are noindex, left out of the
// sitemap and llms.txt, and shown as "Coming soon" (not linked) on the home page.
import { routes } from "./site";
import tools from "@/data/tools.json";
import workshops from "@/data/workshops.json";
import research from "@/data/research.json";

const counts: Record<string, number> = {
  "/internal-tools": tools.length,
  "/workshops": workshops.length,
  "/research": research.length,
};

export const isEmptySection = (path: string) => counts[path] === 0;

/** Routes that are indexable and worth pointing robots and LLMs to. */
export const publishedRoutes = routes.filter((r) => !isEmptySection(r.path));
