// Blocklist for card text/name. A deterrent for casual abuse, not a guarantee —
// extend the lists as needed. Matching is word-boundary based after normalization;
// entries of 4+ letters also match inside longer words (catches prefixes/suffixes).
const EN_WORDS = [
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'dick', 'cunt', 'whore',
  'slut', 'pussy', 'nigger', 'nigga', 'faggot', 'retard', 'cock', 'wanker', 'porn',
]

// Stored pre-normalized (ة→ه, hamza forms→ا, no diacritics)
const AR_WORDS = [
  'قحبه', 'قحاب', 'شرموطه', 'شرموط', 'شراميط', 'عاهره', 'عاهرات', 'زانيه',
  'كس', 'كسمك', 'كسمج', 'كسمكم', 'كسختك', 'زب', 'زبي', 'طيز', 'نيك', 'منيوك', 'منيك',
  'خرا', 'خره', 'يلعن', 'لوطي', 'خول', 'داشر', 'داعشي',
]

const SUBSTRING_MIN = 4

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, '') // Arabic diacritics + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
}

export function hasBlockedWord(...parts) {
  const text = normalize(parts.filter(Boolean).join(' '))
  const tokens = text.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  for (const word of [...EN_WORDS, ...AR_WORDS]) {
    if (tokens.includes(word)) return true
    if (word.length >= SUBSTRING_MIN && text.includes(word)) return true
  }
  return false
}

export const BLOCKED_MESSAGE = 'خلّنا نخلي الكلام طيب — عدّل النص وجرّب مرة ثانية.'
