import type { Project } from "@/lib/types";
import SlideTranscript from "./SlideTranscript";
import SlideViewer from "./SlideViewer";

export default function ProjectCard({ project: p }: { project: Project }) {
  const host = p.url ? new URL(p.url).host.replace(/^www\./, "") : null;

  return (
    <article id={p.id} className="card overflow-hidden scroll-mt-20">
      <header className="p-6 sm:p-8 border-b border-stroke bg-linear-to-r from-brand-100 via-white to-brand-50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl mb-3">{p.name}</h2>
            {(p.scope || p.duration) && (
              <ul className="flex flex-wrap gap-2">
                {p.scope?.map((s) => (
                  <li key={s} className="chip bg-white!">
                    {s}
                  </li>
                ))}
                {p.duration && <li className="chip chip-tonal">Duration: {p.duration}</li>}
              </ul>
            )}
            {p.description && <p className="mt-3 max-w-3xl text-ink-700 leading-relaxed">{p.description}</p>}
            {p.stack && (
              <p className="mt-3 text-sm text-ink-700">
                <span className="font-semibold">Stack:</span> {p.stack.join(" · ")}
              </p>
            )}
          </div>
          {(p.url || p.links) && (
            <div className="flex flex-wrap gap-2">
              {p.url && (
                <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener">
                  {p.urlLabel ?? `Visit ${host}`} <span aria-hidden="true">↗</span>
                </a>
              )}
              {p.links?.map((l) => (
                <a key={l.url} href={l.url} className="btn btn-secondary" target="_blank" rel="noopener">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/*
        Details are folded in a native <details>: the full text stays in the server HTML
        (read by Google and LLMs, found by Ctrl+F) and one click opens it. No CSS hiding, no cloaking.
      */}
      <details className="group/details">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 sm:px-8 font-semibold text-brand-700 hover:bg-brand-50 [&::-webkit-details-marker]:hidden">
          <span>
            <span className="group-open/details:hidden">Show project details</span>
            <span className="hidden group-open/details:inline">Hide project details</span>
            <span className="sr-only"> — {p.name}</span>
          </span>
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full border border-stroke bg-white transition-transform group-open/details:rotate-180"
          >
            ↓
          </span>
        </summary>
      <div className="p-6 sm:p-8 space-y-10 border-t border-stroke">
        {p.context && (
          <section aria-labelledby={`${p.id}-context`}>
            <h3 id={`${p.id}-context`} className="text-xl mb-3">
              Project context
            </h3>
            <div className="space-y-3 text-ink-700 leading-relaxed max-w-3xl">
              {p.context.map((c, i) => (
                <p key={i}>{c}</p>
              ))}
            </div>
          </section>
        )}

        {p.slides && (
          <section aria-labelledby={`${p.id}-slides`}>
            <h3 id={`${p.id}-slides`} className="text-xl mb-3">
              {p.slides.title}
            </h3>
            <SlideViewer
              title={`${p.name} — ${p.slides.title}`}
              slides={p.slides.images}
              labels={p.slides.transcript?.map((t) => t.title)}
              pdf={p.slides.pdf}
            />
            {p.slides.transcript && <SlideTranscript id={p.id} slides={p.slides.transcript} />}
          </section>
        )}

        {p.work && (
          <section aria-labelledby={`${p.id}-work`}>
            <h3 id={`${p.id}-work`} className="text-xl mb-4">
              What I did
            </h3>
            <ol className="grid gap-4 md:grid-cols-2">
              {p.work.map((w, i) => (
                <li key={w.title} className="card p-5">
                  <h4 className="text-base mb-2 flex items-baseline gap-2">
                    <span aria-hidden="true" className="chip chip-tonal shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {w.title}
                  </h4>
                  <p className="text-sm text-ink-700 leading-relaxed">{w.text}</p>
                  {w.points && (
                    <ul className="mt-3 space-y-1.5">
                      {w.points.map((pt) => (
                        <li key={pt} className="flex gap-2 text-sm text-ink-700">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 block w-1.5 h-1.5 shrink-0 rounded-full bg-ink-300"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {p.seoScores && (
          <section aria-labelledby={`${p.id}-seo`}>
            <h3 id={`${p.id}-seo`} className="text-xl mb-3">
              SEO scores
            </h3>
            {p.seoScores.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ink-300 bg-brand-100 p-6 text-center text-ink-500">
                SEO score screenshots coming soon.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {p.seoScores.map((s) => (
                  <li key={s.label} className="card p-4">
                    <p className="font-semibold">{s.label}</p>
                    {(s.before || s.after) && (
                      <p className="text-sm text-ink-700">
                        {s.before && <>Before: {s.before} </>}
                        {s.after && <>→ After: {s.after}</>}
                      </p>
                    )}
                    {s.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.image}
                        alt={`Screenshot: ${s.label}`}
                        className="mt-3 rounded-xl border border-stroke"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {p.design && (
          <section aria-labelledby={`${p.id}-design`}>
            <h3 id={`${p.id}-design`} className="text-xl mb-2">
              Visual identity
            </h3>
            <p className="text-sm text-ink-700 leading-relaxed mb-4 max-w-3xl">
              {p.design.summary}
            </p>
            <ul className="flex flex-wrap gap-3">
              {p.design.palette.map((c) => (
                <li key={c.hex} className="flex items-center gap-2 text-xs">
                  <span
                    aria-hidden="true"
                    className="block w-6 h-6 rounded border border-stroke"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>
                    <strong>{c.name}</strong> <code className="text-ink-500">{c.hex}</code>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {p.note && <p className="text-xs text-ink-500 italic">{p.note}</p>}
      </div>
      </details>
    </article>
  );
}
