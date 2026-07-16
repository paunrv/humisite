import { readFileSync } from "node:fs";
import path from "node:path";

export type LegacyScript = {
  src?: string;
  content?: string;
};

export type LegacyLandingPayload = {
  headHtml: string;
  bodyHtml: string;
  scripts: LegacyScript[];
};

/** Build-time read of the synced legacy landing (see scripts/sync-legacy.mjs). */
export function loadLegacyLanding(): LegacyLandingPayload {
  const filePath = path.join(process.cwd(), "public", "legacy-landing.html");
  const html = readFileSync(filePath, "utf8");

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch?.[1] ?? "";

  const headParts: string[] = [];
  for (const match of head.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)) {
    headParts.push(match[0]);
  }
  for (const match of head.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)) {
    headParts.push(match[0]);
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyHtml = bodyMatch?.[1] ?? "";

  const scripts: LegacyScript[] = [];
  bodyHtml = bodyHtml.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_full, attrs: string, content: string) => {
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    if (srcMatch) {
      scripts.push({ src: srcMatch[1] });
    } else if (content.trim()) {
      scripts.push({ content });
    }
    return "";
  });

  return {
    headHtml: headParts.join("\n"),
    bodyHtml,
    scripts,
  };
}
