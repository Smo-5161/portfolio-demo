"use client";

import { useCallback, useEffect, useId, useState } from "react";

export const LAB_TOGGLE_ALL = "lab-toggle-all";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  /** Plain-language explanation, always visible. */
  plain?: string;
  /** Technical details: server-rendered, collapsed on screen but always in the HTML. */
  children: React.ReactNode;
};

/**
 * Collapsible report section. The details are rendered on the server and stay in the HTML
 * at all times (never display:none, never removed): crawlers and LLMs read everything.
 * Only the on-screen height animates between 0 and auto.
 */
export default function LabSection({ id, eyebrow, title, plain, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Open the section when it is targeted by a link (#robots…) or by "Expand all".
  const syncWithHash = useCallback(() => {
    if (window.location.hash === `#${id}`) setOpen(true);
  }, [id]);

  useEffect(() => {
    syncWithHash();
    const onAll = (e: Event) => setOpen((e as CustomEvent<boolean>).detail);
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener(LAB_TOGGLE_ALL, onAll);
    return () => {
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener(LAB_TOGGLE_ALL, onAll);
    };
  }, [syncWithHash]);

  const toggle = () => setOpen((o) => !o);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="card scroll-mt-28 overflow-hidden">
      <div onClick={toggle} className="cursor-pointer p-6 sm:p-8 transition-colors hover:bg-surface">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">{eyebrow}</p>
            <h2 id={`${id}-title`} className="text-2xl sm:text-3xl">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                className="text-left"
              >
                {title}
              </button>
            </h2>
          </div>
          <span
            aria-hidden="true"
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gblue-100 text-lg transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </div>

        {plain && (
          <div className="mt-5 max-w-3xl rounded-2xl bg-ggreen-100 p-5">
            <p className="mb-1 flex items-center gap-2 text-sm font-medium">
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs">
                i
              </span>
              In plain words
            </p>
            <p className="text-sm leading-relaxed text-ink-700">{plain}</p>
          </div>
        )}

        <p className="mt-4 text-sm font-medium text-ink-700">
          {open ? "Hide the technical details ↑" : "Show the technical details ↓"}
        </p>
      </div>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        {/* "inert" only stops keyboard focus on hidden links; the text stays in the HTML. */}
        <div className="overflow-hidden" inert={!open}>
          <div className="border-t border-stroke p-6 sm:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
