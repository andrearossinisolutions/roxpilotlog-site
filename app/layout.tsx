import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "RoxPilotLog", locale: "it_IT", images: ["/logo.png"] },
  title: "RoxPilotLog – Pensavo che volare fosse un beneficio per pochi, e poi…",
  description: "Pensavo che volare fosse un beneficio per pochi, e poi…",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
