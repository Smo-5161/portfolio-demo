"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Skill = {
  title: string;
  text: string;
  tone: "blue" | "red" | "yellow" | "green";
};

const tones = {
  blue: { bar: "bg-gblue-500", soft: "bg-gblue-100", label: "text-gblue-600", dot: "bg-gblue-500" },
  red: { bar: "bg-gred-500", soft: "bg-gred-100", label: "text-gred-600", dot: "bg-gred-500" },
  yellow: { bar: "bg-gyellow-500", soft: "bg-gyellow-100", label: "text-ink-900", dot: "bg-gyellow-500" },
  green: { bar: "bg-ggreen-500", soft: "bg-ggreen-100", label: "text-ggreen-600", dot: "bg-ggreen-500" },
};

/**
 * One skill at a time, scrollable (swipe, trackpad, arrows, dots, keyboard).
 * Every slide is rendered in the server HTML and never hidden with display:none:
 * off-screen slides sit in a horizontal scroll track, so crawlers and LLMs read all of them.
 */
export default function SkillsCarousel({ skills }: { skills: readonly Skill[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.max(0, Math.min(index, track.children.length - 1));
    const slide = track.children[i] as HTMLElement;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  // Keep the active index in sync with native scrolling (swipe, trackpad).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="My skills">
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {skills.map((s, i) => {
          const t = tones[s.tone];
          return (
            <article
              key={s.title}
              data-index={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${skills.length}`}
              className="w-full shrink-0 snap-center"
            >
              <div className="card overflow-hidden h-full">
                <div aria-hidden="true" className={`h-1.5 ${t.bar}`} />
                <div className="grid gap-8 p-8 sm:p-12 md:grid-cols-[auto_1fr] md:items-center">
                  <span
                    aria-hidden="true"
                    className={`grid place-items-center w-20 h-20 rounded-full text-3xl font-medium ${t.soft} ${t.label}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl mb-4">{s.title}</h3>
                    <p className="text-lg text-ink-700 leading-relaxed max-w-2xl">{s.text}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {skills.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show skill ${i + 1}: ${s.title}`}
              aria-current={active === i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === i ? `w-8 ${tones[s.tone].dot}` : "w-2.5 bg-ink-100 hover:bg-ink-500"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous skill"
            className="grid place-items-center w-11 h-11 rounded-full border border-stroke bg-white text-ink-700 hover:bg-gblue-100 disabled:opacity-40 disabled:hover:bg-white transition-colors"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === skills.length - 1}
            aria-label="Next skill"
            className="grid place-items-center w-11 h-11 rounded-full bg-gblue-600 text-white hover:bg-gblue-800 disabled:opacity-40 disabled:hover:bg-gblue-600 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
