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
        className="border border-gray-400 px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
      >
        Déclencher un événement de test
      </button>
      <pre className="mt-3 border border-gray-300 bg-gray-50 p-2 text-xs overflow-auto">
        {output}
      </pre>
    </div>
  );
}
