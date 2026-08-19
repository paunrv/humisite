# Experiencias HUMI — fotos y videos

Drop **jpg / mp4** into the **year folders** in this directory.

Do **not** drop files onto `src/lib/signature-events.ts`. That is a TypeScript file, not a folder — the editor cannot put a photo inside it.

## Where to drop (sidebar)

1. Scroll to the repo root (same level as `src`, not inside it).
2. Expand **`public`**.
3. Expand **`signature-events`**.
4. Drop into the matching year:

| Folder | Event |
| --- | --- |
| `2025/` | Sunday Funday |
| `2024/` | Taekwondo Games |
| `2023/` | KI Games |
| `2022/` | Rumble HUMI |
| `2019/` | 2º Bootcamp Olímpico |
| `2018/` | 1er Bootcamp Olímpico |

Suggested names (any name works; these keep the tree easy to read):

| Year | Poster | Extra stills | Video (optional) |
| --- | --- | --- | --- |
| 2025 | `sunday-funday-poster.jpg` | `sunday-funday-01.jpg`, `sunday-funday-02.jpg` | `.mp4` in this folder |
| 2024 | `taekwondo-games.jpg` | `taekwondo-games-01.jpg`, `taekwondo-games-02.jpg` | `.mp4` in this folder |
| 2023 | `ki-games.jpg` | `ki-games-01.jpg`, `ki-games-02.jpg` | `.mp4` in this folder |
| 2022 | `rumble-humi.jpg` | `rumble-humi-01.jpg`, `rumble-humi-02.jpg` | `.mp4` in this folder |
| 2019 | `2nd-tkdolympicbootcamp.jpg` | `…-01.jpg`, `…-02.jpg` | `.mp4` in this folder |
| 2018 | `1st-tkdolympicbootcamp.jpg` | `…-01.jpg`, `…-02.jpg` | `.mp4` in this folder |

After the files appear here, list them on that event’s `media` array in `src/lib/signature-events.ts`.

Supported types: `poster` | `image` | `video`.

Composition (derived automatically):

| Available media | Layout |
| --- | --- |
| Poster + 2 images | Editorial photo layout |
| Poster + video | Poster + large inline video |
| Video only | Large inline video |
| Poster only | Poster only |

Videos may also reuse paths already synced by `npm run sync:videos` (e.g. `/videos/moments/...`).
