import { useState } from 'react'
import { cities, traitNames, traitHeadlines, submitStory } from '../data.js'
import { downloadCard } from '../cardExport.js'
import { ACCENT, mono, alexandria, manrope } from '../utils.js'

const choiceStyle = (on, fontFamily, pad, fontSize) => ({
  padding: pad, borderRadius: 3,
  border: `1px solid ${on ? ACCENT : 'rgba(247,243,234,.2)'}`,
  background: on ? ACCENT : 'transparent',
  color: on ? '#06281B' : 'rgba(247,243,234,.8)',
  fontFamily, fontSize, cursor: 'pointer', transition: 'all .28s ease', minHeight: 44,
})

export default function StoryBuilder() {
  const [step, setStep] = useState(1)
  const [city, setCity] = useState(null)
  const [trait, setTrait] = useState(null)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const next = () => {
    if (step < 3) return setStep(step + 1)
    if (!city || !trait || !text.trim()) {
      setSubmitError('كمّل الخطوات الثلاث أول — منطقة، طبع، وجملة.')
      return
    }
    setSubmitError(null)
    submitStory({ city, trait, text: text.trim(), name })
      .then(() => {
        setSubmitted(true)
        window.dispatchEvent(new Event('sp:story-submitted'))
      })
      .catch((e) => setSubmitError(e.message === 'invalid city' ? 'اختر منطقة من القائمة.' : e.message))
  }
  const back = () => { setStep(Math.max(1, step - 1)); setSubmitted(false) }

  const shareX = () =>
    window.open('https://x.com/intent/post?text=' + encodeURIComponent((text || 'عزّنا بطبعنا') + ' — #اليوم_الوطني_السعودي_96'), '_blank')
  const copyLink = () => {
    navigator.clipboard && navigator.clipboard.writeText(location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const download = () =>
    downloadCard({
      headline: traitHeadlines[trait] || 'عزّنا بطبعنا',
      quote: text ? `«${text}»` : '«اكتب جملتك وبتظهر هنا.»',
      city: city || 'اختر مدينتك',
      name: name || '—',
    })

  const ghostBtn = { padding: '12px 22px', borderRadius: 999, border: '1px solid rgba(247,243,234,.24)', background: 'transparent', color: '#F7F3EA', fontFamily: 'inherit', fontSize: 13.5, cursor: 'pointer', minHeight: 44 }

  return (
    <section id="story" style={{ background: '#06281B', color: '#F7F3EA', padding: 'clamp(70px,11vh,140px) clamp(18px,4vw,44px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '.2em', color: 'rgba(217,183,120,.8)', marginBottom: 16 }}>٠٥ — YOUR STORY</div>
        <h2 style={{ fontFamily: alexandria, fontWeight: 700, fontSize: 'clamp(32px,5vw,72px)', lineHeight: 1.22, letterSpacing: '-.005em', margin: '0 0 14px' }}>اصنع قصتك</h2>
        <p style={{ fontFamily: alexandria, fontSize: 'clamp(15px,1.5vw,19px)', color: 'rgba(247,243,234,.7)', margin: '0 0 6px' }}>وش قصتك مع السعودية؟ شاركنا اللي يخلّيها غالية عليك.</p>
        <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 14, fontWeight: 300, color: 'rgba(247,243,234,.45)', margin: '0 0 clamp(36px,5vh,58px)' }}>Tell us what makes Saudi special to you.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,56px)', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 min(100%,420px)' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 30 }}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ flex: 1, height: 2, background: step >= n ? ACCENT : 'rgba(247,243,234,.16)', transition: 'background .5s ease' }} />
              ))}
            </div>

            {step === 1 && (
              <div style={{ animation: 'sp-fade .45s ease both' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: 'rgba(217,183,120,.8)', marginBottom: 14 }}>STEP 01</div>
                <h3 style={{ fontFamily: alexandria, fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 600, margin: '0 0 6px' }}>أي منطقة أقرب لقلبك؟</h3>
                <p style={{ fontFamily: manrope, direction: 'ltr', textAlign: 'right', fontSize: 13, fontWeight: 300, color: 'rgba(247,243,234,.45)', margin: '0 0 26px' }}>Which region means the most to you?</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {cities.map((c) => (
                    <button key={c} type="button" onClick={() => setCity(c)} style={choiceStyle(city === c, 'inherit', '12px 18px', 14)}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ animation: 'sp-fade .45s ease both' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: 'rgba(217,183,120,.8)', marginBottom: 14 }}>STEP 02</div>
                <h3 style={{ fontFamily: alexandria, fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 600, margin: '0 0 26px' }}>أي طبع فيهم يمثّلك أكثر؟</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {traitNames.map((t) => (
                    <button key={t} type="button" onClick={() => setTrait(t)} style={{ ...choiceStyle(trait === t, alexandria, '14px 22px', 17), minHeight: 48, color: trait === t ? '#06281B' : 'rgba(247,243,234,.85)' }}>{t}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ animation: 'sp-fade .45s ease both' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '.16em', color: 'rgba(217,183,120,.8)', marginBottom: 14 }}>STEP 03</div>
                <h3 style={{ fontFamily: alexandria, fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 600, margin: '0 0 26px' }}>قلها بجملة وحدة… وش تعني لك السعودية؟</h3>
                <textarea
                  aria-label="قصتك"
                  value={text}
                  onInput={(e) => setText(e.target.value)}
                  placeholder="جملة وحدة تكفي…"
                  style={{ width: '100%', minHeight: 130, resize: 'vertical', padding: 18, borderRadius: 3, border: '1px solid rgba(247,243,234,.22)', background: 'rgba(247,243,234,.04)', color: '#F7F3EA', fontFamily: 'inherit', fontSize: 16, lineHeight: 1.7 }}
                />
                <input
                  aria-label="الاسم الأول"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  placeholder="اسمك الأول (اختياري)"
                  style={{ width: '100%', marginTop: 12, padding: '15px 18px', borderRadius: 3, border: '1px solid rgba(247,243,234,.22)', background: 'rgba(247,243,234,.04)', color: '#F7F3EA', fontFamily: 'inherit', fontSize: 15 }}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <button type="button" onClick={back} style={{ padding: '14px 24px', borderRadius: 999, border: '1px solid rgba(247,243,234,.22)', background: 'transparent', color: 'rgba(247,243,234,.7)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', minHeight: 44 }}>رجوع</button>
              <button type="button" onClick={next} style={{ padding: '14px 30px', borderRadius: 999, border: 0, background: ACCENT, color: '#06281B', fontFamily: 'inherit', fontWeight: 600, fontSize: 15, cursor: 'pointer', minHeight: 44 }}>
                {step < 3 ? 'التالي' : 'اصنع البطاقة'}
              </button>
            </div>
            {submitted && (
              <p style={{ marginTop: 16, fontSize: 14, color: '#7CD8A4', animation: 'sp-fade .4s ease both' }}>وصلت قصتك — شكراً لك. حمّل بطاقتك وشاركها.</p>
            )}
            {submitError && (
              <p style={{ marginTop: 16, fontSize: 14, color: '#E8A48E' }}>{submitError}</p>
            )}
          </div>

          <div style={{ flex: '1 1 min(100%,360px)', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'min(100%,400px)', aspectRatio: '1080/1350', position: 'relative', borderRadius: 4, overflow: 'hidden', background: '#0B3A28', boxShadow: '0 40px 80px -30px rgba(0,0,0,.6)', animation: submitted ? 'sp-rise .8s cubic-bezier(.16,1,.3,1) both' : 'none' }}>
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.16, backgroundImage: 'repeating-linear-gradient(45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 26px),repeating-linear-gradient(-45deg,rgba(247,243,234,.6) 0 1px,transparent 1px 26px)' }} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 70% at 20% 0%,rgba(30,122,82,.55),rgba(11,58,40,0) 70%)' }} />
              <div style={{ position: 'relative', height: '100%', padding: 'clamp(22px,4.5%,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#F7F3EA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: mono, fontSize: 9.5, letterSpacing: '.16em', color: 'rgba(247,243,234,.5)' }}>
                  <span>SAUDI PULSE</span><span>96</span>
                </div>
                <div>
                  <div style={{ fontFamily: alexandria, fontWeight: 600, fontSize: 'clamp(24px,7%,40px)', lineHeight: 1.4, color: '#D9B778', marginBottom: 22 }}>
                    {traitHeadlines[trait] || 'عزّنا بطبعنا'}
                  </div>
                  <div style={{ fontFamily: alexandria, fontSize: 'clamp(15px,4%,20px)', lineHeight: 1.8, color: '#F7F3EA' }}>
                    {text ? `«${text}»` : '«اكتب جملتك وبتظهر هنا.»'}
                  </div>
                </div>
                <div>
                  <div style={{ height: 1, background: 'rgba(247,243,234,.2)', marginBottom: 16 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: alexandria, fontSize: 16 }}>{city || 'اختر مدينتك'}</div>
                      <div style={{ fontSize: 13, color: 'rgba(247,243,234,.55)', marginTop: 4 }}>{name || '—'}</div>
                    </div>
                    <div style={{ textAlign: 'left', direction: 'ltr' }}>
                      <div style={{ fontFamily: alexandria, fontSize: 14, color: '#D9B778' }}>عزّنا بطبعنا</div>
                      <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '.14em', color: 'rgba(247,243,234,.4)', marginTop: 5 }}>NATIONAL DAY 96 · 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28, justifyContent: 'flex-end' }}>
          <button type="button" onClick={download} style={ghostBtn}>تحميل · Download</button>
          <button type="button" onClick={shareX} style={ghostBtn}>شارك على X</button>
          <button type="button" onClick={copyLink} style={ghostBtn}>{copied ? 'تم النسخ ✓' : 'نسخ الرابط'}</button>
        </div>
      </div>
    </section>
  )
}
