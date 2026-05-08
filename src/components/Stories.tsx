export function Stories() {
  return (
    <>
      <section className="impact-strip">
        <div className="impact-inner">
          <div className="impact-left">
            <h2>Our Impact<br/>In Numbers</h2>
            <p>Real families. Real change.<br/>Right here in Manchester, NH.</p>
          </div>
          <div className="impact-nums">
            <div className="imp"><div className="imp-n">7,500+</div><div className="imp-l">Refugees in NH Since 1980s</div></div>
            <div className="imp"><div className="imp-n">800+</div><div className="imp-l">Families Supported</div></div>
            <div className="imp"><div className="imp-n">10</div><div className="imp-l">Languages Supported</div></div>
            <div className="imp"><div className="imp-n">30+</div><div className="imp-l">NH Partner Organizations</div></div>
          </div>
        </div>
      </section>

      <section className="stories" id="stories">
        <div className="section-header">
          <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Real Voices</span></div>
          <h2 className="s-title">Stories From Our <em>Community</em></h2>
          <p className="s-sub">Hear from families who found safety, support, and belonging through Beacon NH.</p>
        </div>
        <div className="stories-grid">
          <div className="story-big">
            <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.6) saturate(0.75)' }}>
              <source src="/pakistan.mp4" type="video/mp4" />
            </video>
            <div className="story-big-overlay"></div>
            <div className="story-big-play"><div className="play-tri"></div></div>
            <div className="story-big-body">
              <span className="story-country-tag">🇨🇩 DR Congo</span>
              <h3>"A New Beginning After the Storm"</h3>
              <p>Beacon NH helped our family rebuild our lives after fleeing the conflict in the DRC. We are finally safe, and we have found a beautiful community here.</p>
            </div>
          </div>
          <div className="story-sm">
            <div className="story-sm-img"><img src="/pexels-hosny-salah-21693143-36450021.jpg" alt="Syrian Father and Child" /></div>
            <span className="story-country-tag" style={{ marginBottom: '12px' }}>🇸🇾 Syria</span>
            <h4>"They Spoke My Language"</h4>
            <p>The legal team helped with my asylum case entirely in Arabic. Today I have refugee status and I volunteer here to help others.</p>
            <div className="story-sm-author">
              <img className="story-avatar" src="/pexels-hosny-salah-21693143-36450021.jpg" alt="Tariq" />
              <div><div className="sa-name">Tariq M.</div><div className="sa-from">Now a Beacon NH volunteer</div></div>
            </div>
          </div>
          <div className="story-sm">
            <div className="story-sm-img"><img src="/pexels-safari-consoler-3290243-19297741.jpg" alt="Oksana" /></div>
            <span className="story-country-tag" style={{ marginBottom: '12px' }}>🇺🇦 Ukraine</span>
            <h4>"Housing In Three Days"</h4>
            <p>I arrived alone with two children. Beacon NH found us a home in three days and connected us with the Ukrainian community here.</p>
            <div className="story-sm-author">
              <img className="story-avatar" src="/pexels-safari-consoler-3290243-19297741.jpg" alt="Oksana" />
              <div><div className="sa-name">Oksana V.</div><div className="sa-from">Manchester NH · arrived 2022</div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
