import { useState, useEffect } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  writeBatch,
  doc,
  serverTimestamp,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth'
import { getDb, getFirebaseAuth } from '../firebase'
import {
  useData,
} from '../context/DataContext'
import {
  EVENT_CATEGORIES,
  type Event,
} from '../data/eventsCatalog'
import { COMMUNITIES } from '../data/communitiesCatalog'
import { apiListRsvps, type ApiRsvpRow } from '../lib/beaconApi'

type LocalRsvp = {
  id: string
  eventId: string
  eventTitle: string
  name: string
  email?: string
  phone?: string
  note?: string
  createdAt?: string
}

function loadLocalRsvps(): LocalRsvp[] {
  try {
    const raw = localStorage.getItem('beacon_rsvps')
    if (!raw) return []
    const parsed = JSON.parse(raw) as LocalRsvp[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function Dashboard() {
  usePageMeta('Admin', 'Beacon NH admin — events, RSVPs, and partner posts for community hubs.')

  const db = getDb()
  const auth = getFirebaseAuth()
  const {
    events,
    addEvent,
    deleteEvent,
    usesFirestore,
    usesMysqlApi,
    authUsesFirebase,
    loading: eventsLoading,
    error: eventsError,
  } = useData()

  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(!authUsesFirebase)

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [authErr, setAuthErr] = useState<string | null>(null)

  const [localGate, setLocalGate] = useState(
    () => localStorage.getItem('beacon_admin_local') === 'true',
  )

  const localPassword =
    import.meta.env.VITE_LOCAL_ADMIN_PASSWORD ??
    (import.meta.env.DEV ? 'admin123' : '')

  const [tab, setTab] = useState<'events' | 'rsvps' | 'communities'>('events')

  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCat, setNewCat] = useState<string>(EVENT_CATEGORIES[0])
  const [newDesc, setNewDesc] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newImg, setNewImg] = useState('')
  const [submitBusy, setSubmitBusy] = useState(false)

  const showHubPublisher = Boolean(db) && authUsesFirebase && Boolean(user)

  const [annCommunityId, setAnnCommunityId] = useState(() => COMMUNITIES[0]?.id ?? 'congolese')
  const [annTitle, setAnnTitle] = useState('')
  const [annBody, setAnnBody] = useState('')
  const [annDate, setAnnDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [annKind, setAnnKind] = useState<'news' | 'event'>('news')
  const [annBusy, setAnnBusy] = useState(false)
  const [annRows, setAnnRows] = useState<
    { id: string; communityId: string; title: string; date: string; kind: string }[]
  >([])

  const [fireRsvps, setFireRsvps] = useState<
    { id: string; data: Record<string, unknown> }[]
  >([])
  const [mysqlRsvps, setMysqlRsvps] = useState<ApiRsvpRow[]>([])
  const [localRsvps, setLocalRsvps] = useState<LocalRsvp[]>(() =>
    loadLocalRsvps(),
  )

  useEffect(() => {
    if (!authUsesFirebase) return
    if (!auth) {
      queueMicrotask(() => setAuthReady(true))
      return
    }
    setPersistence(auth, browserLocalPersistence).catch(() => {})
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthReady(true)
      setAuthErr(null)
    })
    return () => unsub()
  }, [authUsesFirebase, auth])

  useEffect(() => {
    if (!usesFirestore || !db || !user || tab !== 'rsvps') return
    const q = query(
      collection(db, 'rsvps'),
      orderBy('createdAt', 'desc'),
      limit(100),
    )
    const unsub = onSnapshot(q, (snap) => {
      setFireRsvps(
        snap.docs.map((d) => ({ id: d.id, data: d.data() as Record<string, unknown> })),
      )
    })
    return () => unsub()
  }, [usesFirestore, db, user, tab])

  useEffect(() => {
    if (!usesMysqlApi || !user || tab !== 'rsvps') return
    let cancelled = false
    const load = async () => {
      try {
        const token = await user.getIdToken()
        const rows = await apiListRsvps(token)
        if (!cancelled) setMysqlRsvps(rows)
      } catch {
        if (!cancelled) setMysqlRsvps([])
      }
    }
    load()
    window.addEventListener('beacon-rsvp', load)
    return () => {
      cancelled = true
      window.removeEventListener('beacon-rsvp', load)
    }
  }, [usesMysqlApi, user, tab])

  useEffect(() => {
    const refresh = () => setLocalRsvps(loadLocalRsvps())
    window.addEventListener('beacon-rsvp', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('beacon-rsvp', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  useEffect(() => {
    if (!db || !user || tab !== 'communities') return
    const q = query(
      collection(db, 'community_announcements'),
      orderBy('createdAt', 'desc'),
      limit(80),
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        setAnnRows(
          snap.docs.map((d) => {
            const x = d.data()
            return {
              id: d.id,
              communityId: String(x.communityId ?? ''),
              title: String(x.title ?? ''),
              date: String(x.date ?? '').slice(0, 10),
              kind: String(x.kind ?? 'news'),
            }
          }),
        )
      },
      (err) => console.error(err),
    )
    return () => unsub()
  }, [db, user, tab])

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) return
    setAuthErr(null)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pwd)
      setPwd('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed'
      setAuthErr(msg)
    }
  }

  const handleLocalLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (localPassword !== '' && pwd !== localPassword) {
      setAuthErr('Incorrect password.')
      return
    }
    localStorage.setItem('beacon_admin_local', 'true')
    setLocalGate(true)
    setPwd('')
    setAuthErr(null)
  }

  const handleLogout = async () => {
    if (auth && user) await signOut(auth)
    localStorage.removeItem('beacon_admin_local')
    setLocalGate(false)
    setUser(null)
  }

  const handleResetPassword = async () => {
    if (!auth || !email.trim()) {
      setAuthErr('Enter your email above, then click Forgot password.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setAuthErr(null)
      alert('Password reset email sent. Check your inbox.')
    } catch (err: unknown) {
      setAuthErr(err instanceof Error ? err.message : 'Reset failed')
    }
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitBusy(true)
    try {
      const token =
        authUsesFirebase && user ? await user.getIdToken() : null
      await addEvent(
        {
          title: newTitle.trim(),
          date: newDate,
          category: newCat,
          desc: newDesc.trim(),
          location: newLocation.trim() || 'TBD',
          img: newImg.trim(),
        },
        token,
      )
      setNewTitle('')
      setNewDate('')
      setNewDesc('')
      setNewLocation('')
      setNewImg('')
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Could not save event')
    } finally {
      setSubmitBusy(false)
    }
  }

  const handleCommunityAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !user) return
    setAnnBusy(true)
    try {
      await addDoc(collection(db, 'community_announcements'), {
        communityId: annCommunityId,
        title: annTitle.trim(),
        body: annBody.trim(),
        date: annDate.slice(0, 10),
        kind: annKind,
        createdAt: serverTimestamp(),
        authorEmail: user.email ?? '',
      })
      setAnnTitle('')
      setAnnBody('')
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Could not publish post')
    } finally {
      setAnnBusy(false)
    }
  }

  const migrateLocalToFirebase = async () => {
    if (!db) return
    const raw = localStorage.getItem('beacon_events')
    let list: Event[] = []
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Event[]
        if (Array.isArray(parsed) && parsed.length) list = parsed
      } catch {
        /* ignore */
      }
    }
    if (!list.length) {
      alert('No events in this browser’s local storage to migrate.')
      return
    }
    const batch = writeBatch(db)
    for (const ev of list) {
      const ref = doc(collection(db, 'events'))
      batch.set(ref, {
        title: ev.title,
        desc: ev.desc,
        date: ev.date,
        location: ev.location,
        category: ev.category,
        img: ev.img || '',
        isFeatured: Boolean(ev.isFeatured),
        createdAt: serverTimestamp(),
      })
    }
    await batch.commit()
    alert('Events migrated from this browser to Firebase.')
  }

  const formatRsvpTime = (data: Record<string, unknown>) => {
    const c = data.createdAt
    if (c && typeof c === 'object' && 'toDate' in c && typeof (c as { toDate: () => Date }).toDate === 'function') {
      return (c as { toDate: () => Date }).toDate().toLocaleString()
    }
    return String(data.createdAt ?? '—')
  }

  if (!authReady) {
    return (
      <div className="admin-shell admin-shell--center">
        <p className="admin-muted">Loading…</p>
      </div>
    )
  }

  if (authUsesFirebase && !auth) {
    return (
      <div className="admin-shell admin-shell--center">
        <div className="admin-card admin-form">
          <h2 className="admin-h2">Firebase client missing</h2>
          <p className="admin-muted admin-lead">
            Add your Firebase web config to <code className="admin-code">.env</code> (
            <code className="admin-code">VITE_FIREBASE_*</code>). The site uses Firebase for admin
            sign-in; events and RSVPs are stored in MySQL when <code className="admin-code">VITE_API_URL</code>{' '}
            is set.
          </p>
        </div>
      </div>
    )
  }

  if (authUsesFirebase && !user) {
    return (
      <div className="admin-shell admin-shell--center">
        <form className="admin-card admin-form" onSubmit={handleFirebaseLogin}>
          <h2 className="admin-h2">Admin sign in</h2>
          <p className="admin-muted admin-lead">
            {usesMysqlApi
              ? 'Sign in with Firebase (same project as your API server). Events and RSVPs are saved to MySQL.'
              : 'Use a Firebase Auth account. Enable Email/Password sign-in in the Firebase console and create a user there.'}
          </p>
          <input
            className="admin-input"
            type="email"
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="admin-input"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {authErr && <div className="admin-error">{authErr}</div>}
          <button type="submit" className="admin-btn admin-btn--primary">
            Sign in
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={handleResetPassword}
          >
            Forgot password
          </button>
        </form>
      </div>
    )
  }

  if (!authUsesFirebase && !localGate) {
    return (
      <div className="admin-shell admin-shell--center">
        <form className="admin-card admin-form" onSubmit={handleLocalLogin}>
          <h2 className="admin-h2">Local admin</h2>
          <p className="admin-muted admin-lead">
            No Firebase and no MySQL API URL. Add <code className="admin-code">VITE_FIREBASE_*</code>{' '}
            (and optionally <code className="admin-code">VITE_API_URL</code> for MySQL) in{' '}
            <code className="admin-code">.env</code>. Until then, events stay in this browser only.
          </p>
          {localPassword !== '' ? (
            <input
              className="admin-input"
              type="password"
              placeholder="Local admin password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          ) : (
            <p className="admin-note admin-note--warn">
              Dev mode: no password required. Set{' '}
              <code className="admin-code">VITE_LOCAL_ADMIN_PASSWORD</code> before deploying.
            </p>
          )}
          {authErr && <div className="admin-error">{authErr}</div>}
          <button type="submit" className="admin-btn admin-btn--primary">
            Continue
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <h1 className="admin-h1">Beacon NH Command Center</h1>
          <p className="admin-muted">
            {authUsesFirebase
              ? `${usesMysqlApi ? 'MySQL API · ' : ''}Signed in as ${user?.email ?? 'admin'}`
              : 'Local storage mode — data stays on this device'}
          </p>
        </div>
        <div className="admin-header-actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          type="button"
          className={`admin-tab ${tab === 'events' ? 'admin-tab--on' : ''}`}
          onClick={() => setTab('events')}
        >
          Events
        </button>
        <button
          type="button"
          className={`admin-tab ${tab === 'rsvps' ? 'admin-tab--on' : ''}`}
          onClick={() => setTab('rsvps')}
        >
          RSVPs
        </button>
        {showHubPublisher ? (
          <button
            type="button"
            className={`admin-tab ${tab === 'communities' ? 'admin-tab--on' : ''}`}
            onClick={() => setTab('communities')}
          >
            Community hubs
          </button>
        ) : null}
      </div>

      {eventsError && (
        <div className="admin-banner admin-banner--error">{eventsError}</div>
      )}
      {eventsLoading && (
        <div className="admin-banner admin-banner--info">Loading events…</div>
      )}

      {tab === 'events' && (
        <div className="admin-grid">
          <div>
            <h2 className="admin-h2">Add event</h2>
            <form className="admin-card admin-form" onSubmit={handleAddEvent}>
              <input
                className="admin-input"
                required
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                className="admin-input"
                required
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <input
                className="admin-input"
                placeholder="Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <select
                className="admin-input"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
              >
                {EVENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <textarea
                className="admin-input admin-textarea"
                required
                placeholder="Description"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={4}
              />
              <input
                className="admin-input"
                placeholder="Image URL (optional)"
                value={newImg}
                onChange={(e) => setNewImg(e.target.value)}
              />
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                disabled={submitBusy || eventsLoading}
              >
                Publish
              </button>
            </form>

            <div className="admin-tools">
              <h3 className="admin-h3">Tools</h3>
              {usesFirestore && user && (
                <button
                  type="button"
                  className="admin-btn admin-btn--secondary"
                  onClick={() => migrateLocalToFirebase()}
                >
                  Migrate localStorage events → Firebase
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="admin-h2">Live events</h2>
            <div className="admin-card admin-list">
              {events.map((ev) => (
                <div key={ev.id} className="admin-row">
                  <div>
                    <div className="admin-row-title">{ev.title}</div>
                    <div className="admin-muted admin-row-meta">
                      {ev.date} · {ev.category} · {ev.location}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={async () => {
                      try {
                        const token =
                          authUsesFirebase && user
                            ? await user.getIdToken()
                            : null
                        await deleteEvent(ev.id, token)
                      } catch (err: unknown) {
                        alert(err instanceof Error ? err.message : 'Delete failed')
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {events.length === 0 && !eventsLoading && (
                <div className="admin-empty">No events yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'rsvps' && (
        <div className="admin-card admin-list">
          <h2 className="admin-h2" style={{ padding: '0 20px', marginTop: '16px' }}>
            Recent RSVPs
          </h2>
          <p className="admin-muted" style={{ padding: '0 20px 16px' }}>
            Names and messages from event RSVP forms.
          </p>
          {usesFirestore && user && fireRsvps.length === 0 && (
            <div className="admin-empty">No RSVPs yet.</div>
          )}
          {usesFirestore &&
            user &&
            fireRsvps.map(({ id, data }) => (
              <div key={id} className="admin-row admin-row--stack">
                <div className="admin-row-title">{String(data.name ?? '')}</div>
                <div className="admin-muted admin-row-meta">
                  {String(data.eventTitle ?? '')} · {formatRsvpTime(data)}
                </div>
                {(String(data.email ?? '') || String(data.phone ?? '')) ? (
                  <div className="admin-muted">
                    {[String(data.email ?? ''), String(data.phone ?? '')].filter(Boolean).join(' · ')}
                  </div>
                ) : null}
                {data.note ? (
                  <div className="admin-rsvp-note">{String(data.note)}</div>
                ) : null}
              </div>
            ))}
          {usesMysqlApi && user && mysqlRsvps.length === 0 && (
            <div className="admin-empty">No RSVPs yet.</div>
          )}
          {usesMysqlApi &&
            user &&
            mysqlRsvps.map((r) => (
              <div key={r.id} className="admin-row admin-row--stack">
                <div className="admin-row-title">{r.name}</div>
                <div className="admin-muted admin-row-meta">
                  {r.eventTitle} ·{' '}
                  {r.createdAt instanceof Date
                    ? r.createdAt.toLocaleString()
                    : String(r.createdAt ?? '—')}
                </div>
                {(r.email || r.phone) && (
                  <div className="admin-muted">
                    {[r.email, r.phone].filter(Boolean).join(' · ')}
                  </div>
                )}
                {r.note ? <div className="admin-rsvp-note">{r.note}</div> : null}
              </div>
            ))}
          {!authUsesFirebase &&
            localRsvps.map((r) => (
              <div key={r.id} className="admin-row admin-row--stack">
                <div className="admin-row-title">{r.name}</div>
                <div className="admin-muted admin-row-meta">
                  {r.eventTitle} · {r.createdAt ?? '—'}
                </div>
                {(r.email || r.phone) && (
                  <div className="admin-muted">
                    {[r.email, r.phone].filter(Boolean).join(' · ')}
                  </div>
                )}
                {r.note ? <div className="admin-rsvp-note">{r.note}</div> : null}
              </div>
            ))}
          {!authUsesFirebase && localRsvps.length === 0 && (
            <div className="admin-empty">No local RSVPs yet.</div>
          )}
        </div>
      )}

      {tab === 'communities' && showHubPublisher && (
        <div className="admin-grid">
          <div>
            <h2 className="admin-h2">Post to a community hub</h2>
            <p className="admin-muted admin-lead">
              Appears on that community&apos;s <strong>Updates</strong> tab. Create Firebase accounts for IINE staff
              or trusted community reps; anyone signed in here can publish (tighten with Firebase custom claims later).
            </p>
            <form className="admin-card admin-form" onSubmit={handleCommunityAnnouncement}>
              <label className="admin-label" htmlFor="ann-community">
                Community
              </label>
              <select
                id="ann-community"
                className="admin-input"
                value={annCommunityId}
                onChange={(e) => setAnnCommunityId(e.target.value)}
              >
                {COMMUNITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                className="admin-input"
                required
                placeholder="Title"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                maxLength={200}
              />
              <input
                className="admin-input"
                required
                type="date"
                value={annDate}
                onChange={(e) => setAnnDate(e.target.value)}
              />
              <select
                className="admin-input"
                value={annKind}
                onChange={(e) => setAnnKind(e.target.value as 'news' | 'event')}
              >
                <option value="news">News / update</option>
                <option value="event">Upcoming event (highlight)</option>
              </select>
              <textarea
                className="admin-input admin-textarea"
                required
                placeholder="Details — time, place, who to contact (no sensitive personal data)"
                value={annBody}
                onChange={(e) => setAnnBody(e.target.value)}
                rows={5}
                maxLength={4000}
              />
              <button type="submit" className="admin-btn admin-btn--primary" disabled={annBusy}>
                Publish to hub
              </button>
            </form>
          </div>
          <div>
            <h2 className="admin-h2">Recent hub posts</h2>
            <div className="admin-card admin-list">
              {annRows.map((row) => (
                <div key={row.id} className="admin-row admin-row--stack">
                  <div className="admin-row-title">{row.title}</div>
                  <div className="admin-muted admin-row-meta">
                    {row.communityId} · {row.date} · {row.kind}
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={async () => {
                      if (!db) return
                      if (!window.confirm('Delete this post from the community hub?')) return
                      try {
                        await deleteDoc(doc(db, 'community_announcements', row.id))
                      } catch (err: unknown) {
                        alert(err instanceof Error ? err.message : 'Delete failed')
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              {annRows.length === 0 ? <div className="admin-empty">No hub posts yet.</div> : null}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
