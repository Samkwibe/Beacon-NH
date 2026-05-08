import { About } from '../components/About';

export function AboutPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#F4F8F5' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', fontFamily: '"Barlow", sans-serif' }}>
        <h1 style={{ font: '700 48px "Barlow Condensed"', color: '#1A3328', marginBottom: '24px' }}>About Beacon NH</h1>
        <p style={{ fontSize: '18px', color: '#5A8A6E', lineHeight: '1.6', marginBottom: '40px' }}>
          Beacon NH was founded in 2020 by a coalition of local community leaders, former refugees, and human rights advocates in Manchester, NH. Our mission is to provide an unconditional safety net and vibrant community hub for all those fleeing war, persecution, and climate disasters.
        </p>
        <h2 style={{ font: '700 28px "Barlow Condensed"', color: '#2E6E4A', marginBottom: '16px' }}>Our Core Philosophy</h2>
        <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.8', marginBottom: '40px' }}>
          We believe that integration should not mean losing one's cultural identity. By providing services in over 10 native languages, we ensure that every newly arrived family feels a sense of belonging and respect from their very first day in New Hampshire. 
        </p>
        <h2 style={{ font: '700 28px "Barlow Condensed"', color: '#2E6E4A', marginBottom: '16px' }}>Our Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #E0EBE4' }}>
            <h3 style={{ fontSize: '20px', color: '#1A3328', marginBottom: '4px' }}>Maria K.</h3>
            <div style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>Executive Director</div>
            <p style={{ fontSize: '14px', color: '#666' }}>Former asylum seeker from Colombia, Maria leads the strategic vision of Beacon NH.</p>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #E0EBE4' }}>
            <h3 style={{ fontSize: '20px', color: '#1A3328', marginBottom: '4px' }}>Dr. Ahmed S.</h3>
            <div style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>Director of Wellbeing</div>
            <p style={{ fontSize: '14px', color: '#666' }}>Specializes in trauma-informed care and runs our culturally-sensitive therapy programs.</p>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
}
