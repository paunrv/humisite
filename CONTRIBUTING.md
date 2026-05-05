# Contributing

Este repo usa un flujo simple para un equipo pequeño (2–3 personas).

## Reglas (obligatorias)

- Nunca trabajes directo en `main`.
- Todo cambio va en una rama `feat/*` o `fix/*` (también se acepta `chore/*`, `docs/*`).
- Antes de empezar a trabajar: haz pull de `dev`.
- Commits semánticos (Conventional Commits): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`.
- Todo entra por Pull Request **hacia `dev`**.

## Ramas

- `main`: producción (siempre estable)
- `dev`: integración / desarrollo

### Naming de ramas

- `feat/<descripcion-corta>` (ej: `feat/hero-cta`)
- `fix/<descripcion-corta>` (ej: `fix/map-link`)
- `chore/<descripcion-corta>` (ej: `chore/update-deps`)
- `docs/<descripcion-corta>` (ej: `docs/readme`)

## Flujo de trabajo (paso a paso)

1. Actualiza tu `dev` local:

```bash
git checkout dev
git pull
```

2. Crea tu rama desde `dev`:

```bash
git checkout -b feat/mi-cambio
```

3. Trabaja, prueba local y commitea:

```bash
npm install
npm run dev

git add .
git commit -m "feat: describe tu cambio"
```

4. Sube tu rama:

```bash
git push -u origin feat/mi-cambio
```

5. Abre un Pull Request a `dev` en GitHub. No se hace merge sin revisión.

## Revisión y merge

- PRs chicos (ideal: un objetivo claro).
- Al mergear, preferir **Squash and merge** para mantener historial limpio.
- Después de mergear: borra la rama remota y actualiza tu `dev` local.

