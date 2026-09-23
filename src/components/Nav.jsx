import { useEffect, useState } from 'react'
import { mono, alexandria } from '../utils.js'

const LINKS = [
  { href: '#regions', label: 'المناطق' },
  { href: '#traits', label: 'طباعنا' },
  { href: '#moments', label: '٩٦ لحظة' },
  { href: '#now', label: 'السعودية الآن' },
  { href: '#story', label: 'قصتك' },
]

export default function Nav({ lang, onToggleLang }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = !scrolled
  const ink = dark ? '#F7F3EA' : '#0B3A28'

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        backdropFilter: 'blur(14px)',
        background: dark ? 'rgba(6,40,27,0)' : 'rgba(247,243,234,.88)',
        borderBottom: `1px solid ${dark ? 'rgba(247,243,234,0)' : 'rgba(20,18,14,.1)'}`,
        transition: 'background .45s ease, border-color .45s ease',
      }}
    >
      <nav style={{ maxWidth: 1400, margin: '0 auto', padding: '16px clamp(18px,4vw,44px)', display: 'flex', alignItems: 'center', gap: 'clamp(14px,3vw,40px)' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none', color: 'inherit' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#C08A2E', boxShadow: '0 0 0 4px rgba(192,138,46,.18)', animation: 'sp-breathe 2.6s ease-in-out infinite' }} />
          <span style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 17, color: ink, transition: 'color .45s ease' }}>منّا</span>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.26em', color: ink, opacity: 0.55, transition: 'color .45s ease' }}>MINNA</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2vw,26px)', flex: 1, flexWrap: 'wrap' }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 400, color: ink, opacity: 0.78 }}>{l.label}</a>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggleLang}
          aria-label="Toggle body language"
          style={{
            flex: 'none', fontFamily: mono, fontSize: 11, letterSpacing: '.14em',
            padding: '7px 12px', borderRadius: 999,
            border: `1px solid ${dark ? 'rgba(247,243,234,.3)' : 'rgba(20,18,14,.2)'}`,
            background: 'transparent', color: ink, cursor: 'pointer',
          }}
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
      </nav>
    </header>
  )
}
