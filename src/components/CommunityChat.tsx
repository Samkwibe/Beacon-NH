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

export function CommunityChat({ communityId, communityLabel }: { communityId: string; communityLabel: string }) {
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
            ? 'Firestore needs an index for community chat. Open the link in the browser console or Firebase console to create it.'
            : 'Could not load messages. Check Firestore rules and your connection.',
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
        if (!cancelled) setError('Enable Anonymous sign-in in Firebase Console → Authentication → Sign-in method, then reload.')
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
      setError('Sign-in not ready. Reload the page or check Firebase Anonymous auth.')
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
    return (
      <div className="community-panel community-panel--muted">
        <p>
          <strong>Live discussion</strong> needs Firebase (same project as the site). Add{' '}
          <code className="community-code">VITE_FIREBASE_*</code> to your environment, deploy Firestore rules,
          and enable <strong>Anonymous</strong> authentication in Firebase Console.
        </p>
        <p className="community-panel-note">
          Until then, use the updates above and contact Beacon NH for introductions to {communityLabel}.
        </p>
      </div>
    )
  }

  return (
    <div className="community-panel community-chat">
      {error ? <div className="community-chat-error" role="alert">{error}</div> : null}
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
        <textarea
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
        Public board — stay kind. For emergencies call 911. For personal help from Beacon NH, use Contact or Get help.
      </p>
    </div>
  )
}
