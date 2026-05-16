# HUMI Taekwondo — Ensenada

Sitio web estático de **HUMI Taekwondo** (Ensenada, B.C.). Stack: **HTML + CSS + JS** sin frameworks de UI; tipografía **Geist** y **Geist Mono** (Google Fonts). Desarrollo y build con **Vite**; despliegue recomendado en **Vercel**.

## Requisitos

- Node.js (LTS recomendado)
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (o `npm run dev:open` para abrir el navegador).

### Dónde editar el diseño

- **Landing** (`index.html`): CSS en el bloque `<style>` del `<head>`; JS al final del `<body>`.
- **Editorial y blogs** (`sitio-editorial.html`, `blog-*.html`): `assets/css/humi-redesign.css` y `assets/js/humi-redesign.js` (Vite recarga al guardar).

## Build y preview

```bash
npm run build
npm run preview
```

La salida va a `dist/` (no versionar).

## Despliegue en Vercel

1. Conecta el repositorio en Vercel; suele detectar **Vite** solo.
2. Si hace falta forzar rutas de build, el repo incluye `vercel.json` con `npm run build` y salida `dist`.
3. Raíz del sitio: `index.html`; entradas adicionales están declaradas en `vite.config.ts` para el build multipágina.

## Estructura

| Ruta / carpeta | Uso |
|----------------|-----|
| `index.html` | Landing principal (rediseño `hm-*`) |
| `sitio-editorial.html` | Mapa, calendario por grupo, índice del blog |
| `blog-*.html` | Artículos del blog |
| `assets/css/humi-redesign.css` | Estilos del sitio (modo oscuro, paleta HUMI) |
| `assets/js/humi-redesign.js` | Nav móvil y FAQ |
| `public/images/` | Imágenes en `/images/...` (Vite) |
| `vite.config.ts` | Entradas HTML del build multipágina |
| `vercel.json` | Comando de build y directorio de salida |

## Licencia

Ver `LICENSE.txt`.
