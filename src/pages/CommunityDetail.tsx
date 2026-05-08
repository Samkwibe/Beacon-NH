import { useParams, Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const communitiesData = {
  congolese: {
    name: 'Congolese Community',
    flag: '🇨🇩',
    img: '/congo-refugee.png',
    fullDesc:
      'Manchester, NH is home to a rapidly growing, resilient Congolese community. Since 2015, hundreds of families have settled here, bringing with them rich cultural traditions, vibrant music, and incredible entrepreneurial spirit. The community meets regularly for cultural celebrations, mutual aid initiatives, and language exchange programs.',
  },
  kenyan: {
    name: 'Kenyan Community',
    flag: '🇰🇪',
    img: '/kenyan-community.png',
    fullDesc:
      'The Kenyan community in New Hampshire is known for its strong local networks and dedication to education and youth mentorship. Community leaders organize weekly gatherings, business networking events, and vibrant celebrations of Kenyan independence and culture.',
  },
  syrian: {
    name: 'Syrian Community',
    flag: '🇸🇾',
    img: '/syria-refugee.png',
    fullDesc:
      'With a spirit of profound generosity, our Syrian families have established several local businesses, restaurants, and support networks. They provide crucial Arabic translation services for new arrivals and host incredible community dinners that bring all of Manchester together.',
  },
  afghan: {
    name: 'Afghan Community',
    flag: '🇦🇫',
    img: '/afghan-community.png',
    fullDesc:
      'Since 2021, Manchester has welcomed many Afghan families. This deeply supportive network helps new arrivals navigate housing, employment, and schooling, all while keeping traditional Afghan hospitality and culture alive in New England.',
  },
  ukrainian: {
    name: 'Ukrainian Community',
    flag: '🇺🇦',
    img: '/ukrainian-community.png',
    fullDesc:
      'A highly organized and motivated network of mutual aid. The Ukrainian community in NH has rallied to ensure rapid housing placement, educational enrollment, and trauma support for all new arrivals.',
  },
  somali: {
    name: 'Somali Community',
    flag: '🇸🇴',
    img: '/somali-community.png',
    fullDesc:
      'As one of the foundational refugee communities in Manchester, Somali members lead numerous volunteer initiatives, serve as vital interpreters in local hospitals, and run thriving local businesses.',
  },
}

export function CommunityDetail() {
  const { id } = useParams()
  const comm = communitiesData[id as keyof typeof communitiesData]

  usePageMeta(
    comm?.name ?? 'Community',
    comm?.fullDesc ?? 'Learn about refugee-led communities connected with Beacon NH in Manchester.',
  )

  if (!comm) {
    return (
      <div className="page-shell page-with-nav page-shell--narrow">
        <div className="page-empty">Community not found.</div>
        <Link to="/communities" className="event-detail-back">
          ← Back to Communities
        </Link>
      </div>
    )
  }

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

  return (
    <article className="community-detail page-with-nav">
      <div className="community-detail-hero">
        <img src={comm.img} alt={comm.name} />
        <div className="community-detail-hero-grad" />
        <div className="community-detail-hero-text">
          <div className="community-detail-flag">{comm.flag}</div>
          <h1 className="community-detail-title">{comm.name}</h1>
        </div>
      </div>
      <div className="page-shell page-shell--narrow community-detail-body">
        <Link to="/communities" className="event-detail-back">
          ← Back to Communities
        </Link>
        <p className="community-detail-desc">{comm.fullDesc}</p>
        <h2 className="community-detail-h2">Get involved</h2>
        <p className="community-detail-lead">
          If you are part of this community and need assistance — or you want to volunteer — reach out to our team.
        </p>
        {contactEmail ? (
          <a className="btn-primary community-detail-cta" href={`mailto:${contactEmail}`}>
            Email Beacon NH
          </a>
        ) : (
          <Link className="btn-primary community-detail-cta" to="/donate">
            Support Beacon NH
          </Link>
        )}
      </div>
    </article>
  )
}
