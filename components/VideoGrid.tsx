import type { Video } from "@/lib/youtube";

export default function VideoGrid({ videos, emptyMessage = "Video non disponibili al momento. Guardali direttamente su YouTube." }: { videos: Video[]; emptyMessage?: string }) {
  if (!videos.length) return <p className="muted">{emptyMessage}</p>;
  return (
    <div className="grid">
      {videos.map((v) => (
        <a key={v.id} className="card" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <div className="card-body">
            <h3>{v.title}</h3>
            <time dateTime={v.published}>{new Date(v.published).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</time>
          </div>
        </a>
      ))}
    </div>
  );
}
