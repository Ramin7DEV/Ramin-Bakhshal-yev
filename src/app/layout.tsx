import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Manrope, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

const display = Source_Serif_4({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body-face",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramin Bakhshalıyev — AI-first Engineer",
  description: "Personal portfolio of Ramin Bakhshalıyev.",
};

export const viewport: Viewport = {
  themeColor: "#08090A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
