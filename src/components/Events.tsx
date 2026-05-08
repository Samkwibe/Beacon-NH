import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { EVENT_CATEGORIES } from '../data/eventsCatalog'
import { calendarDayMonth } from '../lib/dates'

const ALL = 'All'

export function Events() {
  const { events, loading, error } = useData()
  const [category, setCategory] = useState<string>(ALL)

  const filtered = useMemo(() => {
    const list =
      category === ALL ? events : events.filter((e) => e.category === category)
    return [...list].sort((a, b) => a.date.localeCompare(b.date))
  }, [events, category])

  const featured = filtered.find((e) => e.isFeatured) || filtered[0]
  const list = filtered.filter((e) => e.id !== featured?.id)

  const chips = [ALL, ...EVENT_CATEGORIES]

  return (
    <section className="events" id="events">
      <div className="section-header">
        <div className="s-eyebrow">
          <div className="s-line"></div>
          <span className="s-eye">Community Life</span>
        </div>
        <h2 className="s-title">
          Upcoming <em>Events</em>
        </h2>
        <p className="s-sub">
          All events are free and open to everyone. All languages welcome. Bring your family.
        </p>
        <div className="ev-filters" role="group" aria-label="Filter by category">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              className={`ev-filter-chip ${category === c ? 'ev-filter-chip--on' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="ev-banner ev-banner--error" role="alert">
          {error}
        </div>
      )}
      {loading && (
        <div className="ev-banner ev-banner--info" aria-live="polite">
          Loading events…
        </div>
      )}

      <div className="events-layout">
        {featured && (
          <div className="ev-featured">
            <img
              src={
                featured.img ||
                'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=75'
              }
              alt={featured.title}
            />
            <div className="ev-ov"></div>
            <div className="ev-ft-body">
              <span className="ev-tag">{featured.category}</span>
              <h3>
                <Link
                  to={`/events/${featured.id}`}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {featured.title}
                </Link>
              </h3>
              <p>{featured.desc}</p>
              <div className="ev-meta">
                <div className="ev-date-box">
                  <div className="ev-day">{calendarDayMonth(featured.date).day}</div>
                  <div className="ev-mo">{calendarDayMonth(featured.date).monthShort}</div>
                </div>
                <div className="ev-info">📍 {featured.location}</div>
              </div>
            </div>
          </div>
        )}
        <div className="ev-list">
          {list.map((ev) => {
            const { day, monthShort } = calendarDayMonth(ev.date)
            return (
              <Link
                to={`/events/${ev.id}`}
                key={ev.id}
                className="ev-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="ev-item-date">
                  <div className="eid-day">{day}</div>
                  <div className="eid-mo">{monthShort}</div>
                </div>
                <div>
                  <h4>{ev.title}</h4>
                  <p>{ev.desc}</p>
                  <div className="ev-pills">
                    <span
                      className="ev-pill"
                      style={{ background: 'rgba(46,110,74,.12)', color: '#2E6E4A' }}
                    >
                      {ev.category}
                    </span>
                    <span
                      className="ev-pill"
                      style={{ background: 'rgba(46,110,74,.08)', color: '#4A9669' }}
                    >
                      Free
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
          {list.length === 0 && !loading && (
            <div style={{ padding: '20px', color: '#666' }}>
              {events.length === 0
                ? 'No upcoming events scheduled.'
                : 'No events in this category.'}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
