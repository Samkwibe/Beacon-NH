export function Communities() {
  const communities = [
    {
      id: "congolese",
      name: "Congolese Community",
      flag: "🇨🇩",
      img: "/congo-refugee.png",
      desc: "Our Congolese community brings incredible resilience and vibrant culture to Manchester, supporting each other through integration and language learning."
    },
    {
      id: "kenyan",
      name: "Kenyan Community",
      flag: "🇰🇪",
      img: "/kenyan-community.png",
      desc: "A tight-knit community offering strong local networks, mentorship for youth, and vibrant cultural celebrations across New Hampshire."
    },
    {
      id: "syrian",
      name: "Syrian Community",
      flag: "🇸🇾",
      img: "/syria-refugee.png",
      desc: "With a spirit of entrepreneurship and profound generosity, our Syrian families continue to establish local businesses and foster community support."
    },
    {
      id: "afghan",
      name: "Afghan Community",
      flag: "🇦🇫",
      img: "/afghan-community.png",
      desc: "A deeply welcoming and supportive network, providing newly arrived Afghan families with traditional comforts, translation, and housing aid."
    },
    {
      id: "ukrainian",
      name: "Ukrainian Community",
      flag: "🇺🇦",
      img: "/ukrainian-community.png",
      desc: "A fast-growing, highly organized network of mutual aid, standing together to ensure rapid housing and educational enrollment for all arrivals."
    },
    {
      id: "somali",
      name: "Somali Community",
      flag: "🇸🇴",
      img: "/somali-community.png",
      desc: "A cornerstone of the Manchester community, our Somali members lead many local volunteer initiatives and provide essential translation services."
    }
  ];

  return (
    <section className="communities" id="communities" style={{ background: '#FFFFFF', padding: '80px 60px' }}>
      <div className="section-header">
        <div className="s-eyebrow"><div className="s-line"></div><span className="s-eye">Our Networks</span></div>
        <h2 className="s-title">Vibrant <em>Sub-Communities</em></h2>
        <p className="s-sub">We are proud to partner with and support the thriving international communities that make Manchester, NH so uniquely beautiful.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '52px' }}>
        {communities.map((comm) => (
          <div key={comm.id} style={{ border: '1px solid rgba(46,110,74,.15)', borderRadius: '4px', overflow: 'hidden', transition: 'border-color .2s', background: '#F4F8F5' }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img src={comm.img} alt={comm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '24px' }}>
              <span className="story-country-tag" style={{ marginBottom: '12px', background: '#4A9669' }}>{comm.flag} {comm.name.split(' ')[0]}</span>
              <h3 style={{ font: '700 20px/1.2 "Barlow Condensed", sans-serif', textTransform: 'uppercase', letterSpacing: '.03em', color: '#1A3328', marginBottom: '8px' }}>
                <a href={`/communities/${comm.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{comm.name}</a>
              </h3>
              <p style={{ font: '400 14px/1.6 "Barlow", sans-serif', color: '#5A8A6E' }}>
                {comm.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
