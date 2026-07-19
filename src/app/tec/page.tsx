import { TecLanding } from "@/components/tec/TecLanding";
import { TEC_META } from "@/lib/humi-tec/copy";
import type { Metadata } from "next";
import { Syne } from "next/font/google";

const tecDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-tec-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humisite.vercel.app";

export const metadata: Metadata = {
  title: {
    absolute: TEC_META.title,
  },
  description: TEC_META.description,
  keywords: [...TEC_META.keywords],
  alternates: {
    canonical: `${siteUrl}/tec`,
  },
  openGraph: {
    title: TEC_META.title,
    description: TEC_META.description,
    url: `${siteUrl}/tec`,
    siteName: "HUMI-tec",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/pic11.jpg",
        width: 1200,
        height: 630,
        alt: TEC_META.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEC_META.title,
    description: TEC_META.description,
    images: ["/images/pic11.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TecPage() {
  return (
    <div className={tecDisplay.variable}>
      <TecLanding />
    </div>
  );
}
