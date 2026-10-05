import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
