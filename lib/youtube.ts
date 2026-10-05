export type Video = { id: string; title: string; published: string };

function parseFeed(xml: string, limit: number): Video[] {
  const entries = xml.split("<entry>").slice(1);
  // Il feed delle playlist non è ordinato per data: ordiniamo noi (più recenti prima) e poi tagliamo.
  const videos = entries.map((e) => ({
    id: e.match(/<yt:videoId>([^<]+)</)?.[1] ?? "",
    title: (e.match(/<media:title>([^<]*)</)?.[1] ?? "")
      .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
    published: e.match(/<published>([^<]+)</)?.[1] ?? "",
  })).filter((v) => v.id);
  videos.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
  return videos.slice(0, limit);
}

async function fetchFeed(query: string, limit: number): Promise<Video[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?${query}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseFeed(await res.text(), limit);
  } catch {
    return [];
  }
}

export const getChannelVideos = (channelId: string, limit = 5) => fetchFeed(`channel_id=${channelId}`, limit);
export const getPlaylistVideos = (playlistId: string, limit = 4) =>
  playlistId ? fetchFeed(`playlist_id=${playlistId}`, limit) : Promise.resolve([]);
