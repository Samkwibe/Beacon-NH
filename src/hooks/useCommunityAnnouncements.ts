import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { getDb, isFirebaseConfigured } from '../firebase'

export type CommunityAnnouncement = {
  id: string
  communityId: string
  title: string
  body: string
  /** Display date YYYY-MM-DD */
  date: string
  kind: 'news' | 'event'
}

const MAX = 40

/**
 * Live posts from Firestore `community_announcements` for one hub (partner / community rep publishing).
 */
export function useCommunityAnnouncements(communityId: string | undefined): {
  rows: CommunityAnnouncement[]
  loading: boolean
  error: string | null
} {
  const [rows, setRows] = useState<CommunityAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!communityId || !isFirebaseConfigured()) {
      queueMicrotask(() => {
        setRows([])
        setLoading(false)
        setError(null)
      })
      return
    }
    const db = getDb()
    if (!db) {
      queueMicrotask(() => {
        setRows([])
        setLoading(false)
      })
      return
    }
    const q = query(
      collection(db, 'community_announcements'),
      where('communityId', '==', communityId),
      orderBy('createdAt', 'desc'),
      limit(MAX),
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: CommunityAnnouncement[] = []
        snap.forEach((doc) => {
          const d = doc.data()
          list.push({
            id: doc.id,
            communityId: String(d.communityId ?? ''),
            title: String(d.title ?? ''),
            body: String(d.body ?? ''),
            date: String(d.date ?? '').slice(0, 10),
            kind: d.kind === 'event' ? 'event' : 'news',
          })
        })
        setRows(list)
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [communityId])

  return { rows, loading, error }
}
