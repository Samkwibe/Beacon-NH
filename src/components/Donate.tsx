import { useState } from 'react'

export function Donate() {
  const [amount, setAmount] = useState('25')

  const handleAmountClick = (value: string) => {
    setAmount(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setAmount(val)
  }

  const handleDonateClick = () => {
    window.alert(
      `This is a course-style demo: no payment is processed.\n\n` +
        `To donate to real resettlement work in NH, use the “Give” pages for Ascentria Care Alliance ` +
        `or the International Institute of New England instead of this button.`,
    )
  }

  return (
    <section className="donate" id="donate">
      <div className="donate-inner">
        <div className="donate-img">
          <div
            className="donate-img-fill"
            aria-hidden
            style={{ background: 'linear-gradient(160deg, #1a3328 0%, #2e6e4a 40%, #4a8a6e 100%)' }}
          />
          <div className="donate-img-overlay"></div>
        </div>
        <div className="donate-form">
          <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Support the ecosystem</span></div>
          <h2 className="s-title">
            Give Where<br/><em>It Counts</em>
          </h2>
          <p className="d-note">
            Beacon NH (this site) is a student portfolio build. The checkout below is a UI placeholder only —
            do not treat dollar amounts as tied to a live nonprofit ledger.
          </p>
          <p className="d-note" style={{ fontSize: '13px', opacity: 0.95 }}>
            Prefer a real donation?{' '}
            <a href="https://www.ascentria.org" target="_blank" rel="noopener noreferrer">Ascentria Care Alliance</a>
            {' · '}
            <a href="https://iine.org" target="_blank" rel="noopener noreferrer">IINE</a>
            {' · '}
            <a href="https://www.nhfoodbank.org" target="_blank" rel="noopener noreferrer">NH Food Bank</a>
          </p>
          <div className="d-amts">
            {['10', '25', '50', '100'].map((val) => (
              <button
                key={val}
                type="button"
                className={`damt ${amount === val ? 'on' : ''}`}
                onClick={() => handleAmountClick(val)}
              >
                ${val}
              </button>
            ))}
          </div>
          <div className="d-wrap">
            <input type="text" value={amount} onChange={handleInputChange} placeholder="Other amount" />
          </div>
          <button type="button" className="d-submit" onClick={handleDonateClick}>
            Demo checkout (${amount || '0'}) →
          </button>
        </div>
      </div>
    </section>
  )
}
