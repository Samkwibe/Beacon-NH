import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import admin from 'firebase-admin'
import { existsSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { randomUUID } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '..', '.env')
if (existsSync(envPath)) {
  // Override inherited shell GOOGLE_APPLICATION_CREDENTIALS so server/.env wins (BeaconNH key).
  dotenv.config({ path: envPath, override: true })
}
const defaultEvents = JSON.parse(
  readFileSync(join(__dirname, '..', 'default-events.json'), 'utf8'),
)

function initFirebaseAdmin() {
  if (admin.apps.length) return true
  try {
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    if (json) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(json)),
      })
      return true
    }
    if (credPath) {
      const raw = readFileSync(credPath, 'utf8')
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(raw)),
      })
      return true
    }
  } catch (e) {
    console.error('Firebase Admin init failed:', e.message)
  }
  return false
}

const firebaseReady = initFirebaseAdmin()

async function verifyBearer(req, res, next) {
  if (!firebaseReady) {
    return res.status(503).json({ error: 'Server missing Firebase Admin credentials' })
  }
  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization Bearer token' })
  }
  try {
    req.authUser = await admin.auth().verifyIdToken(h.slice(7))
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST ?? '127.0.0.1',
  port: Number(process.env.MYSQL_PORT ?? 3306),
  user: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.MYSQL_DATABASE ?? 'beaconnh',
  waitForConnections: true,
  connectionLimit: 10,
})

function rowToEvent(row) {
  const d = row.event_date
  const dateStr =
    d instanceof Date
      ? d.toISOString().slice(0, 10)
      : String(d).slice(0, 10)
  return {
    id: row.id,
    title: row.title,
    desc: row.desc,
    date: dateStr,
    location: row.location,
    category: row.category,
    img: row.img ?? '',
    isFeatured: Boolean(row.is_featured),
  }
}

const app = express()
const corsOrigin = process.env.CORS_ORIGIN ?? true
app.use(
  cors({
    origin: corsOrigin === 'true' ? true : corsOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '512kb' }))

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({
      ok: true,
      mysql: true,
      firebaseAdmin: firebaseReady,
    })
  } catch (e) {
    res.status(503).json({
      ok: false,
      mysql: false,
      error: e instanceof Error ? e.message : 'MySQL error',
    })
  }
})

app.get('/api/events', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, \`desc\`, event_date, location, category, img, is_featured
       FROM events ORDER BY event_date ASC`,
    )
    res.json((rows ?? []).map(rowToEvent))
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Query failed' })
  }
})

app.post('/api/events', verifyBearer, async (req, res) => {
  const { title, desc, date, location, category, img, isFeatured } = req.body ?? {}
  if (!title || !desc || !date) {
    return res.status(400).json({ error: 'title, desc, and date are required' })
  }
  const id = randomUUID()
  try {
    await pool.execute(
      `INSERT INTO events (id, title, \`desc\`, event_date, location, category, img, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        String(title),
        String(desc),
        String(date).slice(0, 10),
        String(location ?? 'TBD'),
        String(category ?? 'Community'),
        String(img ?? ''),
        isFeatured ? 1 : 0,
      ],
    )
    res.status(201).json({ id })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Insert failed' })
  }
})

app.delete('/api/events/:id', verifyBearer, async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Delete failed' })
  }
})

app.post('/api/admin/seed-demo', verifyBearer, async (_req, res) => {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [countRows] = await conn.query('SELECT COUNT(*) AS c FROM events')
    const n = Number(countRows[0]?.c ?? 0)
    if (n > 0) {
      await conn.rollback()
      return res.status(409).json({ error: 'events table is not empty' })
    }
    for (const ev of defaultEvents) {
      const id = randomUUID()
      await conn.execute(
        `INSERT INTO events (id, title, \`desc\`, event_date, location, category, img, is_featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          ev.title,
          ev.desc,
          ev.date,
          ev.location,
          ev.category,
          ev.img ?? '',
          ev.isFeatured ? 1 : 0,
        ],
      )
    }
    await conn.commit()
    res.json({ ok: true, inserted: defaultEvents.length })
  } catch (e) {
    await conn.rollback()
    res.status(500).json({ error: e instanceof Error ? e.message : 'Seed failed' })
  } finally {
    conn.release()
  }
})

app.post('/api/rsvps', async (req, res) => {
  const { eventId, eventTitle, name, email, phone, note } = req.body ?? {}
  if (!eventId || !eventTitle || !name || String(name).length > 120) {
    return res.status(400).json({ error: 'eventId, eventTitle, and name (≤120) required' })
  }
  const id = randomUUID()
  try {
    await pool.execute(
      `INSERT INTO rsvps (id, event_id, event_title, name, email, phone, note)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        String(eventId),
        String(eventTitle),
        String(name),
        String(email ?? ''),
        String(phone ?? ''),
        String(note ?? ''),
      ],
    )
    res.status(201).json({ id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Insert failed'
    if (msg.includes('foreign key') || msg.includes('FOREIGN')) {
      return res.status(400).json({ error: 'Invalid eventId — event does not exist' })
    }
    res.status(500).json({ error: msg })
  }
})

app.get('/api/rsvps', verifyBearer, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, event_id AS eventId, event_title AS eventTitle, name, email, phone, note, created_at AS createdAt
       FROM rsvps ORDER BY created_at DESC LIMIT 200`,
    )
    res.json(rows ?? [])
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Query failed' })
  }
})

const port = Number(process.env.PORT ?? 3001)
app.listen(port, () => {
  console.log(`Beacon NH API http://localhost:${port}`)
  console.log(`Firebase Admin: ${firebaseReady ? 'ready' : 'NOT configured (admin routes will fail)'}`)
})
