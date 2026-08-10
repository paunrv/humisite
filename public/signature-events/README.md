# Experiencias HUMI — media pública

List media on each event in `src/lib/signature-events.ts`:

```ts
media: [
  { type: "poster", src: "/signature-events/2025/sunday-funday-poster.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-01.jpg" },
  { type: "image", src: "/signature-events/2025/sunday-funday-03.jpg" },
]
```

Supported types: `poster` | `image` | `video`.

Composition (derived automatically):

| Available media | Layout |
| --- | --- |
| Poster + 2 images | Editorial photo layout |
| Poster + video | Poster + large inline video |
| Video only | Large inline video |
| Poster only | Poster only |

Put stills under `public/signature-events/{year}/`. Videos may live there too, or reuse paths already synced by `npm run sync:videos` (e.g. `/videos/moments/...`).
