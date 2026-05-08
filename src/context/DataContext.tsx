import React, { createContext, useState, useEffect, useContext } from 'react';

export type Event = {
  id: string;
  title: string;
  desc: string;
  date: string;
  location: string;
  category: string;
  img: string;
  isFeatured?: boolean;
};

type DataContextType = {
  events: Event[];
  addEvent: (e: Event) => void;
  deleteEvent: (id: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('beacon_events');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Monthly Community Meal & Celebration', desc: 'Celebrating cultures from across the world. Bring a dish to share. All ages, all languages, everyone welcome.', date: '2026-06-21', location: 'Granite YMCA, 30 Mechanic St, Manchester NH', category: 'Community', img: '/pexels-zeusdcreator-17706258.jpg', isFeatured: true },
      { id: '2', title: 'ESOL English Class — Beginners', desc: 'Free English for adults. Childcare available. West Side Manchester NH.', date: '2026-06-14', location: 'West Side Manchester NH', category: 'Education', img: '' },
      { id: '3', title: 'Free Legal Drop-In Clinic', desc: '30-min sessions with NH immigration attorneys. Arabic & Somali interpreters.', date: '2026-06-17', location: 'Manchester, NH', category: 'Legal', img: '' },
      { id: '4', title: 'Wellbeing Group for Adults', desc: 'Safe, culturally-sensitive mental health group. Manchester City Library.', date: '2026-06-26', location: 'Manchester City Library', category: 'Wellbeing', img: '' },
      { id: '5', title: 'US Citizenship Prep Workshop', desc: 'Study materials provided in multiple languages. All welcome.', date: '2026-07-05', location: 'Manchester, NH', category: 'Civic', img: '' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('beacon_events', JSON.stringify(events));
  }, [events]);

  const addEvent = (e: Event) => setEvents([...events, e]);
  const deleteEvent = (id: string) => setEvents(events.filter(ev => ev.id !== id));

  return (
    <DataContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
