"use client";

import { useEffect, useRef, useState } from "react";

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

const IDLE_MS = 10000;

export default function SideProgress() {
  const [active, setActive] = useState(0);
  const asideRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    activeRef.current = active;
    elapsed.current = 0;
  }, [active]);

  useEffect(() => {
    const reset = () => { elapsed.current = 0; };
    const events = ["mousemove", "mousedown", "wheel", "keydown", "touchstart", "touchmove"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - prev, 100);
      prev = now;
      const i = activeRef.current;
      elapsed.current += dt;
      if (elapsed.current >= IDLE_MS) {
        elapsed.current = 0;
        const target = sections[(i + 1) % sections.length].id;
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
      asideRef.current?.style.setProperty("--p", `${Math.min(elapsed.current / IDLE_MS, 1) * 100}%`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

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

  const next = sections[(active + 1) % sections.length];

  return (
    <aside ref={asideRef} className="side-progress" aria-label="Avanzamento pagina">
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
      <a className="sp-next" href={`#${next.id}`} aria-label={`Vai a ${next.label}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l5 5 5-5" /></svg>
      </a>
    </aside>
  );
}
