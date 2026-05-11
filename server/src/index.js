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

/** Shared system prompt for OpenAI and Gemini backends */
const BEACON_AI_SYSTEM = `You are Beacon NH's triage helper for newcomers in Manchester, New Hampshire.
You are not a lawyer or doctor. For emergencies say 911; mental health crisis 988; general referrals 211 NH.
Give short, practical steps. Prefer linking to 211nh.org, nh.gov, or resettlement agencies' public pages when relevant.
Do not invent phone numbers or government programs. If unsure, tell the user to dial 211 or speak with their case manager.`

/** Normalize chat turns for Gemini (must use roles user | model). */
function mergeGeminiContents(cleaned) {
  const contents = []
  for (const m of cleaned) {
    const role = m.role === 'assistant' ? 'model' : 'user'
    const text = m.content
    const prev = contents[contents.length - 1]
    if (prev && prev.role === role) {
      prev.parts[0].text += '\n\n' + text
    } else {
      contents.push({ role, parts: [{ text }] })
    }
  }
  return contents
}

async function runGeminiAssistant(system, cleaned, apiKey) {
  const model = process.env.GEMINI_MODEL?.trim() || 'gemini-2.0-flash'
  const contents = mergeGeminiContents(cleaned)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents,
      generationConfig: {
        maxOutputTokens: 768,
        temperature: 0.45,
      },
    }),
  })
  const data = await r.json()
  if (!r.ok) {
    const msg = data?.error?.message || data?.error?.status || r.statusText || 'Gemini request failed'
    throw new Error(String(msg))
  }
  const parts = data?.candidates?.[0]?.content?.parts
  const text = Array.isArray(parts) ? parts.map((p) => (p?.text != null ? String(p.text) : '')).join('') : ''
  const trimmed = String(text).trim()
  if (!trimmed) {
    const reason = data?.candidates?.[0]?.finishReason
    throw new Error(
      reason
        ? `No answer returned (${reason}). Try a shorter question or dial 211 NH.`
        : 'No answer returned. Try again or dial 211 NH.',
    )
  }
  return trimmed
}

async function runOpenAiAssistant(system, cleaned, apiKey) {
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
      messages: [{ role: 'system', content: system }, ...cleaned],
      max_tokens: 600,
    }),
  })
  const data = await r.json()
  if (!r.ok) {
    const msg = data?.error?.message || data?.error || r.statusText || 'OpenAI request failed'
    throw new Error(String(msg))
  }
  const text = data?.choices?.[0]?.message?.content ?? ''
  return String(text)
}

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

function parseCorsOrigin() {
  const raw = process.env.CORS_ORIGIN
  if (raw == null || raw === '') return true
  if (raw === 'false') return false
  if (raw === 'true') return true
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (list.length === 0) return true
  if (list.length === 1) return list[0]
  return list
}

/** Parse mysql://user:pass@host:port/db (Railway MYSQL_URL / MYSQL_PUBLIC_URL). */
function configFromMysqlJdbcUrl(urlString) {
  const u = new URL(urlString.trim())
  const db =
    decodeURIComponent((u.pathname || '').replace(/^\//, '').split('?')[0] || '') || 'railway'
  const port = u.port ? Number(u.port) : 3306
  return {
    host: u.hostname,
    port,
    user: decodeURIComponent(u.username || ''),
    password: decodeURIComponent(u.password || ''),
    database: db,
  }
}

function buildMysqlPoolOptions() {
  const useMysqlSslFlag =
    process.env.MYSQL_SSL === '1' || process.env.MYSQL_SSL === 'true'
  const disableMysqlSsl =
    process.env.MYSQL_SSL === '0' || process.env.MYSQL_SSL === 'false'

  const urlRaw =
    process.env.MYSQL_URL?.trim() ||
    process.env.MYSQL_PUBLIC_URL?.trim() ||
    process.env.DATABASE_URL?.trim()

  const base = urlRaw
    ? configFromMysqlJdbcUrl(urlRaw)
    : {
        host:
          process.env.MYSQL_HOST ??
          process.env.MYSQLHOST ??
          '127.0.0.1',
        port: Number(process.env.MYSQL_PORT ?? process.env.MYSQLPORT ?? 3306),
        user: process.env.MYSQL_USER ?? process.env.MYSQLUSER ?? 'root',
        password:
          process.env.MYSQL_PASSWORD ??
          process.env.MYSQLPASSWORD ??
          '',
        database:
          process.env.MYSQL_DATABASE ??
          process.env.MYSQLDATABASE ??
          'beaconnh',
      }

  const publicRailwayHost =
    typeof base.host === 'string' && base.host.includes('rlwy.net')
  const useSsl =
    !disableMysqlSsl && (useMysqlSslFlag || publicRailwayHost)

  const sslRejectUnauthorized = publicRailwayHost
    ? process.env.MYSQL_SSL_REJECT_UNAUTHORIZED === '1' ||
      process.env.MYSQL_SSL_REJECT_UNAUTHORIZED === 'true'
    : process.env.MYSQL_SSL_REJECT_UNAUTHORIZED !== '0' &&
      process.env.MYSQL_SSL_REJECT_UNAUTHORIZED !== 'false'

  return {
    ...base,
    waitForConnections: true,
    connectionLimit: 10,
    ...(useSsl
      ? {
          ssl: {
            rejectUnauthorized: sslRejectUnauthorized,
          },
        }
      : {}),
  }
}

/** Railway MySQL: prefer MYSQL_URL / MYSQL_PUBLIC_URL so public proxy works when *.railway.internal does not resolve. */
const pool = mysql.createPool(buildMysqlPoolOptions())

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
app.use(
  cors({
    origin: parseCorsOrigin(),
    credentials: true,
  }),
)
app.use(express.json({ limit: '512kb' }))

app.post('/api/ai-assistant', async (req, res) => {
  const geminiKey =
    process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_AI_API_KEY?.trim()
  const openaiKey = process.env.OPENAI_API_KEY?.trim()
  if (!geminiKey && !openaiKey) {
    return res.status(503).json({
      error:
        'AI assistant is not configured — set GEMINI_API_KEY (recommended) or OPENAI_API_KEY on the server',
    })
  }
  const { messages } = req.body ?? {}
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }
  const cleaned = messages
    .filter((m) => m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: String(m.content ?? '').slice(0, 8000) }))
    .filter((m) => m.content.length > 0)
    .slice(-14)
  if (cleaned.length === 0) {
    return res.status(400).json({ error: 'At least one user or assistant message is required' })
  }
  try {
    const reply = geminiKey
      ? await runGeminiAssistant(BEACON_AI_SYSTEM, cleaned, geminiKey)
      : await runOpenAiAssistant(BEACON_AI_SYSTEM, cleaned, openaiKey)
    res.json({ reply, provider: geminiKey ? 'gemini' : 'openai' })
  } catch (e) {
    res.status(502).json({ error: e instanceof Error ? e.message : 'AI request failed' })
  }
})

app.get('/api/health', async (_req, res) => {
  let mysqlOk = false
  let mysqlError = null
  try {
    await pool.query('SELECT 1')
    mysqlOk = true
  } catch (e) {
    mysqlError = e instanceof Error ? e.message : 'MySQL error'
  }
  const geminiConfigured = Boolean(
    process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_AI_API_KEY?.trim(),
  )
  const openaiConfigured = Boolean(process.env.OPENAI_API_KEY?.trim())
  const payload = {
    ok: mysqlOk,
    mysql: mysqlOk,
    firebaseAdmin: firebaseReady,
    ai: {
      configured: geminiConfigured || openaiConfigured,
      provider: geminiConfigured ? 'gemini' : openaiConfigured ? 'openai' : null,
    },
    ...(mysqlError ? { error: mysqlError } : {}),
  }
  const strict =
    process.env.HEALTHCHECK_REQUIRE_MYSQL === '1' ||
    process.env.HEALTHCHECK_REQUIRE_MYSQL === 'true'
  if (strict && !mysqlOk) {
    return res.status(503).json(payload)
  }
  res.status(200).json(payload)
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

app.post('/api/admin/seed-demo', verifyBearer, (_req, res) => {
  res.status(410).json({
    error:
      'Demo seed is disabled. Add real events with POST /api/events (or the admin UI).',
  })
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
const host = process.env.HOST ?? '0.0.0.0'
app.listen(port, host, () => {
  const jdbc =
    process.env.MYSQL_URL?.trim() ||
    process.env.MYSQL_PUBLIC_URL?.trim() ||
    process.env.DATABASE_URL?.trim()
  console.log(`Beacon NH API listening on ${host}:${port}`)
  console.log(
    `MySQL: ${jdbc ? 'JDBC URL (MYSQL_URL / MYSQL_PUBLIC_URL / DATABASE_URL)' : 'discrete MYSQLHOST + credentials'}`,
  )
  console.log(`Firebase Admin: ${firebaseReady ? 'ready' : 'NOT configured (admin routes will fail)'}`)
})
