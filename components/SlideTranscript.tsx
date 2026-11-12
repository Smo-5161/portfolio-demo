import type { SlideText } from "@/lib/types";

/**
 * Text version of a deck, rendered on the server: every slide is an <li> with an <h4>,
 * paragraphs or a list, and real <table> markup. It sits in a native <details> element,
 * so the text is in the HTML for crawlers and LLMs, and readers can open it in one click.
 */
export default function SlideTranscript({ id, slides }: { id: string; slides: SlideText[] }) {
  return (
    <details className="group mt-6 rounded-2xl border border-stroke bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
        <span>Read the slides as text ({slides.length} slides)</span>
        <span aria-hidden="true" className="transition-transform group-open:rotate-45 text-xl leading-none">
          +
        </span>
      </summary>
      <ol className="space-y-6 border-t border-stroke p-4 sm:p-6">
        {slides.map((s, i) => (
          <li key={i} id={`${id}-slide-${i + 1}`} className="scroll-mt-24">
            <h4 className="text-base mb-2">
              <span className="text-ink-500 font-normal">Slide {i + 1} — </span>
              {s.title}
            </h4>
            {s.list === "ol" ? (
              <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-700">
                {s.text.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            ) : (
              <div className="space-y-2 text-sm text-ink-700 leading-relaxed">
                {s.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            )}
            {s.table && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-xl border-collapse text-left text-sm">
                  <caption className="sr-only">{s.title}</caption>
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} scope="col" className="border-b border-stroke bg-brand-50 p-2 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]} className="align-top">
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="border-b border-stroke p-2 font-semibold">
                              {c}
                            </th>
                          ) : (
                            <td key={j} className="border-b border-stroke p-2 text-ink-700">
                              {c}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}
