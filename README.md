# Antoine Smolar — Portfolio & Technical Lab

Live site: **https://portfolio-demo-lilac-five.vercel.app**

A portfolio that doubles as a working demonstration of web architecture, SEO, GEO (Generative Engine Optimization) and CRO tooling. The [Architecture Lab](https://portfolio-demo-lilac-five.vercel.app/architecture-lab) page explains, section by section, how the site is built.

## How this site was built

**AI-assisted, human-directed.** The code was written with an AI coding assistant (Claude). The brief, the architecture, the SEO/GEO requirements, the content and every final decision are mine. The assistant was guided by written specifications:

- [`docs/PRD.md`](docs/PRD.md): the initial product brief, written before any code;
- [`PROJECT_RULES.md`](PROJECT_RULES.md): the standing rules the assistant must follow (rendering, markup, crawlability, writing, accessibility, privacy).

## Stack

Next.js (App Router, React Server Components) · TypeScript (strict) · Tailwind CSS v4 · Vercel · Google Tag Manager, GA4 and Microsoft Clarity with Consent Mode v2.

## Where to look

| Topic | Files |
|---|---|
| Pages, titles and descriptions | [`lib/site.ts`](lib/site.ts), [`lib/seo.ts`](lib/seo.ts) |
| Structured data (JSON-LD) | [`lib/jsonld.tsx`](lib/jsonld.tsx) |
| AI crawlers in robots.txt | [`lib/ai-bots.ts`](lib/ai-bots.ts), [`app/robots.ts`](app/robots.ts) |
| Sitemap and llms.txt | [`app/sitemap.ts`](app/sitemap.ts), [`app/llms.txt/route.ts`](app/llms.txt/route.ts) |
| GEO-ready FAQ | [`lib/faq.ts`](lib/faq.ts), [`app/faq/page.tsx`](app/faq/page.tsx) |
| Tracking and consent | [`components/Analytics.tsx`](components/Analytics.tsx), [`components/ConsentBanner.tsx`](components/ConsentBanner.tsx) |
| Design tokens | [`app/globals.css`](app/globals.css) |
| Project content | [`data/`](data/) |

## Run locally

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` when deploying on a custom domain; canonical URLs, sitemap and JSON-LD follow it.
