import { Link } from 'react-router-dom'
import {
  NH_211,
  CRISIS_988,
  LEGAL_603_INTAKE,
  NHLA_MANCHESTER,
} from '../data/nhPublicResources'

const nav_link = 'community-member-nav-link'
const nav_section = 'community-member-nav-section-title'

function whatsappHref(): string | null {
  const raw = import.meta.env.VITE_WHATSAPP_E164?.trim()
  if (!raw) return null
  const digits = raw.replace(/\D/g, '')
  if (digits.length < 10) return null
  return `https://wa.me/${digits}`
}

type Props = {
  contactEmail?: string
}

/**
 * Crisis lines and site links — phones match nhPublicResources.ts (verified program numbers).
 */
export function CommunityMemberNav({ contactEmail }: Props) {
  const wa = whatsappHref()

  return (
    <div className="community-member-nav-stack">
      <nav className="community-member-nav community-member-nav--urgent" aria-label="Urgent and crisis help">
        <p className={nav_section}>Urgent &amp; crisis</p>
        <p className="community-member-nav-hint">Life-threatening emergency — call 911 first.</p>
        <ul className="community-member-nav-list">
          <li>
            <a className={`${nav_link} community-member-nav-link--urgent`} href="tel:911">
              911 — Emergency
            </a>
          </li>
          <li>
            <a className={nav_link} href={CRISIS_988.telHref}>
              988 — Mental health crisis (24/7)
            </a>
          </li>
          <li>
            <a className={nav_link} href={NH_211.telHref}>
              {NH_211.dial} — {NH_211.name}
            </a>
          </li>
          <li>
            <a className={nav_link} href={NH_211.telTollFreeHref}>
              {NH_211.tollFreeDisplay} — {NH_211.name} (toll-free)
            </a>
          </li>
          <li>
            <a className={nav_link} href={LEGAL_603_INTAKE.telHref}>
              {LEGAL_603_INTAKE.phoneDisplay} — {LEGAL_603_INTAKE.name}
            </a>
          </li>
          <li>
            <a className={nav_link} href={NHLA_MANCHESTER.telHref}>
              {NHLA_MANCHESTER.phoneDisplay} — {NHLA_MANCHESTER.name}
            </a>
          </li>
        </ul>
      </nav>

      {wa ? (
        <div className="community-member-nav community-member-nav--msg">
          <p className={nav_section}>Message Beacon NH</p>
          <ul className="community-member-nav-list">
            <li>
              <a className={nav_link} href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp — quick questions
              </a>
            </li>
          </ul>
        </div>
      ) : null}

      <nav className="community-member-nav" aria-label="Helpful links on this website">
        <p className={nav_section}>On this website</p>
        <ul className="community-member-nav-list">
          <li>
            <Link className={nav_link} to="/">
              Get help now
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/services">
              Free services &amp; FAQ
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/services#faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/events">
              Events calendar
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/events#resources">
              Resource map &amp; links
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/stories">
              Community stories
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/communities">
              All communities
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/support">
              Support partners
            </Link>
          </li>
          <li>
            <Link className={nav_link} to="/privacy">
              Privacy policy
            </Link>
          </li>
          {contactEmail ? (
            <li>
              <a className={nav_link} href={`mailto:${contactEmail}`}>
                Email Beacon NH
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  )
}
