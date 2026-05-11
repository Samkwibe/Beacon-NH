import { LEGAL_603_INTAKE, CCNH_IMMIGRATION } from '../data/nhPublicResources'
import { Link } from 'react-router-dom'

export function QuickHelp() {
  return (
    <section className="quick-help" id="help">
      <div className="section-header">
        <div className="s-eyebrow">
          <div className="s-line"></div>
          <span className="s-eye">I need help with</span>
        </div>
        <h2 className="s-title">
          What Do You Need <em>Right Now?</em>
        </h2>
        <p className="s-sub">
          These buttons go to <strong>public</strong> hotlines and pages. Many programs are free, but each agency sets its own
          rules — call or visit their website to confirm. For emergencies, call <strong>911</strong>.
        </p>
      </div>
      <div className="qh-grid">
        <a href="tel:211" className="qh-card" id="help-housing">
          <div className="qh-num">01</div>
          <div className="qh-icon">🏠</div>
          <h3>A place to stay</h3>
          <p>211 NH refers people to shelter, housing help, and utilities assistance statewide.</p>
          <span className="qh-arrow">→</span>
        </a>
        <a href={LEGAL_603_INTAKE.telHref} className="qh-card" id="help-legal">
          <div className="qh-num">02</div>
          <div className="qh-icon">⚖️</div>
          <h3>Legal help</h3>
          <p>
            Civil screening: <strong>603 Legal Aid</strong> ({LEGAL_603_INTAKE.phoneDisplay}). Immigration legal
            services (nonprofit): <strong>Catholic Charities NH</strong> at {CCNH_IMMIGRATION.phoneDisplay} — website{' '}
            cc-nh.org.
          </p>
          <span className="qh-arrow">→</span>
        </a>
        <a href="tel:211" className="qh-card" id="help-food">
          <div className="qh-num">03</div>
          <div className="qh-icon">🍎</div>
          <h3>Food &amp; basics</h3>
          <p>211 can connect you to food pantries, SNAP application help, and other essentials.</p>
          <span className="qh-arrow">→</span>
        </a>
        <Link to="/services#nh-refugee-needs" className="qh-card" id="help-education">
          <div className="qh-num">04</div>
          <div className="qh-icon">📚</div>
          <h3>English, school &amp; more</h3>
          <p>Open the full NH pathways list — ESOL, schools, jobs, health, and benefits starting points.</p>
          <span className="qh-arrow">→</span>
        </Link>
      </div>
    </section>
  )
}
