import { useEffect, useRef, useState } from 'react'
import MapSvg from '../MapSvg.jsx'
import { pulseCities, topRegions, fetchPulse } from '../data.js'
import { LIVE_SIMULATION, mono, alexandria, manrope, fmt, prefersReducedMotion } from '../utils.js'

const MAX_COUNT = topRegions[0].count

export default function Pulse({ geo }) {
  const [pulses, setPulses] = useState([])
  const [liveCount, setLiveCount] = useState(2847)
  const timeouts = useRef([])

  useEffect(() => {
    // seed the counter from the real archive size; the ticker animates on top
    fetchPulse().then(({ total }) => setLiveCount(2847 + (total || 0))).catch(() => {})
  }, [])

  useEffect(() => {
    if (!LIVE_SIMULATION || prefersReducedMotion()) return
    const interval = setInterval(() => {
      const city = pulseCities[Math.floor(Math.random() * pulseCities.length)]
      const id = Math.random().toString(36).slice(2)
      setPulses((p) => [...p.slice(-5), { id, city }])
      setLiveCount((c) => c + 1)
      timeouts.current.push(setTimeout(() => setPulses((p) => p.filter((x) => x.id !== id)), 3000))
    }, 2200)
    return () => {
      clearInterval(interval)
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section id="pulse" style={{ background: '#042015', color: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,64px)', alignItems: 'center' }}>
          <div style={{ flex: '1 1 min(100%,420px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7CD8A4', animation: 'sp-blink 1.6s ease-in-out infinite' }} />
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.2em', color: '#7CD8A4' }}>LIVE</span>
            </div>
            <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(28px,4.2vw,58px)', lineHeight: 1.24, letterSpacing: '-.005em', margin: '0 0 10px' }}>نبض السعودية اليوم</h2>
            <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 15, fontWeight: 300, color: 'rgba(247,243,234,.5)', margin: '0 0 clamp(30px,4vh,48px)' }}>Saudi Pulse Today</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,3vw,44px)' }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 'clamp(34px,4vw,58px)', letterSpacing: '-.03em' }}>{fmt(liveCount)}</div>
                <div style={{ fontFamily: alexandria, fontSize: 14, color: 'rgba(247,243,234,.6)', marginTop: 6 }}>قصة تُكتب الآن</div>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 'clamp(34px,4vw,58px)', letterSpacing: '-.03em' }}>١٣</div>
                <div style={{ fontFamily: alexandria, fontSize: 14, color: 'rgba(247,243,234,.6)', marginTop: 6 }}>منطقة نابضة</div>
              </div>
              <div>
                <div style={{ fontFamily: alexandria, fontSize: 'clamp(28px,3.2vw,46px)', color: '#D9B778' }}>الكرم</div>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', color: 'rgba(247,243,234,.45)', marginTop: 10 }}>MOST SELECTED TRAIT</div>
              </div>
            </div>

            <div style={{ marginTop: 'clamp(30px,4vh,48px)', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 440 }}>
              {topRegions.map((tr) => (
                <div key={tr.ar} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ flex: '0 0 76px', fontSize: 13.5, color: 'rgba(247,243,234,.8)' }}>{tr.ar}</span>
                  <span style={{ flex: 1, height: 3, background: 'rgba(247,243,234,.12)', position: 'relative', overflow: 'hidden' }}>
                    <span style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: `${Math.round((tr.count / MAX_COUNT) * 100)}%`, background: 'linear-gradient(90deg,#1E7A52,#D9B778)', transition: 'width 1.2s cubic-bezier(.16,1,.3,1)' }} />
                  </span>
                  <span style={{ flex: '0 0 46px', fontFamily: mono, fontSize: 11, color: 'rgba(247,243,234,.45)', direction: 'ltr', textAlign: 'left' }}>{tr.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 min(100%,420px)', position: 'relative' }}>
            <MapSvg mode="pulse" geo={geo} pulses={pulses} />
          </div>
        </div>
      </div>
    </section>
  )
}
