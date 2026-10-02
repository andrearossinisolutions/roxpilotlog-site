export type Video = { id: string; title: string; published: string };

function parseFeed(xml: string, limit: number): Video[] {
  const entries = xml.split("<entry>").slice(1);
  return entries.slice(0, limit).map((e) => ({
    id: e.match(/<yt:videoId>([^<]+)</)?.[1] ?? "",
    title: (e.match(/<media:title>([^<]*)</)?.[1] ?? "")
      .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
    published: e.match(/<published>([^<]+)</)?.[1] ?? "",
  })).filter((v) => v.id);
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

export const getChannelVideos = (channelId: string, limit = 6) => fetchFeed(`channel_id=${channelId}`, limit);
export const getPlaylistVideos = (playlistId: string, limit = 6) =>
  playlistId ? fetchFeed(`playlist_id=${playlistId}`, limit) : Promise.resolve([]);
