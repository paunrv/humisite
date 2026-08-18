# Experiencias HUMI — imágenes

Drop or replace JPGs here. Paths are public and direct:

```text
/experiencias-humi/<filename>.jpg
```

Wire them in `src/lib/experiencias-humi.ts` on each event’s `media` array.

## Current files

| File | Used by |
| --- | --- |
| `sunday-funday-poster.jpg` | Sunday Funday (poster) |
| `sunday-funday-01.jpg` | Sunday Funday (image) |
| `sunday-funday-04.jpg` | Sunday Funday (image) |
| `taekwondo-games.jpg` | Taekwondo Games (poster) |

## Replace an image (no code change)

Overwrite the file with the **same filename**, then deploy.

## Add a new image

1. Add the file to this folder.
2. Add `{ type: "image", src: "/experiencias-humi/your-file.jpg" }` to that event in `src/lib/experiencias-humi.ts`.

No sync scripts. No generated maps.
