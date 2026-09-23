import { useEffect, useState } from 'react'
import { fetchStories } from '../data.js'
import Cta from './Cta.jsx'
import { mono, alexandria, manrope, prefersReducedMotion } from '../utils.js'

const label = (n, ar, en) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
    <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: 'rgba(217,183,120,.8)', direction: 'ltr' }}>{n}</span>
    <h4 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(17px,1.8vw,22px)', margin: 0, color: '#F7F3EA' }}>{ar}</h4>
    <span style={{ fontFamily: manrope, direction: 'ltr', fontSize: 11, fontWeight: 300, color: 'rgba(247,243,234,.4)', letterSpacing: '.05em' }}>{en}</span>
  </div>
)

/**
 * Shared deep-exploration panel — one behavior for all 13 regions,
 * fully driven by the region's data (regionDetails merged in data.js):
 * places → story → now → numbers → community stories → «وش قصتك مع …؟»
 */
export default function RegionDetail({ region, lang }) {
  const en = lang === 'en'
  const [allStories, setAllStories] = useState([])

  useEffect(() => {
    const load = () => fetchStories().then(setAllStories).catch(() => {})
    load()
    window.addEventListener('sp:story-submitted', load)
    return () => window.removeEventListener('sp:story-submitted', load)
  }, [])

  const regionStories = allStories.filter((s) => (region.cities || []).includes(s.cityAr)).slice(0, 3)

  const tellStory = () => {
    window.dispatchEvent(new CustomEvent('sp:prefill-story', { detail: { city: region.storyCity } }))
    document.getElementById('story')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div id="region-detail" key={region.id} style={{ marginTop: 'clamp(34px,5vh,60px)', paddingTop: 'clamp(28px,4vh,46px)', borderTop: '1px solid rgba(247,243,234,.14)', animation: 'sp-fade .5s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 'clamp(24px,3.5vh,40px)' }}>
        <h3 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(22px,3vw,40px)', margin: 0 }}>لفة في {region.shortAr}</h3>
        <span style={{ fontFamily: manrope, direction: 'ltr', fontSize: 13, fontWeight: 300, color: 'rgba(247,243,234,.45)' }}>{region.en} — up close</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,3vw,44px)' }}>
        <div style={{ flex: '1 1 min(100%,300px)' }}>
          {label('٠١', 'من المكان', 'PLACES')}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(region.places || []).map((p) => (
              <li key={p.ar} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 14.5, lineHeight: 1.7 }}>
                <span style={{ color: '#C08A2E', flex: 'none' }}>◆</span>
                <span style={{ color: 'rgba(247,243,234,.85)' }}>{p.ar}</span>
                <span style={{ fontFamily: manrope, direction: 'ltr', fontSize: 11, fontWeight: 300, color: 'rgba(247,243,234,.38)' }}>{p.en}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: '2 1 min(100%,380px)' }}>
          {label('٠٢', 'من الحكاية', 'THE STORY')}
          <p style={{ fontFamily: alexandria, fontSize: 'clamp(15px,1.6vw,18px)', lineHeight: 1.95, color: 'rgba(247,243,234,.88)', margin: '0 0 28px', maxWidth: '58ch' }}>
            {en ? region.storyEn : region.storyAr}
          </p>
          {label('٠٣', 'السعودية الآن', 'RIGHT NOW')}
          <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'rgba(247,243,234,.72)', margin: 0, maxWidth: '58ch' }}>
            {en ? region.nowEn : region.nowAr}
          </p>
        </div>

        <div style={{ flex: '1 1 min(100%,280px)' }}>
          {label('٠٤', 'بالأرقام', 'IN NUMBERS')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {(region.numbers || []).map((num) => (
              <div key={num.src + num.v} style={{ paddingBottom: 16, borderBottom: '1px solid rgba(247,243,234,.1)' }}>
                <div style={{ fontFamily: mono, fontSize: 'clamp(24px,2.6vw,34px)', letterSpacing: '-.02em', color: '#F7F3EA', direction: 'ltr', textAlign: 'right' }}>{num.v}</div>
                <div style={{ fontFamily: alexandria, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(247,243,234,.75)', marginTop: 4 }}>{en ? num.en : num.ar}</div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.12em', color: 'rgba(217,183,120,.7)', marginTop: 6, direction: 'ltr', textAlign: 'right' }}>{num.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(28px,4vh,46px)' }}>
        {label('٠٥', 'قصص من المنطقة', 'COMMUNITY')}
        {regionStories.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {regionStories.map((s, i) => (
              <blockquote key={`${s.name}-${i}`} style={{ flex: '1 1 min(100%,260px)', margin: 0, padding: '18px 20px', borderRadius: 3, background: 'rgba(247,243,234,.05)', border: '1px solid rgba(247,243,234,.1)' }}>
                <p style={{ fontFamily: alexandria, fontSize: 15, lineHeight: 1.8, margin: '0 0 12px', color: 'rgba(247,243,234,.88)' }}>{s.text}</p>
                <footer style={{ fontSize: 12.5, color: 'rgba(247,243,234,.5)' }}>
                  {s.name} · {s.cityAr} · <span style={{ color: '#C08A2E' }}>{s.traitAr}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'rgba(247,243,234,.55)', margin: 0 }}>
            ما وصلتنا قصص من {region.shortAr} بعد — خلّ قصتك أول حكاية تنكتب منها.
          </p>
        )}
      </div>

      <div style={{ marginTop: 'clamp(26px,4vh,42px)' }}>
        <Cta variant="gold" onClick={tellStory}>
          وش قصتك مع {region.shortAr}؟ <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.14em', opacity: 0.55 }}>SHARE</span>
        </Cta>
      </div>
    </div>
  )
}
