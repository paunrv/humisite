# AGENTS.md

## Cursor Cloud specific instructions

`humi-site` is the **marketing website** for HUMI Taekwondo — a single Next.js 15 (App Router, React 19, TypeScript, Tailwind v4) app deployed on Vercel. The actual SaaS product (admin/billing/students) lives in a separate repo (`paunrv/humi-sistema`) and is **not** part of this workspace, so there is nothing to run for it here.

### Running the site
- Dev server: `npm run dev` → serves at `http://localhost:3000`. This is the primary way to run/test the product.
- `npm run dev` first runs a chain of content-generation scripts (`sync:legacy`, `sync:media`, `sync:videos`, `build-editorial-pages`, `build-blog-public`, `build-sitemap`) **before** `next dev`. These scripts copy `index.html` + `blog-*.html` into `public/`, sync media/videos, and generate blog/editorial pages + sitemap. This adds ~5–10s of startup before Next.js is ready — this is expected, not a hang.
- Because content is generated at dev/build startup, if you edit `index.html`, `blog-*.html`, or media sources, restart `npm run dev` to regenerate the `public/` copies.
- Production build: `npm run build` (runs the `prebuild` content pipeline + `optimize:images`, then `next build`). `npm start` serves the build.
- Legacy static (Vite) alternate build: `npm run dev:vite` / `npm run build:legacy`. Not the main app; only for the raw static HTML landing.

### Lint / test
- Lint: `npm run lint` (uses `next lint`; prints a deprecation notice but works).
- There is **no automated test suite** and no `test` script in `package.json`. Verify changes by running the dev server and checking pages in the browser.

### Supabase / env vars (optional)
- The marketing site runs fully **without any backend or env vars**. `src/middleware.ts` passes through when Supabase env vars are missing, so `/`, `/tec`, `/blog`, and all SEO pages work with no `.env.local`.
- Supabase (`.env.local` from `.env.example`) is only needed to exercise the auth stub (`/login`, `/signup`, `/app`). In prod those routes redirect to the external product URL. Stripe vars are referenced only for pricing copy and are not wired here.
- Media source: `sync:media`/`sync:videos` copy from local `images/`/`video/` (or a sibling `../humisite/images`, overridable via `HUMI_MEDIA_SOURCE`). If a source is missing, images just don't appear — it does not block startup.
