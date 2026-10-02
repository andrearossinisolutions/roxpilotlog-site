import { site } from "@/lib/config";
import { getChannelVideos, getPlaylistVideos } from "@/lib/youtube";
import VideoGrid from "@/components/VideoGrid";

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
        <a href="#top" className="logo">Rox<span>PilotLog</span></a>
        <nav>
          <a href="#nuovi">Nuovi video</a>
          <a href="#pilotlog">PilotLog</a>
          <a href="#podcast">Podcast</a>
          <a href="#contatti">Contatti</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">Diario di bordo</p>
          <h1>Volare, raccontato dal posto di destra.</h1>
          <p className="lead">
            RoxPilotLog è il mio diario di volo: avventure in aeroplano, consigli per piloti e studenti,
            e ora anche un podcast per parlarne con calma, sottovento.
          </p>
          <div className="actions">
            <a className="btn primary" href={site.youtube} target="_blank" rel="noopener noreferrer">Iscriviti su YouTube</a>
            <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">Seguimi su Instagram</a>
          </div>
        </section>

        <section id="nuovi">
          <h2>Nuovi video</h2>
          <VideoGrid videos={latest} />
        </section>

        <section id="pilotlog">
          <h2>Playlist PilotLog</h2>
          <p className="muted">I miei voli, dall&apos;inizio. Una puntata dopo l&apos;altra.</p>
          <VideoGrid videos={pilotLog} />
          <a className="more" href={`https://www.youtube.com/playlist?list=${site.pilotLogPlaylistId}`} target="_blank" rel="noopener noreferrer">Guarda tutta la playlist →</a>
        </section>

        <section id="podcast">
          <p className="eyebrow">Nuovo podcast</p>
          <h2>Chiacchiere Sottovento</h2>
          <p className="muted">Storie, pensieri e due chiacchiere sul volo. Ascoltalo su Spotify o guardalo su YouTube.</p>
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
          {site.podcastPlaylistId && <VideoGrid videos={podcast} />}
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
