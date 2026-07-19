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
    const product = (
      process.env.NEXT_PUBLIC_PRODUCT_URL || "https://app.humi.mx"
    ).replace(/\/$/, "");
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/humi-tec",
        destination: "/tec",
        permanent: true,
      },
      // Stub auth/app → product (humi-sistema)
      {
        source: "/login",
        destination: `${product}/login?next=/workspace`,
        permanent: false,
      },
      {
        source: "/signup",
        destination: `${product}/login?next=/workspace`,
        permanent: false,
      },
      {
        source: "/signup/:path*",
        destination: `${product}/login?next=/workspace`,
        permanent: false,
      },
      {
        source: "/app",
        destination: `${product}/workspace`,
        permanent: false,
      },
      {
        source: "/app/:path*",
        destination: `${product}/workspace`,
        permanent: false,
      },
      ...LEGACY_REDIRECTS,
    ];
  },
};

export default nextConfig;
