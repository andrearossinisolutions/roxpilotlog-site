"use client";

import { useEffect, useState } from "react";

const SHEETS = {
  scheda: { src: "/dovera-avioportolano.webp", label: "Scheda AvioPortolano", alt: "Scheda ufficiale AvioPortolano del campo volo JFK Dovera Airfield" },
  chart: { src: "/dovera-approach-chart.webp", label: "Approach Chart AvioPortolano", alt: "Approach chart visuale AvioPortolano del campo volo JFK Dovera Airfield" },
} as const;

type SheetKey = keyof typeof SHEETS;
const EVENT = "open-sheet";

export function SheetLink({ sheet, children }: { sheet: SheetKey; children: React.ReactNode }) {
  return (
    <button type="button" className="inline-link" onClick={() => window.dispatchEvent(new CustomEvent(EVENT, { detail: sheet }))}>
      {children}
    </button>
  );
}

export default function OfficialSheet() {
  const [open, setOpen] = useState<SheetKey | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setOpen((e as CustomEvent<SheetKey>).detail);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = open ? SHEETS[open] : null;

  return (
    <>
      <div className="actions">
        <button type="button" className="btn primary" onClick={() => setOpen("scheda")}>📄 {SHEETS.scheda.label}</button>
        <button type="button" className="btn primary" onClick={() => setOpen("chart")}>🗺️ {SHEETS.chart.label}</button>
        <a className="btn" href="tel:+393881059159">📞 388 1059159</a>
        <a className="btn" href="tel:+390282860021">📞 02 82860021</a>
        <a className="btn" href="mailto:info@scuolavolo.org">✉️ info@scuolavolo.org</a>
      </div>
      {current && (
        <div className="sheet-overlay" role="dialog" aria-modal="true" aria-label={current.label} onClick={() => setOpen(null)}>
          <button type="button" className="sheet-close" onClick={() => setOpen(null)} aria-label="Chiudi">✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.src} alt={current.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
