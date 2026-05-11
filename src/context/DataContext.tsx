import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { getDb } from '../firebase'
import { type Event } from '../data/eventsCatalog'
import { usesBeaconApi, apiListEvents, apiCreateEvent, apiDeleteEvent } from '../lib/beaconApi'

/* eslint-disable react-refresh/only-export-components -- context provider + hook pattern */

function docToEvent(id: string, data: Record<string, unknown>): Event {
  return {
    id,
    title: String(data.title ?? ''),
    desc: String(data.desc ?? ''),
    date: String(data.date ?? ''),
    location: String(data.location ?? 'TBD'),
    category: String(data.category ?? 'Community'),
    img: String(data.img ?? ''),
    isFeatured: Boolean(data.isFeatured),
  }
}

function sortByDateAsc(list: Event[]): Event[] {
  return [...list].sort((a, b) => a.date.localeCompare(b.date))
}

type DataContextType = {
  events: Event[]
  loading: boolean
  error: string | null
  /** Firestore sync (disabled when MySQL API is active) */
  usesFirestore: boolean
  /** REST API + MySQL backend */
  usesMysqlApi: boolean
  /** Admin should use Firebase Auth when Firestore or MySQL API is active */
  authUsesFirebase: boolean
  addEvent: (
    input: Omit<Event, 'id'> & { id?: string },
    idToken?: string | null,
  ) => Promise<void>
  deleteEvent: (id: string, idToken?: string | null) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const usesMysqlApi = usesBeaconApi()
  const db = useMemo(() => (usesMysqlApi ? undefined : getDb()), [usesMysqlApi])
  const usesFirestore = Boolean(db)
  const authUsesFirebase = usesFirestore || usesMysqlApi

  const [events, setEvents] = useState<Event[]>(() => {
    if (usesMysqlApi || usesFirestore) return []
    const saved = localStorage.getItem('beacon_events')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Event[]
        return Array.isArray(parsed) && parsed.length ? sortByDateAsc(parsed) : []
      } catch {
        return []
      }
    }
    return []
  })

  const [loading, setLoading] = useState(usesMysqlApi || usesFirestore)
  const [error, setError] = useState<string | null>(null)

  const refreshMysqlEvents = useCallback(async () => {
    const list = await apiListEvents()
    setEvents(sortByDateAsc(list))
  }, [])

  /* Bootstrap MySQL list: setState runs only after await (microtask), not synchronously in effect body. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!usesMysqlApi) return
    let cancelled = false
    refreshMysqlEvents()
      .then(() => {
        if (!cancelled) {
          setError(null)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load events')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [usesMysqlApi, refreshMysqlEvents])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!db) return
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => docToEvent(d.id, d.data()))
        setEvents(list)
        setLoading(false)
        setError(null)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      },
    )
    return () => unsub()
  }, [db])

  useEffect(() => {
    if (usesMysqlApi || usesFirestore) return
    localStorage.setItem('beacon_events', JSON.stringify(events))
  }, [events, usesMysqlApi, usesFirestore])

  const addEvent = async (
    input: Omit<Event, 'id'> & { id?: string },
    idToken?: string | null,
  ) => {
    if (usesMysqlApi) {
      if (!idToken) throw new Error('Sign in required to publish events.')
      await apiCreateEvent(
        {
          title: input.title,
          desc: input.desc,
          date: input.date,
          location: input.location,
          category: input.category,
          img: input.img || '',
          isFeatured: input.isFeatured,
        },
        idToken,
      )
      await refreshMysqlEvents()
      return
    }
    if (db) {
      await addDoc(collection(db, 'events'), {
        title: input.title,
        desc: input.desc,
        date: input.date,
        location: input.location,
        category: input.category,
        img: input.img || '',
        isFeatured: Boolean(input.isFeatured),
        createdAt: serverTimestamp(),
      })
    } else {
      const id = input.id ?? `${Date.now()}`
      const next: Event = {
        id,
        title: input.title,
        desc: input.desc,
        date: input.date,
        location: input.location,
        category: input.category,
        img: input.img || '',
        isFeatured: input.isFeatured,
      }
      setEvents((prev) => sortByDateAsc([...prev, next]))
    }
  }

  const deleteEvent = async (id: string, idToken?: string | null) => {
    if (usesMysqlApi) {
      if (!idToken) throw new Error('Sign in required.')
      await apiDeleteEvent(id, idToken)
      await refreshMysqlEvents()
      return
    }
    if (db) {
      await deleteDoc(doc(db, 'events', id))
    } else {
      setEvents((prev) => prev.filter((e) => e.id !== id))
    }
  }

  return (
    <DataContext.Provider
      value={{
        events,
        loading,
        error,
        usesFirestore,
        usesMysqlApi,
        authUsesFirebase,
        addEvent,
        deleteEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
