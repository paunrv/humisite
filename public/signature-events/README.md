# Signature Events media

Drop curated assets here. The homepage reads them automatically.

```
public/signature-events/
  2018/
    poster.jpg       # 3:4 · required
    photo-1.jpg      # 4:3 · optional
    photo-2.jpg      # 4:3 · optional
    recap.mp4        # optional
    thumbnail.jpg    # optional video poster frame
  2019/
    ...
```

## Media hierarchy

1. **Poster** — required visual anchor  
2. **Recap video** — optional  
3. **Photo 1 / Photo 2** — optional  

The chapter layout adapts: missing photos or video are not rendered and leave no empty gaps.

## Stills

Replace a file in place — no React edits needed when the path already exists in
`src/lib/signature-events.ts`.

To omit a highlight photo, set `photo1` / `photo2` to `null` (or omit the field)
on that event — do not leave a broken path.

```ts
...eventPoster("2023"),
...eventRecap("2023"),
photo1: null,
photo2: null,
```

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

If `recapVideo` is omitted or `null`, the player is hidden with no empty gap.

Optional `thumbnail.jpg` in the year folder can be used as `recapThumbnail`.
