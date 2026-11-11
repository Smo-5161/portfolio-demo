import type { Project } from "@/lib/types";

export default function ProjectCard({ project: p }: { project: Project }) {
  const host = p.url ? new URL(p.url).host.replace(/^www\./, "") : null;

  return (
    <article id={p.id} className="border border-gray-300 rounded p-6 space-y-8 scroll-mt-20">
      <header>
        <h2 className="text-2xl font-bold mb-1">{p.name}</h2>
        {p.url && (
          <p className="mb-2">
            <a href={p.url} className="underline" target="_blank" rel="noopener">
              {host} ↗
            </a>
          </p>
        )}
        {(p.scope || p.duration) && (
          <ul className="flex flex-wrap gap-2 text-xs">
            {p.scope?.map((s) => (
              <li key={s} className="border border-gray-300 rounded px-2 py-0.5">
                {s}
              </li>
            ))}
            {p.duration && (
              <li className="border border-gray-300 rounded px-2 py-0.5">Durée : {p.duration}</li>
            )}
          </ul>
        )}
      </header>

      {p.context && (
        <section aria-labelledby={`${p.id}-contexte`}>
          <h3 id={`${p.id}-contexte`} className="text-lg font-bold mb-2">
            Contexte du projet
          </h3>
          <div className="space-y-2">
            {p.context.map((c, i) => (
              <p key={i}>{c}</p>
            ))}
          </div>
        </section>
      )}

      {p.design && (
        <section aria-labelledby={`${p.id}-da`}>
          <h3 id={`${p.id}-da`} className="text-lg font-bold mb-2">
            Direction artistique
          </h3>
          <p className="mb-4">{p.design.summary}</p>

          <h4 className="font-bold mb-2">Palette de couleurs</h4>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {p.design.palette.map((c) => (
              <li key={c.hex} className="flex gap-3 items-start">
                <span
                  aria-hidden="true"
                  className="block w-12 h-12 shrink-0 rounded border border-gray-300"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-sm">
                  <strong>{c.name}</strong> <code>{c.hex}</code>
                  <br />
                  {c.role}
                </span>
              </li>
            ))}
          </ul>

          <h4 className="font-bold mb-2">Typographie : {p.design.fontFamily}</h4>
          <table className="w-full border-collapse text-sm mb-6">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">Usage</th>
                <th className="border border-gray-300 p-2 text-left">Taille</th>
                <th className="border border-gray-300 p-2 text-left">Graisse</th>
                <th className="border border-gray-300 p-2 text-left">Détail</th>
              </tr>
            </thead>
            <tbody>
              {p.design.typeScale.map((t) => (
                <tr key={t.role}>
                  <td className="border border-gray-300 p-2">{t.role}</td>
                  <td className="border border-gray-300 p-2">{t.size}</td>
                  <td className="border border-gray-300 p-2">{t.weight}</td>
                  <td className="border border-gray-300 p-2">{t.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="font-bold mb-2">Principes visuels</h4>
          <ul className="list-disc pl-5 space-y-1">
            {p.design.principles.map((pr) => (
              <li key={pr}>{pr}</li>
            ))}
          </ul>
        </section>
      )}

      {p.seoScores && (
        <section aria-labelledby={`${p.id}-seo`}>
          <h3 id={`${p.id}-seo`} className="text-lg font-bold mb-2">
            Scores SEO
          </h3>
          {p.seoScores.length === 0 ? (
            <p className="text-gray-600 border border-dashed border-gray-300 p-4">
              Captures des scores SEO à venir.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {p.seoScores.map((s) => (
                <li key={s.label} className="border border-gray-300 rounded p-3">
                  <p className="font-bold">{s.label}</p>
                  {(s.before || s.after) && (
                    <p className="text-sm">
                      {s.before && <>Avant : {s.before} </>}
                      {s.after && <>→ Après : {s.after}</>}
                    </p>
                  )}
                  {s.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={`Capture : ${s.label}`} className="mt-2 border" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </article>
  );
}
