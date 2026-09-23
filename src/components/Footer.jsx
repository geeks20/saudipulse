import Cta from './Cta.jsx'
import { mono, alexandria } from '../utils.js'

export default function Footer() {
  return (
    <footer style={{ background: '#042015', color: '#F7F3EA', padding: 'clamp(80px,14vh,170px) clamp(18px,4vw,44px) clamp(40px,6vh,70px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.09, backgroundImage: 'repeating-linear-gradient(45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 30px),repeating-linear-gradient(-45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 30px)' }} />
      <div style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(30px,5.4vw,88px)', lineHeight: 1.3, letterSpacing: '-.005em', margin: '0 0 26px', textWrap: 'balance' }}>
          منّا بدأت الحكاية…<br /><span style={{ color: '#D9B778' }}>وفينا تكمل.</span>
        </h2>
        <Cta variant="gold" href="#story" style={{ marginBottom: 'clamp(50px,8vh,100px)' }}>
          وش قصتك؟
        </Cta>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, paddingTop: 26, borderTop: '1px solid rgba(247,243,234,.14)', fontFamily: mono, fontSize: 10.5, letterSpacing: '.16em', color: 'rgba(247,243,234,.4)' }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 16, letterSpacing: 0, color: '#F7F3EA' }}>منّا</span>
            <span>MINNA SAUDI</span>
          </span>
          <span>اليوم الوطني السعودي ٩٦ · ٢٣ سبتمبر ٢٠٢٦</span>
          <span style={{ color: '#D9B778', fontFamily: alexandria, letterSpacing: 0, fontSize: 14 }}>عزّنا بطبعنا</span>
          <a href="#top" style={{ color: 'inherit' }}>رجوع للأعلى ↑</a>
        </div>
      </div>
    </footer>
  )
}
