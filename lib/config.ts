export const site = {
  name: "RoxPilotLog",
  url: "https://roxpilotlog.rossinisolutions.com",
  youtube: "https://www.youtube.com/@RoxPilotLog",
  instagram: "https://www.instagram.com/roxpilotlog/",
  tiktok: "https://www.tiktok.com/@roxpilotlog",
  spotifyShowId: "1lbtzgmdJ8aFvNBxlDo0Go",
  spotifyUrl: "https://open.spotify.com/show/1lbtzgmdJ8aFvNBxlDo0Go?si=vnZA_sDZSUGqcfwIzCUyeA",
  safeskyUrl: "https://live-next.safesky.app/tv/FqWmtvIOeoo6Kf8tMa1tFA",
  projects: [
    { name: "Logbook", url: "https://logbook.rossinisolutions.com/", description: "Gestione logbook smart per noleggiatori ed aerei in comproprietà" },
    { name: "GPX Overfly", url: "https://gpxoverfly.rossinisolutions.com/", description: "Sorvola i tuoi voli pianificati prima di decollare" },
  ],
  flightsMapUrl: "https://logbook.rossinisolutions.com/public-map/i-kQlnl4YYlmB0BxcAEbqniQLC3DCxKZ",
  channelId: "UCO8OHa7V3ngRAfjzNR25P4g",
  pilotLogPlaylistId: "PLVwu8xWOTXDMzy8DIBlLEr-wYTGGN4EFC",
  // ID della playlist YouTube di "Chiacchiere Sottovento" (https://www.youtube.com/playlist?list=<ID>).
  // Imposta NEXT_PUBLIC_PODCAST_PLAYLIST_ID in .env.local oppure scrivilo qui.
  podcastPlaylistId: process.env.NEXT_PUBLIC_PODCAST_PLAYLIST_ID ?? "PLZVr68rKYZ0M",
};
