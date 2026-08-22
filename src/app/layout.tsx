import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/site/Analytics";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humisite.vercel.app";

const siteTitle = "Taekwondo en Ensenada · HUMI";
const siteDescription =
  "Escuela de Taekwondo en Ensenada, B.C.: Tiny Tigers, Kids, Teens y Adultos. Primera visita sin compromiso. Agenda por WhatsApp — Zona Centro.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | HUMI Taekwondo",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  keywords: [
    "taekwondo ensenada",
    "escuela taekwondo ensenada",
    "clases taekwondo niños",
    "taekwondo adultos ensenada",
    "HUMI taekwondo",
    "dojang ensenada",
  ],
  authors: [{ name: "HUMI Taekwondo" }],
  creator: "HUMI Taekwondo",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "HUMI Taekwondo",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/pic11.jpg",
        width: 1920,
        height: 1280,
        alt: "HUMI Taekwondo — Ensenada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/pic11.jpg"],
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/xml": [{ url: "/sitemap.xml", title: "Sitemap" }],
    },
  },
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="es-MX" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#080808] antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
