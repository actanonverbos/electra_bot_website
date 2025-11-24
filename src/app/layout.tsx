import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Primary Font - Space Grotesk
// Usage: Main headlines, body text, UI elements
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Secondary Font - IBM Plex Mono
// Usage: Labels, badges, eyebrows, technical content, status indicators
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Electra | Real-Time NFT Buy Alerts for Base",
  description: "Boost engagement in your NFT community with real-time alerts. Instant buy alerts, sweep tracking, and engagement-driven features for Base NFT collections.",
  keywords: ["NFT", "Telegram", "Bot", "Base", "Notifications", "NFT Alerts", "Sweep Tracking"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
