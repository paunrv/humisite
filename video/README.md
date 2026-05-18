# Source videos (Instagram reels)

## Intro panels (`public/videos/intro/`)

| Source in `video/` | Panel | Output |
| --- | --- | --- |
| `instagram-reel-04.mp4` | Form (col. 1) | `form.mp4` |
| `instagram-reel-05.mp4` | Human (col. 2) | `human.mp4` |
| `instagram-reel-01.mp4` | Energy (col. 3) | `energy.mp4` |

## Moments (`public/videos/moments/`)

| Source in `video/` | Context | Output |
| --- | --- | --- |
| `taekwondo-training.mp4` | Movement, discipline, rhythm | `taekwondo-training.mp4` |
| `taekwondo-games.mp4` | Playfulness, community | `taekwondo-games.mp4` |

Legacy names `instagram-reel-08.mp4` / `instagram-reel-09.mp4` are imported from `../humisite/video/` on first sync if the semantic files are not present yet.

Run `npm run sync:videos` (included in `dev` and `build`).
