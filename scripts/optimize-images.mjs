import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const targetDir = path.join(root, "public", "images");

/** Hero / full-bleed section backgrounds — keep more detail */
const HERO_MAX = 1920;
const DEFAULT_MAX = 1200;
const JPEG_QUALITY = 80;
/** Skip rewrite if already within budget (bytes) and within max edge */
const MAX_BYTES = 400 * 1024;

const HERO_NAMES = new Set([
  "pic01.jpg",
  "pic02.jpg",
  "pic03.jpg",
  "pic04.jpg",
  "pic05.jpg",
  "pic06.jpg",
  "pic07.jpg",
  "pic08.jpg",
  "pic09.jpg",
  "pic10.jpg",
  "pic11.jpg",
  "pic12.jpg",
  "pic13.jpg",
  "picfs.jpg",
  "pic-group.png",
]);

function maxEdgeFor(name) {
  return HERO_NAMES.has(name) ? HERO_MAX : DEFAULT_MAX;
}

async function optimizeFile(filePath) {
  const name = path.basename(filePath);
  const ext = path.extname(name).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return { skipped: true };

  const before = statSync(filePath).size;
  const meta = await sharp(filePath).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const longEdge = Math.max(width, height);
  const maxEdge = maxEdgeFor(name);

  const needsResize = longEdge > maxEdge;
  const needsRecompress = before > MAX_BYTES || needsResize;

  if (!needsRecompress) {
    return { skipped: true, before, reason: "already-ok" };
  }

  let pipeline = sharp(filePath).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({
      width: width >= height ? maxEdge : undefined,
      height: height > width ? maxEdge : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const { renameSync, unlinkSync } = await import("node:fs");
  const tmp = `${filePath}.tmp`;

  async function writeJpeg(quality) {
    let pipe = sharp(filePath).rotate();
    if (needsResize) {
      pipe = pipe.resize({
        width: width >= height ? maxEdge : undefined,
        height: height > width ? maxEdge : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    await pipe.jpeg({ quality, mozjpeg: true }).toFile(tmp);
  }

  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, palette: false }).toFile(tmp);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: JPEG_QUALITY }).toFile(tmp);
  } else {
    let quality = JPEG_QUALITY;
    await writeJpeg(quality);
    // Nudge quality down until under budget (floor 60)
    while (statSync(tmp).size > MAX_BYTES && quality > 60) {
      unlinkSync(tmp);
      quality -= 5;
      await writeJpeg(quality);
    }
  }

  const after = statSync(tmp).size;
  if (after >= before && !needsResize) {
    unlinkSync(tmp);
    return { skipped: true, before, reason: "no-gain" };
  }

  unlinkSync(filePath);
  renameSync(tmp, filePath);
  return { skipped: false, before, after, resized: needsResize };
}

async function main() {
  const files = readdirSync(targetDir)
    .filter((n) => /\.(jpe?g|png|webp)$/i.test(n))
    .map((n) => path.join(targetDir, n));

  let optimized = 0;
  let skipped = 0;
  let saved = 0;

  for (const file of files) {
    try {
      const result = await optimizeFile(file);
      if (result.skipped) {
        skipped += 1;
        continue;
      }
      optimized += 1;
      saved += result.before - result.after;
      const pct = (((result.before - result.after) / result.before) * 100).toFixed(0);
      console.log(
        `optimize-images: ${path.basename(file)} ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB (−${pct}%)`,
      );
    } catch (err) {
      console.warn(`optimize-images: failed ${path.basename(file)}:`, err.message);
    }
  }

  console.log(
    `optimize-images: ${optimized} rewritten, ${skipped} skipped, saved ${(saved / 1024 / 1024).toFixed(1)} MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
