# Experiencias HUMI — media pública

Put stills directly in year folders and reference the public paths in
`src/lib/signature-events.ts` (`images: [...]`).

```
public/signature-events/
  2025/
    sunday-funday-poster.jpg
    sunday-funday-01.jpg
    sunday-funday-03.jpg
  2024/
    taekwondo-games.jpg
```

No sync step. No generated media map. Missing images are simply omitted from
the event’s `images` array — the UI renders only what you list.
