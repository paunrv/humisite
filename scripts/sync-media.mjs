import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/** Repo images/ first; sibling ../humisite/images for local monorepo — override with HUMI_MEDIA_SOURCE */
const repoImages = path.join(root, "images");
const siblingImages = path.join(root, "..", "humisite", "images");
const defaultSource = existsSync(repoImages) ? repoImages : siblingImages;
const sourceDir = process.env.HUMI_MEDIA_SOURCE ?? defaultSource;
const targetDir = path.join(root, "public", "images");

/** Canonical names are padded picNN — no semantic duplicate copies. */
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

/** Any remaining image in humisite/images → public/images (same basename, lowercased ext).
 *  Skip unpadded picN when pic0N already exists (avoids md5 duplicates). */
let extraCopied = 0;
const UNPADDED_PIC = /^pic(\d)$/i;
const DOT_PIC = /^pic\.(\d+)$/i;
if (existsSync(sourceDir)) {
  for (const name of readdirSync(sourceDir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
    const from = path.join(sourceDir, name);
    const extRaw = path.extname(name).toLowerCase();
    const ext = extRaw === ".jpeg" ? ".jpg" : extRaw;
    const base = path.basename(name, path.extname(name)).toLowerCase();

    const unpadded = base.match(UNPADDED_PIC) || base.match(DOT_PIC);
    if (unpadded) {
      const padded = `pic${String(Number(unpadded[1])).padStart(2, "0")}${ext}`;
      if (existsSync(path.join(targetDir, padded))) continue;
    }
    // Bare numeric aliases (40.jpg, 43.jpg)
    if (/^\d+$/.test(base)) {
      const padded = `pic${base.padStart(2, "0")}${ext}`;
      if (existsSync(path.join(targetDir, padded))) continue;
    }

    const destName = `${base}${ext}`;
    const to = path.join(targetDir, destName);
    if (!existsSync(to)) {
      copyFileSync(from, to);
      extraCopied += 1;
      console.log(`sync-media: ${name} → images/${destName} (from humisite)`);
    }
  }
}

if (picCopied === 0 && extraCopied === 0) {
  const existing =
    existsSync(targetDir) &&
    readdirSync(targetDir).some((name) => /\.(jpe?g|png|webp)$/i.test(name));
  if (existing) {
    console.log(`sync-media: no new copies — using existing public/images/`);
  } else {
    console.warn(`sync-media: no files copied — add sources to ${sourceDir}`);
    process.exit(1);
  }
}

console.log(
  `sync-media: ${picCopied} pic + ${extraCopied} extra from humisite/images`,
);
