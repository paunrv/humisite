# HUMI Taekwondo — Ensenada

Sitio web público de **HUMI Taekwondo** (Ensenada, B.C.). Stack: **Next.js**, **React**, **Tailwind CSS**, **Framer Motion**.

> **Producto (admin / cobranza / alumnos):** vive en [`paunrv/humi-sistema`](https://github.com/paunrv/humi-sistema)  
> Remote: `git@github.com:paunrv/humi-sistema.git`  
> Deploy piloto: https://humi-sistema.vercel.app  
> Issues / roadmap: https://github.com/paunrv/humi-sistema/issues  
> Detalle de la separación: [`docs/REPO_SPLIT.md`](docs/REPO_SPLIT.md)  
> Piloto puerta + 49 alumnos: [`docs/PILOTO_PUERTA_SAAS.md`](docs/PILOTO_PUERTA_SAAS.md)

Este repo es **solo marketing** (landing, blog, SEO). No es la fuente de verdad de Supabase ni del SaaS. El CTA **Plataforma** redirige al producto (`NEXT_PUBLIC_PRODUCT_URL`, default `https://humi-sistema.vercel.app`).

## Requisitos

- Node.js (LTS recomendado)
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

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
