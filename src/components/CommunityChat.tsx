import { useEffect, useState, useRef } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'
import { getDb, getFirebaseAuth, isFirebaseConfigured } from '../firebase'

export type CommunityMessage = {
  id: string
  text: string
  displayName: string
  createdAt: Date | null
}

const MSGS = 60
const DISPLAY_KEY = (cid: string) => `beacon_community_name_${cid}`

export function CommunityChat({
  communityId,
  communityLabel,
  conversationStarters = [],
}: {
  communityId: string
  communityLabel: string
  conversationStarters?: string[]
}) {
  const [messages, setMessages] = useState<CommunityMessage[]>([])
  const [text, setText] = useState('')
  const [displayName, setDisplayName] = useState(() =>
    typeof localStorage !== 'undefined' ? localStorage.getItem(DISPLAY_KEY(communityId)) ?? '' : '',
  )
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const db = getDb()
  const auth = getFirebaseAuth()
  const live = Boolean(db && auth && isFirebaseConfigured())

  useEffect(() => {
    if (!live || !db) return
    const q = query(
      collection(db, 'community_messages'),
      where('communityId', '==', communityId),
      orderBy('createdAt', 'desc'),
      limit(MSGS),
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        setError(null)
        const rows: CommunityMessage[] = []
        snap.forEach((doc) => {
          const d = doc.data()
          const ts = d.createdAt
          rows.push({
            id: doc.id,
            text: String(d.text ?? ''),
            displayName: String(d.displayName ?? ''),
            createdAt: ts?.toDate?.() ?? null,
          })
        })
        setMessages(rows.reverse())
        queueMicrotask(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }))
      },
      (err) => {
        console.error(err)
        setError(
          err.code === 'failed-precondition'
            ? import.meta.env.DEV
              ? 'Firestore needs an index for community chat. Check the browser console for a link to create it.'
              : 'This board is still getting ready. Please try again in a few minutes.'
            : 'We could not load messages. Check your connection or try again later.',
        )
      },
    )
    return () => unsub()
  }, [communityId, db, live])

  useEffect(() => {
    if (!auth || !live) {
      queueMicrotask(() => setAuthReady(true))
      return
    }
    let cancelled = false
    signInAnonymously(auth)
      .catch((e) => {
        console.error(e)
        if (!cancelled)
          setError(
            import.meta.env.DEV
              ? 'Enable Anonymous sign-in in Firebase (Authentication → Sign-in method), then reload.'
              : 'We could not open the board right now. Please try again later or use Get help to reach Beacon NH.',
          )
      })
      .finally(() => {
        if (!cancelled) queueMicrotask(() => setAuthReady(true))
      })
    return () => {
      cancelled = true
    }
  }, [auth, live])

  async function send() {
    if (!db || !auth?.currentUser) {
      setError('Please wait a moment and try again, or refresh the page.')
      return
    }
    const name = displayName.trim() || 'Neighbor'
    const body = text.trim()
    if (!body) return
    if (body.length > 2000) {
      setError('Message is too long (max 2000 characters).')
      return
    }
    localStorage.setItem(DISPLAY_KEY(communityId), name)
    setSending(true)
    setError(null)
    try {
      await addDoc(collection(db, 'community_messages'), {
        communityId,
        text: body,
        displayName: name.slice(0, 80),
        createdAt: serverTimestamp(),
      })
      setText('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Send failed')
    } finally {
      setSending(false)
    }
  }

  if (!live) {
    if (import.meta.env.DEV) {
      console.info(
        '[BeaconNH] Discussion needs Firebase web config in the build (VITE_FIREBASE_* in .env) and Firestore + Anonymous auth.',
      )
    }
    return (
      <section
        className="community-panel community-panel--welcome"
        aria-label={`${communityLabel} discussion`}
      >
        <h2 className="community-board-title">Community discussion</h2>
        <p className="community-board-lead">
          This is a public space for {communityLabel} to share <strong>community news</strong>,{' '}
          <strong>questions</strong>, <strong>ride or housing needs</strong>, and <strong>meet-up ideas</strong>.
          It is meant to stay kind, practical, and respectful.
        </p>
        <p className="community-panel-note">
          The live board is opening soon. Until then, check the <strong>Updates</strong> tab for the latest
          from Beacon NH, or use <strong>Get help</strong> and <strong>Email Beacon NH</strong> in the menu on
          the side so staff can connect you.
        </p>
        {conversationStarters.length > 0 ? (
          <div className="community-chat-starters">
            <p className="community-chat-starters-label">Examples of helpful posts</p>
            <ul className="community-chat-starters-list">
              {conversationStarters.map((line) => (
                <li key={line}>
                  <span className="community-chat-starter-readonly">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    )
  }

  return (
    <section className="community-panel community-chat" aria-label={`${communityLabel} discussion`}>
      {error ? <div className="community-chat-error" role="alert">{error}</div> : null}
      {conversationStarters.length > 0 ? (
        <div className="community-chat-starters">
          <p className="community-chat-starters-label">Tap to use as a starting line</p>
          <ul className="community-chat-starters-list" aria-label="Suggestions for your post">
            {conversationStarters.map((line) => (
              <li key={line}>
                <button type="button" className="community-chat-starter-btn" onClick={() => setText(line)}>
                  {line}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="community-chat-name-row">
        <label htmlFor={`chat-name-${communityId}`} className="community-chat-label">
          Your name (shown with your messages)
        </label>
        <input
          id={`chat-name-${communityId}`}
          type="text"
          className="community-chat-input community-chat-input--name"
          maxLength={80}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="First name or nickname"
          autoComplete="nickname"
        />
      </div>
      <div className="community-chat-log" aria-live="polite">
        {!authReady ? (
          <p className="community-panel-note">Connecting…</p>
        ) : messages.length === 0 ? (
          <p className="community-panel-note">No messages yet. Say hello to {communityLabel}.</p>
        ) : (
          <ul className="community-chat-list">
            {messages.map((m) => (
              <li key={m.id} className="community-chat-msg">
                <div className="community-chat-msg-meta">
                  <span className="community-chat-msg-author">{m.displayName || 'Neighbor'}</span>
                  {m.createdAt ? (
                    <time className="community-chat-msg-time" dateTime={m.createdAt.toISOString()}>
                      {m.createdAt.toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </time>
                  ) : null}
                </div>
                <p className="community-chat-msg-text">{m.text}</p>
              </li>
            ))}
          </ul>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="community-chat-compose">
        <label htmlFor={`chat-msg-${communityId}`} className="community-chat-label">
          Your message (shown to everyone in this hub)
        </label>
        <textarea
          id={`chat-msg-${communityId}`}
          className="community-chat-textarea"
          rows={3}
          maxLength={2000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Share news, asks, or meet-ups for ${communityLabel}…`}
          disabled={!authReady || sending}
        />
        <button
          type="button"
          className="btn-primary community-chat-send"
          disabled={!authReady || sending || !text.trim()}
          onClick={() => void send()}
        >
          {sending ? 'Sending…' : 'Post'}
        </button>
      </div>
      <p className="community-chat-disclaimer">
        Be respectful. No hate or harassment. For emergencies call <strong>911</strong>. For private help,
        use <strong>Get help</strong> or email Beacon NH — do not post sensitive personal details here.
      </p>
    </section>
  )
}
