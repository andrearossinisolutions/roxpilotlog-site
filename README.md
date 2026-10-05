# RoxPilotLog

Sito ufficiale di **RoxPilotLog**, il diario di bordo di un pilota: voli, avventure e consigli, con il podcast *Chiacchiere Sottovento*.

- YouTube: https://www.youtube.com/@RoxPilotLog
- Instagram: https://www.instagram.com/roxpilotlog/
- TikTok: https://www.tiktok.com/@roxpilotlog
- Spotify: https://open.spotify.com/show/1lbtzgmdJ8aFvNBxlDo0Go

## Cosa contiene

- **Ultime pubblicazioni**: carosello con gli ultimi video del canale. Un video alla volta si ingrandisce e parte in automatico (senza audio), con cambio ogni 30 secondi. Il mouse sopra la sezione mette in pausa; il clic su una miniatura seleziona il video.
- **Playlist PilotLog**: i video della playlist PilotLog.
- **Chiacchiere Sottovento**: player Spotify incorporato e playlist YouTube del podcast.
- **Contatti**: link ai social.

I video vengono letti dai feed RSS pubblici di YouTube, senza API key, e aggiornati ogni ora (ISR).

## Stack

Next.js 15 (App Router), React 19, TypeScript, CSS semplice.

## Avvio in locale

```bash
npm install
npm run dev      # http://localhost:3000
```

Build di produzione:

```bash
npm run build
npm start
```

## Configurazione

Link, ID di canale e playlist sono in [`lib/config.ts`](lib/config.ts).

L'ID della playlist del podcast si può sovrascrivere con una variabile d'ambiente in `.env.local`:

```
NEXT_PUBLIC_PODCAST_PLAYLIST_ID=<ID playlist>
```

## Struttura

```
app/                  pagina, layout e stili globali
components/           VideoGrid, LatestCarousel
lib/config.ts         link e ID
lib/youtube.ts        lettura dei feed RSS di YouTube
public/               logo e banner
```

## Note

- Le playlist impostate come podcast, o con video non pubblici, non compaiono nel feed RSS: la griglia resta vuota finché i video non sono pubblici.
- Logo e banner sono © RoxPilotLog.
