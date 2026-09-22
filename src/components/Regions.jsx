import { useState } from 'react'
import MapSvg from '../MapSvg.jsx'
import { regions } from '../data.js'
import { ACCENT, mono, alexandria, manrope } from '../utils.js'

export default function Regions({ geo, lang }) {
  const en = lang === 'en'
  const [activeId, setActiveId] = useState('riyadh')
  const [hoverId, setHoverId] = useState(null)
  const active = regions.find((r) => r.id === activeId)

  return (
    <section id="regions" style={{ background: '#06281B', color: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: 'rgba(217,183,120,.8)', marginBottom: 16 }}>٠٢ — THE MAP</div>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(28px,4.2vw,60px)', lineHeight: 1.24, letterSpacing: '-.005em', margin: '0 0 10px' }}>١٣ منطقة… وآلاف الحكايات</h2>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 15, fontWeight: 300, color: 'rgba(247,243,234,.5)', margin: '0 0 clamp(32px,5vh,58px)' }}>13 Regions. Thousands of Stories.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,48px)', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 min(100%,520px)', position: 'relative' }}>
            <MapSvg mode="big" geo={geo} activeId={activeId} hoverId={hoverId} onSelect={setActiveId} onHover={setHoverId} />
          </div>
          <aside style={{ flex: '1 1 min(100%,380px)', minWidth: 'min(100%,320px)' }}>
            {active && (
              <div key={active.id} style={{ animation: 'sp-fade .5s ease both' }}>
                <div aria-hidden="true" style={{ position: 'relative', height: 'clamp(150px,20vh,210px)', borderRadius: 3, overflow: 'hidden', backgroundColor: '#0E4530', backgroundImage: 'repeating-linear-gradient(135deg,rgba(247,243,234,.08) 0 2px,transparent 2px 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(247,243,234,.45)', border: '1px dashed rgba(247,243,234,.25)', padding: '7px 12px', direction: 'ltr' }}>{active.img}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(24px,2.8vw,38px)', lineHeight: 1.25, margin: 0 }}>{active.ar}</h3>
                  <span style={{ fontFamily: manrope, direction: 'ltr', fontSize: 13, fontWeight: 300, color: 'rgba(247,243,234,.5)' }}>{active.en}</span>
                </div>
                <p style={{ fontFamily: alexandria, fontSize: 17, lineHeight: 1.75, color: '#D9B778', margin: '0 0 20px' }}>{active.quote}</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'rgba(247,243,234,.75)', margin: '0 0 10px' }}>{en ? active.historyEn : active.historyAr}</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'rgba(247,243,234,.75)', margin: '0 0 22px' }}>{en ? active.nowEn : active.nowAr}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 26, padding: '18px 0', borderTop: '1px solid rgba(247,243,234,.12)', borderBottom: '1px solid rgba(247,243,234,.12)', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(247,243,234,.4)', marginBottom: 6 }}>POPULATION</div>
                    <div style={{ fontSize: 20, fontWeight: 500 }}>{active.pop}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(247,243,234,.4)', marginBottom: 6 }}>TRAIT</div>
                    <div style={{ fontSize: 20, fontWeight: 500, color: '#D9B778' }}>{en ? active.traitEn : active.traitAr}</div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {active.facts.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.7, color: 'rgba(247,243,234,.66)' }}>
                      <span style={{ color: '#C08A2E', flex: 'none' }}>◆</span>{f}
                    </li>
                  ))}
                </ul>
                <button type="button" className="sp-hover-gold" style={{ padding: '14px 26px', borderRadius: 999, border: '1px solid rgba(247,243,234,.3)', background: 'transparent', color: '#F7F3EA', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', transition: 'border-color .3s ease, color .3s ease' }}>
                  خذ لك لفة في المنطقة ←
                </button>
              </div>
            )}
          </aside>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'clamp(28px,4vh,44px)' }}>
          {regions.map((r) => {
            const on = r.id === activeId
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveId(r.id)}
                style={{
                  padding: '9px 16px', borderRadius: 999,
                  border: `1px solid ${on ? ACCENT : 'rgba(247,243,234,.18)'}`,
                  background: on ? ACCENT : 'transparent',
                  color: on ? '#06281B' : 'rgba(247,243,234,.7)',
                  fontFamily: 'inherit', fontSize: 13.5, cursor: 'pointer', transition: 'all .3s ease',
                }}
              >
                {r.ar}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
