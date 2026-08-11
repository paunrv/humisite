# Media curada — Experiencias HUMI

Signature Events no longer sync from this folder.

1. Add files under `public/signature-events/{year}/` (or use synced `/videos/...` paths)
2. Describe them on the event’s `media` array in `src/lib/signature-events.ts`

```ts
media: [
  { type: "poster", src: "/signature-events/2025/sunday-funday-poster.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-01.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-03.jpg" },
]
```
