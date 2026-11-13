import LabSection from "@/components/LabSection";
import LabToggleAll from "@/components/LabToggleAll";
import { pageMetadata } from "@/lib/seo";
import { REPO_URL, SITE_UPDATED, repoFile, routes } from "@/lib/site";
import { aiBotCategories, aiBots } from "@/lib/ai-bots";
import { faq, faqJsonLd } from "@/lib/faq";
import {
  JsonLd,
  breadcrumbJsonLd,
  labArticleJsonLd,
  profilePageJsonLd,
  projectListJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { trackingEvents, screenshots, type Status, type EventType } from "@/data/lab";
import { GTM_ID, CLARITY_ID, GA4_ID } from "@/lib/tracking";
import sites from "@/data/sites.json";
import type { Project } from "@/lib/types";

export const metadata = pageMetadata("/architecture-lab");

// FAQ entry used to illustrate the answer anatomy.
const sample = faq.find((q) => q.question.startsWith("Does SEO")) ?? faq[0];

const toc = [
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Code & stack" },
  { id: "markup", label: "Markup & JSON-LD" },
  { id: "robots", label: "AI crawlers" },
  { id: "faq-structure", label: "FAQ for GEO" },
  { id: "tracking", label: "Analytics" },
  { id: "server-side", label: "Server-side" },
  { id: "dashboards", label: "Dashboards" },
  { id: "variant-demo", label: "Variant demo" },
];

const pageDetails: Record<string, { rendering: string; content: string }> = {
  "/": { rendering: "Static (SSG)", content: "Profile, CV, skills, portfolio" },
  "/websites": { rendering: "Static (SSG)", content: "Projects from data/sites.json" },
  "/saas": { rendering: "Static (SSG)", content: "Projects from data/saas.json" },
  "/internal-tools": { rendering: "Static (SSG)", content: "Projects from data/tools.json" },
  "/workshops": { rendering: "Static (SSG)", content: "Talks from data/workshops.json" },
  "/research": { rendering: "Static (SSG)", content: "Projects from data/research.json" },
  "/hackathons": { rendering: "Static (SSG)", content: "Hackathons from data/hackathons.json" },
  "/traditional-marketing": { rendering: "Static (SSG)", content: "Campaigns from data/traditional-marketing.json" },
  "/architecture-lab": { rendering: "Static (SSG)", content: "This report" },
  "/faq": { rendering: "Static (SSG)", content: "Sourced FAQ, built for GEO" },
};

const machineFiles = [
  { path: "/robots.txt", role: "Crawl rules, AI crawlers allowed, sitemap link" },
  { path: "/sitemap.xml", role: "Every page with priority and update frequency" },
  { path: "/llms.txt", role: "Markdown summary of the site for LLMs (an emerging convention: whether major AI engines actually use it is not yet proven)" },
];

const stack = [
  { name: "Next.js (App Router)", why: "Pages are rendered on the server: the full HTML is in the first response." },
  { name: "React Server Components", why: "Content ships as HTML, not JavaScript. Only a few small interactive islands (cookie banner, collapsible report sections) run in the browser." },
  { name: "TypeScript (strict)", why: "Typed content (projects, FAQ, tracking plan): a broken entry fails the build, not the page." },
  { name: "Tailwind CSS v4", why: "Design tokens in one file (globals.css), no runtime CSS-in-JS." },
  { name: "JSON & TS data files", why: "Content is separated from layout and reused for HTML, JSON-LD, sitemap and llms.txt." },
  { name: "Vercel", why: "Edge CDN, HTTPS and automatic deploys from GitHub on every push." },
];

const landmarks = [
  { tag: "<header> + <nav>", use: "Site name and jump links to every section" },
  { tag: "<main>", use: "One per page, holds the page content" },
  { tag: "<section aria-labelledby>", use: "Each section is named by its own heading" },
  { tag: "<article>", use: "Self-contained units: skill, project, FAQ entry" },
  { tag: "<address>", use: "Contact details in the footer" },
  { tag: "<footer>", use: "Contact block on every page" },
];

const jsonLdBlocks = [
  { type: "WebSite", where: "Every page", why: "Names the site and links it to its author.", data: websiteJsonLd },
  {
    type: "ProfilePage + Person",
    where: "Home page",
    why: "Google's type for a page about one person: who the site is about, with contacts and skills.",
    data: profilePageJsonLd,
  },
  { type: "FAQPage", where: "FAQ page (/faq)", why: `${faq.length} questions and answers, easy for LLMs to quote. It marks up content that is visible on the page, as Google requires.`, data: faqJsonLd },
  {
    type: "ItemList + CreativeWork",
    where: "Project pages",
    why: "Each project is a work credited to Antoine Smolar.",
    data: projectListJsonLd("Websites", sites as Project[]),
  },
  {
    type: "TechArticle",
    where: "This Lab page",
    why: "Presents this report as a technical article, with its author and its publication and update dates.",
    data: labArticleJsonLd,
  },
  {
    type: "BreadcrumbList",
    where: "Every inner page",
    why: "Shows the page's place in the site (Home › Websites) in search results.",
    data: breadcrumbJsonLd("/websites", "Websites"),
  },
];

const faqRules = [
  { title: "Natural phrasing", text: "Questions are written the way someone would ask ChatGPT, not as keywords." },
  { title: "Answer first", text: "The first sentence answers the question on its own, with a figure." },
  { title: "Sourced data", text: "Every figure links to its source at the end of the answer." },
  { title: "Visible, never hidden", text: "The FAQ sits on its own page rather than being hidden: text shown to robots but not to visitors breaks Google’s spam policies." },
];

const tones = ["bg-brand-100", "bg-accent-100", "bg-accent-50", "bg-brand-50"];

function StatusChip({ status }: { status: Status }) {
  if (status === "live") return <span className="chip bg-brand-50! border-transparent!">● Live</span>;
  if (status === "datalayer") return <span className="chip bg-brand-50! border-transparent!">◐ In dataLayer</span>;
  return <span className="chip bg-accent-50! border-transparent!">○ Planned</span>;
}

function TypeChip({ type }: { type: EventType }) {
  if (type === "conversion") return <span className="chip bg-accent-100! border-transparent!">★ Conversion</span>;
  if (type === "key_event") return <span className="chip bg-brand-100! border-transparent!">◆ Key event</span>;
  return <>—</>;
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  plain,
  cta,
  code,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  /** Plain-language explanation for non-technical readers (recruiters, clients). */
  plain?: string;
  /** Repository paths shown as "See the code" links. */
  code?: string[];
  cta?: { label: string; href: string };
  children: React.ReactNode;
}) {
  // Collapsible card: title + plain words always visible; details expand on click,
  // but are rendered here on the server and always present in the HTML.
  return (
    <LabSection
      id={id}
      eyebrow={eyebrow}
      title={title}
      plain={plain}
      cta={cta}
      code={code?.map((path) => ({ label: path, href: repoFile(path) }))}
    >
      {intro && <div className="text-ink-700 leading-relaxed max-w-3xl mb-6">{intro}</div>}
      {children}
    </LabSection>
  );
}

function FlowNode({ title, detail, tone }: { title: string; detail?: string; tone: string }) {
  return (
    <li className={`rounded-2xl px-4 py-3 ${tone}`}>
      <span className="block font-medium">{title}</span>
      {detail && <span className="block text-xs text-ink-700 mt-0.5">{detail}</span>}
    </li>
  );
}

function Arrow() {
  return (
    <li aria-hidden="true" className="grid place-items-center text-ink-300 text-xl rotate-90 md:rotate-0">
      →
    </li>
  );
}

export default function ArchitectureLabPage() {
  const stats = [
    { value: routes.length, label: "pages" },
    { value: jsonLdBlocks.length, label: "JSON-LD types" },
    { value: aiBots.length, label: "AI crawlers allowed" },
    { value: faq.length, label: "sourced FAQ answers" },
    { value: trackingEvents.length, label: "tracked events" },
  ];

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd("/architecture-lab", "Architecture & SEO/GEO/CRO Lab")} />
      <JsonLd data={labArticleJsonLd} />
      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-4">
            <a href="/" className="link">Home</a> <span aria-hidden="true">›</span> Lab
          </nav>
          <p className="eyebrow mb-2">Proof of work</p>
          <h1 className="text-4xl mb-4">Architecture &amp; SEO/GEO/CRO Lab</h1>
          <p className="text-lg text-ink-700 max-w-3xl mb-8">
            How this site is built to be found by Google, understood and quoted by AI engines,
            and measured end to end. Every number below is read from the site&apos;s own
            configuration, not typed by hand.
          </p>
          <p className="text-sm text-ink-500 -mt-6 mb-8">
            By Antoine Smolar · Last updated <time dateTime={SITE_UPDATED}>12 November 2026</time>
          </p>
          <p className="text-sm text-ink-700 max-w-3xl mb-8 -mt-4 rounded-2xl bg-white/70 border border-stroke px-4 py-3">
            <strong className="font-medium">No tech background?</strong> Each section below is a card
            with a short{" "}
            <span className="rounded-full bg-brand-50 px-2 py-0.5">In plain words</span>{" "}
            explanation. Click a card to open the technical details.
          </p>
          <div className="mb-8 max-w-3xl rounded-2xl border border-stroke bg-white/80 p-5">
            <p className="text-sm text-ink-700 mb-4">
              <strong className="font-medium text-ink-900">Built with AI, directed by me.</strong> This
              site was vibe-coded: Claude wrote the code as a coding partner. What I brought is the part
              that makes it work for search and AI engines: the site architecture, the semantic markup
              and heading structure, robots.txt and the AI crawler policy, structured data, llms.txt,
              the GEO-ready FAQ, the choice of stack and the tracking plan. All of it was set out in a
              written brief and a set of project rules the assistant had to follow.
            </p>
            <p className="text-sm text-ink-700 mb-4">
              <strong className="font-medium text-ink-900">Why this site stays small on purpose.</strong>{" "}
              This is a skills showcase, not a site meant to rank or attract traffic: its visitors come
              from my CV and LinkedIn. That explains a few deliberate choices: no paid custom domain, and
              no live server-side tracking, since running a server container for a handful of visits
              would only burn resources for no useful data. Those parts are designed and documented to
              show I know how to set them up, not deployed.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={REPO_URL} target="_blank" rel="noopener" className="btn btn-primary">
                View the source code on GitHub ↗
              </a>
              <a href={repoFile("docs/PRD.md")} target="_blank" rel="noopener" className="btn btn-secondary">
                Initial brief (PRD) ↗
              </a>
              <a href={repoFile("PROJECT_RULES.md")} target="_blank" rel="noopener" className="btn btn-secondary">
                Project rules for the AI ↗
              </a>
            </div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {stats.map((s, i) => (
              <li key={s.label} className={`rounded-2xl p-4 ${tones[i % tones.length]}`}>
                <span className="block text-3xl font-medium">{s.value}</span>
                <span className="block text-sm text-ink-700">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav aria-label="Report sections" className="sticky top-14 z-40 bg-white/80 backdrop-blur-md border-b border-stroke">
        <ul className="max-w-6xl mx-auto px-6 py-2 flex gap-1 overflow-x-auto text-sm whitespace-nowrap">
          {toc.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="block px-3 py-1.5 rounded-full text-ink-700 hover:bg-brand-100">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-6">
        <div className="flex justify-end">
          <LabToggleAll />
        </div>
        {/* 1. Architecture */}
        <Section
          id="architecture"
          code={["lib/site.ts", "app/sitemap.ts", "app/llms.txt/route.ts", "next.config.ts"]}
          plain="Think of the site as a building with a clear floor plan: every room (page) can be reached from the lobby (the home page) in one step, with signs everywhere. Search engines discover a site by following its links, so a simple plan means no page gets lost. The “files made for machines” are a reception desk for robots: a map of the site (sitemap), the house rules (robots.txt) and a short summary written for AI assistants (llms.txt)."
          eyebrow="01"
          title="Site architecture"
          intro="A flat structure: every page is one click from the home page, every section has its own anchor, and content lives in data files reused everywhere."
        >
          <div className="card p-6">
            <p className="font-mono text-sm mb-4">
              <span className="chip chip-tonal">{routes[0].path}</span> Home
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 border-l-2 border-ink-100 pl-4 ml-4">
              {routes.slice(1).map((r, i) => (
                <li key={r.path} className={`rounded-2xl p-4 ${tones[i % tones.length]}`}>
                  <a href={r.path} className="font-mono text-sm link">
                    {r.path}
                  </a>
                  <span className="block font-medium mt-1">{r.label}</span>
                  <span className="block text-xs text-ink-700 mt-1">{pageDetails[r.path]?.content}</span>
                  <span className="block text-xs text-ink-500 mt-2">{pageDetails[r.path]?.rendering}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-base mt-8 mb-3">Files made for machines</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {machineFiles.map((f) => (
                <li key={f.path} className="flex gap-3 items-baseline text-sm">
                  <a href={f.path} className="font-mono link shrink-0">
                    {f.path}
                  </a>
                  <span className="text-ink-700">{f.role}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-700 mt-6">
              Old French URLs (<code>/sites-web</code>, <code>/outils-internes</code>) redirect
              permanently (301) to their English versions, so no link breaks.
            </p>
          </div>
        </Section>

        {/* 2. Stack */}
        <Section
          id="stack"
          code={["package.json", "app/layout.tsx", "app/globals.css"]}
          plain="Many modern websites send an almost empty page and assemble it inside the visitor’s browser. Search engines and AI assistants often don’t wait for that step, so they see little or nothing. Here the server sends the finished page straight away, like handing someone a printed brochure instead of a box of parts. Visitors get a faster site, and Google or ChatGPT can read every word."
          eyebrow="02"
          title="Code & stack"
          intro="The site is built so that a crawler or an LLM gets the full content in plain HTML, without running any JavaScript."
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s, i) => (
              <li key={s.name} className="card p-5">
                <span
                  aria-hidden="true"
                  className={`inline-block w-3 h-3 rounded-full mb-3 ring-1 ring-ink-100 ${tones[i % tones.length]}`}
                />
                <h3 className="text-base mb-1">{s.name}</h3>
                <p className="text-sm text-ink-700">{s.why}</p>
              </li>
            ))}
          </ul>
          <ol className="mt-6 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <FlowNode title="Request" detail="Googlebot, GPTBot, a visitor…" tone="bg-brand-100" />
            <Arrow />
            <FlowNode title="Vercel edge" detail="Pre-rendered HTML served from cache" tone="bg-accent-100" />
            <Arrow />
            <FlowNode title="Complete HTML" detail="Text, headings, links and JSON-LD in the first byte" tone="bg-brand-50" />
          </ol>
        </Section>

        {/* 3. Markup */}
        <Section
          id="markup"
          code={["lib/jsonld.tsx", "lib/seo.ts"]}
          plain="HTML tags work like labels on a filing cabinet: “this is the main title”, “this is a section”, “this is the contact address”. Clear labels help Google and AI tools understand what each part of a page is. JSON-LD goes one step further: it is an ID card hidden in the page, in a format machines read directly (“this site belongs to Antoine Smolar, a business student, here is his LinkedIn”). It helps Google display richer results and helps AI assistants describe a person or a company accurately."
          eyebrow="03"
          title="Semantic markup & structured data"
          intro="HTML tags describe what each block is, and JSON-LD states the facts explicitly so search engines and LLMs don't have to guess."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <h3 className="text-base mb-4">HTML landmarks</h3>
              <ul className="space-y-2 text-sm">
                {landmarks.map((l) => (
                  <li key={l.tag} className="flex gap-3">
                    <code className="shrink-0 rounded-lg bg-surface px-2 py-0.5">{l.tag}</code>
                    <span className="text-ink-700">{l.use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-base mb-4">Heading hierarchy</h3>
              <ul className="space-y-2 text-sm font-mono">
                <li className="rounded-lg bg-brand-100 px-3 py-2">H1 · one per page (page subject)</li>
                <li className="rounded-lg bg-accent-100 px-3 py-2 ml-6">H2 · each section (My skills, Portfolio…)</li>
                <li className="rounded-lg bg-accent-50 px-3 py-2 ml-12">H3 · each card (a skill, a project, a question)</li>
                <li className="rounded-lg bg-brand-50 px-3 py-2 ml-18">H4 · details inside a project</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg mt-10 mb-4">JSON-LD injected on this site</h3>
          <ul className="space-y-4">
            {jsonLdBlocks.map((b, i) => (
              <li key={b.type} className="card overflow-hidden">
                <div className={`flex flex-wrap items-baseline justify-between gap-2 px-6 py-4 ${tones[i % tones.length]}`}>
                  <span className="font-medium">{b.type}</span>
                  <span className="text-sm text-ink-700">{b.where}</span>
                </div>
                <p className="px-6 pt-4 text-sm text-ink-700">{b.why}</p>
                <pre className="m-6 mt-3 max-h-64 overflow-auto rounded-xl border border-stroke bg-surface p-4 text-xs font-mono">
                  {JSON.stringify(b.data, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </Section>

        {/* 4. robots.txt */}
        <Section
          id="robots"
          code={["lib/ai-bots.ts", "app/robots.ts"]}
          plain="robots.txt is the doorman of a website: a small public file telling automated visitors (robots) what they are allowed to read. AI companies send different robots for different jobs: learning from pages, finding pages to quote, and opening a page when someone asks about it. Here each job is listed separately and a clear choice is made for each one: all are welcome, because the goal of this portfolio is to be known and quoted by AI assistants."
          eyebrow="04"
          title="robots.txt & AI crawlers"
          intro={
            <>
              AI crawlers do three different jobs: collecting pages to train models, indexing pages
              for AI search, and fetching a page live when a user asks about it. robots.txt names them
              in one group per job, so each can be allowed or blocked separately. On this public
              portfolio all three are allowed on purpose; a site protecting its content would usually
              block training only. Deprecated tokens (anthropic-ai, Claude-Web) were removed. See the
              live file at{" "}
              <a href="/robots.txt" className="link">
                /robots.txt
              </a>
              .
            </>
          }
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {aiBotCategories.map((c, i) => (
              <li key={c.id} className="card overflow-hidden">
                <div className={`px-5 py-3 ${tones[i % tones.length]}`}>
                  <span className="font-medium">{c.label}</span>
                  <span className="block text-sm text-ink-700">{c.what}</span>
                </div>
                <ul className="flex flex-wrap gap-2 px-5 pt-4">
                  {c.bots.map((b) => (
                    <li key={b.name} className="chip font-mono" title={b.vendor}>
                      {b.name}
                    </li>
                  ))}
                </ul>
                <p className="px-5 py-4 text-sm text-ink-700">
                  <span className="font-medium text-ink-900">Decision: </span>
                  {c.decision}
                </p>
              </li>
            ))}
          </ul>
          <pre className="mt-6 overflow-auto rounded-xl border border-stroke bg-surface p-4 text-xs font-mono">
            {`${aiBotCategories
              .map((c) => `# ${c.label}\nUser-Agent: ${c.bots.map((b) => b.name).join("\nUser-Agent: ")}\nAllow: /`)
              .join("\n\n")}

User-Agent: *
Allow: /

Sitemap: /sitemap.xml`}
          </pre>
        </Section>

        {/* 5. FAQ */}
        <Section
          id="faq-structure"
          code={["lib/faq.ts", "app/faq/page.tsx"]}
          plain="When someone asks ChatGPT a question, it looks for short, clear, trustworthy answers it can quote. So every answer in this FAQ starts with the direct answer and a figure, then adds context, then names its source: exactly the shape an AI likes to reuse. On a portfolio, a FAQ about SEO statistics isn’t really useful to visitors: it is here to show the method. So instead of cluttering the home page, it has its own page, linked from the footer. It is not hidden, though: showing robots text that people can’t see is a classic black-hat trick that Google penalizes."
          eyebrow="05"
          title="A FAQ built for GEO"
          intro={<>Generative engines quote short, self-contained, sourced answers. Every FAQ entry follows the same anatomy. On this portfolio the FAQ is a demonstration of SEO/GEO structuring rather than content for visitors, so it lives on a dedicated page, <a href="/faq" className="link">/faq</a>, linked from the footer, instead of the home page. It opens with three questions about me, so an AI asked “Who is Antoine Smolar?” finds a direct, sourced answer. Since 2023 Google only shows FAQ rich results for government and health sites: the FAQPage markup here targets meaning and LLMs, not rich snippets. Every figure is observed data (no forecasts) and the page shows its last update date.</>}
        >
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <div className="card p-6">
              <h3 className="text-base mb-4">Anatomy of an answer</h3>
              <ol className="space-y-3">
                <li className="rounded-2xl bg-brand-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">① Question, phrased naturally</span>
                  <span className="font-medium">{sample.question}</span>
                </li>
                <li className="rounded-2xl bg-accent-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">② Direct answer + figure in the first sentence</span>
                  {sample.answer.split(". ")[0]}.
                </li>
                <li className="rounded-2xl bg-accent-50 p-4">
                  <span className="block text-xs text-ink-500 mb-1">③ Context in one or two sentences</span>
                  {sample.answer.split(". ").slice(1).join(". ")}
                </li>
                <li className="rounded-2xl bg-brand-50 p-4">
                  <span className="block text-xs text-ink-500 mb-1">④ Source at the end</span>
                  {sample.sources[0].label}
                </li>
              </ol>
            </div>
            <ul className="space-y-3">
              {faqRules.map((r) => (
                <li key={r.title} className="card p-5">
                  <h3 className="text-base mb-1">{r.title}</h3>
                  <p className="text-sm text-ink-700">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* 6. Tracking */}
        <Section
          id="tracking"
          code={["components/Analytics.tsx", "components/ConsentBanner.tsx", "data/lab.ts"]}
          plain="Google Analytics counts what happens: how many visitors, what they click, how many get in touch. Microsoft Clarity shows how it happens: heatmaps of where people click and anonymous replays of visits, to spot what confuses them. Google Tag Manager is the control panel that switches these tools on without touching the site’s code. A “conversion” is an action that matters for the business, here contacting me. And the cookie banner asks visitors for permission first, as European law requires. Where I stand: I installed and configured this stack myself, from the consent banner to GTM, GA4 and Clarity. I have trained on reading heatmaps, session recordings and conversion funnels, but I haven’t yet analysed real traffic to drive a design or business decision. That is the next step, and the part where I would need some ramp-up time on a real project."
          eyebrow="06"
          title="Analytics & tracking"
          intro="Live since 13 November 2026. Google Tag Manager loads on every page and drives Google Analytics 4 and Microsoft Clarity. The site pushes its own events to the dataLayer; GTM turns them into GA4 events (container version 3), each one checked in GA4's real-time report. Consent is handled by a banner, Google Consent Mode v2 and Clarity Consent API v2: until a visitor accepts, both tools run without cookies."
        >
          <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <FlowNode title="Browser + consent banner" detail="Consent Mode v2: denied by default" tone="bg-brand-100" />
            <Arrow />
            <FlowNode title="Google Tag Manager" detail={`Web container ${GTM_ID}`} tone="bg-accent-100" />
            <Arrow />
            <li className="grid gap-3">
              <span className="rounded-2xl px-4 py-3 bg-accent-50">
                <span className="block font-medium">Google Analytics 4</span>
                <span className="block text-xs text-ink-700 mt-0.5">Property {GA4_ID} · 1 conversion, 4 key events</span>
              </span>
              <span className="rounded-2xl px-4 py-3 bg-brand-50">
                <span className="block font-medium">Microsoft Clarity</span>
                <span className="block text-xs text-ink-700 mt-0.5">Project {CLARITY_ID} · cookieless until consent</span>
              </span>
            </li>
          </ol>

          <h3 className="text-lg mt-10 mb-2">Tracking plan</h3>
          <p className="text-sm text-ink-700 mb-4 max-w-3xl">
            One conversion, the real goal of a portfolio: being contacted. Key events are the signals of strong
            interest that lead there (opening the CV, reading a project, visiting it). The site pushes each event to
            the dataLayer with its parameters, a GTM custom-event trigger fires the matching GA4 event tag, and every
            event was verified in GA4&apos;s real-time report. GA4 itself no longer separates conversions from key
            events, so the hierarchy lives in this plan: only <code>generate_lead</code> would be imported into
            Google Ads as a conversion.
          </p>
          <div className="mb-4 max-w-3xl rounded-2xl bg-accent-50 p-4 text-sm text-ink-700">
            <p className="font-medium text-ink-900">What testing caught</p>
            <p className="mt-1">
              The first real-time test showed every hit still flagged as &ldquo;consent denied&rdquo; after clicking
              Accept. Cause: the banner pushed the consent update as a plain array, which gtag.js ignores (it only
              reads <code>arguments</code> objects), and returning visitors never had their saved choice re-applied.
              Both fixed in <code>components/ConsentBanner.tsx</code>, then re-tested: hits now carry the granted
              state.
            </p>
          </div>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-ink-500">
                <tr>
                  <th className="p-3 font-medium">Event</th>
                  <th className="p-3 font-medium">Trigger</th>
                  <th className="p-3 font-medium">Parameters</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Sent to</th>
                  <th className="p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {trackingEvents.map((e) => (
                  <tr key={e.name} className="border-t border-stroke align-top">
                    <td className="p-3 font-mono">{e.name}</td>
                    <td className="p-3 text-ink-700">{e.trigger}</td>
                    <td className="p-3 font-mono text-xs text-ink-700">{e.params.join(", ")}</td>
                    <td className="p-3">
                      <TypeChip type={e.type} />
                    </td>
                    <td className="p-3 text-ink-700">{e.tool}</td>
                    <td className="p-3">
                      <StatusChip status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 7. Server-side */}
        <Section
          id="server-side"
          plain="Today, measurement tools run inside the visitor’s browser, where ad blockers and privacy settings often switch them off: part of the visits simply goes uncounted, like a shop door counter that misses some customers. Server-side tracking moves this work to my own server: the browser sends one message to my own address, and my server passes it on to Google and the other tools. Measurement becomes more complete and more reliable, and the page gets lighter. It does not override anyone’s choice: if a visitor refuses cookies, only anonymous statistics are kept. Not deployed on purpose: with a portfolio’s traffic, a server container would cost resources without producing meaningful data. The setup is designed and documented; I understand how it works and why it matters, and I would expect a learning curve the first time I run it in production."
          eyebrow="07"
          title="Server-side tracking with Stape"
          intro={
            <>
              <p className="mb-3">
                <StatusChip status="planned" />
              </p>
              Ad blockers and browser privacy features (Safari ITP) block classic tracking
              scripts or shorten the life of their cookies. Moving tags to a server container on
              my own subdomain makes measurement first-party, more complete and lighter for the
              browser.
            </>
          }
        >
          <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
            <FlowNode title="Browser" detail="One lightweight request" tone="bg-brand-100" />
            <Arrow />
            <FlowNode title="sgtm.mydomain.com" detail="First-party subdomain" tone="bg-accent-100" />
            <Arrow />
            <FlowNode title="Server GTM on Stape" detail="Cleans, enriches, filters" tone="bg-accent-50" />
            <Arrow />
            <FlowNode title="GA4 · Google Ads · Meta CAPI" detail="Server-to-server" tone="bg-brand-50" />
          </ol>

          <div className="grid gap-4 mt-8 md:grid-cols-3">
            <div className="card p-5">
              <h3 className="text-base mb-2">Custom Loader</h3>
              <p className="text-sm text-ink-700">
                Loads GTM and GA4 from my own domain with a modified path, so ad blockers no longer
                recognize and block the scripts.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-base mb-2">First-party cookies</h3>
              <p className="text-sm text-ink-700">
                Cookies are set by my server on my domain, and Cookie Keeper restores them in
                browsers that cut their lifetime, so returning visitors stay recognized.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-base mb-2">Less JavaScript</h3>
              <p className="text-sm text-ink-700">
                Vendors receive data server-to-server instead of loading their own scripts, which
                keeps the page fast.
              </p>
            </div>
          </div>

          <div className="card p-6 mt-4 bg-accent-50! border-transparent!">
            <h3 className="text-base mb-2">What about visitors who refuse cookies?</h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              Server-side tracking does not override a refusal. This site already runs a consent
              banner with Google Consent Mode v2 in advanced mode: when consent is denied, tags only
              send anonymous cookieless pings (no identifiers, no cookies), and GA4 and Google Ads
              use them to model the missing conversions. The data recovered this way stays aggregated.
              Microsoft Clarity, by design, still collects cookieless data before any choice (Clarity
              Consent API v2), and that is how it runs on this site today. Since French guidance
              generally treats session recording as requiring consent, the next step is to make the
              Clarity tag in GTM fire only after the visitor accepts analytics cookies.
            </p>
          </div>
        </Section>

        {/* 8. Dashboards */}
        <Section
          id="dashboards"
          code={["data/lab.ts"]}
          plain="These are the reporting screens of the tools described above, taken on this site. They show the setup works end to end and data comes in. With a portfolio’s low traffic, they illustrate the tools rather than a full analysis."
          eyebrow="08"
          title="Dashboards, heatmaps & reports"
          intro="Screenshots from the tools above."
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {screenshots.map((s, i) => (
              <li key={s.id} className="card overflow-hidden">
                <figure>
                  {s.image ? (
                    <a href={s.image} target="_blank" rel="noopener" className="block border-b border-stroke bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.alt ?? `${s.title}: ${s.description}`}
                        width={s.width}
                        height={s.height}
                        loading="lazy"
                        className="h-auto w-full"
                      />
                    </a>
                  ) : (
                    <div
                      className={`grid place-items-center aspect-video border-b border-dashed border-ink-300 ${tones[i % tones.length]}`}
                    >
                      <span className="text-sm text-ink-500">Screenshot coming soon</span>
                    </div>
                  )}
                  <figcaption className="p-4">
                    <h3 className="text-base">{s.title}</h3>
                    <p className="text-sm text-ink-700">{s.description}</p>
                    {s.note && <p className="mt-2 text-sm text-ink-700">{s.note}</p>}
                    {s.date && (
                      <p className="mt-2 text-xs text-ink-500">
                        Captured on <time dateTime={s.date}>{new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>

        {/* 9. Variant selector demo */}
        <Section
          id="variant-demo"
          eyebrow="09"
          title="Live demo: variant selector & faceted URLs"
          cta={{ label: "Open the demo", href: "/lab/variant-selector" }}
          code={["components/VariantSelector.tsx", "app/lab/variant-selector/page.tsx", "data/demo-product.ts"]}
          plain="On e-commerce sites, every colour or size choice can create a new web address. Thousands of near-identical pages waste Google’s time and split ranking signals between them. This demo keeps the selector smooth for shoppers while telling Google which version is the real one, and measures every choice for conversion analysis."
          intro="A product page with colour and size selectors and a live SEO inspector. The selection is kept in the URL (shareable links, working back button), and the inspector shows, for each state, the canonical and robots tags such a page should send."
        >
          <div className="card overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-ink-500">
                <tr>
                  <th className="p-3 font-medium">Parameter</th>
                  <th className="p-3 font-medium">Indexable?</th>
                  <th className="p-3 font-medium">Canonical</th>
                  <th className="p-3 font-medium">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["color", "Yes", "?color=sand (itself)", "Different images and real searches (“sand t-shirt”)."],
                  ["size", "No", "?color=sand", "Same content for a searcher: no new page for Google."],
                  ["sort, combined filters", "No", "?color=sand", "Prevents an explosion of near-duplicate URLs."],
                ].map(([param, idx, canon, why]) => (
                  <tr key={param} className="border-t border-stroke align-top">
                    <td className="p-3 font-mono">{param}</td>
                    <td className="p-3">{idx}</td>
                    <td className="p-3 font-mono text-xs">{canon}</td>
                    <td className="p-3 text-ink-700">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card p-5">
              <h3 className="text-base mb-2">Structured data</h3>
              <p className="text-sm text-ink-700">
                Variants are described with <code>ProductGroup</code>, <code>hasVariant</code> and{" "}
                <code>variesBy</code>, Google’s format for products with variants.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-base mb-2">Conversion tracking</h3>
              <p className="text-sm text-ink-700">
                Each choice pushes a GA4 e-commerce event (<code>view_item</code>,{" "}
                <code>select_variant</code>) with the variant to the dataLayer, shown live in the demo.
              </p>
            </div>
            <div className="card p-5">
              <h3 className="text-base mb-2">Why the demo is noindex</h3>
              <p className="text-sm text-ink-700">
                The product is fictional. The page is noindex, absent from the sitemap and llms.txt,
                and its JSON-LD is displayed as code instead of being injected: marking up a fake
                product as real would be misleading structured data.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
