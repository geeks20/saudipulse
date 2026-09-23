import { ACCENT } from '../utils.js'

/**
 * The one CTA used everywhere: pill button/link with consistent hover,
 * focus-visible, disabled, and loading states.
 *  - variant 'solid' (cream), 'gold' (accent), 'ghost' (outline on dark)
 *  - pass href to render an anchor, onClick to render a button
 * Never render this without a real href/onClick — if the action doesn't
 * exist yet, show plain text instead of a Cta.
 */
const base = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  borderRadius: 999, fontFamily: 'inherit', cursor: 'pointer', minHeight: 44,
  transition: 'background .3s ease, border-color .3s ease, color .3s ease, opacity .3s ease',
}

const variants = {
  solid: { padding: '15px 30px', border: 0, background: '#F7F3EA', color: '#06281B', fontWeight: 600, fontSize: 15 },
  gold: { padding: '14px 30px', border: 0, background: ACCENT, color: '#06281B', fontWeight: 600, fontSize: 15 },
  ghost: { padding: '13px 26px', border: '1px solid rgba(247,243,234,.3)', background: 'transparent', color: '#F7F3EA', fontWeight: 500, fontSize: 14 },
}

export default function Cta({ variant = 'ghost', href, onClick, disabled, loading, style, children, ...rest }) {
  const off = disabled || loading
  const cls = variant === 'ghost' ? 'sp-hover-gold' : 'sp-cta-solid'
  const s = { ...base, ...variants[variant], ...(off ? { opacity: 0.4, cursor: 'not-allowed' } : null), ...style }

  if (href) {
    return (
      <a href={href} className={cls} style={s} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} style={s} onClick={onClick} disabled={off} aria-busy={loading || undefined} {...rest}>
      {children}
    </button>
  )
}
