import { IINE_MANCHESTER_OFFICE, IINE_URLS } from '../data/iinePublicInfo'

export function ResourcesMap() {
  return (
    <section className="resources" id="resources">
      <div className="res-map">
        <div
          className="res-map-fill"
          aria-hidden
          style={{
            background:
              'linear-gradient(145deg, #1a2830 0%, #2a4a58 35%, #1e3830 70%, #243028 100%)',
          }}
        />
        <div className="res-map-overlay"></div>
        <div className="res-map-label">📍 Manchester, NH — verify hours before visiting</div>
        <a
          className="map-pin map-pin--link"
          style={{ top: '42%', left: '50%' }}
          href="https://www.openstreetmap.org/?mlat=42.9956&mlon=-71.4548#map=12/42.9956/-71.4548"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Manchester NH on OpenStreetMap"
        >
          <div className="pin-dot"></div>
        </a>
      </div>
      <div className="res-content">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Find Help Nearby</span></div>
        <h2 className="s-title">Manchester NH<br/><em>Starting points</em></h2>
        <p className="s-sub" style={{ marginBottom: '20px' }}>
          Organizations, addresses, and phones change. Confirm every detail on the official site or by calling ahead.
        </p>
        <div className="res-list">
          <div className="res-item">
            <div className="res-icon">🏠</div>
            <div>
              <div className="res-name">
                <a href="https://www.fitnh.org" target="_blank" rel="noopener noreferrer">Families in Transition</a>
              </div>
              <div className="res-addr">Manchester, NH — shelter &amp; housing services (see agency site)</div>
              <span className="res-tag">Housing</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">⚖️</div>
            <div>
              <div className="res-name">
                <a href="https://www.nhla.org" target="_blank" rel="noopener noreferrer">NH Legal Assistance — Manchester</a>
              </div>
              <div className="res-addr">1850 Elm Street, Suite 7, Manchester, NH 03104 · (603) 668-2900</div>
              <span className="res-tag">Civil legal aid</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">📚</div>
            <div>
              <div className="res-name">
                <a href={IINE_URLS.contact} target="_blank" rel="noopener noreferrer">
                  International Institute of New England — Manchester
                </a>
              </div>
              <div className="res-addr">
                {IINE_MANCHESTER_OFFICE.street}, {IINE_MANCHESTER_OFFICE.cityStateZip} ·{' '}
                {IINE_MANCHESTER_OFFICE.phoneDisplay} ·{' '}
                <a href={IINE_URLS.whatWeDo} target="_blank" rel="noopener noreferrer">
                  Programs on iine.org
                </a>
              </div>
              <span className="res-tag">Resettlement, ESOL, employment, legal &amp; language services</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">🍎</div>
            <div>
              <div className="res-name">
                <a href="https://www.nhfoodbank.org" target="_blank" rel="noopener noreferrer">NH Food Bank</a>
              </div>
              <div className="res-addr">700 East Industrial Drive, Manchester, NH 03109 (verify on site)</div>
              <span className="res-tag">Food assistance</span>
            </div>
          </div>
          <div className="res-item">
            <div className="res-icon">🧠</div>
            <div>
              <div className="res-name">
                <a href="https://www.mhcgm.org" target="_blank" rel="noopener noreferrer">
                  Mental Health Center of Greater Manchester
                </a>
              </div>
              <div className="res-addr">401 Cypress Street, Manchester, NH 03103</div>
              <span className="res-tag">Behavioral health</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
