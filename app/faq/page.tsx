import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FAQ_UPDATED, faq, faqJsonLd } from "@/lib/faq";
import { formatDate } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata("/faq");

const tones = ["bg-brand-100", "bg-accent-100", "bg-accent-50", "bg-brand-50"];

/**
 * Dedicated FAQ page. It lives outside the home page because, on a portfolio, it exists to
 * demonstrate SEO/GEO structuring rather than to answer visitors. It stays fully visible:
 * hiding it from users while showing it to crawlers would breach Google's spam policies.
 */
export default function FaqPage() {
  return (
    <main>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd("/faq", "FAQ")} />

      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-4">
            <Link href="/" className="link">
              Home
            </Link>{" "}
            <span aria-hidden="true">›</span> FAQ
          </nav>
          <h1 className="text-4xl mb-4">Frequently asked questions</h1>
          <p className="text-ink-700 max-w-2xl">
            Who I am and what I build, then short answers on SEO, GEO, conversion, UX and internal
            tools, each with a sourced figure in the first sentence.{" "}
            <Link href="/architecture-lab#faq-structure" className="link">
              Why this page exists and how it is built
            </Link>
            .
          </p>
          <p className="text-sm text-ink-500 mt-3">
            Last updated <time dateTime={FAQ_UPDATED}>{formatDate(FAQ_UPDATED)}</time>. Observed data only, no
            forecasts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {faq.map((item, i) => (
          <article key={item.question} className="card overflow-hidden">
            <h2 className={`px-6 py-4 text-lg ${tones[i % tones.length]}`}>{item.question}</h2>
            <div className="px-6 py-5">
              <p className="text-ink-700 leading-relaxed mb-3">{item.answer}</p>
              <p className="text-xs text-ink-500">
                Source{item.sources.length > 1 ? "s" : ""}:{" "}
                {item.sources.map((s, j) => (
                  <span key={s.url}>
                    {j > 0 && " · "}
                    <a href={s.url} className="link" target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
