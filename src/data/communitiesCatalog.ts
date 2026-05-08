export type CommunityUpdate = {
  title: string
  body: string
  /** ISO date or display label */
  date: string
}

export type Community = {
  id: string
  name: string
  flag: string
  img: string
  /** Short card blurb */
  desc: string
  fullDesc: string
  /** Curated “what’s happening” — shown always; staff can add more via Firestore later */
  updates: CommunityUpdate[]
}

export const COMMUNITIES: Community[] = [
  {
    id: 'congolese',
    name: 'Congolese Community',
    flag: '🇨🇩',
    img: '/congo-refugee.png',
    desc: 'Our Congolese community brings incredible resilience and vibrant culture to Manchester, supporting each other through integration and language learning.',
    fullDesc:
      'Manchester, NH is home to a rapidly growing, resilient Congolese community. Since 2015, hundreds of families have settled here, bringing with them rich cultural traditions, vibrant music, and incredible entrepreneurial spirit. The community meets regularly for cultural celebrations, mutual aid initiatives, and language exchange programs.',
    updates: [
      {
        title: 'Monthly mutual aid circle',
        body: 'Neighbors meet the first Saturday of each month to share resources, interpretation help, and welcome new families.',
        date: '2026-05-01',
      },
      {
        title: 'ESOL study partners',
        body: 'Community-led English practice groups — beginners and advanced welcome. Ask in the discussion below for the group chat link.',
        date: '2026-04-18',
      },
    ],
  },
  {
    id: 'kenyan',
    name: 'Kenyan Community',
    flag: '🇰🇪',
    img: '/kenyan-community.png',
    desc: 'A tight-knit community offering strong local networks, mentorship for youth, and vibrant cultural celebrations across New Hampshire.',
    fullDesc:
      'The Kenyan community in New Hampshire is known for its strong local networks and dedication to education and youth mentorship. Community leaders organize weekly gatherings, business networking events, and vibrant celebrations of Kenyan independence and culture.',
    updates: [
      {
        title: 'Youth mentorship check-in',
        body: 'Older students are pairing with teens for homework and college applications this season.',
        date: '2026-04-22',
      },
      {
        title: 'Business networking',
        body: 'Small business owners are sharing supplier contacts and pop-up market dates — say hi in chat if you want to join.',
        date: '2026-04-10',
      },
    ],
  },
  {
    id: 'syrian',
    name: 'Syrian Community',
    flag: '🇸🇾',
    img: '/syria-refugee.png',
    desc: 'With a spirit of entrepreneurship and profound generosity, our Syrian families continue to establish local businesses and foster community support.',
    fullDesc:
      'With a spirit of profound generosity, our Syrian families have established several local businesses, restaurants, and support networks. They provide crucial Arabic translation services for new arrivals and host incredible community dinners that bring all of Manchester together.',
    updates: [
      {
        title: 'Community dinner planning',
        body: 'The next shared meal is being organized — volunteers for setup and rides are welcome.',
        date: '2026-05-05',
      },
      {
        title: 'Translation bench',
        body: 'Volunteers are offering phone interpretation for appointments — coordinate times in the discussion.',
        date: '2026-04-28',
      },
    ],
  },
  {
    id: 'afghan',
    name: 'Afghan Community',
    flag: '🇦🇫',
    img: '/afghan-community.png',
    desc: 'A deeply welcoming and supportive network, providing newly arrived Afghan families with traditional comforts, translation, and housing aid.',
    fullDesc:
      'Since 2021, Manchester has welcomed many Afghan families. This deeply supportive network helps new arrivals navigate housing, employment, and schooling, all while keeping traditional Afghan hospitality and culture alive in New England.',
    updates: [
      {
        title: 'Welcome visits',
        body: 'Families are matched with hosts for first-week shopping and school registration support.',
        date: '2026-04-30',
      },
      {
        title: 'Driving practice',
        body: 'Volunteers with cars are offering supervised practice for new drivers — post availability below.',
        date: '2026-04-14',
      },
    ],
  },
  {
    id: 'ukrainian',
    name: 'Ukrainian Community',
    flag: '🇺🇦',
    img: '/ukrainian-community.png',
    desc: 'A fast-growing, highly organized network of mutual aid, standing together to ensure rapid housing and educational enrollment for all arrivals.',
    fullDesc:
      'A highly organized and motivated network of mutual aid. The Ukrainian community in NH has rallied to ensure rapid housing placement, educational enrollment, and trauma support for all new arrivals.',
    updates: [
      {
        title: 'School enrollment support',
        body: 'Parents are sharing copies of required documents and school contact lists for new kids.',
        date: '2026-05-02',
      },
      {
        title: 'Mutual aid fund update',
        body: 'Local donors matched emergency rent for three families this month — thank you notes going out.',
        date: '2026-04-20',
      },
    ],
  },
  {
    id: 'somali',
    name: 'Somali Community',
    flag: '🇸🇴',
    img: '/somali-community.png',
    desc: 'A cornerstone of the Manchester community, our Somali members lead many local volunteer initiatives and provide essential translation services.',
    fullDesc:
      'As one of the foundational refugee communities in Manchester, Somali members lead numerous volunteer initiatives, serve as vital interpreters in local hospitals, and run thriving local businesses.',
    updates: [
      {
        title: 'Hospital visitor volunteers',
        body: 'Interpretation buddies are pairing for non-English speakers at weekday appointments.',
        date: '2026-04-25',
      },
      {
        title: 'Market meetup',
        body: 'Vendors are coordinating a joint table at the summer market — ask in chat to reserve space.',
        date: '2026-04-12',
      },
    ],
  },
]

export function getCommunity(id: string | undefined): Community | undefined {
  if (!id) return undefined
  return COMMUNITIES.find((c) => c.id === id)
}
