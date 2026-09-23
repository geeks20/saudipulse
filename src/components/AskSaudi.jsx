import { useState } from 'react'
import { askSuggestions, answerFor } from '../data.js'
import Cta from './Cta.jsx'
import { mono, alexandria, manrope } from '../utils.js'

export default function AskSaudi() {
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState(null)
  const empty = !q.trim()
  const ask = () => { if (!empty) setAnswer(answerFor(q)) }

  return (
    <section id="ask" style={{ background: '#0B3A28', color: '#F7F3EA', padding: 'clamp(60px,9vh,110px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: 'rgba(217,183,120,.8)', marginBottom: 16 }}>٠٧ — ASK SAUDI</div>
        <h2 style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.25, margin: '0 0 10px' }}>اسأل السعودية</h2>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 13.5, fontWeight: 300, color: 'rgba(247,243,234,.45)', margin: '0 0 28px' }}>Ask Saudi — about a city, place, moment, or story.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            aria-label="اسأل السعودية"
            value={q}
            onInput={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') ask() }}
            placeholder="اسأل عن مدينة، مكان، لحظة، أو قصة."
            style={{ flex: '1 1 260px', padding: '16px 20px', borderRadius: 999, border: '1px solid rgba(247,243,234,.22)', background: 'rgba(247,243,234,.05)', color: '#F7F3EA', fontFamily: 'inherit', fontSize: 15 }}
          />
          <Cta variant="gold" onClick={ask} disabled={empty} style={{ padding: '16px 28px', fontSize: 14 }}>
            اسأل
          </Cta>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {askSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setQ(s); setAnswer(answerFor(s)) }}
              style={{ padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(247,243,234,.16)', background: 'transparent', color: 'rgba(247,243,234,.6)', fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer', direction: 'ltr' }}
            >
              {s}
            </button>
          ))}
        </div>
        {answer && (
          <div style={{ marginTop: 26, padding: 26, border: '1px solid rgba(247,243,234,.14)', borderRadius: 4, background: 'rgba(247,243,234,.04)', animation: 'sp-fade .5s ease both' }}>
            <p style={{ fontSize: 15, lineHeight: 1.9, margin: answer.chips.length ? '0 0 18px' : 0, color: 'rgba(247,243,234,.88)' }}>{answer.text}</p>
            {answer.chips.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {answer.chips.map((ch) => (
                  <span key={ch} style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.1em', padding: '5px 10px', borderRadius: 2, border: '1px solid rgba(217,183,120,.35)', color: '#D9B778', direction: 'ltr' }}>{ch}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
