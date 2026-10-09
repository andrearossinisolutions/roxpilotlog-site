import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/config";
import SiteBrand from "@/components/SiteBrand";
import SideProgress, { type ProgressSection } from "@/components/SideProgress";

export const metadata: Metadata = {
  title: "Il mio campo volo – Dovera | RoxPilotLog",
  alternates: { canonical: "/campo-volo" },
  description: "Radar del traffico in tempo reale, meteo del weekend e informazioni sulla pista di Dovera per venirmi a trovare.",
};

const sections: ProgressSection[] = [
  { id: "top", label: "Il campo volo" },
  { id: "pista", label: "Info pista" },
  { id: "webcam", label: "Webcam" },
  { id: "meteo", label: "Meteo weekend" },
  { id: "radar", label: "Radar" },
];

export default function CampoVolo() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <SiteBrand />
          <nav>
            <Link href="/">← Torna al sito</Link>
          </nav>
        </div>
      </header>

      <SideProgress sections={sections} autoAdvance={false} />

      <main id="top" className="article wide">
        <section className="ep-hero">
          <p className="eyebrow">Il mio campo volo</p>
          <h1>Vieni a trovarmi a Dovera</h1>
          <p className="lead">Tutto quello che ti serve per organizzare una visita: informazioni sulla pista, meteo del weekend e traffico aereo in tempo reale.</p>
        </section>

        <section id="pista">
          <h2>Info pista</h2>
          <ul className="field-info">
            <li>🛬 <b>Pista in erba</b> di 380 m, orientamento <b>16 / 34</b></li>
            <li>🔁 <b>Circuiti standard SX</b> a 1000 ft QNH</li>
            <li>⛰️ <b>Altitudine pista:</b> 253 ft</li>
            <li>🅿️ <b>Parcheggio</b> sul piazzale in erba sempre disponibile</li>
            <li>🏠 <b>Hangar:</b> difficile, ma consiglio di sentire comunque il gestore al bisogno</li>
          </ul>
        </section>

        <section id="webcam">
          <h2>Webcam sul campo</h2>
          <p className="muted">📹 <b>Guarda il campo volo in diretta</b> e controlla com'è la situazione prima di partire.</p>
          <div className="live">
            <iframe src={site.webcamUrl} title="Webcam del campo volo" loading="lazy" allow="fullscreen" allowFullScreen />
          </div>
        </section>

        <section id="meteo">
          <h2>Meteo del weekend</h2>
          <div className="weather-embed">
            <iframe src={site.weekendWeatherUrl} title="Meteo Weekend" loading="lazy" />
          </div>
        </section>

        <section id="radar">
          <h2>Traffico aereo sul campo</h2>
          <p className="muted">🛬 <b>Gli aeromobili attorno al mio campo volo</b> in tempo reale, grazie a SafeSky.</p>
          <div className="live clickable">
            <iframe src={site.safeskyUrl} title="Traffico aereo in tempo reale (SafeSky)" loading="lazy" tabIndex={-1} />
            <a className="map-overlay" href={site.safeskyUrl} target="_blank" rel="noopener noreferrer" aria-label="Apri il radar del campo volo a schermo intero">
              <span>Apri il radar →</span>
            </a>
          </div>
          <a className="more" href={site.safeskyUrl} target="_blank" rel="noopener noreferrer">Apri a schermo intero →</a>
        </section>

        <section className="field-outro">
          <Image src="/logo.png" alt="Logo RoxPilotLog" width={160} height={160} />
          <h2>Ti aspetto a Dovera!</h2>
          <p className="muted">Prima di partire controlla meteo e NOTAM, e scrivimi per qualsiasi dubbio: sarò felice di accoglierti. 🛩️☀️</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${site.email}`}>✉️ Scrivimi una mail</a>
            <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="btn" href={site.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a className="btn" href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} RoxPilotLog</footer>
    </>
  );
}
