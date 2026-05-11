import { useState } from 'react'
import { NH_211, CRISIS_988, LEGAL_603_INTAKE } from '../data/nhPublicResources'

export function FloatingButtons() {
  const [modalOpen, setModalOpen] = useState(false)
  const rawWa = import.meta.env.VITE_WHATSAPP_E164?.trim()
  const waDigits = rawWa?.replace(/\D/g, '') ?? ''
  const showWhatsApp = waDigits.length >= 10

  return (
    <>
      <button
        type="button"
        className="sos-btn"
        onClick={() => setModalOpen(true)}
        aria-haspopup="dialog"
        aria-controls="sosModal"
        aria-expanded={modalOpen}
      >
        <span aria-hidden>🆘</span> I Need Help Now
      </button>

      {showWhatsApp ? (
        <button
          className="wa-btn"
          type="button"
          aria-label="Open WhatsApp chat"
          onClick={() => window.open(`https://wa.me/${waDigits}`, '_blank', 'noopener,noreferrer')}
        >
          <span aria-hidden>💬</span> WhatsApp Us
        </button>
      ) : null}

      <div
        className={`modal-bg ${modalOpen ? 'open' : ''}`}
        id="sosModal"
        onClick={(e) => {
          if ((e.target as Element).id === 'sosModal') setModalOpen(false)
        }}
      >
        <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="sos-modal-title">
          <button
            type="button"
            className="modal-close"
            onClick={() => setModalOpen(false)}
            aria-label="Close help menu"
          >
            ✕
          </button>
          <h2 id="sos-modal-title">We're here for you</h2>
          <p role="alert">
            In an emergency call <strong>911</strong>. For mental health crisis, call or text <strong>988</strong>.
          </p>
          <p>Choose what you need right now. Numbers below are statewide public helplines — not ads.</p>
          <div className="sos-items">
            <a href={NH_211.telHref} className="sos-item">
              <div className="sos-emoji">🏠</div>
              <div>
                <h4>Housing &amp; basic needs</h4>
                <p>
                  {NH_211.name} — dial {NH_211.dial} or {NH_211.tollFreeDisplay} (24/7)
                </p>
              </div>
            </a>
            <a href={LEGAL_603_INTAKE.telHref} className="sos-item">
              <div className="sos-emoji">⚖️</div>
              <div>
                <h4>Civil legal help</h4>
                <p>
                  {LEGAL_603_INTAKE.name} — {LEGAL_603_INTAKE.phoneDisplay}
                </p>
              </div>
            </a>
            <a href={NH_211.telHref} className="sos-item">
              <div className="sos-emoji">🍎</div>
              <div>
                <h4>Food &amp; referrals</h4>
                <p>{NH_211.name} can connect you to food programs and more</p>
              </div>
            </a>
            <a href={CRISIS_988.telHref} className="sos-item">
              <div className="sos-emoji">🧠</div>
              <div>
                <h4>Mental health crisis</h4>
                <p>Call or text 988 — free, 24/7</p>
              </div>
            </a>
          </div>
          <p className="sos-modal-foot">
            <a href={NH_211.website} target="_blank" rel="noopener noreferrer">
              211nh.org
            </a>{' '}
            ·{' '}
            <a href={LEGAL_603_INTAKE.website} target="_blank" rel="noopener noreferrer">
              603legalaid.org
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
