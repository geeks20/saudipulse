# النبض السعودي — Saudi Pulse

Single-page RTL microsite for the 96th Saudi National Day (23.09.2026):
"وش اللي يخلّي السعودية… سعودية؟"

Implemented from the Claude Design file in `design/Saudi Pulse.dc.html`.

## Stack

- Vite + React 18
- `d3-geo` + `topojson-client` for the Kingdom map (world-atlas TopoJSON fetched at runtime)
- Fonts: Alexandria, Manrope, IBM Plex Mono (Google Fonts)

## Run

```bash
npm install
npm run migrate  # apply schema + seed to Neon (reads .env.local)
npm run server   # Express API on :8787 (stories, pulse, health)
npm run dev      # http://localhost:5173 (proxies /api → :8787)
npm run build    # production build in dist/
npm start        # production: migrate + serve API and dist/ on one port
```

## Sections

1. Hero — ambient Saudi map with breathing city pins
2. طباعنا — six identity traits
3. المناطق — interactive 13-region map explorer (click pins or chips)
4. ٩٦ لحظة — filterable timeline of moments
5. السعودية الآن — stats with expandable sources + 2026 milestones
6. نبض اليوم — simulated live story pings and top-region bars
7. Heritage counters — animate on scroll (IntersectionObserver)
8. اصنع قصتك — 3-step wizard producing a shareable 1080×1350 card preview
9. قصصنا — masonry story archive
10. اسأل السعودية — mock Q&A (keyword-matched local answers)

The nav EN/AR toggle switches body copy language for traits, region details,
and timeline descriptions.

## Imagery

Section imagery is curated from **Wikimedia Commons** (`src/images.js`) —
hand-picked photos of the actual landmarks (Hegra, Masmak, Rijal Almaa,
At-Turaif, Jubbah rock art, …), hotlinked at display resolution with the
CC/PD credit rendered on each image as the licenses require. Slots without
a worthy match (e.g. Tabuk, Najran, a few timeline moments) fall back to
the design's styled placeholder. To swap or add an image, edit the slot's
entry in `src/images.js` (`trait-<id>`, `region-<id>`, `m-<moment id>`).

## Backend

Express server (`server/index.js`) on Neon Postgres:

- `POST /api/stories` — submit a story (validated, rate-limited 5/hour/IP;
  `AUTO_APPROVE=false` holds submissions for manual review)
- `GET /api/stories` — approved stories for the قصصنا archive
- `GET /api/pulse` — totals + per-city counts for the live section
- `GET /api/health` — healthcheck (used by Railway)

Schema lives in `db/schema.sql`; `npm run migrate` is idempotent and runs
automatically on `npm start`. The card Download button renders a real
1080×1350 PNG client-side (`src/cardExport.js`).

Still mocked: `answerFor(q)` in `src/data.js` (اسأل السعودية) — swap for a
real retrieval/LLM endpoint when ready.

## Deploy (Railway)

Single service: `railway.json` builds the frontend and starts `npm start`.

```bash
railway init --name saudipulse
railway variables --set "DATABASE_URL=<pooled Neon URL>"
railway up && railway domain
```
