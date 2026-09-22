import { traits } from '../data.js'
import { mono, alexandria, manrope, arNum } from '../utils.js'

export default function Traits({ lang }) {
  const en = lang === 'en'
  return (
    <section id="traits" style={{ background: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'clamp(38px,6vh,70px)' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: '#9A8F79', marginBottom: 16 }}>٠١ — SIX TRAITS</div>
            <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(32px,5vw,72px)', lineHeight: 1.22, letterSpacing: '-.005em', margin: 0, color: '#0B3A28' }}>عزّنا بطبعنا</h2>
          </div>
          <div style={{ maxWidth: 320 }}>
            <p style={{ fontFamily: alexandria, fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.7, margin: '0 0 8px', color: '#14120E' }}>ستة طباع.<br />هوية واحدة.</p>
            <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 13.5, fontWeight: 300, color: '#7C7361', margin: 0 }}>Six traits. One identity.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,1.6vw,22px)' }}>
          {traits.map((t, i) => (
            <article
              key={t.id}
              className="sp-trait-card"
              style={{ flex: t.flex, minWidth: 'min(100%,320px)', position: 'relative', borderRadius: 4, overflow: 'hidden', background: '#0B3A28', color: '#F7F3EA', minHeight: 'clamp(340px,44vh,520px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', cursor: 'default' }}
            >
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(247,243,234,.09) 0 2px,transparent 2px 12px)', backgroundColor: '#123F2C' }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(247,243,234,.42)', border: '1px dashed rgba(247,243,234,.25)', padding: '7px 12px', borderRadius: 2, direction: 'ltr' }}>{t.img}</span>
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(4,26,17,.94) 0%,rgba(4,26,17,.62) 38%,rgba(4,26,17,.08) 100%)' }} />
              <div style={{ position: 'relative', padding: 'clamp(22px,2.4vw,34px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontFamily: mono, fontSize: 10.5, color: '#D9B778' }}>٠{arNum(i + 1)}</span>
                  <h3 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(26px,3vw,42px)', lineHeight: 1.22, margin: 0 }}>{t.ar}</h3>
                  <span style={{ fontFamily: manrope, direction: 'ltr', fontSize: 13, fontWeight: 300, color: 'rgba(247,243,234,.55)', letterSpacing: '.04em' }}>{t.en}</span>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'rgba(247,243,234,.8)', margin: '0 0 16px', maxWidth: '46ch' }}>{en ? t.descEn : t.descAr}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.12em', padding: '5px 10px', borderRadius: 999, border: '1px solid rgba(217,183,120,.4)', color: '#D9B778' }}>{t.region}</span>
                  <span style={{ fontSize: 12.5, color: 'rgba(247,243,234,.55)' }}>{en ? t.factEn : t.factAr}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
