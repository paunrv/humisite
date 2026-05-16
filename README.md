# HUMI Taekwondo — Ensenada

Sitio web de **HUMI Taekwondo** (Ensenada, B.C.). Stack principal: **Next.js**, **React**, **Tailwind CSS**, **Framer Motion**. La landing histórica en HTML se integra tras la apertura cinematográfica.

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

Videos del intro: coloca `instagram-reel-01.mp4` … `04.mp4` en `video/` (ver `video/README.md`). Cuatro paneles: Form · Human · Energy · Presence. Sync con `npm run sync:videos` (automático en dev/build).

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
| `public/images/` | Imágenes y textura grain |
| `public/videos/intro/` | Loops de video del intro |
| `blog-*.html`, `sitio-editorial.html` | Artículos y editorial (copiados a `public/` en build) |

## Licencia

Ver `LICENSE.txt`.
