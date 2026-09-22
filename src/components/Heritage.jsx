import { useEffect, useRef, useState } from 'react'
import { heritage } from '../data.js'
import { mono, alexandria, manrope, fmt } from '../utils.js'

export default function Heritage() {
  const [counts, setCounts] = useState({})
  const rootRef = useRef(null)
  const started = useRef({})

  useEffect(() => {
    const animate = (id) => {
      const h = heritage.find((x) => x.id === id)
      if (!h) return
      const dur = 1600
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        setCounts((c) => ({ ...c, [id]: Math.round(h.target * e) }))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const id = e.target.getAttribute('data-count')
          if (id && !started.current[id]) {
            started.current[id] = true
            animate(id)
          }
        })
      },
      { threshold: 0.4 },
    )
    rootRef.current?.querySelectorAll('[data-count]').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={rootRef} style={{ background: '#F7F3EA', padding: 0 }}>
      {heritage.map((h) => {
        const shown = counts[h.id] ?? 0
        const value = (h.suffix === '~' ? '~' : '') + fmt(shown) + (h.suffix === '+' ? '+' : '')
        return (
          <div
            key={h.id}
            data-count={h.id}
            style={{ minHeight: 'clamp(420px,86vh,900px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(50px,9vh,110px) clamp(18px,4vw,44px)', borderBottom: '1px solid rgba(20,18,14,.08)', background: h.bg, color: h.ink }}
          >
            <div style={{ fontFamily: mono, fontSize: 'clamp(46px,13vw,190px)', lineHeight: 0.94, letterSpacing: '-.045em', direction: 'ltr' }}>{value}</div>
            <div style={{ fontFamily: alexandria, fontSize: 'clamp(22px,3vw,44px)', marginTop: 'clamp(14px,2vh,28px)' }}>{h.ar}</div>
            <div style={{ fontFamily: manrope, direction: 'ltr', fontSize: 14, fontWeight: 300, opacity: 0.55, marginTop: 10, maxWidth: '40ch' }}>{h.en}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'clamp(26px,4vh,46px)', fontFamily: mono, fontSize: 10, letterSpacing: '.2em', opacity: 0.45, direction: 'ltr' }}>
              {h.place}
              <span style={{ width: 24, height: 1, background: 'currentColor' }} />
              {h.source}
            </div>
          </div>
        )
      })}
    </section>
  )
}
