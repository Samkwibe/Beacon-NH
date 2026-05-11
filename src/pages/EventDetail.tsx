import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { calendarDayMonth, formatLongDate } from '../lib/dates'
import { submitRsvp } from '../lib/rsvp'
import { usePageMeta } from '../hooks/usePageMeta'

export function EventDetail() {
  const { id } = useParams()
  const { events } = useData()
  const event = events.find((e) => e.id === id)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [rsvpMsg, setRsvpMsg] = useState('')

  usePageMeta(
    event?.title ?? 'Event',
    event?.desc ?? 'Beacon NH community event in Manchester, New Hampshire.',
  )

  if (!event) {
    return (
      <div className="page-shell page-shell--narrow">
        <div className="page-empty">Event not found.</div>
        <Link to="/events" className="event-detail-back">
          ← Back to Events
        </Link>
      </div>
    )
  }

  const { day, monthShort } = calendarDayMonth(event.date)

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setRsvpStatus('sending')
    setRsvpMsg('')
    try {
      await submitRsvp({
        eventId: event.id,
        eventTitle: event.title,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim(),
      })
      setRsvpStatus('ok')
      setRsvpMsg('Thank you — we received your RSVP.')
      setName('')
      setEmail('')
      setPhone('')
      setNote('')
    } catch {
      setRsvpStatus('err')
      setRsvpMsg('Something went wrong. Please try again or call us.')
    }
  }

  return (
    <article className="event-detail page-with-nav">
      {event.img && (
        <div className="event-detail-hero">
          <img src={event.img} alt={event.title} />
        </div>
      )}
      <div className="page-shell page-shell--narrow event-detail-body">
        <Link to="/events" className="event-detail-back">
          ← Back to Events
        </Link>
        <div className="event-detail-tags">
          <span className="event-detail-tag">{event.category}</span>
        </div>
        <h1 className="event-detail-title">{event.title}</h1>
        <div className="event-detail-meta">
          <div className="event-detail-meta-block">
            <div className="event-detail-meta-label">When</div>
            <div className="event-detail-meta-value">{formatLongDate(event.date)}</div>
            <div className="event-detail-meta-cal">
              <span className="event-detail-cal-day">{day}</span>
              <span className="event-detail-cal-mo">{monthShort}</span>
            </div>
          </div>
          <div className="event-detail-meta-block">
            <div className="event-detail-meta-label">Where</div>
            <div className="event-detail-meta-value event-detail-meta-value--dark">{event.location}</div>
          </div>
        </div>
        <p className="event-detail-desc">{event.desc}</p>

        <section className="event-rsvp" aria-labelledby="rsvp-heading">
          <h2 id="rsvp-heading" className="event-rsvp-title">
            RSVP
          </h2>
          <p className="event-rsvp-lead">
            Let us know you are coming. You can also bring guests — tell us in the message box.
          </p>
          <form className="event-rsvp-form" onSubmit={handleRsvp}>
            <label className="event-rsvp-label">
              Name <span aria-hidden="true">*</span>
              <input
                className="event-rsvp-input"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </label>
            <label className="event-rsvp-label">
              Email
              <input
                className="event-rsvp-input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label className="event-rsvp-label">
              Phone
              <input
                className="event-rsvp-input"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(603) …"
              />
            </label>
            <label className="event-rsvp-label">
              Message
              <textarea
                className="event-rsvp-input event-rsvp-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Number of guests, language needs, or questions"
              />
            </label>
            <button
              type="submit"
              className="btn-primary event-rsvp-submit"
              disabled={rsvpStatus === 'sending'}
            >
              {rsvpStatus === 'sending' ? 'Sending…' : 'Submit RSVP'}
            </button>
            {rsvpMsg && (
              <p
                className={`event-rsvp-feedback ${rsvpStatus === 'err' ? 'event-rsvp-feedback--err' : ''}`}
                role="status"
              >
                {rsvpMsg}
              </p>
            )}
          </form>
        </section>
      </div>
    </article>
  )
}
