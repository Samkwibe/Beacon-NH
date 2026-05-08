import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export function Events() {
  const { events } = useData();
  
  const featured = events.find(e => e.isFeatured) || events[0];
  const list = events.filter(e => e.id !== featured?.id);
  return (
    <section className="events" id="events">
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Community Life</span></div>
        <h2 className="s-title">Upcoming <em>Events</em></h2>
        <p className="s-sub">All events are free and open to everyone. All languages welcome. Bring your family.</p>
      </div>
      <div className="events-layout">
        {featured && (
          <div className="ev-featured">
            <img src={featured.img || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=75"} alt={featured.title} />
            <div className="ev-ov"></div>
            <div className="ev-ft-body">
              <span className="ev-tag">{featured.category}</span>
              <h3><Link to={`/events/${featured.id}`} style={{ color: 'white', textDecoration: 'none' }}>{featured.title}</Link></h3>
              <p>{featured.desc}</p>
              <div className="ev-meta">
                <div className="ev-date-box"><div className="ev-day">{new Date(featured.date).getDate()}</div><div className="ev-mo">{new Date(featured.date).toLocaleString('default', { month: 'short' })}</div></div>
                <div className="ev-info">📍 {featured.location}</div>
              </div>
            </div>
          </div>
        )}
        <div className="ev-list">
          {list.map(ev => (
            <Link to={`/events/${ev.id}`} key={ev.id} className="ev-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="ev-item-date">
                <div className="eid-day">{new Date(ev.date).getDate()}</div>
                <div className="eid-mo">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</div>
              </div>
              <div>
                <h4>{ev.title}</h4>
                <p>{ev.desc}</p>
                <div className="ev-pills">
                  <span className="ev-pill" style={{ background: 'rgba(46,110,74,.12)', color: '#2E6E4A' }}>{ev.category}</span>
                  <span className="ev-pill" style={{ background: 'rgba(46,110,74,.08)', color: '#4A9669' }}>Free</span>
                </div>
              </div>
            </Link>
          ))}
          {list.length === 0 && <div style={{ padding: '20px', color: '#666' }}>No upcoming events scheduled.</div>}
        </div>
      </div>
    </section>
  );
}
