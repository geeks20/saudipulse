# MINNA — Change Log (23–24 Sep 2026)

All changes across the CTA audit, region deep-dives, hero update, and the
sensitivity & tone audit. Committed work is marked; everything else is in the
working tree awaiting commit.

---

## 1. CTA & Interaction Audit ✅ committed (`88e712e`)

**Rule enforced: no CTA ever looks clickable without doing something meaningful.**

| CTA / state | Before | After |
|---|---|---|
| «خذ لك لفة في المنطقة» (Regions) | Dead button — no `onClick` at all | Dynamic label «خذ لك لفة في {المنطقة}», opens + smooth-scrolls to the region's exploration panel |
| «التالي» (Story builder) | Advanced with nothing selected | Disabled until the step has a choice |
| Submit («اصنع بطاقتي») | No loading state; double-click double-submits | Shows «جاري الإرسال…», blocks while pending |
| «رجوع» on step 1 | Rendered but inert | Not rendered on step 1 |
| «نسخ الرابط» | Claimed success even when clipboard failed | try/catch with honest fallback message |
| «اسأل» (Ask Saudi) | "Answered" empty questions | Disabled until input has text |
| Anchor links | Instant jump, titles hidden under fixed nav | Smooth scroll + `scroll-margin-top: 76px` |
| Keyboard focus | No focus styles anywhere | Global `:focus-visible` outline on links, buttons, inputs, SVG map nodes |
| Reduced motion | — | Smooth scrolling disabled under `prefers-reduced-motion` (CSS + JS) |

**New shared components:**

- `src/components/Cta.jsx` — the one CTA (solid / gold / ghost pills; hover,
  focus, disabled, loading) used in Hero, Regions, RegionDetail, StoryBuilder,
  AskSaudi, Footer.
- `src/components/RegionDetail.jsx` — one shared, data-driven deep-dive for all
  13 regions: **٠١ من المكان → ٠٢ من الحكاية → ٠٣ السعودية الآن → ٠٤ بالأرقام →
  ٠٥ قصص من المنطقة → «وش قصتك مع {المنطقة}؟»** (prefills the story builder's
  city and jumps to step 2).

**Data:** `regionDetails` in `src/data.js` — places, story (ar/en), sourced
numbers, and story-city mapping per region. 4 new story cities (سكاكا، نجران،
عرعر، الباحة) added to client + server validation so all 13 regions can
receive community stories.

**QA:** 47/47 Playwright checks — every CTA clicked on desktop (1280px),
mobile touch (390px), and keyboard; zero console errors.

---

## 2. Hero Copy & Hierarchy ⏳ uncommitted

Removed: «وش اللي يخلّي السعودية… سعودية؟» and «من أهلها. من أرضها. من
حكاياتها. من طبعها. منّا.»

New hierarchy (nothing else in the hero touched):

> **منّا** / MINNA SAUDI
>
> **من كل ديرة… حكاية.**
> **ومن كل حكاية… <span style="color:#D9B778">شيء منّا.</span>** ← gold accent
>
> ٩٦ عاماً · ١٣ منطقة · ٦ طباع · ملايين الحكايات
>
> [ اكتشف السعودية ] [ وش قصتك؟ ]

- Desktop: two headline lines, gold «شيء منّا.» closes line two.
- Mobile: manual line-break control — the gold phrase wraps as one unbreakable
  unit (never splits mid-phrase).
- Mechanical tweaks only: headline max 66→58px, text column 760→830px.
- «عزّنا بطبعنا» untouched everywhere it appears (traits, story card, footer).

---

## 3. Sensitivity & Tone Audit ⏳ uncommitted

**Rule applied: جذور نفتخر فيها → حاضر نعيشه → حكاية مستمرة — not
ماضٍ بسيط → حاضر متطور. Facts preserved; framing rewritten. No invented facts.**

### 3.1 Reductive / before-after framing → continuity framing

| Where | Before | After |
|---|---|---|
| Riyadh history | من بلدة طينية محاطة بسورٍ إلى عاصمةٍ تضم أكثر من رُبع سكان المملكة | من جذورها النجدية وحكاية التأسيس في الدرعية إلى عاصمةٍ يعيش فيها نحو رُبع سكان المملكة |
| Riyadh story | في ليلة من يناير ١٩٠٢ تسلّق أربعون رجلاً سور الرياض… الرياض ما تغيّرت — كبرت على نفس العزم | في يناير ١٩٠٢ استعاد الملك عبدالعزيز الرياض، ومن قصر المصمك بدأت حكاية التوحيد. ومن الدرعية وحكاية التأسيس إلى مشهدٍ حضري يتجدد كل يوم — الرياض تكبر على العزم نفسه، جيلاً بعد جيل |
| Qassim story | قبل شاحنات التبريد، كانت قوافل القصيم توصل التمر… يمرّ من مزاد بريدة ما يُوزن بمئات آلاف الأطنان | منذ قرون تحمل قوافل القصيم التمر إلى ما حولها وتعود بالحكايات. واليوم يُعدّ سوق التمور في بريدة من أكبر الأسواق الموسمية في العالم… |
| Jubail & Yanbu 1975 | مدينتان صناعيتان تُبنيان من الصفر / built from nothing | مدينتان صناعيتان تنهضان على ساحلي المملكة / rising on the Kingdom's two coasts |
| Northern Borders story | أرضٌ تبدو صامتة | أرضٌ واسعة الهدوء (+ «كرمُ أرضٍ قبل أن يكون كرمَ أهل») |
| Al Bahah story | كلمة ما تتوقعها في الجزيرة: خضراء | كلمة واحدة: خضراء |
| Al Jawf story | صمدت قلعة مارد حتى قيل فيها «تمرّد ماردٌ وعزّ الأبلق»… أقدم مدن الشمال تعصر أحدث زيوته | ما زالت قلعة مارد شاهدةً على ذاكرة المكان… جذورٌ ضاربة في التاريخ، وموسمٌ جديد كل عام |

### 3.2 Religious / cultural sensitivity

| Where | Before | After | Why |
|---|---|---|---|
| Madinah history | حِجْر ثمود التي نحتت الصخر بيوتاً | الحِجر التي نحت الأنباط صخرها بيوتاً | Thamud attribution carries Qur'anic weight (a punished people); RCU's own framing is Nabataean — archaeologically attributed and officially used |

### 3.3 Unsupported superlatives hedged

| Where | Before | After |
|---|---|---|
| Makkah facts | ميناء جدة الإسلامي: أكبر موانئ المملكة على البحر الأحمر | من أكبر موانئ المملكة |
| Riyadh Season 2019 | أكبر موسم ترفيهي وثقافي في المنطقة | من أكبر المواسم الترفيهية والثقافية في المنطقة |
| Ask Saudi — Asir | قمة السودة أعلى نقطة في المملكة | قمم السودة من أعلى القمم في المملكة (claim is genuinely disputed; now consistent with the hedged regions data) |

### 3.4 Factual corrections found during the audit

| Where | Before | After | Reason |
|---|---|---|---|
| Riyadh population share | أكثر من رُبع / `25%+` | نحو رُبع / `~25%` | 8.59M of 35.3M ≈ 24% — "more than" wasn't supported |
| Hail — Dakar | `2020` حائل محطة في رالي داكار | `2022` انطلاق رالي داكار من حائل | Ha'il hosted the Dakar start in January 2022 |
| Northern — درب زبيدة | `1,400+` عام | `1,200+` عام من تاريخ درب زبيدة | Abbasid-era road (~8th century CE) |
| Tabuk — Hejaz Railway | `1907` وصول السكة إلى تبوك | `1,300+` كيلومتراً امتداد السكة مروراً بتبوك | Arrival year couldn't be confidently verified; line length is safely cited |

### 3.5 Reviewed and deliberately kept

- «أكبر واحة نخيل في العالم» (الأحساء) — UNESCO's own inscription language, sourced.
- «أول جامعة في المملكة» (KSU 1957) — verified, sourced.
- «التأشيرة السياحية لأول مرة» (2019) — verified, MT-sourced.
- «الحِجر أول موقع سعودي في اليونسكو» (2008) — verified.
- 1727 / 1824 / 1902 founding-era timeline entries — follow official Darah historiography.
- All trait descriptions, quotes, heritage counters, milestones, stats — already clean.

---

## Files touched

| File | Change |
|---|---|
| `src/data.js` | `regionDetails` (13 regions), copy audit rewrites, new cities |
| `src/components/Cta.jsx` | **new** — shared CTA component |
| `src/components/RegionDetail.jsx` | **new** — shared region deep-dive |
| `src/components/Regions.jsx` | dynamic CTA, detail panel wiring |
| `src/components/StoryBuilder.jsx` | gating, loading, prefill, copy fallback |
| `src/components/Hero.jsx` | new campaign headline + hierarchy |
| `src/components/AskSaudi.jsx` | empty-input gating, shared Cta |
| `src/components/Footer.jsx` | shared Cta |
| `src/styles.css` | smooth scroll, scroll-margin, focus-visible, disabled cursor |
| `server/index.js` | +4 cities in validation |
