# Project rules

*Standing instructions set by Antoine Smolar for this project. The site is built with an AI coding assistant (Claude); these rules define what it must and must not do. Architecture, SEO/GEO requirements, content and final decisions are the author's.*

## 1. Purpose

This site is a portfolio and a live demonstration of web architecture, SEO, GEO and CRO tooling. It is not built to rank or to attract traffic: every technical choice must be correct, verifiable and explainable to a recruiter.

## 2. Code and rendering

- Next.js App Router, TypeScript in strict mode, Tailwind CSS v4.
- Pages are rendered on the server: the complete content must be present in the HTML of the first response, readable without JavaScript.
- Client-side JavaScript only for interaction (cookie banner, collapsible sections). Interactive components receive their content from the server.
- Content lives in data files (`data/`, `lib/`) and is reused for the HTML, the JSON-LD, the sitemap and `llms.txt`. No duplicated copies of the same fact.

## 3. Content visibility for crawlers and LLMs

- Text may be collapsed for readability (cards, accordions, hover), but must stay in the HTML at all times: never removed, never `display: none`.
- Never show crawlers text that visitors cannot reach. Hidden text and cloaking are excluded, even for content that is "only for SEO": such content gets its own visible page instead (see `/faq`).
- Structured data only describes content that is visible on the page.

## 4. Semantic markup

- Landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `article`, `address`, `footer`.
- One `h1` per page and a strict `h2` → `h3` → `h4` hierarchy.
- JSON-LD: `WebSite` on every page, `ProfilePage` + `Person` on the home page, `BreadcrumbList` on inner pages, `ItemList` / `CreativeWork` for projects, `FAQPage` on `/faq`.
- Every page has its own title, meta description, canonical URL and Open Graph / Twitter tags.

## 5. Crawlability

- `robots.txt` names and explicitly allows the crawlers of every major AI assistant (ChatGPT, Claude, Gemini, Mistral, DeepSeek, Grok, Perplexity…); only `/api/` is excluded.
- `sitemap.xml` lists indexable pages with a real last-update date.
- `llms.txt` provides a Markdown summary of the site for LLMs.
- A portfolio page with no entry yet is `noindex` and left out of the sitemap until content is added.

## 6. Writing

- The site is in English only.
- GEO format for answers: natural phrasing, a direct answer with a figure in the first sentence, then context, then sources linked at the end.
- Every figure has a source. Numbers about projects are aligned with what can be verified on the live sites (e.g. page counts read from sitemaps).
- Never invent skills, tools, roles or results. When information is missing, ask the author.
- Team projects are presented as team work; limits and unfinished parts are stated openly.
- Explanations for non-technical readers accompany every technical section ("In plain words").

## 7. Design and accessibility

- Two-colour identity (deep teal + apricot) on neutral backgrounds.
- Every text/background pair meets WCAG AA contrast (≥ 4.5:1).
- Keyboard and screen-reader support for every interactive element.

## 8. Tracking and privacy

- Google Tag Manager drives GA4 and Microsoft Clarity.
- Consent first: Google Consent Mode v2 (advanced) and Clarity Consent API v2, denied by default; a visible banner with equal "Accept" / "Refuse" choices.
- Server-side tracking may make measurement more complete, but never overrides a visitor's refusal.

## 9. Workflow

- Every change is deployed, then checked on the live site (rendered HTML, tags, sitemap, build status).
- Changes are explained to the author in plain language, including what was not done and why.
- When a request conflicts with search-engine guidelines or with the facts, the assistant flags it and proposes compliant options; the author decides.
