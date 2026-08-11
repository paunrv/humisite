import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.join(root, "video");

const defaultHumisiteVideo = path.join(root, "..", "humisite", "video");

/** Copy semantic sources from humisite when missing locally */
const VIDEO_IMPORTS = [
  { humisite: "instagram-reel-08.mp4", local: "taekwondo-training.mp4" },
  { humisite: "instagram-reel-09.mp4", local: "taekwondo-games.mp4" },
];

for (const { humisite, local } of VIDEO_IMPORTS) {
  const from = path.join(defaultHumisiteVideo, humisite);
  const to = path.join(sourceDir, local);
  if (existsSync(from) && !existsSync(to)) {
    copyFileSync(from, to);
    console.log(`sync-videos: imported ${humisite} → video/${local}`);
  }
}

/** All .mp4 from ../humisite/video → humi/video/ when missing locally */
if (existsSync(defaultHumisiteVideo)) {
  for (const name of readdirSync(defaultHumisiteVideo)) {
    if (!name.endsWith(".mp4")) continue;
    const from = path.join(defaultHumisiteVideo, name);
    const to = path.join(sourceDir, name);
    if (!existsSync(to)) {
      copyFileSync(from, to);
      console.log(`sync-videos: imported ${name} from humisite/video`);
    }
  }
}

const mappings = [
  { source: "instagram-reel-04.mp4", targetDir: "intro", target: "form.mp4" },
  { source: "instagram-reel-05.mp4", targetDir: "intro", target: "human.mp4" },
  { source: "instagram-reel-01.mp4", targetDir: "intro", target: "energy.mp4" },
  { source: "taekwondo-training.mp4", targetDir: "moments", target: "taekwondo-training.mp4" },
  { source: "taekwondo-games.mp4", targetDir: "moments", target: "taekwondo-games.mp4" },
];

let copied = 0;

for (const { source, targetDir, target } of mappings) {
  const from = path.join(sourceDir, source);
  const outDir = path.join(root, "public", "videos", targetDir);
  const to = path.join(outDir, target);

  mkdirSync(outDir, { recursive: true });

  if (!existsSync(from)) {
    console.warn(`sync-videos: missing ${source}`);
    continue;
  }

  copyFileSync(from, to);
  copied += 1;
  console.log(`sync-videos: ${source} → public/videos/${targetDir}/${target}`);
}

const extras = readdirSync(sourceDir).filter(
  (name) => name.startsWith("instagram-reel-") && name.endsWith(".mp4"),
);
const mappedSources = new Set(mappings.map((m) => m.source));
const unmapped = extras.filter((name) => !mappedSources.has(name));
if (unmapped.length > 0) {
  console.warn(`sync-videos: unmapped files in video/: ${unmapped.join(", ")}`);
}

if (copied === 0) {
  console.warn("sync-videos: no files copied — add reels to video/");
  process.exit(1);
}

console.log(`sync-videos: ${copied} videos ready`);
