"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "top", label: "Intro" },
  { id: "voli", label: "I miei voli" },
  { id: "ultime", label: "Ultime pubblicazioni" },
  { id: "pilotlog", label: "Pilot Log" },
  { id: "podcast", label: "Podcast" },
  { id: "campo", label: "Campo volo" },
  { id: "progetti", label: "Progetti" },
  { id: "contatti", label: "Contatti" },
];

export default function SideProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(atBottom ? sections.length - 1 : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const last = active === sections.length - 1;
  const next = sections[Math.min(active + 1, sections.length - 1)];

  return (
    <aside className="side-progress" aria-label="Avanzamento pagina">
      <ol>
        {sections.map((s, i) => (
          <li key={s.id} className={i === active ? "on" : i < active ? "past" : ""}>
            <a href={`#${s.id}`} aria-label={s.label} aria-current={i === active ? "true" : undefined}>
              <span className="sp-label">{s.label}</span>
              <span className="sp-dot" />
            </a>
          </li>
        ))}
      </ol>
      <a className={`sp-next${last ? " hide" : ""}`} href={`#${next.id}`} aria-label={`Vai a ${next.label}`}>
        <span>Scorri</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l5 5 5-5" /></svg>
      </a>
    </aside>
  );
}
