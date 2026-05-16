import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.join(root, "video");
const targetDir = path.join(root, "public", "videos", "intro");

const mappings = [
  { source: "instagram-reel-01.mp4", target: "form.mp4" },
  { source: "instagram-reel-02.mp4", target: "human.mp4" },
  { source: "instagram-reel-03.mp4", target: "energy.mp4" },
  { source: "instagram-reel-04.mp4", target: "presence.mp4" },
];

mkdirSync(targetDir, { recursive: true });

let copied = 0;

for (const { source, target } of mappings) {
  const from = path.join(sourceDir, source);
  const to = path.join(targetDir, target);

  if (!existsSync(from)) {
    console.warn(`sync-videos: missing ${source}`);
    continue;
  }

  copyFileSync(from, to);
  copied += 1;
  console.log(`sync-videos: ${source} → public/videos/intro/${target}`);
}

const extras = readdirSync(sourceDir).filter(
  (name) => name.startsWith("instagram-reel-") && name.endsWith(".mp4"),
);
const unmapped = extras.filter(
  (name) => !mappings.some((m) => m.source === name),
);
if (unmapped.length > 0) {
  console.warn(`sync-videos: unmapped files in video/: ${unmapped.join(", ")}`);
}

if (copied === 0) {
  console.warn("sync-videos: no files copied — add reels to video/");
  process.exit(1);
}

console.log(`sync-videos: ${copied}/${mappings.length} panels ready`);
