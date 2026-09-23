import { useState } from 'react'
import { moments, categories } from '../data.js'
import SlotImage, { hasImage } from './SlotImage.jsx'
import { mono, alexandria, manrope, arNum } from '../utils.js'

export default function Moments({ lang }) {
  const en = lang === 'en'
  const [cat, setCat] = useState('all')
  const shown = moments.filter((m) => cat === 'all' || m.cat === cat)

  return (
    <section id="moments" style={{ background: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: '#9A8F79', marginBottom: 16 }}>٠٣ — TIMELINE</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 22, marginBottom: 30 }}>
          <div>
            <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(30px,4.6vw,64px)', lineHeight: 1.22, letterSpacing: '-.005em', margin: '0 0 8px', color: '#0B3A28' }}>٩٦ عاماً من الحكاية</h2>
            <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 15, fontWeight: 300, color: '#7C7361', margin: 0 }}>96 Moments of Saudi</p>
          </div>
          <div style={{ textAlign: 'left', direction: 'ltr' }}>
            <div style={{ fontFamily: mono, fontSize: 28, color: '#0B3A28' }}>{arNum(moments.length)}</div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: '#9A8F79' }}>VERIFIED MOMENTS</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(30px,5vh,52px)', paddingBottom: 26, borderBottom: '1px solid rgba(20,18,14,.1)' }}>
          {categories.map((c) => {
            const on = c.key === cat
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setCat(c.key)}
                style={{
                  padding: '8px 15px', borderRadius: 999,
                  border: `1px solid ${on ? '#0B3A28' : 'rgba(20,18,14,.16)'}`,
                  background: on ? '#0B3A28' : 'transparent',
                  color: on ? '#F7F3EA' : '#5E5747',
                  fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', transition: 'all .3s ease',
                }}
              >
                {c.ar}
              </button>
            )
          })}
        </div>

        <div style={{ position: 'relative' }}>
          {shown.map((m, i) => (
            <article key={`${m.y}-${m.en}`} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px,3vw,40px)', padding: 'clamp(22px,3vh,38px) 0', borderBottom: '1px solid rgba(20,18,14,.08)', animation: 'sp-rise .7s cubic-bezier(.16,1,.3,1) both', animationDelay: `${Math.min(i * 40, 300)}ms` }}>
              <div style={{ flex: '0 0 clamp(90px,10vw,150px)' }}>
                <div style={{ fontFamily: mono, fontSize: 'clamp(22px,2.4vw,34px)', color: '#0B3A28', letterSpacing: '-.005em' }}>{m.y}</div>
                <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.14em', color: '#B0A48C', marginTop: 8 }}>
                  {(categories.find((c) => c.key === m.cat) || {}).en}
                </div>
              </div>
              <div style={{ flex: '1 1 min(100%,320px)', minWidth: 'min(100%,260px)' }}>
                <h3 style={{ fontFamily: alexandria, fontWeight: 500, fontSize: 'clamp(18px,1.9vw,25px)', lineHeight: 1.55, margin: '0 0 4px', color: '#14120E' }}>{m.ar}</h3>
                <div style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 13, fontWeight: 300, color: '#8D836E', marginBottom: 12 }}>{m.en}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.8, color: '#4A4437', margin: '0 0 12px', maxWidth: '62ch' }}>{en ? m.dEn : m.dAr}</p>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', color: '#9A8F79', border: '1px solid rgba(20,18,14,.14)', padding: '4px 9px', borderRadius: 2, direction: 'ltr' }}>SOURCE · {m.src}</span>
              </div>
              <div style={{ flex: '0 0 clamp(110px,14vw,210px)', minHeight: 110, position: 'relative', overflow: 'hidden', borderRadius: 2, backgroundColor: '#E6DCC7', backgroundImage: 'repeating-linear-gradient(135deg,rgba(11,58,40,.14) 0 2px,transparent 2px 11px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, textAlign: 'center' }}>
                {hasImage(`m-${m.id}`) ? (
                  <SlotImage slot={`m-${m.id}`} alt={m.en} />
                ) : (
                  <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 30, letterSpacing: '-.02em', color: 'rgba(11,58,40,.3)', direction: 'ltr' }}>{m.y}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
