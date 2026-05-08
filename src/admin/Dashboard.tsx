import { useState } from 'react';
import { useData } from '../context/DataContext';

export function Dashboard() {
  const { events, addEvent, deleteEvent } = useData();
  const [isAuth, setIsAuth] = useState(localStorage.getItem('beacon_admin') === 'true');
  const [pwd, setPwd] = useState('');
  
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCat, setNewCat] = useState('Community');
  const [newDesc, setNewDesc] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === 'admin123') {
      setIsAuth(true);
      localStorage.setItem('beacon_admin', 'true');
    } else {
      alert('Incorrect password. Try "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('beacon_admin');
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      id: Date.now().toString(),
      title: newTitle,
      date: newDate,
      category: newCat,
      desc: newDesc,
      location: 'TBD',
      img: ''
    });
    setNewTitle(''); setNewDate(''); setNewDesc('');
    alert('Event added to live website!');
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', color: 'white' }}>
        <form onSubmit={handleLogin} style={{ background: '#111', padding: '40px', borderRadius: '12px', border: '1px solid #333', width: '400px' }}>
          <h2 style={{ marginBottom: '24px', font: '700 24px "Barlow Condensed"' }}>Admin Portal</h2>
          <input type="password" placeholder="Password (admin123)" value={pwd} onChange={(e) => setPwd(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '16px', background: '#222', border: '1px solid #444', color: 'white', borderRadius: '4px' }} />
          <button style={{ width: '100%', padding: '12px', background: '#4A9669', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#FFF', padding: '40px', fontFamily: '"Barlow", sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ font: '700 32px "Barlow Condensed"' }}>Beacon NH Command Center</h1>
        <button onClick={handleLogout} style={{ background: 'transparent', color: '#888', border: '1px solid #444', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
        <div>
          <h2 style={{ font: '700 20px "Barlow Condensed"', marginBottom: '20px' }}>Add New Event</h2>
          <form onSubmit={handleAddEvent} style={{ background: '#111', padding: '24px', borderRadius: '8px', border: '1px solid #222' }}>
            <input required placeholder="Event Title" value={newTitle} onChange={e=>setNewTitle(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#222', border: '1px solid #333', color: 'white' }} />
            <input required type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#222', border: '1px solid #333', color: 'white' }} />
            <select value={newCat} onChange={e=>setNewCat(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#222', border: '1px solid #333', color: 'white' }}>
              <option>Community</option><option>Education</option><option>Legal</option><option>Wellbeing</option>
            </select>
            <textarea required placeholder="Description" value={newDesc} onChange={e=>setNewDesc(e.target.value)} rows={4} style={{ width: '100%', padding: '10px', marginBottom: '12px', background: '#222', border: '1px solid #333', color: 'white' }} />
            <button style={{ width: '100%', padding: '12px', background: '#4A9669', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Publish to Live Site</button>
          </form>
        </div>
        
        <div>
          <h2 style={{ font: '700 20px "Barlow Condensed"', marginBottom: '20px' }}>Live Events Manager</h2>
          <div style={{ background: '#111', borderRadius: '8px', border: '1px solid #222', overflow: 'hidden' }}>
            {events.map(ev => (
              <div key={ev.id} style={{ padding: '16px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{ev.title}</div>
                  <div style={{ fontSize: '13px', color: '#888' }}>{ev.date} · {ev.category}</div>
                </div>
                <button onClick={() => deleteEvent(ev.id)} style={{ background: '#4A1111', color: '#FF6B6B', border: '1px solid #FF6B6B', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
            {events.length === 0 && <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>No events found.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
