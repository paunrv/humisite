# Signature Events media

Drop curated assets here. The homepage reads them automatically.

```
public/signature-events/
  2018/
    poster.jpg       # 3:4
    photo-1.jpg      # 4:3
    photo-2.jpg      # 4:3
    recap.mp4        # optional
    thumbnail.jpg    # optional video poster frame
  2019/
    ...
```

## Stills

Replace a file in place — no React edits needed.

## Recap videos

Local files (preferred for build sync):

1. Drop `video/signature-events/{year}/recap.mp4` (or add a mapping in `scripts/sync-videos.mjs`).
2. Run `npm run sync:videos` (also runs on `dev` / `build`) → copies to
   `public/signature-events/{year}/recap.mp4` (gitignored).
3. In `src/lib/signature-events.ts`, spread `...eventRecap("YYYY")` on that event.

Or set fields directly:

```ts
recapVideo: "https://www.youtube.com/watch?v=……",  // or local path
recapThumbnail: "/signature-events/2024/poster.jpg", // optional; falls back to poster
```

If `recapVideo` is omitted, the player is hidden with no empty gap.

Optional `thumbnail.jpg` in the year folder can be used as `recapThumbnail`.
