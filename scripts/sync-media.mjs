import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const targetDir = path.join(root, "public", "images");

/** Default: sibling humisite/images — override with HUMI_MEDIA_SOURCE */
const defaultSource = path.join(root, "..", "humisite", "images");
const sourceDir = process.env.HUMI_MEDIA_SOURCE ?? defaultSource;

/** legacy filename (any ext) → semantic basename */
const RENAMES = [
  { legacy: "pic19", id: "tkdo-beginning" },
  { legacy: "pic20", id: "beijing" },
  { legacy: "pic21", id: "dan-02" },
  { legacy: "pic22", id: "orange-belt" },
  { legacy: "pic23", id: "white-belt", aliases: ["pic.23"] },
  { legacy: "pic24", id: "dan-03", aliases: ["pic.24"] },
  { legacy: "pic25", id: "first-generation-black-belts" },
  { legacy: "pic26", id: "second-generation-black-belts" },
  { legacy: "pic27", id: "third-generation-black-belts" },
  { legacy: "pic28", id: "dan-04" },
  { legacy: "pic29", id: "poomsae" },
  { legacy: "pic30", id: "fifth-generation-black-belts" },
  { legacy: "pic31", id: "sixth-generation-black-belts" },
  { legacy: "pic32", id: "seventh-generation-black-belts" },
  { legacy: "pic33", id: "red-belt" },
  { legacy: "pic34", id: "eighth-generation-black-belts" },
  { legacy: "pic35", id: "fourth-generation-black-belts" },
  { legacy: "pic36", id: "dan-05" },
  { legacy: "pic37", id: "blue-belt" },
  { legacy: "pic38", id: "paris" },
  { legacy: "pic39", id: "tokyo" },
];

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"];

function resolveLegacySource(stems) {
  for (const stem of stems) {
    for (const ext of IMAGE_EXTS) {
      const candidate = path.join(sourceDir, stem + ext);
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

mkdirSync(targetDir, { recursive: true });

let copied = 0;

for (const { legacy, id, aliases = [] } of RENAMES) {
  const from = resolveLegacySource([legacy, ...aliases]);
  if (!from) {
    console.warn(`sync-media: missing ${legacy} (checked ${[legacy, ...aliases].join(", ")})`);
    continue;
  }

  const ext = path.extname(from).toLowerCase() === ".jpeg" ? ".jpg" : path.extname(from).toLowerCase();
  const normalizedExt = ext === ".png" || ext === ".webp" ? ext : ".jpg";
  const to = path.join(targetDir, `${id}${normalizedExt}`);

  copyFileSync(from, to);
  copied += 1;
  console.log(`sync-media: ${path.basename(from)} → images/${id}${normalizedExt}`);
}

/** pic01–pic46 (+ aliases) → public/images/picNN.jpg */
const PIC_ALIASES = {
  23: ["pic.23"],
  24: ["pic.24"],
  40: ["40"],
  43: ["43"],
  46: ["pic46"],
};

let picCopied = 0;
for (let n = 1; n <= 46; n++) {
  const padded = String(n).padStart(2, "0");
  const stems = [`pic${padded}`, `pic${n}`, ...(PIC_ALIASES[n] ?? [])];
  const from = resolveLegacySource(stems);
  if (!from) continue;
  const extRaw = path.extname(from).toLowerCase();
  const ext = extRaw === ".jpeg" ? ".jpg" : extRaw === ".png" || extRaw === ".webp" ? extRaw : ".jpg";
  const to = path.join(targetDir, `pic${padded}${ext}`);
  copyFileSync(from, to);
  picCopied += 1;
  console.log(`sync-media: ${path.basename(from)} → images/pic${padded}${ext}`);
}

if (copied === 0 && picCopied === 0) {
  console.warn(`sync-media: no files copied — add sources to ${sourceDir}`);
  process.exit(1);
}

console.log(`sync-media: ${copied} semantic + ${picCopied} pic editorial images ready`);
