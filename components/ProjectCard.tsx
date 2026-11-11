import type { Project } from "@/lib/types";

export default function ProjectCard({ project: p }: { project: Project }) {
  const host = p.url ? new URL(p.url).host.replace(/^www\./, "") : null;

  return (
    <article id={p.id} className="card overflow-hidden scroll-mt-20">
      <header className="p-6 sm:p-8 border-b border-stroke bg-linear-to-r from-violet-100 to-magenta-100">
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
                {p.duration && <li className="chip chip-magenta">Durée : {p.duration}</li>}
              </ul>
            )}
            {p.stack && (
              <p className="mt-3 text-sm text-night-700">
                <span className="font-semibold">Stack :</span> {p.stack.join(" · ")}
              </p>
            )}
          </div>
          {p.url && (
            <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener">
              Voir {host} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>

      <div className="p-6 sm:p-8 space-y-10">
        {p.context && (
          <section aria-labelledby={`${p.id}-contexte`}>
            <h3 id={`${p.id}-contexte`} className="text-xl mb-3">
              Contexte du projet
            </h3>
            <div className="space-y-3 text-night-700 leading-relaxed max-w-3xl">
              {p.context.map((c, i) => (
                <p key={i}>{c}</p>
              ))}
            </div>
          </section>
        )}

        {p.work && (
          <section aria-labelledby={`${p.id}-travaux`}>
            <h3 id={`${p.id}-travaux`} className="text-xl mb-4">
              Ce que j&apos;ai fait
            </h3>
            <ol className="grid gap-4 md:grid-cols-2">
              {p.work.map((w, i) => (
                <li key={w.title} className="card p-5">
                  <h4 className="text-base mb-2 flex items-baseline gap-2">
                    <span className="chip shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    {w.title}
                  </h4>
                  <p className="text-sm text-night-700 leading-relaxed">{w.text}</p>
                  {w.points && (
                    <ul className="mt-3 space-y-1.5">
                      {w.points.map((pt) => (
                        <li key={pt} className="flex gap-2 text-sm text-night-700">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 block w-1.5 h-1.5 shrink-0 rounded-full bg-magenta-600"
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
              Scores SEO
            </h3>
            {p.seoScores.length === 0 ? (
              <p className="rounded-lg border border-dashed border-violet-300 bg-violet-100 p-6 text-center text-night-500">
                Captures des scores SEO à venir.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {p.seoScores.map((s) => (
                  <li key={s.label} className="card p-4">
                    <p className="font-semibold">{s.label}</p>
                    {(s.before || s.after) && (
                      <p className="text-sm text-night-700">
                        {s.before && <>Avant : {s.before} </>}
                        {s.after && <>→ Après : {s.after}</>}
                      </p>
                    )}
                    {s.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={s.image}
                        alt={`Capture : ${s.label}`}
                        className="mt-3 rounded border border-stroke"
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {p.design && (
          <section aria-labelledby={`${p.id}-da`}>
            <h3 id={`${p.id}-da`} className="text-xl mb-2">
              Direction artistique
            </h3>
            <p className="text-sm text-night-700 leading-relaxed mb-4 max-w-3xl">
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
                    <strong>{c.name}</strong> <code className="text-night-500">{c.hex}</code>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
