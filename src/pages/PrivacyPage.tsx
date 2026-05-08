import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function PrivacyPage() {
  usePageMeta(
    'Privacy',
    'How Beacon NH handles information on this website — confidentiality, cookies, and contact.',
  )

  return (
    <div className="page-with-nav">
      <div className="page-shell page-shell--narrow page-shell--muted">
        <h1 className="page-title">Privacy & confidentiality</h1>
        <p className="page-lead">
          Beacon NH is built around trust. This page describes how we treat information when you use our public website.
          It does not replace advice from a lawyer or clinician.
        </p>

        <h2 className="page-subtitle">Services vs. this website</h2>
        <p className="page-body">
          Phone calls (211, 988, legal aid lines) and in-person programs follow those organizations&apos; policies.
          Our site helps you find pathways — it is not a clinical record system.
        </p>

        <h2 className="page-subtitle">What we may collect</h2>
        <p className="page-body">
          Like most sites, hosting may log basic technical data (browser type, approximate region) for security.
          If you sign in to admin tools, authentication is handled through our configured identity provider.
        </p>

        <h2 className="page-subtitle">Cookies & storage</h2>
        <p className="page-body">
          We may use browser storage so the site remembers preferences (for example language choice).
          You can clear site data anytime in your browser settings.
        </p>

        <h2 className="page-subtitle">Links</h2>
        <p className="page-body">
          External links (social platforms, WhatsApp, maps) leave our site and follow those providers&apos; policies.
        </p>

        <h2 className="page-subtitle">Contact</h2>
        <p className="page-body">
          Questions about this policy? Use{' '}
          <Link to="/donate">Contact / Support</Link> or your organizational liaison if you partner with Beacon NH.
        </p>

        <p className="page-body" style={{ marginTop: 32 }}>
          <Link to="/" className="event-detail-back">
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  )
}
