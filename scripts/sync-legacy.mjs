import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public");

mkdirSync(publicDir, { recursive: true });

const landingSource = path.join(root, "index.html");
const landingTarget = path.join(publicDir, "legacy-landing.html");

if (existsSync(landingSource)) {
  copyFileSync(landingSource, landingTarget);
  console.log("sync-legacy: copied index.html → public/legacy-landing.html");
}

const htmlAtRoot = readdirSync(root).filter((name) => name.endsWith(".html") && name !== "index.html");

for (const file of htmlAtRoot) {
  const target = path.join(publicDir, file);
  copyFileSync(path.join(root, file), target);
}

console.log(`sync-legacy: copied ${htmlAtRoot.length} additional HTML pages to public/`);

const assetsSource = path.join(root, "assets");
const assetsTarget = path.join(publicDir, "assets");
if (existsSync(assetsSource)) {
  cpSync(assetsSource, assetsTarget, { recursive: true });
  console.log("sync-legacy: copied assets/ → public/assets/");
}
