import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function PrivacyPage() {
  usePageMeta(
    'Privacy',
    'How Beacon NH handles information on this website — community chat, event sign-ups, confidentiality, and deletion requests.',
  )

  return (
    <div className="page-with-nav">
      <div className="page-shell page-shell--narrow page-shell--muted">
        <h1 className="page-title">Privacy & confidentiality</h1>
        <p className="page-lead">
          Beacon NH is built around trust. This page describes how we treat information when you use our public website
          and optional features like community discussion (when Firebase is enabled). It does not replace advice from a
          lawyer or clinician.
        </p>

        <h2 className="page-subtitle">Services vs. this website</h2>
        <p className="page-body">
          Phone calls (211, 988, legal aid lines) and in-person programs follow those organizations&apos; policies.
          Our site helps you find pathways — it is not a clinical record system.
        </p>

        <h2 className="page-subtitle">Community discussion (Firestore)</h2>
        <p className="page-body">
          When the Discussion tab is live, messages are stored in Firebase Firestore in the <code>community_messages</code>{' '}
          collection. Each document can include: the community hub id, the message text, the display name you typed, a
          server timestamp, and an anonymous Firebase user id used only to rate-limit abuse. We do not require a legal name
          or government ID to post.
        </p>
        <p className="page-body">
          <strong>Who can see it:</strong> Anyone who can open that community hub on the website can read the discussion.
          Do not post sensitive personal details (addresses, A-numbers, medical information). For private help, use{' '}
          <Link to="/">Get help</Link>, <Link to="/support">Support</Link>, or email if shown in the footer.
        </p>
        <p className="page-body">
          <strong>How long it is kept:</strong> There is no automatic deletion today; messages may remain until manually
          removed or until a future retention policy is published here. We keep logs only as long as needed for security
          and moderation.
        </p>
        <p className="page-body">
          <strong>Deletion requests:</strong> Email the contact in the site footer (or your Beacon NH liaison) with the
          approximate time of the message, the community hub, and (if possible) the display name shown. We cannot always
          verify anonymous posts; we will remove content that clearly violates policy when we can identify it.
        </p>

        <h2 className="page-subtitle">Event sign-ups (MySQL)</h2>
        <p className="page-body">
          When you RSVP to an event, we may store your name, optional email, optional phone, notes, the event id and title,
          and a creation timestamp in the Beacon NH API database (MySQL). Access is limited to authenticated Beacon NH
          staff through the admin tools.
        </p>

        <h2 className="page-subtitle">Moderation & community rules</h2>
        <p className="page-body">
          Discussion boards are for practical coordination and mutual aid. Posts must stay respectful: no hate, threats,
          harassment, doxxing, or spam.
        </p>
        <p className="page-body">
          <strong>Flagged messages:</strong> Staff or designated community moderators review reports when available. We may
          hide or delete posts that break these rules or put people at risk.
        </p>
        <p className="page-body">
          <strong>Bans:</strong> Repeated abuse may result in blocking the anonymous Firebase account or IP-based limits
          at our discretion. This is not a court process; our goal is to keep neighbors safe.
        </p>

        <h2 className="page-subtitle">What we may collect (general)</h2>
        <p className="page-body">
          Like most sites, hosting may log basic technical data (browser type, approximate region) for security.
          If you sign in to admin tools, authentication is handled through our configured identity provider.
        </p>

        <h2 className="page-subtitle">Cookies & storage</h2>
        <p className="page-body">
          We may use browser storage so the site remembers preferences (for example language choice and your community
          display name for chat). You can clear site data anytime in your browser settings.
        </p>

        <h2 className="page-subtitle">Automated assistant (optional)</h2>
        <p className="page-body">
          If enabled, the AI help guide sends your recent questions to our backend, which may call **Google Gemini** or
          **OpenAI** (whichever is configured) to draft a response. Do not paste sensitive personal or case details. The
          guide is for general orientation only, not legal or medical advice.
        </p>

        <h2 className="page-subtitle">Links</h2>
        <p className="page-body">
          External links (social platforms, WhatsApp, maps) leave our site and follow those providers&apos; policies.
        </p>

        <h2 className="page-subtitle">Contact</h2>
        <p className="page-body">
          Questions about this policy? Use <Link to="/support">Contact / Support</Link> or your organizational liaison
          if you partner with Beacon NH.
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
