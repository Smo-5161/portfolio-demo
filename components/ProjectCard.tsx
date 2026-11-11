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

        {p.design && (
          <section aria-labelledby={`${p.id}-da`}>
            <h3 id={`${p.id}-da`} className="text-xl mb-3">
              Direction artistique
            </h3>
            <p className="text-night-700 leading-relaxed mb-6 max-w-3xl">{p.design.summary}</p>

            <h4 className="eyebrow mb-3">Palette de couleurs</h4>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {p.design.palette.map((c) => (
                <li key={c.hex} className="card overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="block h-16 border-b border-stroke"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="block p-3 text-sm">
                    <span className="flex items-center justify-between gap-2 mb-1">
                      <strong>{c.name}</strong>
                      <code className="text-xs text-night-500">{c.hex}</code>
                    </span>
                    <span className="text-night-500">{c.role}</span>
                  </span>
                </li>
              ))}
            </ul>

            <h4 className="eyebrow mb-3">Typographie : {p.design.fontFamily}</h4>
            <div className="card overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead className="bg-surface text-left text-night-500">
                  <tr>
                    <th className="p-3 font-semibold">Usage</th>
                    <th className="p-3 font-semibold">Taille</th>
                    <th className="p-3 font-semibold">Graisse</th>
                    <th className="p-3 font-semibold">Détail</th>
                  </tr>
                </thead>
                <tbody>
                  {p.design.typeScale.map((t) => (
                    <tr key={t.role} className="border-t border-stroke">
                      <td className="p-3 font-semibold">{t.role}</td>
                      <td className="p-3">{t.size}</td>
                      <td className="p-3">{t.weight}</td>
                      <td className="p-3 text-night-500">{t.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="eyebrow mb-3">Principes visuels</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.design.principles.map((pr) => (
                <li key={pr} className="flex gap-3 text-night-700">
                  <span
                    aria-hidden="true"
                    className="mt-2 block w-1.5 h-1.5 shrink-0 rounded-full bg-magenta-600"
                  />
                  {pr}
                </li>
              ))}
            </ul>
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
      </div>
    </article>
  );
}
