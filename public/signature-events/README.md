# Signature Events media

Curated sources are dropped in `media/signature-events/` (and `video/`), then synced here.

```
public/signature-events/
  2018/
    poster.jpg       # 3:4 · optional
    photo-1.jpg      # 4:3 · optional
    photo-2.jpg      # 4:3 · optional
  2019/ …
  2022/recap.mp4     # video only
  2023/poster.jpg + recap.mp4
  2024/recap.mp4     # video only
```

## Media rules

| Event has | Renders |
| --- | --- |
| Poster + photos | Both |
| Poster + video | Both |
| Video only | Copy + recap — no empty poster/photo slots |

Omit or set `poster` / `photo1` / `photo2` / `recapVideo` to `null` in
`src/lib/signature-events.ts` to hide that media. Never leave a broken path.

## Sync

```bash
npm run sync:signature-media
npm run sync:videos
```

See `media/signature-events/README.md` for curated source filenames.
