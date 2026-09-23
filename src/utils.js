export const ACCENT = '#D9B778'

export const fmt = (n) => n.toLocaleString('en-US')
export const arNum = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const mono = "'IBM Plex Mono', monospace"
export const alexandria = "'Alexandria', sans-serif"
export const manrope = "'Manrope', sans-serif"
