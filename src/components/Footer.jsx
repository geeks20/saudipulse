import { mono, alexandria, manrope } from '../utils.js'

export default function Footer() {
  return (
    <footer style={{ background: '#042015', color: '#F7F3EA', padding: 'clamp(80px,14vh,170px) clamp(18px,4vw,44px) clamp(40px,6vh,70px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.09, backgroundImage: 'repeating-linear-gradient(45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 30px),repeating-linear-gradient(-45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 30px)' }} />
      <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(30px,5.8vw,96px)', lineHeight: 1.24, letterSpacing: '-.005em', margin: '0 0 20px' }}>السعودية… نبض ما يوقف.</h2>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 300, color: 'rgba(247,243,234,.45)', margin: '0 0 clamp(50px,8vh,100px)' }}>Saudi Arabia. A pulse that keeps going.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, paddingTop: 26, borderTop: '1px solid rgba(247,243,234,.14)', fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em', color: 'rgba(247,243,234,.4)' }}>
          <span>اليوم الوطني السعودي ٩٦ · ٢٣ سبتمبر ٢٠٢٦</span>
          <span style={{ color: '#D9B778', fontFamily: alexandria, letterSpacing: 0, fontSize: 14 }}>عزّنا بطبعنا</span>
          <a href="#top" style={{ color: 'inherit' }}>رجوع للأعلى ↑</a>
        </div>
      </div>
    </footer>
  )
}
