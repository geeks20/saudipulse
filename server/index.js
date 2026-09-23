import express from 'express'
import pg from 'pg'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { hasBlockedWord, BLOCKED_MESSAGE } from '../src/moderation.js'
import { aiCheck } from './aiModeration.js'

const PORT = process.env.PORT || 8787
// Submissions are held for review by default; set AUTO_APPROVE=true to publish instantly.
// Review pending cards at /admin (requires ADMIN_TOKEN).
const AUTO_APPROVE = process.env.AUTO_APPROVE === 'true'
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
})

const CITIES = ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'العلا', 'أبها', 'الدمام', 'الخبر', 'تبوك', 'بريدة', 'حائل', 'جازان', 'الأحساء', 'سكاكا', 'نجران', 'عرعر', 'الباحة']
const TRAITS = ['الشجاعة', 'الرؤية', 'الأصالة', 'الهمة', 'الجود', 'الكرم']

// naive per-IP rate limit: 5 submissions per hour
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000
const submissions = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const recent = (submissions.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) return true
  recent.push(now)
  submissions.set(ip, recent)
  return false
}

const app = express()
app.use(express.json({ limit: '8kb' }))

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ ok: false, error: 'db unreachable' })
  }
})

app.get('/api/stories', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, city, trait, text, name, created_at
       FROM stories WHERE approved = true
       ORDER BY created_at DESC LIMIT 60`,
    )
    res.json({ stories: rows })
  } catch (e) {
    console.error('GET /api/stories', e)
    res.status(500).json({ error: 'internal' })
  }
})

app.post('/api/stories', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress
  if (rateLimited(ip)) return res.status(429).json({ error: 'أخذت راحتك اليوم — جرّب بكرة.' })

  const { city, trait, text, name } = req.body || {}
  const cleanText = typeof text === 'string' ? text.replace(/[\u0000-\u001F\u007F]/g, ' ').trim() : ''
  if (!CITIES.includes(city)) return res.status(400).json({ error: 'invalid city' })
  if (!TRAITS.includes(trait)) return res.status(400).json({ error: 'invalid trait' })
  if (!cleanText || cleanText.length > 280) return res.status(400).json({ error: 'invalid text' })
  const cleanName = typeof name === 'string' ? name.trim().slice(0, 60) : null
  if (hasBlockedWord(cleanText, cleanName)) return res.status(400).json({ error: BLOCKED_MESSAGE })
  if ((await aiCheck(cleanText, cleanName)) === 'blocked') return res.status(400).json({ error: BLOCKED_MESSAGE })

  try {
    const { rows: [row] } = await pool.query(
      `INSERT INTO stories (city, trait, text, name, approved)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, city, trait, text, name, approved, created_at`,
      [city, trait, cleanText, cleanName || null, AUTO_APPROVE],
    )
    res.status(201).json({ ok: true, story: row })
  } catch (e) {
    console.error('POST /api/stories', e)
    res.status(500).json({ error: 'internal' })
  }
})

app.get('/api/pulse', async (_req, res) => {
  try {
    const [{ rows: [{ total }] }, { rows: byCity }, { rows: [top] }] = await Promise.all([
      pool.query('SELECT count(*)::int AS total FROM stories WHERE approved = true'),
      pool.query(
        `SELECT city, count(*)::int AS count FROM stories WHERE approved = true
         GROUP BY city ORDER BY count DESC LIMIT 5`,
      ),
      pool.query(
        `SELECT trait, count(*)::int AS count FROM stories WHERE approved = true
         GROUP BY trait ORDER BY count DESC LIMIT 1`,
      ),
    ])
    res.json({ total, byCity, topTrait: top?.trait || null })
  } catch (e) {
    console.error('GET /api/pulse', e)
    res.status(500).json({ error: 'internal' })
  }
})

// --- admin: review pending stories (Bearer ADMIN_TOKEN) ---
function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) return res.status(503).json({ error: 'ADMIN_TOKEN not configured' })
  const auth = req.headers.authorization || ''
  if (auth !== `Bearer ${ADMIN_TOKEN}`) return res.status(401).json({ error: 'unauthorized' })
  next()
}

app.get('/api/admin/stories', requireAdmin, async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, city, trait, text, name, created_at
       FROM stories WHERE approved = false
       ORDER BY created_at ASC LIMIT 200`,
    )
    res.json({ stories: rows })
  } catch (e) {
    console.error('GET /api/admin/stories', e)
    res.status(500).json({ error: 'internal' })
  }
})

app.post('/api/admin/stories/:id/approve', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  try {
    const { rowCount } = await pool.query('UPDATE stories SET approved = true WHERE id = $1', [id])
    if (!rowCount) return res.status(404).json({ error: 'not found' })
    res.json({ ok: true })
  } catch (e) {
    console.error('POST /api/admin/stories/:id/approve', e)
    res.status(500).json({ error: 'internal' })
  }
})

app.delete('/api/admin/stories/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  try {
    const { rowCount } = await pool.query('DELETE FROM stories WHERE id = $1 AND approved = false', [id])
    if (!rowCount) return res.status(404).json({ error: 'not found' })
    res.json({ ok: true })
  } catch (e) {
    console.error('DELETE /api/admin/stories/:id', e)
    res.status(500).json({ error: 'internal' })
  }
})

const here = path.dirname(fileURLToPath(import.meta.url))
app.get('/admin', (_req, res) => res.sendFile(path.join(here, 'admin.html')))

// serve the built frontend (single-service deploy on Railway)
const dist = path.join(here, '..', 'dist')
app.use(express.static(dist))
app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => console.log(`minna server on :${PORT} (auto-approve: ${AUTO_APPROVE})`))
