# Product Requirements: Portfolio & Technical Lab (V1)

*Initial brief written by Antoine Smolar before development started. It was used as the first instruction to the AI coding assistant. The site has evolved since; standing rules added along the way are in [`PROJECT_RULES.md`](../PROJECT_RULES.md).*

## 1. Vision and objective

- **Product:** an interactive portfolio and an experimentation lab for SEO, GEO, CRO and tracking.
- **Hosting:** Vercel.
- **Objective:** a live, verifiable demonstration of skills in web development (SSR, Next.js), UI/UX, traditional SEO, GEO (Generative Engine Optimization), CRO and server-side tracking.
- **Key constraint:** the site starts from a deliberate "zero state" in SEO/GEO/CRO, styling and content. Project sections are empty containers ready to be filled. Optimization, semantic structure and content are then added step by step, so that each improvement can be shown and explained.

## 2. Technical stack (minimum baseline)

| Component | Technology | V1 status |
|---|---|---|
| Framework | Next.js (App Router, React 19) | Initialized |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v4 | Raw, minimal |
| Front-end analytics | GA4 via `@next/third-parties/google` + Microsoft Clarity | Wired but disabled, placeholder IDs |
| Server tracking | Next.js API route `/api/track` | Stub: logs and returns the payload |
| Content | Local JSON files (`/data/*.json`) | Empty structures |

## 3. Routes

```
app/
├── layout.tsx            Root layout (no advanced meta tags yet)
├── page.tsx              Landing / central dashboard
├── sites-web/            Section 1: Websites
├── saas/                 Section 2: SaaS
├── outils-internes/      Section 3: Apps & internal tools
├── architecture-lab/     Section 4: SEO/GEO/CRO architecture & data flow demo
├── api/track/route.ts    Proxy endpoint for future server-side tracking
└── robots.txt            Generic file, not optimized
```

## 4. Sections

- **Landing:** bare layout (system font, no animation), a title, a placeholder introduction and four links to the sections.
- **Websites, SaaS, Internal tools:** each reads its JSON file and shows an `EmptyState` component while the file is empty.
- **Architecture Lab:** the "proof of work" page exposing how the site is engineered:
  - a data pipeline block with a test button posting an event to `/api/track` and displaying the JSON response;
  - a GEO / crawlability inspector showing the JSON-LD currently injected;
  - a performance and metrics table.

## 5. Initial "zero state"

To build every optimization explicitly afterwards, V1 must start with:

- default Next.js metadata only (no Open Graph, no Twitter Cards);
- no JSON-LD;
- a generic `robots.txt` with no rules for AI crawlers;
- no sitemap;
- a tracking endpoint that only logs the body and returns `{ "status": "received_stub" }`.

## 6. Data files

`/data/sites.json`, `/data/saas.json` and `/data/tools.json`, each an empty array `[]`.

## 7. Instructions given to the AI assistant

> Act as a senior Next.js / TypeScript developer and generate the complete project from this PRD.
> - Create the route tree (`/`, the three project sections, `/architecture-lab`, `/api/track`).
> - Keep the styling minimal: raw Tailwind, white background, black text, simple grey borders, no animation.
> - Add no SEO optimization yet: no custom meta tags, no JSON-LD, no sitemap.
> - Fill the three project sections from the local JSON files and show an `EmptyState` component while they are empty.
> - On `/architecture-lab`, add a button that posts `{ event: "test_click", timestamp }` to `/api/track` and displays the JSON response in a `<pre>` block.
