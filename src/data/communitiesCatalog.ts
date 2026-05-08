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
  /** Practical tips for people using this hub */
  highlights: string[]
  /** Ideas for what to post in Discussion (builds trust, keeps board useful) */
  conversationStarters: string[]
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
    highlights: [
      'French, Swahili, and Lingala are widely spoken — the Discussion board is a good place to ask who is free for language swap or phone translation.',
      'Many families coordinate rides to ESL, job fairs, and appointments through informal car pools; post timing and neighborhood in Discussion if you need a lift or can offer one.',
      'For housing emergencies, food, or legal deadlines, use 211, 988, or NH Legal Assistance in Urgent numbers — the board is for community coordination, not crisis response.',
    ],
    conversationStarters: [
      'ESOL practice — weekday evenings near downtown?',
      'ISO ride to Concord or Manchester clinic this week',
      'Kids’ soccer or music — any families meeting on Saturdays?',
    ],
    updates: [
      {
        title: 'Monthly mutual aid circle',
        body: 'Neighbors meet the first Saturday of each month to share resources, interpretation help, and welcome new families.',
        date: '2026-05-01',
      },
      {
        title: 'ESOL study partners',
        body: 'Community-led English practice groups — beginners and advanced welcome. Ask in the discussion when the board is open for the group chat link.',
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
    highlights: [
      'Youth mentorship and homework help often start with a simple post — many teens are looking for study partners for SAT and college applications.',
      'Small business owners share wholesale contacts and market tables; keep posts specific (date, location) so others can respond quickly.',
      'If rent, immigration, or safety is urgent, call 211 or NH Legal Assistance — use this hub for everyday community networking.',
    ],
    conversationStarters: [
      'Youth hang — who is free Saturday after ESL?',
      'Pop-up or farmers market — split table cost?',
      'New to Manchester — best place for halal groceries?',
    ],
    updates: [
      {
        title: 'Youth mentorship check-in',
        body: 'Older students are pairing with teens for homework and college applications this season.',
        date: '2026-04-22',
      },
      {
        title: 'Business networking',
        body: 'Small business owners are sharing supplier contacts and pop-up market dates — say hi in chat when the board is open if you want to join.',
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
    highlights: [
      'Arabic interpretation for doctor or school meetings is often coordinated here — offer a time window you can take calls.',
      'Restaurant shifts, catering, and halal pop-ups move fast; share availability or staffing needs clearly.',
      'For immigration court dates or shelters, call NH Legal Assistance — do not post private case details publicly.',
    ],
    conversationStarters: [
      'Community dinner — volunteers for setup Sunday?',
      'Need short phone translation Wednesday morning',
      'Who is going to ESL downtown this week — share bus route?',
    ],
    updates: [
      {
        title: 'Community dinner planning',
        body: 'The next shared meal is being organized — volunteers for setup and rides are welcome.',
        date: '2026-05-05',
      },
      {
        title: 'Translation bench',
        body: 'Volunteers are offering phone interpretation for appointments — coordinate times in the discussion when the board is live.',
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
    highlights: [
      'Welcome visits and first-week shopping are often matched neighbor-to-neighbor — say if you are new or if you can host a quick tour.',
      'Driving practice posts should include neighborhood and language you are comfortable instructing in.',
      'School enrollment and housing paperwork questions are common — share only non-sensitive tips here; for personal cases, email Beacon NH.',
    ],
    conversationStarters: [
      'New family — needs winter coats sizes for kids',
      'Driving practice this Sunday afternoon?',
      'School registration — any parent free to translate?',
    ],
    updates: [
      {
        title: 'Welcome visits',
        body: 'Families are matched with hosts for first-week shopping and school registration support.',
        date: '2026-04-30',
      },
      {
        title: 'Driving practice',
        body: 'Volunteers with cars are offering supervised practice for new drivers — post availability when discussion is open.',
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
    highlights: [
      'School enrollment checklists are easier when parents share which documents the district asked for — redact personal IDs before posting photos.',
      'Mutual aid funds and rent pools are coordinated carefully; link to trusted organizers or Beacon NH for donations.',
      'Stress, sleep, and trauma support: call or text 988 — free 24/7 — this board complements professional help.',
    ],
    conversationStarters: [
      'Kids’ after-school program — carpool from east side?',
      'Document translation swap — English ↔ Ukrainian',
      'Winter clothing drive drop-off point?',
    ],
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
    highlights: [
      'Hospital and clinic interpretation requests often need same-day help — morning posts get faster replies.',
      'Baby supplies, diapers, and formula swaps are welcome; keep locations public but avoid sharing home addresses.',
      'Business referrals and job leads help everyone — short posts with contact through Beacon NH avoid spam.',
    ],
    conversationStarters: [
      'Hospital visit Wednesday — needs Somali interpreter',
      'Diaper / formula — extras to share near Elm St?',
      'Friday prayer carpool — space for two',
    ],
    updates: [
      {
        title: 'Hospital visitor volunteers',
        body: 'Interpretation buddies are pairing for non-English speakers at weekday appointments.',
        date: '2026-04-25',
      },
      {
        title: 'Market meetup',
        body: 'Vendors are coordinating a joint table at the summer market — ask in chat when open to reserve space.',
        date: '2026-04-12',
      },
    ],
  },
]

export function getCommunity(id: string | undefined): Community | undefined {
  if (!id) return undefined
  return COMMUNITIES.find((c) => c.id === id)
}
