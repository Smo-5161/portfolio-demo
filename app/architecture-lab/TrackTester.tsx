"use client";

import { useState } from "react";

export default function TrackTester() {
  const [output, setOutput] = useState<string>("// Waiting for an event…");
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
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
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
        {loading ? "Sending…" : "Trigger a test event"}
      </button>
      <pre className="mt-4 rounded-2xl bg-ink-900 text-gblue-200 p-4 text-xs font-mono overflow-auto">
        {output}
      </pre>
    </div>
  );
}
