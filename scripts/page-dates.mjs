// Writes lib/page-dates.json: for each page, the date of the last change to its own content
// files (git author date). Run by the pre-commit hook (.githooks/pre-commit), where files
// staged for the commit count as changed today, and again before every build ("prebuild").
// Without git history (e.g. on the build server), the dates already in the file are kept.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const OUT = "lib/page-dates.json";

/** Content files of each page: changing one of them updates that page's date. */
const card = ["components/ProjectCard.tsx", "components/ProjectSection.tsx"];
const sources = {
  "/": ["app/page.tsx", "lib/site.ts", "public/cv"],
  "/websites": ["app/websites", "data/sites.json", ...card],
  "/saas": ["app/saas", "data/saas.json", ...card],
  "/internal-tools": ["app/internal-tools", "data/tools.json", ...card],
  "/workshops": ["app/workshops", "data/workshops.json", ...card],
  "/research": ["app/research", "data/research.json", ...card, "public/projects/airbus-botswana", "public/projects/devinci-apac"],
  "/hackathons": ["app/hackathons", "data/hackathons.json", ...card],
  "/traditional-marketing": ["app/traditional-marketing", "data/traditional-marketing.json", ...card],
  "/architecture-lab": ["app/architecture-lab", "app/robots.txt", "data/lab.ts", "lib/ai-bots.ts", "public/lab"],
  "/faq": ["app/faq", "lib/faq.ts"],
};

const git = (...args) => {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
};
const today = new Date().toISOString().slice(0, 10);
const staged = git("diff", "--cached", "--name-only").split("\n").filter(Boolean);

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const dates = {};
for (const [path, files] of Object.entries(sources)) {
  const touchedNow = staged.some((f) => files.some((src) => f === src || f.startsWith(src + "/")));
  const day = touchedNow ? today : git("log", "-1", "--format=%aI", "--", ...files).slice(0, 10);
  // Never go backwards: a shallow clone can only see recent commits.
  dates[path] = [day, previous[path]].filter(Boolean).sort().pop() ?? "2026-11-11";
}
writeFileSync(OUT, JSON.stringify(dates, null, 2) + "\n");
console.log("page dates:", dates);
