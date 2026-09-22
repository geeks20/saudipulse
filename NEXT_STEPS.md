# Saudi Pulse — Status & Remaining Steps

## Done ✅

- [x] **Schema** — `stories` table on Neon (`db/schema.sql`, applied + seeded via `npm run migrate`)
- [x] **API server** — Express (`server/index.js`): `POST/GET /api/stories`, `GET /api/pulse`, `GET /api/health`; validation, per-IP rate limiting (5/hour), serves the built frontend
- [x] **Frontend wired** — `submitStory()` posts to the API; archive (قصصنا) loads from Neon and refreshes after submit; live pulse counter seeds from real totals
- [x] **Moderation** — `approved` flag; `AUTO_APPROVE=false` env var holds submissions for review (`UPDATE stories SET approved = true WHERE id = ...`). Default is auto-approve.
- [x] **Card download** — real 1080×1350 PNG rendered on canvas (`src/cardExport.js`)
- [x] **Meta** — favicon + OG/Twitter tags in `index.html`
- [x] **Git** — repo initialized, first commit done
- [x] **Railway config** — `railway.json` (build + `npm start` + `/api/health` healthcheck)
- [x] End-to-end verified in browser: wizard submit → Neon → archive refetch → PNG download, zero console errors

## Blocked ⚠️ — Railway billing

`railway init` failed: **"Your trial has expired. Please select a plan to continue using Railway."**

After choosing a plan at https://railway.com/account/billing, deploy with:

```bash
railway init --name saudipulse        # create the project
railway variables --set "DATABASE_URL=<pooled Neon URL from .env.local>"
railway up                            # build + deploy
railway domain                        # get a public URL
```

Optional variables: `AUTO_APPROVE=false` (manual moderation), `PORT` is set by Railway automatically.

## Local development

```bash
npm run server   # API on :8787 (reads .env.local)
npm run dev      # Vite on :5173, proxies /api → :8787
```

## Optional / later

- اسأل السعودية → real answers via Claude API instead of keyword matching
- Timeline: 70 more moments for the full ٩٦/٩٦
- OG image (`og:image`) — could reuse the card renderer server-side
- Analytics
