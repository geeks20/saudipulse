import { useEffect, useState } from 'react'
import { stories as seedStories, fetchStories } from '../data.js'
import { mono, alexandria, manrope } from '../utils.js'

export default function Stories() {
  const [stories, setStories] = useState(seedStories)

  useEffect(() => {
    const load = () => fetchStories().then((s) => { if (s.length) setStories(s) }).catch(() => {})
    load()
    window.addEventListener('sp:story-submitted', load)
    return () => window.removeEventListener('sp:story-submitted', load)
  }, [])

  return (
    <section id="stories" style={{ background: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: '#9A8F79', marginBottom: 16 }}>٠٦ — THE ARCHIVE</div>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(32px,5vw,72px)', lineHeight: 1.22, letterSpacing: '-.005em', margin: '0 0 10px', color: '#0B3A28' }}>قصصنا</h2>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 15, fontWeight: 300, color: '#7C7361', margin: '0 0 clamp(36px,5vh,60px)' }}>Our Stories</p>
        <div style={{ columns: '300px 3', columnGap: 'clamp(14px,1.6vw,22px)' }}>
          {stories.map((s, i) => {
            const dark = i % 5 === 0
            return (
              <article
                key={`${s.name}-${i}`}
                style={{
                  breakInside: 'avoid', marginBottom: 'clamp(14px,1.6vw,22px)', padding: 'clamp(20px,2.2vw,30px)',
                  background: dark ? '#0B3A28' : i % 7 === 3 ? '#EFE7D6' : '#FFFFFF',
                  color: dark ? '#F7F3EA' : '#14120E',
                  border: '1px solid rgba(20,18,14,.07)', borderRadius: 3, position: 'relative',
                }}
              >
                <div style={{ fontFamily: alexandria, fontSize: i % 4 === 0 ? 22 : i % 3 === 0 ? 19 : 16, lineHeight: 1.7, marginBottom: 20 }}>{s.text}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', fontFamily: mono, fontSize: 10, letterSpacing: '.1em', opacity: 0.55, direction: 'ltr' }}>
                  {s.cityEn.toUpperCase()} · {s.time}
                </div>
                <div style={{ marginTop: 14, fontSize: 13, opacity: 0.75, fontFamily: alexandria }}>
                  {s.name} · {s.cityAr} · <span style={{ color: '#C08A2E' }}>{s.traitAr}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
