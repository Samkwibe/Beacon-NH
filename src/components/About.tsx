export function About() {
  return (
    <section className="about">
      <div className="about-img">
        <img src="/pexels-alain-nkingi-290332318-14432262.jpg" alt="Community" />
        <div className="about-img-overlay"></div>
        <div className="about-year-badge">
          <div className="ayb-n">2020</div>
          <div className="ayb-l">Founded in<br/>Manchester, NH</div>
        </div>
      </div>
      <div className="about-content">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Who We Are</span></div>
        <h2 className="s-title" style={{ marginBottom: '24px' }}>A Light For Every<br/>Family In <em>New Hampshire</em></h2>
        <p>Beacon NH was built by and for the refugee community in Manchester. Since the 1980s, over 7,500 refugees have made New Hampshire their home — and we're here to make sure every new arrival finds the support they need.</p>
        <p>We work alongside IINE, ORIS, BCNH, Catholic Charities NH, and the NH DHHS Refugee Program to connect families to real services, in their own language, with full dignity and respect.</p>
        <div className="about-facts">
          <div className="af"><div className="af-n">30+</div><div className="af-l">NH Partner Orgs</div></div>
          <div className="af"><div className="af-n">800+</div><div className="af-l">People Supported</div></div>
          <div className="af"><div className="af-n">10</div><div className="af-l">Languages Spoken</div></div>
          <div className="af"><div className="af-n">100%</div><div className="af-l">Free & Confidential</div></div>
        </div>
        <a href="#services" className="btn-primary" style={{ marginTop: '32px', width: 'fit-content' }}>Our Services →</a>
      </div>
    </section>
  );
}
