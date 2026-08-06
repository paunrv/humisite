# Curated Signature Events media (source drop)

Place original curated files here. Sync maps them to stable public paths.

```bash
npm run sync:signature-media   # stills → public/signature-events/{year}/
npm run sync:videos            # recaps → public/signature-events/{year}/recap.mp4
```

## Stills

| Drop this file | Becomes |
| --- | --- |
| `1st-tkdolympicbootcamp.jpg` | `2018/poster.jpg` |
| `1st-tkdolympicbootcamp-01.jpg` | `2018/photo-1.jpg` |
| `1st-tkdolympicbootcamp-02.jpg` | `2018/photo-2.jpg` |
| `2nd-tkdolympicbootcamp.jpg` | `2019/poster.jpg` |
| `2nd-tkdolympicbootcamp-01.jpg` | `2019/photo-1.jpg` |
| `2nd-tkdolympicbootcamp-02.jpg` | `2019/photo-2.jpg` |
| `ki-games.jpg` | `2023/poster.jpg` |

Do **not** include `*-03.jpg` — unused by design.

## Recap videos

Also accepted here (or in `video/` / `video/signature-events/{year}/`):

| Drop this file | Year |
| --- | --- |
| `Ruumble Humi.mp4` | 2022 |
| `ki games.mp4` | 2023 |
| `Taekwondo Games.mp4` | 2024 |

Filenames are matched case-insensitively. Spaces are fine.
