import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LEGACY_REDIRECTS } from "./scripts/blog-config.mjs";
import { getStaticHtmlRewrites } from "./scripts/static-html-rewrites.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: getStaticHtmlRewrites(),
    };
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      ...LEGACY_REDIRECTS,
    ];
  },
};

export default nextConfig;
