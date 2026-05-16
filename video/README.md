# Source videos (Instagram reels)

## Intro panels (`public/videos/intro/`)

| Source in `video/` | Panel | Output |
| --- | --- | --- |
| `instagram-reel-01.mp4` | Form | `form.mp4` |
| `instagram-reel-02.mp4` | Human | `human.mp4` |
| `instagram-reel-03.mp4` | Energy | `energy.mp4` |
| `instagram-reel-04.mp4` | Presence | `presence.mp4` |

## Moments (`public/videos/moments/`)

| Source in `video/` | Context | Output |
| --- | --- | --- |
| `taekwondo-training.mp4` | Movement, discipline, rhythm | `taekwondo-training.mp4` |
| `taekwondo-games.mp4` | Playfulness, community | `taekwondo-games.mp4` |

Legacy names `instagram-reel-08.mp4` / `instagram-reel-09.mp4` are imported from `../humisite/video/` on first sync if the semantic files are not present yet.

Run `npm run sync:videos` (included in `dev` and `build`).
