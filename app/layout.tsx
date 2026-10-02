import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoxPilotLog – Il diario di bordo di un pilota",
  description: "Voli, avventure e consigli di un pilota VFR. Video su YouTube, Instagram e il podcast Chiacchiere Sottovento.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
