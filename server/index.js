import express from 'express'
import pg from 'pg'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = process.env.PORT || 8787
// Set AUTO_APPROVE=false in production to hold submissions for review
// (approve with: UPDATE stories SET approved = true WHERE id = ...)
const AUTO_APPROVE = process.env.AUTO_APPROVE !== 'false'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
})

const CITIES = ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'العلا', 'أبها', 'الدمام', 'الخبر', 'تبوك', 'بريدة', 'حائل', 'جازان', 'الأحساء']
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
    const [{ rows: [{ total }] }, { rows: byCity }] = await Promise.all([
      pool.query('SELECT count(*)::int AS total FROM stories'),
      pool.query(
        `SELECT city, count(*)::int AS count FROM stories
         GROUP BY city ORDER BY count DESC LIMIT 5`,
      ),
    ])
    res.json({ total, byCity })
  } catch (e) {
    console.error('GET /api/pulse', e)
    res.status(500).json({ error: 'internal' })
  }
})

// serve the built frontend (single-service deploy on Railway)
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
app.use(express.static(dist))
app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => console.log(`saudipulse server on :${PORT} (auto-approve: ${AUTO_APPROVE})`))
