import TrackTester from "./TrackTester";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";
import { aiBotGroups, aiBots } from "@/lib/ai-bots";
import { faq, faqJsonLd } from "@/lib/faq";
import { JsonLd, breadcrumbJsonLd, profilePageJsonLd, projectListJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { trackingEvents, screenshots, type Status } from "@/data/lab";
import { GTM_ID, CLARITY_ID } from "@/lib/tracking";
import sites from "@/data/sites.json";
import type { Project } from "@/lib/types";

export const metadata = pageMetadata("/architecture-lab");

const toc = [
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Code & stack" },
  { id: "markup", label: "Markup & JSON-LD" },
  { id: "robots", label: "AI crawlers" },
  { id: "faq-structure", label: "FAQ for GEO" },
  { id: "tracking", label: "Analytics" },
  { id: "server-side", label: "Server-side" },
  { id: "dashboards", label: "Dashboards" },
  { id: "live-demo", label: "Live demo" },
];

const pageDetails: Record<string, { rendering: string; content: string }> = {
  "/": { rendering: "Static (SSG)", content: "Profile, skills carousel, portfolio, FAQ" },
  "/websites": { rendering: "Static (SSG)", content: "Projects from data/sites.json" },
  "/saas": { rendering: "Static (SSG)", content: "Projects from data/saas.json" },
  "/internal-tools": { rendering: "Static (SSG)", content: "Projects from data/tools.json" },
  "/architecture-lab": { rendering: "Static (SSG)", content: "This report" },
};

const machineFiles = [
  { path: "/robots.txt", role: "Crawl rules, AI crawlers allowed, sitemap link" },
  { path: "/sitemap.xml", role: "Every page with priority and update frequency" },
  { path: "/llms.txt", role: "Markdown summary of the site for LLMs" },
  { path: "/api/track", role: "Server endpoint for the tracking demo" },
];

const stack = [
  { name: "Next.js (App Router)", why: "Pages are rendered on the server: the full HTML is in the first response." },
  { name: "React Server Components", why: "Content ships as HTML, not JavaScript. Only 2 small interactive islands run in the browser." },
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
  { type: "FAQPage", where: "Home page", why: `${faq.length} questions and answers, eligible for rich results and easy for LLMs to quote.`, data: faqJsonLd },
  {
    type: "ItemList + CreativeWork",
    where: "Project pages",
    why: "Each project is a work credited to Antoine Smolar.",
    data: projectListJsonLd("Websites", sites as Project[]),
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
  { title: "Always in the HTML", text: "Answers expand on hover, but are never display:none: crawlers read them all." },
];

const tones = ["bg-gblue-100", "bg-gred-100", "bg-gyellow-100", "bg-ggreen-100"];

function StatusChip({ status }: { status: Status }) {
  return status === "live" ? (
    <span className="chip bg-ggreen-100! border-transparent!">● Live</span>
  ) : (
    <span className="chip bg-gyellow-100! border-transparent!">○ Planned</span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  plain,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  /** Plain-language explanation for non-technical readers (recruiters, clients). */
  plain?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <p className="eyebrow mb-1">{eyebrow}</p>
      <h2 id={`${id}-title`} className="text-2xl sm:text-3xl mb-3">
        {title}
      </h2>
      {intro && <div className="text-ink-700 leading-relaxed max-w-3xl mb-6">{intro}</div>}
      {plain && (
        <aside aria-label="In plain words" className="mb-8 max-w-3xl rounded-2xl bg-ggreen-100 p-5">
          <p className="mb-1 flex items-center gap-2 text-sm font-medium">
            <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs">
              i
            </span>
            In plain words
          </p>
          <p className="text-sm leading-relaxed text-ink-700">{plain}</p>
        </aside>
      )}
      {children}
    </section>
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
          <p className="text-sm text-ink-700 max-w-3xl mb-8 -mt-4 rounded-2xl bg-white/70 border border-stroke px-4 py-3">
            <strong className="font-medium">No tech background?</strong> Every section has an{" "}
            <span className="rounded-full bg-ggreen-100 px-2 py-0.5">In plain words</span> box
            that explains what it does and why it matters for a business.
          </p>
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
              <a href={`#${t.id}`} className="block px-3 py-1.5 rounded-full text-ink-700 hover:bg-gblue-100">
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-24">
        {/* 1. Architecture */}
        <Section
          id="architecture"
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
            <FlowNode title="Request" detail="Googlebot, GPTBot, a visitor…" tone="bg-gblue-100" />
            <Arrow />
            <FlowNode title="Vercel edge" detail="Pre-rendered HTML served from cache" tone="bg-gred-100" />
            <Arrow />
            <FlowNode title="Complete HTML" detail="Text, headings, links and JSON-LD in the first byte" tone="bg-ggreen-100" />
          </ol>
        </Section>

        {/* 3. Markup */}
        <Section
          id="markup"
          plain="HTML tags work like labels on a filing cabinet: “this is the main title”, “this is a section”, “this is the contact address”. Clear labels help Google and AI tools understand what each part of a page is. JSON-LD goes one step further: it is an ID card hidden in the page, in a format machines read directly (“this site belongs to Antoine Smolar, Growth Marketer, here is his LinkedIn”). It helps Google display richer results and helps AI assistants describe a person or a company accurately."
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
                <li className="rounded-lg bg-gblue-100 px-3 py-2">H1 · one per page (page subject)</li>
                <li className="rounded-lg bg-gred-100 px-3 py-2 ml-6">H2 · each section (My skills, Portfolio, FAQ…)</li>
                <li className="rounded-lg bg-gyellow-100 px-3 py-2 ml-12">H3 · each card (a skill, a project, a question)</li>
                <li className="rounded-lg bg-ggreen-100 px-3 py-2 ml-18">H4 · details inside a project</li>
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
          plain="robots.txt is the doorman of a website: a small public file telling automated visitors (robots) what they are allowed to read. Many sites block AI robots without knowing it, so ChatGPT or Gemini can never learn about them or quote them. This site names each AI company’s robots and lets them in: the first step to appearing in AI-generated answers, which is what GEO is about."
          eyebrow="04"
          title="robots.txt & AI crawlers"
          intro={
            <>
              Every major AI crawler is named and explicitly allowed, so the site can be used to
              train, index and answer in ChatGPT, Claude, Gemini, Mistral, DeepSeek, Grok and
              Perplexity. Only <code>/api/</code> is excluded. See the live file at{" "}
              <a href="/robots.txt" className="link">
                /robots.txt
              </a>
              .
            </>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiBotGroups.map((g, i) => (
              <li key={g.vendor} className="card overflow-hidden">
                <div className={`px-5 py-3 ${tones[i % tones.length]}`}>
                  <span className="font-medium">{g.vendor}</span>{" "}
                  <span className="text-sm text-ink-700">· {g.product}</span>
                </div>
                <ul className="flex flex-wrap gap-2 p-5">
                  {g.bots.map((b) => (
                    <li key={b} className="chip font-mono">
                      {b}
                    </li>
                  ))}
                </ul>
                {g.note && <p className="px-5 pb-4 -mt-2 text-xs text-ink-500">{g.note}</p>}
              </li>
            ))}
          </ul>
          <pre className="mt-6 overflow-auto rounded-xl border border-stroke bg-surface p-4 text-xs font-mono">
            {`User-Agent: ${aiBots.slice(0, 3).join("\nUser-Agent: ")}
User-Agent: …  (${aiBots.length} AI crawlers in total)
Allow: /
Disallow: /api/

User-Agent: *
Allow: /
Disallow: /api/

Sitemap: /sitemap.xml`}
          </pre>
        </Section>

        {/* 5. FAQ */}
        <Section
          id="faq-structure"
          plain="When someone asks ChatGPT a question, it looks for short, clear, trustworthy answers it can quote. So every answer in this FAQ starts with the direct answer and a figure, then adds context, then names its source: exactly the shape an AI likes to reuse. On screen the answers fold away to keep the page tidy, but they are always present in the page’s code, so robots read all of them."
          eyebrow="05"
          title="A FAQ built for GEO"
          intro="Generative engines quote short, self-contained, sourced answers. Every FAQ entry follows the same anatomy."
        >
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <div className="card p-6">
              <h3 className="text-base mb-4">Anatomy of an answer</h3>
              <ol className="space-y-3">
                <li className="rounded-2xl bg-gblue-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">① Question, phrased naturally</span>
                  <span className="font-medium">{faq[0].question}</span>
                </li>
                <li className="rounded-2xl bg-gred-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">② Direct answer + figure in the first sentence</span>
                  {faq[0].answer.split(". ")[0]}.
                </li>
                <li className="rounded-2xl bg-gyellow-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">③ Context in one or two sentences</span>
                  {faq[0].answer.split(". ").slice(1).join(". ")}
                </li>
                <li className="rounded-2xl bg-ggreen-100 p-4">
                  <span className="block text-xs text-ink-500 mb-1">④ Source at the end</span>
                  {faq[0].sources[0].label}
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
          plain="Google Analytics counts what happens: how many visitors, what they click, how many get in touch. Microsoft Clarity shows how it happens: heatmaps of where people click and anonymous replays of visits, to spot what confuses them. Google Tag Manager is the control panel that switches these tools on without touching the site’s code. A “conversion” is an action that matters for the business, here contacting me. And the cookie banner asks visitors for permission first, as European law requires."
          eyebrow="06"
          title="Analytics & tracking"
          intro="Google Tag Manager loads on every page and drives Google Analytics 4; Microsoft Clarity loads once the visitor accepts cookies. GA4 measures what happens, Clarity shows how (heatmaps, recordings, rage clicks). Consent is handled by a banner and Google Consent Mode v2 (live)."
        >
          <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <FlowNode title="Browser + consent banner" detail="Consent Mode v2: denied by default" tone="bg-gblue-100" />
            <Arrow />
            <FlowNode title="Google Tag Manager" detail={`Web container ${GTM_ID}`} tone="bg-gred-100" />
            <Arrow />
            <li className="grid gap-3">
              <span className="rounded-2xl px-4 py-3 bg-gyellow-100">
                <span className="block font-medium">Google Analytics 4</span>
                <span className="block text-xs text-ink-700 mt-0.5">Events &amp; key events</span>
              </span>
              <span className="rounded-2xl px-4 py-3 bg-ggreen-100">
                <span className="block font-medium">Microsoft Clarity</span>
                <span className="block text-xs text-ink-700 mt-0.5">Project {CLARITY_ID} · after consent</span>
              </span>
            </li>
          </ol>

          <h3 className="text-lg mt-10 mb-4">Tracking plan</h3>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-ink-500">
                <tr>
                  <th className="p-3 font-medium">Event</th>
                  <th className="p-3 font-medium">Trigger</th>
                  <th className="p-3 font-medium">Parameters</th>
                  <th className="p-3 font-medium">Key event</th>
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
                      {e.keyEvent ? <span className="chip bg-gred-100! border-transparent!">★ Conversion</span> : "—"}
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
          plain="Today, measurement tools run inside the visitor’s browser, where ad blockers and privacy settings often switch them off: part of the visits simply goes uncounted, like a shop door counter that misses some customers. Server-side tracking moves this work to my own server: the browser sends one message to my own address, and my server passes it on to Google and the other tools. Measurement becomes more complete and more reliable, and the page gets lighter. It does not override anyone’s choice: if a visitor refuses cookies, only anonymous statistics are kept."
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
            <FlowNode title="Browser" detail="One lightweight request" tone="bg-gblue-100" />
            <Arrow />
            <FlowNode title="sgtm.mydomain.com" detail="First-party subdomain" tone="bg-gred-100" />
            <Arrow />
            <FlowNode title="Server GTM on Stape" detail="Cleans, enriches, filters" tone="bg-gyellow-100" />
            <Arrow />
            <FlowNode title="GA4 · Google Ads · Meta CAPI" detail="Server-to-server" tone="bg-ggreen-100" />
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

          <div className="card p-6 mt-4 bg-gyellow-100! border-transparent!">
            <h3 className="text-base mb-2">What about visitors who refuse cookies?</h3>
            <p className="text-sm text-ink-700 leading-relaxed">
              Server-side tracking does not override a refusal. This site already runs a consent
              banner with Google Consent Mode v2 in advanced mode: when consent is denied, tags only
              send anonymous cookieless pings (no identifiers, no cookies), and GA4 and Google Ads
              use them to model the missing conversions. Microsoft Clarity only loads after the
              visitor accepts. The data recovered this way stays aggregated and GDPR-compliant.
            </p>
          </div>
        </Section>

        {/* 8. Dashboards */}
        <Section
          id="dashboards"
          plain="These are the actual reporting screens of the tools described above. They prove the setup works end to end: data comes in, and it turns into charts and insights a team can act on."
          eyebrow="08"
          title="Dashboards, heatmaps & reports"
          intro="Screenshots from the tools above, updated as the site collects data."
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {screenshots.map((s, i) => (
              <li key={s.id} className="card overflow-hidden">
                {s.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.image} alt={`${s.title}: ${s.description}`} className="w-full border-b border-stroke" />
                ) : (
                  <div
                    className={`grid place-items-center aspect-video border-b border-dashed border-ink-300 ${tones[i % tones.length]}`}
                  >
                    <span className="text-sm text-ink-500">Screenshot coming soon</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-base">{s.title}</h3>
                  <p className="text-sm text-ink-700">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* 9. Live demo */}
        <Section
          id="live-demo"
          plain="Click the button: your click is sent to this site’s own server, which replies instantly with the message shown below. It is a miniature version of how a server-side tracking system receives an event."
          eyebrow="09"
          title="Live demo: server-side event"
          intro="This button sends an event to the site's own server endpoint (/api/track), the future entry point of the server-side pipeline. The response is shown below."
        >
          <div className="card p-6">
            <TrackTester />
          </div>
        </Section>
      </div>
    </main>
  );
}
