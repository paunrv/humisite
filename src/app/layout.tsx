import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUMI — Desarrollo humano a través del Taekwondo · Ensenada",
  description:
    "Desarrollo humano a través del Taekwondo. Escuela en Ensenada, B.C. para familias que buscan estructura emocional.",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#080808] antialiased">{children}</body>
    </html>
  );
}
