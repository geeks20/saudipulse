# Saudi Pulse — What's Needed to Make It Work Properly

## Current state

- ✅ Frontend complete and running (`npm run dev` → http://localhost:5173)
- ✅ Neon Postgres linked (`.env.local` has `DATABASE_URL`)
- ❌ No backend/API layer — everything dynamic is mocked in `src/data.js`
- ⚠️ The browser must never use `DATABASE_URL` directly (it would expose credentials)

## What's needed, in order

### 1. Database schema (5 min)

```sql
CREATE TABLE stories (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city        TEXT NOT NULL,
  trait       TEXT NOT NULL,
  text        TEXT NOT NULL CHECK (char_length(text) <= 280),
  name        TEXT,
  approved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 2. API layer (the real missing piece)

| Option | What it means | Best if |
|---|---|---|
| **Serverless functions** (Vercel/Netlify) | `api/stories.ts` using `@neondatabase/serverless`; deploys with the frontend | You want to ship publicly with zero servers to manage — **recommended** |
| **Tiny local server** (Hono/Express) | `server.ts` + Vite proxy `/api` → `:3000` | You want it working locally today |

Endpoints needed:

- `POST /api/stories` — submit a story
- `GET /api/stories` — approved stories for the archive
- `GET /api/pulse` — aggregates (counts per region, total) for the live section

### 3. Wire the frontend (already structured for this)

Everything funnels through `src/data.js` on purpose:

- `submitStory()` → `fetch('/api/stories', { method: 'POST', ... })`
- `Stories.jsx` → load archive from `GET /api/stories` (keep seed stories as fallback)
- `Pulse.jsx` → real counts from `/api/pulse` instead of the simulated ticker

### 4. Content moderation ⚠️

The story wizard publishes user-generated Arabic text to a public archive. Don't skip:

- `approved` flag (default `false`) + review step before stories appear in قصصنا
- Or an automated moderation pass (Claude API) on submission

### 5. Card "Download" button

Currently an `alert()` placeholder. Easiest fix is client-side:
render the card to `<canvas>` (or use `html-to-image`) → 1080×1350 PNG download.
No server needed.

### 6. Deployment

- [ ] `git init` + first commit (project is not a repo yet)
- [ ] Deploy to Vercel / Netlify / Cloudflare
- [ ] Set `DATABASE_URL` as a **server-side** env var on the platform
- [ ] Favicon + OG/Twitter meta tags (matters for the "Share on X" flow)

## Optional / later

- **اسأل السعودية** → real answers via Claude API instead of keyword matching
- Timeline shows ٢٦/٩٦ moments — 70 more entries to write for the full "96 moments"
- Rate limiting on story submission
- Analytics

## Recommended path

Do **1 → 3** first (schema, small server locally, wire `submitStory` + archive).
That makes the core loop genuinely work end-to-end today, and the same handlers
move to serverless functions unchanged when deploying.
