import { Link } from 'react-router-dom'
import { LEGAL_603_INTAKE, NHLA_MANCHESTER } from '../data/nhPublicResources'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

export function Footer() {
  const contactHref = contactEmail ? `mailto:${contactEmail}` : '/support'

  return (
    <footer>
      <div className="ft-top">
        <div className="ft-brand">
          <Link to="/" className="ft-logo" style={{ textDecoration: 'none' }}>
            <div className="ft-logo-mark">
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L10 12M10 2L6 6M10 2L14 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="2" r="2.5" fill="white" />
                <path
                  d="M4 16H16M6 16V13H14V16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="ft-logo-text">
              <span>Beacon</span> NH
            </div>
          </Link>
          <p>
            A student-built hub that links neighbors in Manchester to verified statewide programs.
          </p>
          <div className="ft-emergency">
            <p>
              <strong>Need help choosing a program?</strong>
              <br />
              Dial <strong>211</strong> — NH information line (24/7)
              <br />
              <span style={{ fontSize: '11px', opacity: 0.6 }}>
                Crisis: <strong>988</strong>
                {' · '}
                Civil legal screening:{' '}
                <a href={LEGAL_603_INTAKE.telHref} style={{ color: 'inherit' }}>
                  {LEGAL_603_INTAKE.phoneDisplay}
                </a>
                {' · '}
                NHLA Manchester:{' '}
                <a href={NHLA_MANCHESTER.telHref} style={{ color: 'inherit' }}>
                  {NHLA_MANCHESTER.phoneDisplay}
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="ft-col">
          <h5>Services</h5>
          <Link to="/#iine-spotlight">IINE — Manchester programs</Link>
          <Link to="/services#nh-refugee-needs">NH newcomer pathways</Link>
          <Link to="/services#help-legal">Legal Aid</Link>
          <Link to="/services#help-education">English Classes</Link>
          <a href="tel:988">Mental Health (988)</a>
          <Link to="/events">Jobs & Training Events</Link>
          <Link to="/services#help-food">Food & Essentials</Link>
        </div>
        <div className="ft-col">
          <h5>Community</h5>
          <Link to="/events">Events Calendar</Link>
          <Link to="/events#resources">Resource Map</Link>
          <Link to="/stories">Community Stories</Link>
          <Link to="/support">Support partners</Link>
          <Link to="/communities">Communities</Link>
        </div>
        <div className="ft-col">
          <h5>Beacon NH</h5>
          <Link to="/about">About Us</Link>
          <Link to="/services#faq">FAQ</Link>
          <Link to="/events#resources">NH Partners & Map</Link>
          <a href="tel:211">Call 211 (Emergency)</a>
          {contactEmail ? (
            <a href={contactHref}>Contact Us</a>
          ) : (
            <Link to="/support">Contact / Support</Link>
          )}
          <Link to="/privacy">Privacy & confidentiality</Link>
          <span className="ft-muted-link">We strive for accessible design — tell us if something blocks you.</span>
        </div>
      </div>
      <div className="ft-bottom">
          <p>
            © 2026 Beacon NH · Manchester, NH · Links to public programs; confirm details with each agency.
          </p>
        <div className="socials">
          <a
            href="https://www.facebook.com/"
            className="soc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="https://www.instagram.com/"
            className="soc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            ◎
          </a>
          <a
            href="https://www.linkedin.com/"
            className="soc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="https://www.youtube.com/"
            className="soc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            ▶
          </a>
        </div>
      </div>
    </footer>
  )
}
