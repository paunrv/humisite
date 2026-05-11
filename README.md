# HUMI Taekwondo — Ensenada

Sitio web de **HUMI Taekwondo (Ensenada, Baja California)**. Proyecto frontend estático servido con **Vite** para desarrollo y build.

## Requisitos

- Node.js (recomendado: versión LTS)
- npm

## Correr localmente

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173`.

### Build y preview

```bash
npm run build
npm run preview
```

## Estructura básica

- `index.html`: entrada principal
- `assets/`: CSS y JS del sitio (`humi.css`, `humi.js`)
- `public/images/`: imágenes servidas en `/images/...` (Vite)
- `blog-*.html`: artículos estáticos del blog (también entradas en `vite.config.ts`)
- `dist/`: salida del build (generada, no se versiona)

## Licencia

Ver `LICENSE.txt`.

