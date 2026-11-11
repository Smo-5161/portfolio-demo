import TrackTester from "./TrackTester";

export default function ArchitectureLabPage() {
  return (
    <main className="space-y-8">
      <h1 className="text-2xl font-bold">Architecture &amp; SEO/GEO/CRO Lab</h1>

      <section className="border border-gray-300 p-4">
        <h2 className="font-bold mb-2">Data Pipeline &amp; Server-Side Tracking</h2>
        <TrackTester />
      </section>

      <section className="border border-gray-300 p-4">
        <h2 className="font-bold mb-2">GEO / Crawlability Inspector</h2>
        <p className="text-sm mb-2">JSON-LD actuellement injecté :</p>
        <pre className="border border-gray-300 bg-gray-50 p-2 text-xs overflow-auto">
          {"// Aucun JSON-LD injecté"}
        </pre>
      </section>

      <section className="border border-gray-300 p-4">
        <h2 className="font-bold mb-2">Performance &amp; Metrics Logs</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Métrique</th>
              <th className="border border-gray-300 p-2 text-left">Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">—</td>
              <td className="border border-gray-300 p-2">—</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
