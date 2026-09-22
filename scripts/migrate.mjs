// Apply db/schema.sql and seed the archive. Idempotent — safe to re-run.
// Uses the direct (unpooled) connection, as Neon recommends for migrations.
import { readFileSync } from 'node:fs'
import pg from 'pg'

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL_UNPOOLED / DATABASE_URL not set')
  process.exit(1)
}

const seeds = [
  { name: 'أحمد', city: 'الرياض', trait: 'الكرم', text: 'أصبحت الرياض وطناً أسرع مما توقعت.', minsAgo: 4 },
  { name: 'نورة', city: 'أبها', trait: 'الهمة', text: 'في عسير تعلمت أن الضباب ليس حجاباً، بل دعوة للصعود أعلى.', minsAgo: 12 },
  { name: 'Layla', city: 'العلا', trait: 'الأصالة', text: 'وقفت أمام الحِجر ولم أقل شيئاً. الصخر قال كل شيء.', minsAgo: 22 },
  { name: 'خالد', city: 'جدة', trait: 'الجود', text: 'جدة تعطيك البحر أولاً، ثم تعطيك الناس.', minsAgo: 31 },
  { name: 'سارة', city: 'المدينة المنورة', trait: 'الأصالة', text: 'المدينة تمشي بك ببطء حتى تصفو.', minsAgo: 40 },
  { name: 'Omar', city: 'الخبر', trait: 'الرؤية', text: 'أبي عمل في الظهران، وأنا أعمل الآن على ما سيأتي بعدها.', minsAgo: 60 },
  { name: 'منيرة', city: 'بريدة', trait: 'الكرم', text: 'لا تخرج من بيتٍ في القصيم دون تمرٍ في يدك.', minsAgo: 120 },
  { name: 'فيصل', city: 'تبوك', trait: 'الشجاعة', text: 'رأيت الثلج في تبوك، وصدّقت أن كل شيء ممكن هنا.', minsAgo: 180 },
  { name: 'Hessa', city: 'الأحساء', trait: 'الجود', text: 'ظلّ النخلة في الأحساء يكفي عائلة كاملة.', minsAgo: 240 },
]

const client = new pg.Client({ connectionString: url })
await client.connect()
try {
  await client.query(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'))
  console.log('schema applied')

  const { rows: [{ count }] } = await client.query('SELECT count(*)::int AS count FROM stories')
  if (count === 0) {
    for (const s of seeds) {
      await client.query(
        `INSERT INTO stories (city, trait, text, name, approved, created_at)
         VALUES ($1, $2, $3, $4, true, now() - make_interval(mins => $5))`,
        [s.city, s.trait, s.text, s.name, s.minsAgo],
      )
    }
    console.log(`seeded ${seeds.length} stories`)
  } else {
    console.log(`stories table already has ${count} rows — skipping seed`)
  }
} finally {
  await client.end()
}
