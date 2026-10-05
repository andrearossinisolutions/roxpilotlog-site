import { site } from "@/lib/config";
import { getChannelVideos, getPlaylistVideos } from "@/lib/youtube";
import Image from "next/image";
import VideoGrid from "@/components/VideoGrid";
import LatestCarousel from "@/components/LatestCarousel";

export const revalidate = 3600;

export default async function Home() {
  const [latest, pilotLog, podcast] = await Promise.all([
    getChannelVideos(site.channelId, 6),
    getPlaylistVideos(site.pilotLogPlaylistId, 6),
    getPlaylistVideos(site.podcastPlaylistId, 6),
  ]);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <nav>
            <a href="#ultime">Ultime Pubblicazioni</a>
            <a href="#pilotlog">Il Pilot Log</a>
            <a href="#podcast">Il Mio Podcast</a>
            <a href="#campo">Il Campo Volo</a>
            <a href="#progetti">I Miei Progetti</a>
            <a href="#contatti">Contatti e Social</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
          <p className="eyebrow">Diario di bordo</p>
          <h1>RoxPilotLog</h1>
          <p className="lead">
            Pensavo che volare fosse un beneficio per pochi, e poi…
            Io sono Andrea, benvenuto nel mio video-diario di volo!
            Dall'esperienza di pilota per un giorno, al mio aereo, ed a tutto quello che verrà... 🛩️☀️
          </p>
          <div className="actions">
            <a className="btn primary" href={site.youtube} target="_blank" rel="noopener noreferrer">Iscriviti su YouTube</a>
            <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">Seguimi su Instagram</a>
          </div>
          </div>
          <Image className="hero-logo" src="/logo.png" alt="Logo RoxPilotLog" width={900} height={900} priority />
        </section>

        <section id="ultime">
          <h2>Ultime pubblicazioni</h2>
          <LatestCarousel videos={latest.slice(0, 5)} />
          <a className="more" href={site.youtube} target="_blank" rel="noopener noreferrer">Guarda tutti i video →</a>
        </section>

        <section id="pilotlog">
          <h2>Pilot Log</h2>
          <p className="muted">I miei voli, dall&apos;inizio. Una puntata dopo l&apos;altra.</p>
          <VideoGrid videos={pilotLog} />
          <a className="more" href={`https://www.youtube.com/playlist?list=${site.pilotLogPlaylistId}`} target="_blank" rel="noopener noreferrer">Guarda tutta la playlist →</a>
        </section>

        <section id="podcast">
          <p className="eyebrow">Nuovo podcast</p>
          <h2>Chiacchiere Sottovento</h2>
          <p className="muted">🛩️ Parliamo di attualità aeronautica direttamente dal campo volo mentre ci teniamo allenati con l'aereo, con l'obiettivo di cercare di capire insieme cosa possiamo portarci a casa da quello che succede nel mondo del volo, e che possa essere utile anche a noi piloti di piccoli aerei leggeri, o come nel mio caso addirittura ultraleggeri. 🛬</p>
          <div className="podcast">
            <iframe
              title="Chiacchiere Sottovento su Spotify"
              src={`https://open.spotify.com/embed/show/${site.spotifyShowId}`}
              height="352" loading="lazy" allow="encrypted-media; clipboard-write; fullscreen"
            />
            <div>
              <a className="btn primary" href={site.spotifyUrl} target="_blank" rel="noopener noreferrer">Ascolta su Spotify</a>
              {site.podcastPlaylistId && (
                <a className="btn" href={`https://www.youtube.com/playlist?list=${site.podcastPlaylistId}`} target="_blank" rel="noopener noreferrer">Playlist su YouTube</a>
              )}
            </div>
          </div>
          {site.podcastPlaylistId && <VideoGrid videos={podcast} emptyMessage="Presto la prima puntata!" />}
        </section>

        <section id="campo">
          <p className="eyebrow">Live</p>
          <h2>Traffico aereo sul campo volo</h2>
          <p className="muted">Gli aeromobili attorno al mio campo volo in tempo reale, grazie a SafeSky.</p>
          <div className="live">
            <iframe src={site.safeskyUrl} title="Traffico aereo in tempo reale (SafeSky)" loading="lazy" allowFullScreen />
          </div>
          <a className="more" href={site.safeskyUrl} target="_blank" rel="noopener noreferrer">Apri a schermo intero →</a>
        </section>

        <section id="progetti">
          <h2>I miei progetti</h2>
          <p className="muted">Strumenti che ho creato per chi vola.</p>
          <div className="projects">
            {site.projects.map((p) => (
              <a key={p.url} className="project" href={p.url} target="_blank" rel="noopener noreferrer">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="more">Apri →</span>
              </a>
            ))}
          </div>
        </section>

        <section id="contatti" className="contacts">
          <h2>Contatti</h2>
          <p className="muted">Seguimi sui social e scrivimi un messaggio.</p>
          <div className="actions">
            <a className="btn" href={site.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="btn" href={site.spotifyUrl} target="_blank" rel="noopener noreferrer">Spotify</a>
          </div>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} RoxPilotLog</footer>
    </>
  );
}
