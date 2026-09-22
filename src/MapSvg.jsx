import { regions, pulseCities } from './data.js'
import { ACCENT } from './utils.js'
import { MAP_W as W, MAP_H as H } from './useGeo.js'

const HERO_PINS = ['riyadh', 'makkah', 'eastern', 'aseer', 'tabuk']

/**
 * The Kingdom map in three modes:
 *  - hero:  ambient, breathing pins
 *  - big:   interactive region picker (activeId/hoverId + callbacks)
 *  - pulse: live story pings over major cities
 */
export default function MapSvg({ mode, geo, activeId, hoverId, onSelect, onHover, pulses }) {
  if (!geo) return <div style={{ width: '100%', aspectRatio: `${W}/${H}` }} />
  const { path, pts, cityPts } = geo
  const cid = `sp-clip-${mode}`
  const gid = `sp-glow-${mode}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      role="img"
      aria-label="خريطة المملكة العربية السعودية"
    >
      <defs>
        <clipPath id={cid}><path d={path} /></clipPath>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor={ACCENT} stopOpacity=".85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d={path} fill="#0E4530" stroke="rgba(217,183,120,.55)" strokeWidth="1.2" />
      <g clipPath={`url(#${cid})`} opacity=".5">
        {Array.from({ length: 44 }, (_, i) => (
          <line key={i} x1="0" y1={i * 18} x2={W} y2={i * 18 - 220} stroke="rgba(247,243,234,.10)" strokeWidth="1" />
        ))}
      </g>

      {mode === 'big' && pts && (
        <>
          <g clipPath={`url(#${cid})`}>
            {regions.map((r) => {
              const p = pts[r.id]
              if (!p) return null
              const on = r.id === activeId || r.id === hoverId
              return (
                <circle
                  key={r.id} cx={p[0]} cy={p[1]} r={on ? 150 : 90}
                  fill={`url(#${gid})`} opacity={on ? 0.55 : 0.1}
                  style={{ transition: 'opacity .5s ease, r .5s ease' }}
                />
              )
            })}
          </g>
          <g>
            {regions.map((r) => {
              const p = pts[r.id]
              if (!p) return null
              const on = r.id === activeId
              return (
                <g
                  key={r.id}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${r.en} — ${r.ar}`}
                  onClick={() => onSelect(r.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(r.id) }
                  }}
                  onMouseEnter={() => onHover(r.id)}
                  onMouseLeave={() => onHover(null)}
                >
                  <circle cx={p[0]} cy={p[1]} r="26" fill="transparent" />
                  <circle
                    cx={p[0]} cy={p[1]} r={on ? 6.5 : 3.5}
                    fill={on ? ACCENT : 'rgba(247,243,234,.75)'}
                    style={{ transition: 'r .35s ease, fill .35s ease' }}
                  />
                  <text
                    x={p[0]} y={p[1] - 14} textAnchor="middle"
                    fill={on ? ACCENT : 'rgba(247,243,234,.6)'}
                    fontSize={on ? 19 : 15}
                    fontFamily="'Alexandria', sans-serif"
                    style={{ transition: 'all .35s ease', pointerEvents: 'none' }}
                  >
                    {r.ar}
                  </text>
                </g>
              )
            })}
          </g>
        </>
      )}

      {mode === 'pulse' && cityPts && (
        <>
          <g>
            {pulseCities.map((c) => {
              const p = cityPts[c.ar]
              if (!p) return null
              return <circle key={c.ar} cx={p[0]} cy={p[1]} r="2.5" fill="rgba(247,243,234,.5)" />
            })}
          </g>
          <g>
            {(pulses || []).map((pu) => {
              const p = cityPts[pu.city.ar]
              if (!p) return null
              return (
                <g key={pu.id}>
                  <circle cx={p[0]} cy={p[1]} r="3" fill={ACCENT} />
                  <circle
                    cx={p[0]} cy={p[1]} r="3" fill="none" stroke={ACCENT} strokeWidth="1.4"
                    style={{ animation: 'sp-ping 3s cubic-bezier(.16,1,.3,1) forwards' }}
                  />
                </g>
              )
            })}
          </g>
        </>
      )}

      {mode === 'hero' && pts && (
        <g>
          {HERO_PINS.map((id, i) => {
            const p = pts[id]
            if (!p) return null
            return (
              <circle
                key={id} cx={p[0]} cy={p[1]} r="4" fill={ACCENT}
                style={{
                  animation: `sp-breathe ${2.4 + i * 0.4}s ease-in-out infinite`,
                  transformOrigin: `${p[0]}px ${p[1]}px`,
                }}
              />
            )
          })}
        </g>
      )}
    </svg>
  )
}
