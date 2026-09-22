import { useState } from 'react'
import { stats, milestones } from '../data.js'
import { mono, alexandria, manrope } from '../utils.js'

export default function NowStats() {
  const [openSource, setOpenSource] = useState(null)

  return (
    <section id="now" style={{ background: '#0B3A28', color: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: 'rgba(217,183,120,.8)', marginBottom: 16 }}>٠٤ — RIGHT NOW</div>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(32px,5vw,72px)', lineHeight: 1.22, letterSpacing: '-.005em', margin: '0 0 12px' }}>السعودية الآن</h2>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 15, fontWeight: 300, color: 'rgba(247,243,234,.5)', margin: '0 0 clamp(36px,6vh,64px)' }}>2026 — The Kingdom, right now.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1, background: 'rgba(247,243,234,.13)', border: '1px solid rgba(247,243,234,.13)' }}>
          {stats.map((s) => (
            <div key={s.id} style={{ flex: '1 1 min(100%,240px)', background: '#0B3A28', padding: 'clamp(24px,3vw,42px)' }}>
              <div style={{ fontFamily: mono, fontSize: 'clamp(30px,3.6vw,52px)', letterSpacing: '-.03em', color: '#F7F3EA', marginBottom: 12 }}>{s.display}</div>
              <div style={{ fontFamily: alexandria, fontSize: 15, lineHeight: 1.6, marginBottom: 4 }}>{s.ar}</div>
              <div style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 12.5, fontWeight: 300, color: 'rgba(247,243,234,.45)', marginBottom: 16 }}>{s.en}</div>
              <button
                type="button"
                onClick={() => setOpenSource(openSource === s.id ? null : s.id)}
                style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '.12em', color: 'rgba(217,183,120,.85)', background: 'transparent', border: 0, padding: 0, cursor: 'pointer', direction: 'ltr' }}
              >
                {openSource === s.id ? `SOURCE · ${s.source}` : 'SHOW SOURCE +'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,2vw,26px)', marginTop: 'clamp(30px,5vh,56px)' }}>
          {milestones.map((k) => (
            <div key={k.tag} style={{ flex: '1 1 min(100%,280px)', padding: '22px 0', borderTop: '1px solid rgba(247,243,234,.16)' }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(217,183,120,.8)', marginBottom: 12 }}>{k.tag}</div>
              <div style={{ fontFamily: alexandria, fontSize: 19, lineHeight: 1.5, marginBottom: 8 }}>{k.ar}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(247,243,234,.55)', direction: 'ltr', textAlign: 'right', fontFamily: manrope, fontWeight: 300 }}>{k.en}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
