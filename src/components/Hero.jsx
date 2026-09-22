import MapSvg from '../MapSvg.jsx'
import { mono, alexandria, manrope } from '../utils.js'

const STATS = [
  { ar: '٩٦ عاماً', en: '96 YEARS' },
  { ar: '١٣ منطقة', en: '13 REGIONS' },
  { ar: '٦ طباع', en: '6 TRAITS' },
  { ar: 'ملايين القصص', en: 'MILLIONS OF STORIES' },
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

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '120px clamp(18px,4vw,44px) 90px', width: '100%' }}>
        <div style={{ maxWidth: 'min(760px,92%)', animation: 'sp-rise .9s cubic-bezier(.16,1,.3,1) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(22px,4vh,42px)' }}>
            <span style={{ height: 1, width: 40, background: 'rgba(192,138,46,.7)' }} />
            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.18em', color: '#D9B778' }}>٢٣ سبتمبر ٢٠٢٦ · 23.09.2026</span>
          </div>
          <h1 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(36px,6.2vw,88px)', lineHeight: 1.32, letterSpacing: '-.005em', margin: '0 0 20px', textWrap: 'balance' }}>
            وش اللي يخلّي السعودية<br /><span style={{ color: '#D9B778' }}>…سعودية؟</span>
          </h1>
          <p style={{ fontFamily: alexandria, fontSize: 'clamp(16px,1.7vw,22px)', fontWeight: 400, lineHeight: 1.7, color: 'rgba(247,243,234,.78)', margin: '0 0 10px' }}>
            حكاياتها كثيرة، لكن طبعها واحد.
          </p>
          <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 400, letterSpacing: '.03em', color: 'rgba(247,243,234,.62)', margin: '0 0 clamp(34px,5vh,56px)' }}>
            What makes Saudi, Saudi?
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,54px)', marginBottom: 'clamp(34px,5vh,54px)' }}>
            {STATS.map((s) => (
              <div key={s.en}>
                <div style={{ fontFamily: alexandria, fontSize: 'clamp(23px,2.5vw,32px)', fontWeight: 500 }}>{s.ar}</div>
                <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em', color: 'rgba(247,243,234,.45)', marginTop: 6 }}>{s.en}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a href="#regions" className="sp-cta-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 30px', borderRadius: 999, background: '#F7F3EA', color: '#06281B', fontWeight: 600, fontSize: 15, transition: 'background .3s ease, color .3s ease' }}>
              اكتشف السعودية <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', opacity: 0.55 }}>EXPLORE</span>
            </a>
            <a href="#story" className="sp-hover-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 30px', borderRadius: 999, border: '1px solid rgba(247,243,234,.3)', color: '#F7F3EA', fontWeight: 500, fontSize: 15, transition: 'border-color .3s ease, color .3s ease' }}>
              اصنع قصتك <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', opacity: 0.5 }}>CREATE</span>
            </a>
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
