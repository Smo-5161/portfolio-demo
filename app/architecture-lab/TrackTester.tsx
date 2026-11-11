"use client";

import { useState } from "react";

export default function TrackTester() {
  const [output, setOutput] = useState<string>("// En attente d'un événement…");
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "test_click", timestamp: Date.now() }),
      });
      const json: unknown = await res.json();
      setOutput(JSON.stringify(json, null, 2));
    } catch (err) {
      setOutput(`Erreur : ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        id="test-conversion"
        onClick={handleClick}
        disabled={loading}
        className="btn btn-primary disabled:opacity-50"
      >
        {loading ? "Envoi…" : "Déclencher un événement de test"}
      </button>
      <pre className="mt-4 rounded bg-night-900 text-violet-200 p-4 text-xs font-mono overflow-auto">
        {output}
      </pre>
    </div>
  );
}
