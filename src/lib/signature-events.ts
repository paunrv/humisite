/**
 * Signature Events — editorial archive of annual HUMI experiences.
 * Add a new year by appending an entry; media paths are public URLs.
 */

export type SignatureEvent = {
  id: number;
  year: string;
  title: string;
  category: string;
  guest?: string;
  subtitle?: string;
  poster: string;
  images: [string, string];
  description: string;
};

export const SIGNATURE_EVENTS: SignatureEvent[] = [
  {
    id: 1,
    year: "2018",
    title: "1st Olympic Bootcamp",
    category: "Master Class",
    guest: "Carlo Molfetta",
    subtitle: "Olympic Champion · London 2012",
    poster: "/images/pic02.jpg",
    images: ["/images/pic01.jpg", "/images/pic04.jpg"],
    description:
      "HUMI opened its doors to Olympic-level training for the first time. Carlo Molfetta brought the precision and intensity of London 2012 to Ensenada, setting a new standard for what our community could aspire to become each year.",
  },
  {
    id: 2,
    year: "2019",
    title: "2nd Olympic Bootcamp",
    category: "Master Class",
    guest: "Joel González",
    subtitle: "Olympic Champion · London 2012",
    poster: "/images/pic03.jpg",
    images: ["/images/pic08.jpg", "/images/pic09.jpg"],
    description:
      "A second year, a second champion. Joel González returned the Olympic fire to the dojang, deepening a tradition of world-class master classes that would define HUMI’s annual rhythm and raise the bar for every student who stepped onto the mat.",
  },
  {
    id: 3,
    year: "2022",
    title: "Rumble HUMI Interno WTU",
    category: "Internal Competition",
    poster: "/images/pic05.jpg",
    images: ["/images/pic10.jpg", "/images/pic11.jpg"],
    description:
      "An internal competition under World Taekwondo Union standards. Athletes tested months of preparation against their own teammates—proving that the fiercest growth often happens inside the community that raised them, not only on distant tournament floors.",
  },
  {
    id: 4,
    year: "2023",
    title: "KI Games",
    category: "Performance Weekend",
    guest: "Gabriel Bracamontes",
    poster: "/images/pic06.jpg",
    images: ["/images/pic12.jpg", "/images/pic13.jpg"],
    description:
      "A performance weekend that pushed beyond the usual class format. With Gabriel Bracamontes, the dojang became a stage for intensity, skill, and the kind of shared effort that turns a school into a lasting family bound by purpose.",
  },
  {
    id: 5,
    year: "2024",
    title: "Taekwondo Games",
    category: "Community Competition",
    poster: "/images/pic07.jpg",
    images: ["/images/pic14.jpg", "/images/pic16.jpg"],
    description:
      "The community competition that brought every generation onto the same floor. Students competed, supported, and celebrated—turning a single weekend into a living portrait of everything HUMI had carefully built across years of training hard together.",
  },
  {
    id: 6,
    year: "2025",
    title: "Sunday Funday",
    category: "Master Class",
    guest: "Jesús Aguilar",
    subtitle: "Official UFC Athlete",
    poster: "/images/pic15.jpg",
    images: ["/images/pic17.jpg", "/images/pic18.jpg"],
    description:
      "A master class with official UFC athlete Jesús Aguilar. Technique met entertainment, and the dojang filled with the energy of a community that trains hard—and knows how to enjoy the journey together as one house.",
  },
];

export function formatEdition(id: number): string {
  return String(id).padStart(2, "0");
}

export function formatEventCategory(event: SignatureEvent): string {
  if (event.guest) {
    return `${event.category} · ${event.guest}`;
  }
  return event.category;
}
