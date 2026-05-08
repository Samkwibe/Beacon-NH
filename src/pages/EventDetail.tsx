import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export function EventDetail() {
  const { id } = useParams();
  const { events } = useData();
  const event = events.find(e => e.id === id);

  if (!event) return <div style={{ padding: '120px', textAlign: 'center', fontSize: '24px' }}>Event not found</div>;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#FFFFFF', fontFamily: '"Barlow", sans-serif' }}>
      {event.img && (
        <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
          <img src={event.img} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <Link to="/events" style={{ color: '#4A9669', textDecoration: 'none', fontWeight: 'bold', marginBottom: '24px', display: 'inline-block' }}>← Back to Events</Link>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <span style={{ background: 'rgba(46,110,74,.12)', color: '#2E6E4A', padding: '4px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>{event.category}</span>
          <span style={{ background: 'rgba(46,110,74,.08)', color: '#4A9669', padding: '4px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>Free</span>
        </div>
        <h1 style={{ font: '700 48px "Barlow Condensed"', color: '#1A3328', marginBottom: '24px' }}>{event.title}</h1>
        <div style={{ display: 'flex', gap: '40px', padding: '24px', background: '#F4F8F5', borderRadius: '8px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: 'bold', marginBottom: '4px' }}>Date</div>
            <div style={{ fontSize: '18px', color: '#2E6E4A', fontWeight: 'bold' }}>{event.date}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#888', fontWeight: 'bold', marginBottom: '4px' }}>Location</div>
            <div style={{ fontSize: '18px', color: '#1A3328', fontWeight: 'bold' }}>{event.location}</div>
          </div>
        </div>
        <p style={{ fontSize: '18px', color: '#5A8A6E', lineHeight: '1.6', marginBottom: '40px' }}>
          {event.desc}
        </p>
        <button style={{ padding: '16px 32px', background: '#E6A11D', color: '#1A3328', fontWeight: 'bold', fontSize: '18px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: '"Barlow", sans-serif' }}>
          RSVP to this Event
        </button>
      </div>
    </div>
  );
}
