import { Link } from 'react-router-dom'

const quotes = [
  {
    text: 'They answered in my language on the first call. I did not feel alone anymore.',
    name: 'Community member',
    note: 'Manchester via WhatsApp',
  },
  {
    text: 'Free legal guidance changed everything for our asylum timeline.',
    name: 'Family served · 2024',
    note: 'Legal navigation program',
  },
  {
    text: 'From shelter referral to ESOL class — one hub made it simple.',
    name: 'New arrival parent',
    note: 'Housing & education pathway',
  },
]

export function VoiceRibbon() {
  return (
    <section className="voice-ribbon" aria-label="What neighbors say">
      <div className="voice-ribbon-head">
        <span className="voice-ribbon-eyebrow">Community voices</span>
        <h2 className="voice-ribbon-title">Dignity-first support that meets people where they are.</h2>
      </div>
      <div className="voice-ribbon-grid">
        {quotes.map((q) => (
          <blockquote key={q.text} className="voice-card">
            <p className="voice-card-quote">&ldquo;{q.text}&rdquo;</p>
            <footer>
              <cite className="voice-card-name">{q.name}</cite>
              <span className="voice-card-note">{q.note}</span>
            </footer>
          </blockquote>
        ))}
      </div>
      <p className="voice-ribbon-foot">
        <Link to="/stories">Read longer stories</Link>
        <span aria-hidden="true"> · </span>
        <Link to="/events">See upcoming events</Link>
      </p>
    </section>
  )
}
