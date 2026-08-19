# Experiencias HUMI — media

Each year lives in its own folder. Served as `/signature-events/<year>/...`.

```
public/signature-events/
  2025/   Sunday Funday
  2024/   Taekwondo Games
  2023/   KI Games
  2022/   Rumble HUMI Interno WTU
  2019/   2º Bootcamp Olímpico de TKD
  2018/   1er Bootcamp Olímpico de TKD
```

To add a future event:

1. Drop the poster, photos, and/or video into `public/signature-events/<year>/`
2. Add one object to `SIGNATURE_EVENTS` in `src/lib/signature-events.ts` (newest first)
3. Every video must set `poster` to a still from that same year — never infer it

Do not put Signature Event assets in `/videos`, `/images`, or `media/signature-events`.
