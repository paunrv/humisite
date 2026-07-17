# HUMI Taekwondo — Ensenada

Sitio web de **HUMI Taekwondo** (Ensenada, B.C.). Stack principal: **Next.js**, **React**, **Tailwind CSS**, **Framer Motion**. La landing histórica en HTML se integra tras la apertura cinematográfica.

## Requisitos

- Node.js (LTS recomendado)
- npm
- Proyecto [Supabase](https://supabase.com) (para el producto `/app`; la landing funciona sin él)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # rellenar URL + publishable/anon key de Supabase
npm run dev
```

Abre `http://localhost:3000`.

### Supabase (producto escuela / enterprise)

Helpers SSR en `src/lib/supabase/` (`client`, `server`, `middleware`).  
Variables: ver `.env.example`. Migraciones SQL: `supabase/migrations/`.

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Key pública (preferida) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fallback legacy |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo servidor (opcional; nunca en el browser) |

El middleware refresca sesión en `/app`, `/login`, `/signup`, `/auth/*`, `/agrupacion/*`. Sin env de Supabase, esas rutas hacen pass-through y la landing sigue operativa.

**Auth (local):** `/signup` · `/login` · `/app` (protegido) · `/auth/callback`

En el Dashboard de Supabase → **Authentication → URL configuration**:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`

Para probar sin correo de confirmación: Authentication → Providers → Email → desactivar “Confirm email”.

Proyecto actual: `humi-sistema` (`cxqvhyirjuudvjhubhgq`). El CLI (`supabase link`) no corre en este macOS; usa Dashboard/MCP para SQL.

Roadmap del producto: [issue #1](https://github.com/paunrv/humisite/issues/1).

El script `sync:legacy` copia `index.html` y las páginas `blog-*.html` a `public/` para que el contenido principal cargue después del intro.

### Intro cinematográfico

- Tres columnas en desktop (**Form · Human · Energy**) con video o fallback a imagen
- Una columna en móvil con rotación cada 5–8 s
- Scroll / toque para “entrar al dojang”
- `localStorage`: `humi_intro_seen` + timestamp (reaparece tras ~4 h)

Videos: intro (`instagram-reel-01`…`04`) y momentos (`taekwondo-training`, `taekwondo-games`) en `video/` (ver `video/README.md`). Imágenes editoriales pic19+ se sincronizan desde `../humisite/images` con `npm run sync:media`. Sync automático en dev/build.

Para probar de nuevo el intro en consola del navegador:

```js
localStorage.removeItem('humi_intro_seen');
localStorage.removeItem('humi_intro_timestamp');
location.reload();
```

### Sitio estático legacy (Vite)

```bash
npm run dev:vite
npm run build:legacy
```

## Build y despliegue

```bash
npm run build
npm start
```

Vercel detecta Next.js (`vercel.json`). El build ejecuta `sync:legacy` antes de compilar.

## Estructura

| Ruta / carpeta | Uso |
|----------------|-----|
| `src/components/intro/` | Gateway cinematográfico (paneles, scroll, grain) |
| `src/components/site/` | Montaje del HTML legacy tras el intro |
| `src/lib/intro-*.ts` | Config y `localStorage` del intro |
| `index.html` | Fuente de la landing (sincronizada a `public/legacy-landing.html`) |
| `public/images/` | Imágenes editoriales (semantic IDs, ver `src/lib/media-assets.ts`) y textura grain |
| `public/videos/intro/` | Loops de video del intro |
| `blog-*.html`, `sitio-editorial.html` | Artículos y editorial (copiados a `public/` en build) |

## Licencia

Ver `LICENSE.txt`.
