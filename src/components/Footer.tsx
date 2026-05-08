export function Footer() {
  return (
    <footer>
      <div className="ft-top">
        <div className="ft-brand">
          <div className="ft-logo">
            <div className="ft-logo-mark">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 2L10 12M10 2L6 6M10 2L14 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="2" r="2.5" fill="white"/>
                <path d="M4 16H16M6 16V13H14V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ft-logo-text"><span>Beacon</span> NH</div>
          </div>
          <p>A welcoming community hub for refugees and asylum seekers in Manchester, New Hampshire. Free, safe, confidential, and multilingual.</p>
          <div className="ft-emergency">
            <p><strong>Emergency housing?</strong><br/>Dial <strong>211</strong> — NH helpline, free, 24/7<br/><span style={{ fontSize: '11px', opacity: 0.6 }}>Or call us: (603) XXX-XXXX · Mon–Fri 9am–5pm</span></p>
          </div>
        </div>
        <div className="ft-col">
          <h5>Services</h5>
          <a href="#">Housing Support</a>
          <a href="#">Legal Aid</a>
          <a href="#">English Classes</a>
          <a href="#">Mental Health</a>
          <a href="#">Employment</a>
          <a href="#">Food & Essentials</a>
        </div>
        <div className="ft-col">
          <h5>Community</h5>
          <a href="#">Events Calendar</a>
          <a href="#">Community Stories</a>
          <a href="#">Volunteer With Us</a>
          <a href="#">Donate</a>
          <a href="#">Partner With Us</a>
        </div>
        <div className="ft-col">
          <h5>Beacon NH</h5>
          <a href="#">About Us</a>
          <a href="#">Our NH Partners</a>
          <a href="tel:211">Call 211 (Emergency)</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
      <div className="ft-bottom">
        <p>© 2026 Beacon NH · 501(c)(3) Nonprofit · Manchester, NH 03101 · All services free & confidential</p>
        <div className="socials">
          <a href="#" className="soc">𝕏</a>
          <a href="#" className="soc">f</a>
          <a href="#" className="soc">in</a>
          <a href="#" className="soc">▶</a>
        </div>
      </div>
    </footer>
  );
}
