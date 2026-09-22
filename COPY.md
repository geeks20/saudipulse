# Saudi Pulse — Copy Deck (National Day 96 · 2026)

Voice per `copywriter.md`: Saudi conversational warmth + classical dignity + modern campaign copy.
The official identity phrase **عزّنا بطبعنا** is never altered.
Dialect carries questions, CTAs, and hooks; polished formal Arabic carries history and facts.

Each section below gives three registers. ✅ marks the version applied in the app.

---

## 01 · Hero

**Headline** (unchanged — this is the campaign hook)
> وش اللي يخلّي السعودية… سعودية؟ ✅

**Supporting line** (new — the hero previously had English only)
- More Saudi: حكاياتها كثير… بس طبعها واحد.
- Balanced: حكاياتها كثيرة، لكن طبعها واحد. ✅
- Classical: تتعدد الحكايات… والطبع واحد.

**CTAs**
- اكتشف السعودية ✅ (balanced — premium, easy to say)
- More Saudi alt: خذ لك لفة على السعودية
- اصنع قصتك ✅

## 02 · طباعنا (Traits)

**Headline**: عزّنا بطبعنا ✅ (official — exact)

**Supporting**
- More Saudi: ست طباع… وكلها منّا وفينا.
- Balanced: ستة طباع. هوية واحدة. ✅ (current — short, premium)
- Classical: ستةُ طباعٍ تجمعها هويةٌ واحدة.

## 03 · المناطق (Regions)

**Headline**
- More Saudi: ١٣ منطقة… وكل وحدة لها سالفة.
- Balanced: ١٣ منطقة… وآلاف الحكايات ✅ (current)
- Classical: ثلاث عشرة منطقة، ولكل أرضٍ حكاية.

**CTA button** (dialect belongs in CTAs)
- More Saudi: خذ لك لفة في المنطقة ← ✅
- Balanced: تعرّف على المنطقة ← (previous)
- Classical: اقرأ حكاية المنطقة ←

## 04 · ٩٦ لحظة (Timeline)

**Headline**
- More Saudi: ٩٦ سنة… والسالفة ما خلصت.
- Balanced: ٩٦ عاماً من الحكاية ✅ (current)
- Classical: ستةٌ وتسعون عاماً من الحكاية.

Moment descriptions stay in polished formal Arabic (history = formal register). ✅

## 05 · اصنع قصتك (Story wizard)

**Headline**: اصنع قصتك ✅ (CTA-style, keep)

**Supporting hook**
- More Saudi: وش قصتك مع السعودية؟ قولنا وش اللي يخلّيها غالية عليك.
- Balanced: وش قصتك مع السعودية؟ شاركنا اللي يخلّيها غالية عليك. ✅
- Classical: لكل قلبٍ حكاية مع هذه الأرض… شاركنا حكايتك.
- (previous: شاركنا وش اللي يخلّي السعودية غالية عليك.)

**Step 01**: أي منطقة أقرب لقلبك؟ ✅ (current — dialect question, exactly the brief)
**Step 02**: أي طبع فيهم يمثّلك أكثر؟ ✅ (current)

**Step 03**
- More Saudi: قلها بجملة وحدة… وش تعني لك السعودية؟ ✅
- Balanced: احكِ لنا بجملة… وش تعني لك السعودية؟
- Classical: في جملةٍ واحدة… ماذا تعني لك السعودية؟
- (previous: احكِ لنا بجملة عن تجربتك مع السعودية.)

**Placeholders** (kept — already natural dialect)
- جملة وحدة تكفي… ✅
- اسمك الأول (اختياري) ✅
- Card default: «اكتب جملتك وبتظهر هنا.» ✅

## 06 · قصصنا / اسأل السعودية

- قصصنا ✅ — one strong noun, keep.
- اسأل السعودية ✅ — keep; input placeholder «اسأل عن مدينة، مكان، لحظة، أو قصة.» keep.
- Answers stay formal (factual register). ✅

## Footer

**Flagship line**
- More Saudi: السعودية… نبض ما يوقف. ✅ (current — the register blend the brief asks for)
- Classical: السعودية… نبضٌ لا يتوقف.

---

### Applied in this pass

1. Hero: added Arabic supporting line «حكاياتها كثيرة، لكن طبعها واحد.» (`src/components/Hero.jsx`)
2. Regions CTA: «تعرّف على المنطقة» → «خذ لك لفة في المنطقة» (`src/components/Regions.jsx`)
3. Story intro: hook question «وش قصتك مع السعودية؟ شاركنا اللي يخلّيها غالية عليك.» (`src/components/StoryBuilder.jsx`)
4. Step 03 headline: «قلها بجملة وحدة… وش تعني لك السعودية؟» (`src/components/StoryBuilder.jsx`)

Everything else was already on-voice and left as designed.
