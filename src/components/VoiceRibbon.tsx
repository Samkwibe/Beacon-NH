import { Link } from 'react-router-dom'

const HIGHLIGHTS: { title: string; body: string; href: string; linkLabel: string }[] = [
  {
    title: '211 NH',
    body: 'Granite United Way operates New Hampshire’s 211 line for housing, food, utilities, and more — with language support.',
    href: 'https://211nh.org',
    linkLabel: '211nh.org',
  },
  {
    title: 'Civil legal intake',
    body: '603 Legal Aid screens callers for free civil legal help and partners with NH Legal Assistance among others.',
    href: 'https://www.603legalaid.org',
    linkLabel: '603legalaid.org',
  },
  {
    title: 'State program context',
    body: 'NH DHHS summarizes how the federal Refugee Admissions Program operates in the state and lists resettlement partners.',
    href: 'https://www.dhhs.nh.gov/programs-services/health-equity/operation-united-states-refugee-admissions-program-new-hampshire',
    linkLabel: 'DHHS overview',
  },
]

export function VoiceRibbon() {
  return (
    <section className="voice-ribbon" aria-label="Verified starting points">
      <div className="voice-ribbon-head">
        <span className="voice-ribbon-eyebrow">Sources first</span>
        <h2 className="voice-ribbon-title">Start with agencies you can look up yourself.</h2>
      </div>
      <div className="voice-ribbon-grid">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="voice-card voice-card--fact">
            <p className="voice-card-quote" style={{ fontStyle: 'normal', margin: 0 }}>
              <strong>{item.title}.</strong> {item.body}{' '}
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.linkLabel} →
              </a>
            </p>
          </div>
        ))}
      </div>
      <p className="voice-ribbon-foot">
        <Link to="/stories">Stories &amp; consent</Link>
        <span aria-hidden="true"> · </span>
        <Link to="/events">Upcoming events</Link>
      </p>
    </section>
  )
}
