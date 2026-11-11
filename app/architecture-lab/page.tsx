import TrackTester from "./TrackTester";

export default function ArchitectureLabPage() {
  return (
    <main>
      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <p className="eyebrow mb-2">Proof of work</p>
          <h1 className="text-4xl">Architecture &amp; SEO/GEO/CRO Lab</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-6 lg:grid-cols-2">
        <section className="card p-6 lg:col-span-2">
          <h2 className="text-xl mb-4">Data Pipeline &amp; Server-Side Tracking</h2>
          <TrackTester />
        </section>

        <section className="card p-6">
          <h2 className="text-xl mb-2">GEO / Crawlability Inspector</h2>
          <p className="text-sm text-ink-500 mb-3">JSON-LD currently injected:</p>
          <pre className="rounded-2xl border border-stroke bg-gyellow-100 text-ink-900 p-4 text-xs font-mono overflow-auto">
            {"// No JSON-LD injected"}
          </pre>
        </section>

        <section className="card p-6">
          <h2 className="text-xl mb-4">Performance &amp; Metrics Logs</h2>
          <div className="rounded-xl border border-stroke overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-ink-500">
                <tr>
                  <th className="p-3 font-semibold">Metric</th>
                  <th className="p-3 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-stroke">
                  <td className="p-3">—</td>
                  <td className="p-3">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
