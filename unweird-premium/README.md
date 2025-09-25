# Unweird — premium demo

Evidence-first AI detector + humanizing rewrites. Privacy by default.

## Local dev

```bash
npm i
npm run dev
```

## Deploy (Vercel)

1. Push this folder to GitHub.
2. In Vercel, “Add New Project” → Import your repo → Deploy.
3. (Optional) Add `OPENAI_API_KEY` later if you wire real model calls (not required for this demo).

## Notes

- No secrets are included.
- Detection and rewrite logic here are heuristic/stubbed so the app is self‑contained.
- Replace heuristics with your models/service calls when ready.
