export function QuickHelp() {
  return (
    <section className="quick-help" id="help">
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">I need help with</span></div>
        <h2 className="s-title">What Do You Need <em>Right Now?</em></h2>
        <p className="s-sub">All services are completely free, confidential, and available in your language. No appointment needed for urgent help.</p>
      </div>
      <div className="qh-grid">
        <a href="#" className="qh-card">
          <div className="qh-num">01</div>
          <div className="qh-icon">🏠</div>
          <h3>A Place To Stay</h3>
          <p>Emergency housing referrals and long-term accommodation support in Manchester NH.</p>
          <span className="qh-arrow">→</span>
        </a>
        <a href="#" className="qh-card">
          <div className="qh-num">02</div>
          <div className="qh-icon">⚖️</div>
          <h3>Legal Help</h3>
          <p>Free immigration advice, asylum support, and legal aid from NH certified attorneys.</p>
          <span className="qh-arrow">→</span>
        </a>
        <a href="#" className="qh-card">
          <div className="qh-num">03</div>
          <div className="qh-icon">🍎</div>
          <h3>Food & Basics</h3>
          <p>Immediate food bank referrals, SNAP assistance, and essential supplies.</p>
          <span className="qh-arrow">→</span>
        </a>
        <a href="#" className="qh-card">
          <div className="qh-num">04</div>
          <div className="qh-icon">📚</div>
          <h3>English Classes</h3>
          <p>Free ESOL classes for all levels across Manchester, NH — beginners welcome.</p>
          <span className="qh-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
