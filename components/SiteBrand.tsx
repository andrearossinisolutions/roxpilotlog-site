import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/config";

export default function SiteBrand() {
  return (
    <div className="brand">
      <Link href="/" className="brand-logo" aria-label="RoxPilotLog – home">
        <Image src="/logo.png" alt="" width={120} height={120} priority />
      </Link>
      <div className="brand-text">
        <p className="brand-tag">Pensavo che volare fosse un beneficio per pochi,<span className="tag-m"> e poi…</span></p>
        <div className="brand-social">
          <a href={site.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Image src="/social/youtube.png" alt="" width={60} height={60} />
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src="/social/instagram.png" alt="" width={60} height={60} />
          </a>
          <a href={site.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <Image src="/social/tiktok.png" alt="" width={60} height={60} />
          </a>
          <a href={site.spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
            <Image src="/social/spotify.png" alt="" width={60} height={60} />
          </a>
          <span className="brand-tag brand-more">e poi…</span>
        </div>
      </div>
    </div>
  );
}
