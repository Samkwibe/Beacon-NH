export function ResourcesMap() {
  return (
    <section className="resources" id="resources">
      <div className="res-map">
        <img src="/pexels-ahmed-akacha-3313934-6546035.jpg" alt="Manchester NH" />
        <div className="res-map-overlay"></div>
        <div className="res-map-label">📍 Manchester, NH 03101</div>
        <div className="map-pin" style={{ top: '40%', left: '48%' }}><div className="pin-dot"></div></div>
        <div className="map-pin" style={{ top: '55%', left: '35%' }}><div className="pin-dot"></div></div>
        <div className="map-pin" style={{ top: '35%', left: '62%' }}><div className="pin-dot"></div></div>
        <div className="map-pin" style={{ top: '62%', left: '52%' }}><div className="pin-dot"></div></div>
        <div className="map-pin" style={{ top: '28%', left: '44%' }}><div className="pin-dot"></div></div>
      </div>
      <div className="res-content">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Find Help Nearby</span></div>
        <h2 className="s-title">Manchester NH<br/><em>Resource Map</em></h2>
        <div className="res-list">
          <div className="res-item">
            <div className="res-icon">🏠</div>
            <div>
              <div className="res-name">Families In Transition</div>
              <div className="res-addr">Manchester, NH — Emergency shelter & housing</div>
              <span className="res-tag">Housing</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">⚖️</div>
            <div>
              <div className="res-name">NH Legal Assistance</div>
              <div className="res-addr">Manchester, NH — Free immigration legal aid</div>
              <span className="res-tag">Legal Aid</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">📚</div>
            <div>
              <div className="res-name">Int'l Institute of New England (IINE)</div>
              <div className="res-addr">Manchester, NH · (603) 647-1500</div>
              <span className="res-tag">Education & Jobs</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">🍎</div>
            <div>
              <div className="res-name">New Horizons / NH Food Bank</div>
              <div className="res-addr">199 Manchester St, Manchester NH</div>
              <span className="res-tag">Food</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">🧠</div>
            <div>
              <div className="res-name">Mental Health Center of Greater Manchester</div>
              <div className="res-addr">401 Cypress St, Manchester NH</div>
              <span className="res-tag">Wellbeing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
