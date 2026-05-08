import { useState } from 'react';

export function FloatingButtons() {
  const [modalOpen, setModalOpen] = useState(false);
  const waDigits = (import.meta.env.VITE_WHATSAPP_E164 || '15555550100').replace(/\D/g, '');

  return (
    <>
      <button type="button" className="sos-btn" onClick={() => setModalOpen(true)}>
        🆘 I Need Help Now
      </button>

      <button className="wa-btn" type="button" onClick={() => window.open(`https://wa.me/${waDigits}`, '_blank', 'noopener,noreferrer')}>
        💬 WhatsApp Us
      </button>

      <div className={`modal-bg ${modalOpen ? 'open' : ''}`} id="sosModal" onClick={(e) => {
        if ((e.target as Element).id === 'sosModal') setModalOpen(false);
      }}>
        <div className="modal">
          <button type="button" className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
          <h2>We're here for you</h2>
          <p>Choose what you need right now. All services are free and confidential.</p>
          <div className="sos-items">
            <a href="tel:211" className="sos-item">
              <div className="sos-emoji">🏠</div>
              <div>
                <h4>Emergency Housing</h4>
                <p>Dial 211 — NH free helpline, 24/7, no cost</p>
              </div>
            </a>
            <a href="tel:+16036242010" className="sos-item">
              <div className="sos-emoji">⚖️</div>
              <div>
                <h4>Legal Emergency</h4>
                <p>NH Legal Assistance — free immigration help</p>
              </div>
            </a>
            <a href="tel:211" className="sos-item">
              <div className="sos-emoji">🍎</div>
              <div>
                <h4>Food & Basic Needs</h4>
                <p>NH Food Bank & emergency food resources</p>
              </div>
            </a>
            <a href="tel:988" className="sos-item">
              <div className="sos-emoji">🧠</div>
              <div>
                <h4>Mental Health Crisis</h4>
                <p>Call or text 988 — free, 24/7 crisis line</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
