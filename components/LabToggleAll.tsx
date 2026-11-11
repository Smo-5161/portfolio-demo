"use client";

import { useState } from "react";
import { LAB_TOGGLE_ALL } from "./LabSection";

export default function LabToggleAll() {
  const [allOpen, setAllOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        const next = !allOpen;
        setAllOpen(next);
        window.dispatchEvent(new CustomEvent(LAB_TOGGLE_ALL, { detail: next }));
      }}
      className="btn btn-secondary"
    >
      {allOpen ? "Collapse all sections" : "Expand all sections"}
    </button>
  );
}
