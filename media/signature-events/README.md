# Media curada — Experiencias HUMI

Signature Events no longer sync from this folder. Do not drop new photos here.

1. Drop jpg / mp4 under `public/signature-events/{year}/` (the year **folder**, not `src/lib/signature-events.ts`)
2. Describe them on the event’s `media` array in `src/lib/signature-events.ts`

```ts
media: [
  { type: "poster", src: "/signature-events/2025/sunday-funday-poster.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-01.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-04.jpg" },
]
```
