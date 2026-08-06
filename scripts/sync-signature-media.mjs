/**
 * Sync curated Signature Events stills into public/signature-events/{year}/.
 *
 * Drop files with the original curated names into media/signature-events/
 * (or keep them there from a local folder). This script maps them to stable
 * public filenames — no React edits required.
 *
 * Unused sources (e.g. *-03.jpg) are intentionally not mapped.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const mediaDir = path.join(root, "media", "signature-events");

/** Case-insensitive filename lookup in a directory. */
function findFile(dir, names) {
  if (!existsSync(dir)) return null;
  const entries = readdirSync(dir);
  const lowerMap = new Map(entries.map((n) => [n.toLowerCase(), n]));
  for (const name of names) {
    const hit = lowerMap.get(name.toLowerCase());
    if (hit) return path.join(dir, hit);
  }
  return null;
}

/**
 * Each mapping: try source names in order → public/signature-events/{year}/{target}
 */
const STILL_MAPPINGS = [
  // 2018 · 1st Olympic Bootcamp
  {
    year: "2018",
    target: "poster.jpg",
    sources: ["1st-tkdolympicbootcamp.jpg"],
  },
  {
    year: "2018",
    target: "photo-1.jpg",
    sources: ["1st-tkdolympicbootcamp-01.jpg"],
  },
  {
    year: "2018",
    target: "photo-2.jpg",
    sources: ["1st-tkdolympicbootcamp-02.jpg"],
  },
  // 2019 · 2nd Olympic Bootcamp
  {
    year: "2019",
    target: "poster.jpg",
    sources: ["2nd-tkdolympicbootcamp.jpg"],
  },
  {
    year: "2019",
    target: "photo-1.jpg",
    sources: ["2nd-tkdolympicbootcamp-01.jpg"],
  },
  {
    year: "2019",
    target: "photo-2.jpg",
    sources: ["2nd-tkdolympicbootcamp-02.jpg"],
  },
  // 2023 · KI Games (poster only — no highlight photos)
  {
    year: "2023",
    target: "poster.jpg",
    sources: ["ki-games.jpg", "ki games.jpg"],
  },
];

let copied = 0;
let missing = 0;

if (!existsSync(mediaDir)) {
  mkdirSync(mediaDir, { recursive: true });
  console.warn(
    "sync-signature-media: created media/signature-events/ — drop curated stills there",
  );
}

for (const { year, target, sources } of STILL_MAPPINGS) {
  const from = findFile(mediaDir, sources);
  const outDir = path.join(root, "public", "signature-events", year);
  const to = path.join(outDir, target);
  mkdirSync(outDir, { recursive: true });

  if (!from) {
    missing += 1;
    console.warn(
      `sync-signature-media: missing ${sources[0]} → ${year}/${target}`,
    );
    continue;
  }

  copyFileSync(from, to);
  copied += 1;
  console.log(
    `sync-signature-media: ${path.basename(from)} → public/signature-events/${year}/${target}`,
  );
}

console.log(
  `sync-signature-media: ${copied} stills synced (${missing} missing)`,
);
