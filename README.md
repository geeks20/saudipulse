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
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
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

## Wiring up a backend later

All content and mock behaviour live in `src/data.js`:

- `submitStory(payload)` — currently resolves a mock; point it at `POST /api/stories`
- `answerFor(q)` — keyword-matched local answers; swap for a real retrieval/LLM endpoint
- The exported arrays (`regions`, `moments`, `stats`, `stories`, …) map 1:1 to
  future API resources

The card "Download" button is a placeholder hook for a 1080×1350 / 1200×675
export service.
