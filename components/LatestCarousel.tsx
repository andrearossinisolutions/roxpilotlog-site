"use client";

import { useEffect, useState } from "react";
import type { Video } from "@/lib/youtube";

const DURATION_MS = 30_000;

export default function LatestCarousel({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || videos.length < 2) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % videos.length), DURATION_MS);
    return () => clearTimeout(t);
  }, [active, paused, videos.length]);

  if (!videos.length) return <p className="muted">Video non disponibili al momento. Guardali direttamente su YouTube.</p>;

  return (
    <div className="spotlight" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {videos.map((v, i) => {
        const on = i === active;
        return (
          <div key={v.id} className={`spot ${on ? "on" : ""}`} onClick={() => setActive(i)}>
            <div className="spot-media">
              {on ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=1&playsinline=1&rel=0`}
                  title={v.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
              )}
            </div>
            {on && (
              <div className="spot-info">
                <h3>
                  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">{v.title}</a>
                </h3>
                {!paused && videos.length > 1 && <div key={active} className="bar" style={{ animationDuration: `${DURATION_MS}ms` }} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
