"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const items = [
  { href: "#voli", label: "I Miei Voli" },
  { href: "#ultime", label: "Ultime Pubblicazioni" },
  { href: "#pilotlog", label: "Il Pilot Log" },
  { href: "#podcast", label: "Il Mio Podcast", sub: [{ href: "/podcast/ep-1", label: "Ep. 1 – Miami" }] },
  { href: "#campo", label: "Il Campo Volo" },
  { href: "#progetti", label: "I Miei Progetti" },
  { href: "#contatti", label: "Contatti e Social" },
];

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button className="burger" aria-label="Apri il menu" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <div className={`scrim${open ? " open" : ""}`} onClick={close} />
      <nav id="main-nav" className={open ? "open" : ""}>
        <button className="drawer-close" aria-label="Chiudi il menu" onClick={close}>×</button>
        {items.map((it) =>
          it.sub ? (
            <div className="dd" key={it.href}>
              <a href={it.href} aria-haspopup="true" onClick={close}>{it.label}</a>
              <div className="dd-menu">
                {it.sub.map((s) => (
                  <Link key={s.href} href={s.href} onClick={close}>{s.label}</Link>
                ))}
              </div>
            </div>
          ) : (
            <a key={it.href} href={it.href} onClick={close}>{it.label}</a>
          )
        )}
      </nav>
    </>
  );
}
