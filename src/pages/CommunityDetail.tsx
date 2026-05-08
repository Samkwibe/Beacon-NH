import { useParams, Link } from 'react-router-dom';

const communitiesData = {
  "congolese": { name: "Congolese Community", flag: "🇨🇩", img: "/congo-refugee.png", fullDesc: "Manchester, NH is home to a rapidly growing, resilient Congolese community. Since 2015, hundreds of families have settled here, bringing with them rich cultural traditions, vibrant music, and incredible entrepreneurial spirit. The community meets regularly for cultural celebrations, mutual aid initiatives, and language exchange programs." },
  "kenyan": { name: "Kenyan Community", flag: "🇰🇪", img: "/kenyan-community.png", fullDesc: "The Kenyan community in New Hampshire is known for its strong local networks and dedication to education and youth mentorship. Community leaders organize weekly gatherings, business networking events, and vibrant celebrations of Kenyan independence and culture." },
  "syrian": { name: "Syrian Community", flag: "🇸🇾", img: "/syria-refugee.png", fullDesc: "With a spirit of profound generosity, our Syrian families have established several local businesses, restaurants, and support networks. They provide crucial Arabic translation services for new arrivals and host incredible community dinners that bring all of Manchester together." },
  "afghan": { name: "Afghan Community", flag: "🇦🇫", img: "/afghan-community.png", fullDesc: "Since 2021, Manchester has welcomed many Afghan families. This deeply supportive network helps new arrivals navigate housing, employment, and schooling, all while keeping traditional Afghan hospitality and culture alive in New England." },
  "ukrainian": { name: "Ukrainian Community", flag: "🇺🇦", img: "/ukrainian-community.png", fullDesc: "A highly organized and motivated network of mutual aid. The Ukrainian community in NH has rallied to ensure rapid housing placement, educational enrollment, and trauma support for all new arrivals." },
  "somali": { name: "Somali Community", flag: "🇸🇴", img: "/somali-community.png", fullDesc: "As one of the foundational refugee communities in Manchester, Somali members lead numerous volunteer initiatives, serve as vital interpreters in local hospitals, and run thriving local businesses." }
};

export function CommunityDetail() {
  const { id } = useParams();
  const comm = communitiesData[id as keyof typeof communitiesData];

  if (!comm) return <div style={{ padding: '120px', textAlign: 'center' }}>Community not found</div>;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#FFFFFF', fontFamily: '"Barlow", sans-serif' }}>
      <div style={{ width: '100%', height: '400px', overflow: 'hidden', position: 'relative' }}>
        <img src={comm.img} alt={comm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'white' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{comm.flag}</div>
          <h1 style={{ font: '700 64px "Barlow Condensed"', margin: 0 }}>{comm.name}</h1>
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <Link to="/communities" style={{ color: '#4A9669', textDecoration: 'none', fontWeight: 'bold', marginBottom: '24px', display: 'inline-block' }}>← Back to Communities Grid</Link>
        <p style={{ fontSize: '20px', color: '#444', lineHeight: '1.8', marginBottom: '40px' }}>
          {comm.fullDesc}
        </p>
        <h3 style={{ font: '700 24px "Barlow Condensed"', color: '#1A3328', marginBottom: '16px' }}>Get Involved</h3>
        <p style={{ color: '#666', lineHeight: '1.6' }}>If you are a member of this community and need assistance, or if you wish to volunteer and support this network, please reach out to our community liaisons.</p>
        <button style={{ marginTop: '24px', padding: '16px 32px', background: '#2E6E4A', color: 'white', fontWeight: 'bold', fontSize: '18px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Contact Community Liaison
        </button>
      </div>
    </div>
  );
}
