import MapSvg from '../MapSvg.jsx'
import Cta from './Cta.jsx'
import { mono, alexandria } from '../utils.js'

const STATS = [
  { ar: '٩٦ عاماً', en: '96 YEARS' },
  { ar: '١٣ منطقة', en: '13 REGIONS' },
  { ar: '٦ طباع', en: '6 TRAITS' },
  { ar: 'ملايين الحكايات', en: 'MILLIONS OF STORIES' },
]

export default function Hero({ geo }) {
  return (
    <section id="top" style={{ position: 'relative', minHeight: '100svh', background: '#06281B', color: '#F7F3EA', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 78% 8%, rgba(20,120,78,.55) 0%, rgba(6,40,27,0) 62%),radial-gradient(90% 70% at 10% 100%, rgba(192,138,46,.20) 0%, rgba(6,40,27,0) 60%)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.14, backgroundImage: 'repeating-linear-gradient(45deg,rgba(247,243,234,.5) 0 1px,transparent 1px 34px),repeating-linear-gradient(-45deg,rgba(247,243,234,.5) 0 1px,transparent 1px 34px)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '38%', background: 'linear-gradient(90deg,rgba(247,243,234,0) 0%,rgba(247,243,234,.055) 50%,rgba(247,243,234,0) 100%)', animation: 'sp-sweep 11s linear infinite' }} />
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingInlineStart: '2vw', pointerEvents: 'none', opacity: 0.9 }}>
        <div style={{ width: 'min(62vw,880px)', opacity: 0.55 }}>
          <MapSvg mode="hero" geo={geo} />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '110px clamp(18px,4vw,44px) 90px', width: '100%' }}>
        <div style={{ maxWidth: 'min(760px,92%)', animation: 'sp-rise .9s cubic-bezier(.16,1,.3,1) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(20px,3.5vh,36px)' }}>
            <span style={{ height: 1, width: 40, background: 'rgba(192,138,46,.7)' }} />
            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.18em', color: '#D9B778' }}>٢٣ سبتمبر ٢٠٢٦ · 23.09.2026</span>
          </div>

          <div style={{ marginBottom: 'clamp(18px,3vh,30px)' }}>
            <div style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(52px,8vw,104px)', lineHeight: 1.1, letterSpacing: '-.01em' }}>منّا</div>
            <div style={{ fontFamily: mono, fontSize: 'clamp(11px,1.2vw,14px)', letterSpacing: '.34em', color: '#D9B778', marginTop: 8 }}>MINNA SAUDI</div>
          </div>

          <h1 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(27px,4.4vw,62px)', lineHeight: 1.35, letterSpacing: '-.005em', margin: '0 0 18px', textWrap: 'balance' }}>
            وش اللي يخلّي السعودية<br /><span style={{ color: '#D9B778' }}>…سعودية؟</span>
          </h1>
          <p style={{ fontFamily: alexandria, fontSize: 'clamp(16px,1.7vw,22px)', fontWeight: 400, lineHeight: 1.9, color: 'rgba(247,243,234,.78)', margin: '0 0 clamp(30px,4.5vh,50px)' }}>
            من أهلها. من أرضها. من حكاياتها. من طبعها. <span style={{ color: '#D9B778', fontWeight: 600 }}>منّا.</span>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,54px)', marginBottom: 'clamp(30px,4.5vh,50px)' }}>
            {STATS.map((s) => (
              <div key={s.en}>
                <div style={{ fontFamily: alexandria, fontSize: 'clamp(23px,2.5vw,32px)', fontWeight: 500 }}>{s.ar}</div>
                <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em', color: 'rgba(247,243,234,.45)', marginTop: 6 }}>{s.en}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Cta variant="solid" href="#regions" style={{ padding: '16px 30px' }}>
              اكتشف السعودية <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', opacity: 0.55 }}>EXPLORE</span>
            </Cta>
            <Cta variant="ghost" href="#story" style={{ padding: '16px 30px', fontSize: 15 }}>
              وش قصتك؟ <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', opacity: 0.5 }}>YOUR STORY</span>
            </Cta>
          </div>
        </div>
      </div>

      <div aria-hidden="true" style={{ position: 'absolute', bottom: 26, insetInlineStart: 'clamp(18px,4vw,44px)', zIndex: 2, display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontSize: 10, letterSpacing: '.18em', color: 'rgba(247,243,234,.4)' }}>
        <span style={{ width: 1, height: 36, background: 'linear-gradient(180deg,rgba(247,243,234,.5),transparent)' }} />
        SCROLL
      </div>
    </section>
  )
}
