import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDb } from '../firebase'
import { usesBeaconApi, apiSubmitRsvp } from './beaconApi'

export type RsvpPayload = {
  eventId: string
  eventTitle: string
  name: string
  email: string
  phone: string
  note: string
}

const STORAGE_KEY = 'beacon_rsvps'

export function dispatchRsvpUpdated() {
  window.dispatchEvent(new Event('beacon-rsvp'))
}

export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  if (usesBeaconApi()) {
    await apiSubmitRsvp(payload)
    dispatchRsvpUpdated()
    return
  }

  const db = getDb()
  if (db) {
    await addDoc(collection(db, 'rsvps'), {
      ...payload,
      createdAt: serverTimestamp(),
    })
    dispatchRsvpUpdated()
    return
  }

  const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Record<string, unknown>[]
  prev.unshift({
    ...payload,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prev))
  dispatchRsvpUpdated()
}
