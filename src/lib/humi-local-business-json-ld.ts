/** SportsActivityLocation JSON-LD for the academy homepage only (not /tec). */

const siteDescription =
  "Escuela de Taekwondo en Ensenada, B.C.: Tiny Tigers, Kids, Teens y Adultos. Primera visita sin compromiso. Agenda por WhatsApp — Zona Centro.";

export function humiLocalBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "HUMI Taekwondo",
    description: siteDescription,
    url: siteUrl,
    image: `${siteUrl}/images/pic11.jpg`,
    telephone: "+52-646-109-3879",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C. Séptima 436, Zona Centro",
      addressLocality: "Ensenada",
      addressRegion: "B.C.",
      postalCode: "22800",
      addressCountry: "MX",
    },
    sameAs: [
      "https://www.instagram.com/humi.taekwondo/",
      "https://www.facebook.com/HumiTaekwondo/",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      ratingCount: "24",
      reviewCount: "24",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "07:30",
        closes: "08:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:30",
        closes: "09:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "15:20",
        closes: "20:00",
      },
    ],
  };
}
