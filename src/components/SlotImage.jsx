import { images } from '../images.js'
import { mono } from '../utils.js'

/**
 * Fills a media slot with its curated Commons image (cover-fit + CC credit).
 * Returns null when the slot has no image so callers keep their styled placeholder.
 */
export default function SlotImage({ slot, alt = '' }) {
  const img = images[slot]
  if (!img) return null
  return (
    <>
      <img
        src={img.src}
        alt={alt}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <span
        style={{
          position: 'absolute', bottom: 6, insetInlineEnd: 8, zIndex: 1,
          fontFamily: mono, fontSize: 8.5, letterSpacing: '.06em', direction: 'ltr',
          color: 'rgba(247,243,234,.75)', background: 'rgba(4,26,17,.55)',
          padding: '2px 6px', borderRadius: 2, maxWidth: '80%', whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}
      >
        {img.credit}
      </span>
    </>
  )
}

export const hasImage = (slot) => Boolean(images[slot])
