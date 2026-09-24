# MINNA — Production Handoff & Source of Truth

> **Read this before touching anything.** This file is the checkpoint of the MINNA
> application as deployed on 2026-09-24. It exists so that no future coding model
> redesigns, rewrites, or regresses working functionality. See **DO NOT REGRESS
> THESE** near the end.

---

## 1. Identity

| | |
|---|---|
| Brand | **منّا** / **MINNA SAUDI** |
| Production | https://minnasaudi.app |
| Repo remote | https://github.com/geeks20/saudipulse (branch `main`) |
| Legacy name | "Saudi Pulse / النبض السعودي" — internal only (repo folder name, `sp-` CSS prefixes). Never resurface it publicly. |
| National Day identity | **عزّنا بطبعنا** (official wording — never rewrite casually) |
| Campaign line | **من كل ديرة… حكاية. ومن كل حكاية… شيء منّا.** («شيء منّا.» rendered in gold `#D9B778`) |
| Supporting line | ٩٦ عاماً · ١٣ منطقة · ٦ طباع · ملايين الحكايات |
| Primary CTAs | «اكتشف السعودية» (→ `#regions`) · «وش قصتك؟» (→ `#story`) |
| Occasion | 96th Saudi National Day — ٢٣ سبتمبر ٢٠٢٦ / 23.09.2026 |

**Checkpoint commits** (verified in git):
- `dfe42d9` — Docs: CHANGES.md factual-integrity pass + deploy status (HEAD at checkpoint time)
- `98d7b8d` — New hero campaign headline + sensitivity, tone, and factual-integrity audit
- `88e712e` — MINNA rebrand, region deep-dives, CTA audit, story moderation

Full change narrative: `CHANGES.md`. Earlier status/backlog: `NEXT_STEPS.md`. Original build notes: `README.md`.

---

## 2. What MINNA Is

A premium, single-page, RTL-first interactive digital experience for Saudi National Day 96. It tells Saudi Arabia's story through 13 regions, 6 identity traits, a 96-year timeline of sourced moments, verified national statistics, real community story submissions, and a personalized downloadable story card.

It should feel: **Saudi, premium, editorial, warm, modern, cinematic, culturally grounded.**
It must NOT feel like: generic SaaS, a government dashboard, a tourism template, an AI-generated website, or a corporate portal.

Page flow (all in `src/App.jsx`, one page, `dir="rtl"`):
Nav → Hero → Traits (طباعنا) → Regions (المناطق, interactive map + deep-dive) → Moments (٩٦ لحظة timeline) → NowStats (السعودية الآن) → Pulse (نبض اليوم) → Heritage (full-screen counters) → StoryBuilder (اصنع قصتك) → Stories (قصصنا archive) → AskSaudi (اسأل السعودية) → Footer.

---

## 3. Stack & Architecture

- **Frontend:** Vite 6 + React 18. Styling is ~all **inline `style` objects in components**; `src/styles.css` (43 lines) holds only resets, keyframes, focus-visible, hover classes, and reduced-motion rules. There is no CSS framework and no Tailwind. Do not introduce one.
- **Map:** `d3-geo` + `topojson-client`; Saudi outline fetched at runtime from `world-atlas@2.0.2` on jsDelivr (`src/useGeo.js`, module-level cache).
- **Backend:** Express 5 (`server/index.js`) + Neon Postgres (`pg` pool). Single service serves both the API and the built `dist/`.
- **Analytics:** Simple Analytics (privacy-first, DNT collection on) — script tag in `index.html`.
- **Fonts:** Google Fonts — Alexandria (Arabic display/headlines), Manrope (English secondary), IBM Plex Mono (labels/numerals). Loaded in `index.html`.
- **Node:** >= 20 (`engines` in package.json).

### npm scripts
| Script | Does |
|---|---|
| `npm run dev` | Vite on :5173, proxies `/api` → :8787 (`vite.config.js`) |
| `npm run server` | Express on :8787, reads `.env.local` |
| `npm run build` | Production build → `dist/` |
| `npm run migrate` | Apply `db/schema.sql` + seed (idempotent) |
| `npm start` | **Production entry:** migrate then serve API + `dist/` on one port |

---

## 4. Design System (extracted from code — do not invent values)

### Colors
| Token | Value | Use |
|---|---|---|
| Deep green (hero/dark sections) | `#06281B` | Hero, Regions, StoryBuilder backgrounds |
| Primary green | `#0B3A28` | NowStats, AskSaudi, card, dark story tiles |
| Darkest green | `#042015` | Pulse, Footer |
| Map fill green | `#0E4530` | Kingdom SVG fill, image placeholders |
| Cream (light background) | `#F7F3EA` | Body bg, light sections, light text on dark |
| Ink | `#14120E` | Body text on cream |
| Gold accent | `#D9B778` (`ACCENT` in `src/utils.js`) | Highlights, gold CTA, selected chips |
| Deep gold | `#C08A2E` | Links hover, focus outline, ◆ bullets, nav dot |
| Success green | `#7CD8A4` | LIVE dot, submit success text |
| Error salmon | `#E8A48E` | Form errors |

### Typography
- Arabic display: **Alexandria** (700 headlines, 600 subheads, weights 400–700).
- English secondary: **Manrope** (300 light, always `direction: ltr`, often `textAlign: right`).
- Labels/numbers/sources: **IBM Plex Mono** with letter-spacing `.1em–.34em`.
- Headline scale via `clamp()` everywhere, e.g. hero h1 `clamp(29px,4vw,58px)`, section h2 up to 72px.

### Patterns to preserve
- Section header formula: mono kicker (`٠٢ — THE MAP` style, gold, tracked) → Arabic h2 (Alexandria 700) → light English echo line (Manrope 300, LTR).
- Bilingual pairing everywhere: Arabic primary, small faded English secondary.
- Pill radius `999` for buttons/chips; cards radius `3–4px`; borders `1px solid rgba(247,243,234,.1–.22)` on dark.
- Diamond/diagonal `repeating-linear-gradient` texture layers on dark sections and image placeholders.
- Motion: `sp-rise`, `sp-fade`, `sp-breathe`, `sp-ping`, `sp-sweep`, `sp-blink` keyframes; eased with `cubic-bezier(.16,1,.3,1)`; all effectively disabled under `prefers-reduced-motion`.
- Focus: global gold `:focus-visible` outline (2px `#C08A2E`, offset 3px) — including SVG map nodes.
- Responsiveness is flex-wrap + `clamp()` driven, not media queries. `flex: '1 1 min(100%,Xpx)'` is the layout idiom. Reference widths QA'd: 1280px desktop, 390px mobile.
- Map treatment: dark green kingdom silhouette, gold-stroked border, diagonal hatch clip, three modes (hero ambient pins / big interactive / pulse pings).

---

## 5. Arabic Copy System

Established voice: **modern Saudi conversational Arabic + classical Arabic elegance.**

- Saudi conversational — CTAs, questions, emotional hooks, participation, community: «وش قصتك؟», «خذ لك لفة في…», «جملة وحدة تكفي…», «أخذت راحتك اليوم — جرّب بكرة.»
- Polished/formal — history, statistics, factual descriptions, sources.

Avoid: forced slang, stiff government Arabic, literal English translation, cheesy patriotic language, unnecessarily sensitive language, reductive historical framing.

**Editorial principle:** جذور نفتخر فيها → حاضر نعيشه → حكاية مستمرة — **NOT** ماضٍ بسيط → حاضر متطور.

Official wording «عزّنا بطبعنا» must never be casually rewritten. It appears in: Traits h2, the story card (on-page + PNG), and Footer.

The nav EN/AR toggle switches *body copy* language (traits, region details, timeline descriptions) — headlines and structure stay Arabic-first.

---

## 6. Sensitivity Rules (already applied — keep them)

- No "backwardness", poverty framing, or "primitive" historical contrast. Old settlements/architecture/lifestyles are described respectfully; historic Saudi is never a negative foil for modern Saudi.
- Continuity framing everywhere: roots → heritage → people → present → future.
- No region/tribe superiority; no group is "more Saudi" than another. No political controversy, religious insensitivity, conflict, or social-division content.
- Specific decision of record: Hegra's carvers are attributed to the **Nabataeans** (الأنباط), not ثمود — Thamud carries Qur'anic weight (a punished people) and RCU's own framing is Nabataean. Keep it.
- Community submissions are also guarded for this by AI moderation (see §11).

The full before/after table of the sensitivity audit is in `CHANGES.md` §3.

---

## 7. Factual Integrity Rules

Every number, date, historical attribution, UNESCO statement, population figure, "first/largest" superlative, and 2025/2026 claim must have supporting evidence. If evidence doesn't confidently support a claim: **soften or remove — never invent a replacement.**

**Editorial vs sourced separation (enforced in the data):**
- Campaign/editorial language lives only in `quote` / `storyAr` / `storyEn` fields — no source labels there.
- Sourced claims live only in `facts`, `numbers`, `stats`, `heritage`, `moments` blocks — each carries a source chip (`src`/`source` fields).
- Derived arithmetic (e.g. Riyadh ≈25% of population) was **removed** rather than presented as if officially published. Regional POPULATION figures are labeled `GASTAT · CENSUS 2022`.

Corrections already made (do not revert; full table in `CHANGES.md` §3.3–3.5): hedged superlatives (Jeddah port, Riyadh Season, Soudah peak), Dakar-from-Hail year → 2022, درب زبيدة → ١٢٠٠+ عام, Hejaz Railway → line-length claim instead of unverifiable arrival year, Sharaan reserve moved out of Tabuk (it's in AlUla), Najran storeys → «قد تبلغها», 1953 Council of Ministers no longer called «أول», Well No. 7 preceded by *six* (not seven) attempts.

Deliberately kept (verified): Al-Ahsa «أكبر واحة نخيل في العالم» (UNESCO's own language), KSU «أول جامعة» (1957), first tourist visa (2019), Hegra first Saudi UNESCO site (2008), 1727/1824/1902 per official Darah historiography.

Sources actually present in the dataset: GASTAT, UNESCO, DARAH, SPA, ARAMCO, RCU, RCRC, RCJY, MOC, MEWA, MT (Ministry of Tourism), MOI, NCW, NCPD, MAADEN, NEOM, SOUDAH DEVELOPMENT, HERITAGE COMMISSION, GEA, SAFF, NASA, KSU, DAKAR, RIYADH AIR, VISION 2030.

---

## 8. Region Architecture (13 regions, ONE implementation)

**There is exactly one shared region-detail implementation. Never create 13 copies.**

- `src/data.js` → `regions` (array: id, ar/en names, lat/lng, pop, trait, quote, historyAr/En, nowAr/En, facts) and `regionDetails` (keyed object: shortAr, storyCity, cities, places, storyAr/En, numbers). At module load, `regionDetails` is merged into each region: `regions.forEach((r) => Object.assign(r, regionDetails[r.id]))`.
- `src/components/Regions.jsx` — section: interactive `MapSvg` (mode `big`) + chip list + summary aside for the active region. Ghost CTA «خذ لك لفة في {shortAr} ←» toggles/scrolls the deep-dive panel.
- `src/components/RegionDetail.jsx` — the ONE shared deep-dive, fully data-driven. Fixed sequence:

  **٠١ من المكان (PLACES) → ٠٢ من الحكاية (THE STORY) → ٠٣ السعودية الآن (RIGHT NOW) → ٠٤ بالأرقام (IN NUMBERS, each with source chip) → ٠٥ قصص من المنطقة (COMMUNITY) → «وش قصتك مع {shortAr}؟» (gold CTA)**

- Community block filters real approved stories by the region's `cities` array (top 3); honest empty state: «ما وصلتنا قصص من {المنطقة} بعد — خلّ قصتك أول حكاية تنكتب منها.»
- The final CTA dispatches `sp:prefill-story` with `region.storyCity` and smooth-scrolls to `#story`; StoryBuilder preselects that city and jumps to step 2.
- `shortAr` is the locative name used inside CTA sentences (e.g. مكة, الشرقية, المدينة).

The 13 regions (ids in `data.js`): riyadh الرياض, makkah مكة المكرمة, madinah المدينة المنورة, eastern المنطقة الشرقية, aseer عسير, jazan جازان, qassim القصيم, tabuk تبوك, hail حائل, jawf الجوف, najran نجران, northern الحدود الشمالية, bahah الباحة.

**Same component + different regional data = different regional story.** That is the contract.

Region → storyCity mapping: riyadh→الرياض, makkah→مكة المكرمة, madinah→المدينة المنورة, eastern→الدمام, aseer→أبها, jazan→جازان, qassim→بريدة, tabuk→تبوك, hail→حائل, jawf→سكاكا, najran→نجران, northern→عرعر, bahah→الباحة.

---

## 9. CTA Contract

**Core rule: NO CTA MAY LOOK CLICKABLE WITHOUT DOING SOMETHING MEANINGFUL.**

`src/components/Cta.jsx` is the one shared CTA (used in Hero, Regions, RegionDetail, StoryBuilder, AskSaudi, Footer):
- Variants: `solid` (cream pill), `gold` (accent pill), `ghost` (outline on dark).
- `href` → renders `<a>`; `onClick` → renders `<button type="button">`.
- `disabled`/`loading` → 0.4 opacity, `not-allowed` cursor, button truly disabled, `aria-busy` when loading.
- Hover via `.sp-cta-solid` / `.sp-hover-gold` classes; focus via global `:focus-visible`; min-height 44px (touch target); pill radius 999.
- Documented in the component itself: *"Never render this without a real href/onClick — if the action doesn't exist yet, show plain text instead of a Cta."*

Known audited behaviors (all verified in the CTA audit, `CHANGES.md` §1):
- «خذ لك لفة في {المنطقة}» opens + scrolls to the correct region's detail panel (label is dynamic per active region).
- StoryBuilder «التالي» disabled until the current step has a choice; «رجوع» not rendered on step 1.
- Submit shows «جاري الإرسال…» and blocks duplicate requests while pending.
- «نسخ الرابط» shows «تم النسخ ✓» only after actual clipboard success; try/catch fallback message otherwise.
- Ask Saudi «اسأل» disabled while input is empty; Enter key also guarded.
- Anchors smooth-scroll with `scroll-margin-top: 76px` (fixed-nav clearance); smooth scrolling disabled under reduced motion (CSS + JS `prefersReducedMotion()`).

---

## 10. Story Builder (`src/components/StoryBuilder.jsx`)

Flow: choose city (17 options) → choose trait (6) → write ≤one-sentence story + optional first name → submit → success message → download/share the MINNA card.

- **Client validation:** step gating; all three steps required before submit; word-filter check (`src/moderation.js`) before submit/download/share; server error «invalid city» mapped to Arabic message.
- **Server validation** (`server/index.js` POST `/api/stories`): city ∈ CITIES list, trait ∈ TRAITS list, text 1–280 chars (control chars stripped), name ≤ 60 chars, word filter, AI check, per-IP rate limit 5/hour (in-memory), JSON body ≤ 8kb.
- **Cities (client + server lists must stay in sync):** الرياض، جدة، مكة المكرمة، المدينة المنورة، العلا، أبها، الدمام، الخبر، الأحساء، تبوك، بريدة، حائل، جازان، سكاكا، نجران، عرعر، الباحة.
- **Traits:** الشجاعة، الرؤية، الأصالة، الهمة، الجود، الكرم — card headline via `traitHeadlines` («عزّي برؤيتها» etc.).
- **Prefill:** listens for `sp:prefill-story` (from RegionDetail) → sets city, jumps to step 2.
- **After submit:** dispatches `sp:story-submitted` → Stories archive, Pulse, and RegionDetail all refetch. If held for moderation (`approved:false`), success copy says it will appear after review.
- **Card:** live on-page preview (1080×1350 aspect) + real PNG download via canvas (`src/cardExport.js`, `minna-card.png`, Alexandria/Plex Mono, عزّنا بطبعنا footer). Share to X opens an intent URL with the quote + #اليوم_الوطني_السعودي_96 + site link.
- **Storage:** Neon Postgres `stories` table (see §12). No secrets client-side.

---

## 11. Moderation (three layers — decisions of record in NEXT_STEPS.md)

1. **Word filter** — `src/moderation.js`: Arabic + English blocklist, normalization (diacritics, hamza forms, ة→ه, ى→ي), word-boundary + ≥4-char substring matching. Shared by client (blocks submit/download/share) and server. Rejection message: «خلّنا نخلي الكلام طيب — عدّل النص وجرّب مرة ثانية.»
2. **AI meaning check** — `server/aiModeration.js`: Claude (`AI_MODERATION_MODEL`, default `claude-haiku-4-5`) via `ANTHROPIC_API_KEY` or Neon AI Gateway vars; classifies each submission (hostility, extremism, mockery, profanity, hate, sectarian content, spam, contact info, prompt-smuggling → reject). **Fails open to the manual queue** — 'unavailable' never publishes anything unchecked.
3. **Manual approval (default)** — submissions insert with `approved = false` unless `AUTO_APPROVE=true`. Review UI at `/admin` (`server/admin.html`, noindex; enter `ADMIN_TOKEN` once). Admin API (all `Authorization: Bearer <ADMIN_TOKEN>`): `GET /api/admin/stories` (pending), `POST /api/admin/stories/:id/approve`, `DELETE /api/admin/stories/:id` (pending only).

---

## 12. Data Architecture

**Static content (`src/data.js`, single module — nothing reaches raw objects except via its exports):** `traits` (6), `regions` + `regionDetails` (13), `moments` (26 timeline entries, each with `src` source tag; ids disambiguated for 2019/2024/2026 collisions), `categories`, `stats` (5, sourced), `milestones` (6), `heritage` (3 counters), `cities`, `traitNames`, `traitHeadlines`, `pulseCities` (6 map ping cities), `askMock` + `answerFor()` (Ask Saudi), `cityEnMap`, `timeAgoAr()`, and the API layer (`fetchStories`, `fetchPulse`, `submitStory`).

**Imagery (`src/images.js` + `SlotImage.jsx`):** curated Wikimedia Commons photos, hotlinked, CC/PD credit rendered on-image as licenses require. Slot keys `trait-<id>`, `region-<id>`, `m-<moment id>`; missing slots keep the styled placeholder. Regions without a worthy image (tabuk, najran, northern, madinah-city…) intentionally fall back.

**Database (Neon Postgres):** one table, `stories` (`db/schema.sql`): id, city, trait, text (1–280 check), name, approved (default false), created_at + index on (approved, created_at DESC). Migration `scripts/migrate.mjs` is idempotent, runs on every `npm start`, uses `DATABASE_URL_UNPOOLED` when present, and **seeds 9 curated demo stories (approved, fictional names/timestamps) only when the table is empty**.

**API (Express, `server/index.js`):**
| Endpoint | Purpose |
|---|---|
| `GET /api/health` | DB-backed healthcheck (Railway uses it) |
| `GET /api/stories` | 60 newest approved stories (archive + region blocks) |
| `POST /api/stories` | Submission (validation chain in §10–11) |
| `GET /api/pulse` | Real totals: approved count, top-5 cities, most-chosen trait |
| `/api/admin/*` | Moderation (Bearer token, §11) |
| `GET /admin` | Moderation UI |
| static + SPA fallback | serves `dist/` for all non-`/api` paths |

---

## 13. Live Data Rule

**MINNA must never present simulated activity as real activity.**

Current state, verified in code:
- Pulse counter («قصة وصلتنا»), top-city bars, and «MOST CHOSEN TRAIT» all derive from **real production data** via `GET /api/pulse`; shows `—` until loaded. ✅
- Map pings in Pulse are **decorative ambient shimmer** on random cities — the code comments them as "not tied to any activity claim". ⚠️ They still sit inside a section labeled `LIVE`, so a viewer may read them as story events. This was flagged in `CHANGES.md` as a pending product decision. Do not "fix" without a product call.
- «١٣ منطقة نابضة» is a static fact (13 regions), not a live metric. ✅
- Honest empty states exist and must be kept: archive «الأرشيف ينتظر أول حكاية… خلّها حكايتك.», region block «ما وصلتنا قصص من {المنطقة} بعد…». 0 is an acceptable value.
- ⚠️ **Seed data:** the 9 demo stories from `scripts/migrate.mjs` (fictional authors أحمد، نورة، Layla…) were seeded as approved and appear in the archive/pulse alongside real submissions, indistinguishable from them. Known issue — see §18.

Rule going forward: if community data exists, derive metrics from it; if none exists, show the true value (including 0) with an honest empty state such as «كن أول من يضيف حكاية من منطقتك». Never fake engagement.

---

## 14. Ask Saudi (`src/components/AskSaudi.jsx`)

- **Static, deterministic, keyword-matched mock** — `answerFor(q)` in `src/data.js`. NOT AI-powered, NOT an API. Do not describe or extend it as AI without building that for real.
- 5 curated answers (AlUla, 1932, UNESCO sites, Riyadh, Asir) with source chips (UNESCO, DARAH, RCU, GASTAT, RCRC, MOC…), matched on keywords in English or Arabic; 5 suggestion chips.
- Honest fallback for unmatched questions: «إجاباتنا هنا من أرشيف مختار… جرّب أحد الاقتراحات.» — it does not pretend to know.
- Input validation: button disabled and Enter ignored while input is empty.
- Upgrading to a real retrieval/LLM endpoint is a known backlog item (`NEXT_STEPS.md`), not current behavior.

---

## 15. Accessibility Contract

- Global gold `:focus-visible` outline on links, buttons, inputs, textareas, and `[role="button"]` (covers SVG map nodes).
- SVG map regions: `tabIndex={0}`, `role="button"`, Arabic+English `aria-label`, Enter/Space activation, 26px-radius invisible hit target.
- Real `disabled` on buttons + `aria-busy` when loading; `cursor: not-allowed`.
- `prefers-reduced-motion`: CSS kills animations/transitions and smooth scroll; JS `prefersReducedMotion()` guards programmatic smooth scrolling and the Pulse ping interval.
- Smooth scrolling + `scroll-margin-top: 76px` on all `[id]` targets (fixed nav clearance).
- Min 44px touch targets on CTAs and choice chips.
- Semantics: `header/nav/section/article/aside/blockquote/footer`, one h1 (hero), labeled inputs (`aria-label`), decorative layers `aria-hidden="true"`, map `role="img"` with Arabic label, images have alt text, admin page `noindex`.

---

## 16. Testing — honest status

**There is no committed automated test suite.** No test files, no test script in `package.json`, no Playwright config in the repo (`playwright-core` sits in devDependencies as leftover tooling from the audit sessions).

- The known "47/47 Playwright checks (desktop 1280px, mobile 390px, keyboard, zero console errors)" from `CHANGES.md` was an **ad-hoc scripted QA run during the CTA-audit session** — real, but not reproducible from committed code.
- Verification performed for this checkpoint (2026-09-24): `npm run build` ✅ (vite 6.4.3, 182 modules, no errors) · production `GET /api/health` → `{"ok":true}` ✅ · homepage HTTP 200 ✅.
- Earlier end-to-end verification (wizard submit → Neon → archive refetch → PNG download, zero console errors) is recorded in `NEXT_STEPS.md`.

If you add tests, add them as new files — do not restructure the app to accommodate them.

---

## 17. Deployment (Railway)

- Single Railway service → https://minnasaudi.app. Config in `railway.json`: Nixpacks builder (handles install + `npm run build`), start `npm start` (= migrate + Express serving API and `dist/` on `PORT`), healthcheck `/api/health`, restart on failure (max 3).
- Deploys have been done via `railway up` from this repo (see `NEXT_STEPS.md` / `README.md`). Pushing to GitHub `main` is the code-history workflow; deployment is a separate, explicit act. **Do not deploy unless explicitly asked.**
- Database: Neon Postgres, project `lingering-dawn-85538258`, branch `production` (`.neon` file; connection via env vars).

**Environment variable NAMES (values are secret — never commit or print them):**
| Name | Purpose |
|---|---|
| `DATABASE_URL` | Pooled Neon connection (server) |
| `DATABASE_URL_UNPOOLED` | Direct connection (migrations) |
| `ADMIN_TOKEN` | `/admin` moderation auth (required for moderation) |
| `AUTO_APPROVE` | `true` publishes instantly; unset/false = manual review (production default) |
| `ANTHROPIC_API_KEY` | AI moderation (direct) |
| `NEON_AI_GATEWAY_TOKEN`, `NEON_AI_GATEWAY_BASE_URL` | AI moderation via Neon AI Gateway (alternative) |
| `AI_MODERATION_MODEL` | Optional model override (default `claude-haiku-4-5`) |
| `NEON_BRANCH` | Neon branch name (local tooling) |
| `PORT` | Set by Railway automatically |

Local dev secrets live in `.env.local` (gitignored via `*.local`). `.gitignore` also excludes `node_modules`, `dist`, `.neon`, `.env`, `.DS_Store`.

---

## 18. Known Issues / Backlog

**CRITICAL** — none blocking. Production is healthy.

**SHOULD FIX**
1. **Seeded demo stories presented as community stories** — 9 fictional seeds (from `scripts/migrate.mjs`) are live in the archive and counted in Pulse totals, indistinguishable from real submissions. Violates the spirit of the live-data rule. Product decision needed: delete seeds (DB operation) or label them as curated examples. (The seed block only runs when the table is empty, so deleting them once is permanent.)
2. **Pulse map pings read as live activity** — decorative random pings inside a section labeled `LIVE`. Flagged in `CHANGES.md` as a product decision; either drive pings from real submissions or visually detach them from the LIVE claim.
3. **No committed test suite** — the 47-check CTA audit is not reproducible (§16).
4. **AI moderation may be inactive in production** — `NEXT_STEPS.md` records the Neon AI Gateway as blocked-on-enablement at the time; if no key is configured on Railway, layer 2 silently falls back to manual review (safe by design, but worth confirming).

**NICE TO HAVE**
- Ask Saudi → real retrieval/LLM answers (currently keyword mock, §14).
- Timeline: 70 more moments toward the full ٩٦/٩٦ (26 exist; UI counter shows the real count).
- Server-rendered OG image reusing the card renderer.
- In-memory rate limiter resets on restart / doesn't share across instances (fine at current scale).
- Region images for slots that currently use styled placeholders (tabuk, najran, northern…), if worthy Commons photos are found.

Do not invent problems beyond this list; do not fix any of it without being asked.

---

## 19. Important Files

| File | Responsibility |
|---|---|
| `src/data.js` | ALL static content + factual data + sources + API-call layer. The single place copy/facts live. |
| `src/App.jsx` | Section order + `lang` state + `dir="rtl"` root |
| `src/components/Cta.jsx` | THE shared CTA (§9) |
| `src/components/RegionDetail.jsx` | THE shared region deep-dive (§8) |
| `src/components/Regions.jsx` | Map section, chips, summary aside, detail toggle |
| `src/components/StoryBuilder.jsx` | 3-step wizard, validation, card preview, share row (§10) |
| `src/components/Hero.jsx` | Campaign headline hierarchy (deliberate line-break control) |
| `src/components/Pulse.jsx` | Real community metrics + decorative map shimmer (§13) |
| `src/components/Stories.jsx` | Masonry archive + honest empty state |
| `src/components/AskSaudi.jsx` | Mock Q&A UI (§14) |
| `src/components/Nav.jsx` / `Footer.jsx` | Fixed nav (scroll-aware), closing CTA + عزّنا بطبعنا |
| `src/components/Traits.jsx` / `Moments.jsx` / `NowStats.jsx` / `Heritage.jsx` | Traits grid / sourced timeline / sourced stats / scroll counters |
| `src/components/SlotImage.jsx` + `src/images.js` | Commons imagery + license credits |
| `src/MapSvg.jsx` + `src/useGeo.js` | Kingdom SVG (3 modes) + projection/topojson loader |
| `src/cardExport.js` | 1080×1350 PNG card renderer |
| `src/moderation.js` | Shared word filter (client + server) |
| `src/styles.css` | Reset, keyframes, focus, hover classes, reduced motion |
| `server/index.js` | API + validation + rate limit + admin + static serving |
| `server/aiModeration.js` | Claude meaning check (fails open to manual queue) |
| `server/admin.html` | Moderation UI |
| `db/schema.sql` / `scripts/migrate.mjs` | Schema + idempotent migration/seed |
| `railway.json` / `vite.config.js` / `index.html` | Deploy config / dev proxy / meta+OG+fonts+analytics |
| `CHANGES.md` / `NEXT_STEPS.md` / `README.md` / `COPY.md` | Change narrative / status+decisions / build notes / copy reference |
| `design/Saudi Pulse.dc.html` | Original Claude Design source file |

---

# DO NOT REGRESS THESE

- Do **not** rename MINNA. Do **not** restore Saudi Pulse branding anywhere public.
- Do **not** change the campaign line («من كل ديرة… حكاية. ومن كل حكاية… شيء منّا.») without explicit approval.
- Do **not** change «عزّنا بطبعنا» — official wording, ever.
- Do **not** fabricate statistics, dates, attributions, or superlatives. Soften/remove unsupported claims; never invent replacements. Keep editorial copy and sourced facts in their separate fields (§7).
- Do **not** fabricate community activity or fake engagement. 0 is acceptable; use the honest empty states (§13).
- Do **not** create 13 independent region implementations — one `RegionDetail` + data (§8).
- Do **not** hardcode CTA logic per region — labels and story-city prefill come from region data.
- Do **not** replace Saudi conversational copy with generic MSA (or vice versa) — the register split in §5 is deliberate.
- Do **not** introduce reductive/before-after historical framing (§6) or revert the Nabataean attribution.
- Do **not** remove source attribution chips from facts, numbers, stats, moments, or image credits (CC licenses require the on-image credits).
- Do **not** break StoryBuilder validation (client or server), the moderation chain, or the client/server city+trait list sync.
- Do **not** introduce dead CTAs — see the CTA contract (§9).
- Do **not** redesign working UI, refactor, "clean up", or change dependencies without explicit instruction.
- Do **not** deploy unless explicitly requested. Do **not** run destructive DB operations.
- Do **not** expose secrets — env var names only (§17); `.env.local` stays untracked.

---

## Checkpoint & Restore

- Checkpoint commit: «MINNA pre-model-switch production checkpoint» on `main` (this file only; working tree was otherwise clean at `dfe42d9`).
- Annotated tag: **`minna-pre-opus-checkpoint-2026-09-24`** — permanent restore point.
- Inspect: `git show minna-pre-opus-checkpoint-2026-09-24`
- Restore (safe, non-destructive): `git checkout minna-pre-opus-checkpoint-2026-09-24` (detached), or branch from it: `git branch restore-minna minna-pre-opus-checkpoint-2026-09-24`. Never force-push or rewrite history to "restore".
