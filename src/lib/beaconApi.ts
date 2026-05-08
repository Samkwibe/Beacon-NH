import type { Event } from '../data/eventsCatalog'

export function getApiBase(): string {
  return (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
}

export function usesBeaconApi(): boolean {
  return Boolean(getApiBase())
}

export async function apiListEvents(): Promise<Event[]> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/events`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiCreateEvent(
  body: Omit<Event, 'id'>,
  idToken: string,
): Promise<void> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      title: body.title,
      desc: body.desc,
      date: body.date,
      location: body.location,
      category: body.category,
      img: body.img ?? '',
      isFeatured: Boolean(body.isFeatured),
    }),
  })
  if (!res.ok) throw new Error(await res.text())
}

export async function apiDeleteEvent(id: string, idToken: string): Promise<void> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/events/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${idToken}` },
  })
  if (!res.ok) throw new Error(await res.text())
}

export async function apiSeedDemo(idToken: string): Promise<void> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/admin/seed-demo`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
  })
  if (!res.ok) throw new Error(await res.text())
}

export async function apiSubmitRsvp(payload: {
  eventId: string
  eventTitle: string
  name: string
  email: string
  phone: string
  note: string
}): Promise<void> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/rsvps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventId: payload.eventId,
      eventTitle: payload.eventTitle,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      note: payload.note,
    }),
  })
  if (!res.ok) throw new Error(await res.text())
}

export type ApiRsvpRow = {
  id: string
  eventId: string
  eventTitle: string
  name: string
  email: string
  phone: string
  note: string
  createdAt: string | Date
}

export async function apiListRsvps(idToken: string): Promise<ApiRsvpRow[]> {
  const b = getApiBase()
  const res = await fetch(`${b}/api/rsvps`, {
    headers: { Authorization: `Bearer ${idToken}` },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
