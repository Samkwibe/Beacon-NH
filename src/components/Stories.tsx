import { usePageMeta } from '../hooks/usePageMeta'
import { ImpactStrip } from './ImpactStrip'
import { Link } from 'react-router-dom'

export function Stories() {
  usePageMeta(
    'Stories',
    'How Beacon NH treats community voices: consent-first, source-based information for Manchester, NH.',
  )
  return (
    <div className="page-with-nav">
      <ImpactStrip />

      <section className="stories" id="stories">
        <div className="section-header">
          <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Voices</span></div>
          <h2 className="s-title">Stories With <em>Consent &amp; Context</em></h2>
          <p className="s-sub">
            We do not invent quotes or stock-photo “testimonials.” First-person stories belong to real people
            who choose to share them. Until your organization publishes vetted interviews or videos with
            permission, use this space to route neighbors to verified programs and events.
          </p>
        </div>
        <div className="stories-grid stories-grid--plain">
          <div className="story-card story-card--info">
            <h3>Where to learn more</h3>
            <p>
              NH DHHS summarizes how the U.S. Refugee Admissions Program runs in New Hampshire — including which
              resettlement agencies hold federal agreements for the state.
            </p>
            <a
              className="btn-primary"
              href="https://www.dhhs.nh.gov/programs-services/health-equity/operation-united-states-refugee-admissions-program-new-hampshire"
              target="_blank"
              rel="noopener noreferrer"
            >
              NH DHHS — refugee program →
            </a>
          </div>
          <div className="story-card story-card--info">
            <h3>Urgent support lines</h3>
            <p>
              These numbers are maintained by their host agencies — same entries we use elsewhere on the site.
            </p>
            <ul className="story-info-list">
              <li><a href="tel:211">211</a> — NH information & referral</li>
              <li><a href="tel:988">988</a> — Crisis &amp; suicide lifeline</li>
              <li><a href="tel:+18006395290">1-800-639-5290</a> — 603 Legal Aid intake</li>
            </ul>
          </div>
          <div className="story-card story-card--info">
            <h3>On-campus / portfolio use</h3>
            <p>
              For a course project, replace this section with a short methodology note (IRB, consent forms, or a
              link to your institution’s ethics guidelines) when you interview subjects.
            </p>
            <p style={{ marginTop: '12px' }}>
              <Link to="/events" className="btn-secondary">See upcoming events</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
