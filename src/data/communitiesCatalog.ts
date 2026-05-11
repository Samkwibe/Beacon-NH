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
  /** Short card blurb */
  desc: string
  fullDesc: string
  /** Confirmed announcements only — leave empty until staff publishes real items */
  updates: CommunityUpdate[]
  /** Practical tips for people using this hub */
  highlights: string[]
  /** Optional prompt ideas — leave empty unless your team adds real examples */
  conversationStarters: string[]
}

/** CSS gradient for hub cards and heroes (no stock imagery). */
export function communityHubGradient(communityId: string): string {
  const g: Record<string, string> = {
    congolese: 'linear-gradient(140deg, #143d32 0%, #2a7a62 55%, #3d9a7a 100%)',
    kenyan: 'linear-gradient(140deg, #1a3320 0%, #356b3d 50%, #4a9669 100%)',
    syrian: 'linear-gradient(140deg, #1f2d3d 0%, #3d5c7a 55%, #5a7a9a 100%)',
    afghan: 'linear-gradient(140deg, #2d2418 0%, #5a4a32 50%, #7a6648 100%)',
    ukrainian: 'linear-gradient(140deg, #1a2338 0%, #2d4a7a 55%, #4a6fa8 100%)',
    somali: 'linear-gradient(140deg, #1a2830 0%, #2d5058 50%, #3d6b78 100%)',
  }
  return g[communityId] ?? 'linear-gradient(140deg, #1a3328 0%, #3d7a5c 100%)'
}

export const COMMUNITIES: Community[] = [
  {
    id: 'congolese',
    name: 'Congolese Community',
    flag: '🇨🇩',
    desc: 'Our Congolese community brings incredible resilience and vibrant culture to Manchester, supporting each other through integration and language learning.',
    fullDesc:
      'Manchester is home to a growing Congolese community. Neighbors connect over shared language, culture, and practical support as families settle and find their footing in New Hampshire.',
    highlights: [
      'French, Swahili, and Lingala are widely spoken — the Discussion board is a good place to ask who is free for language swap or phone translation.',
      'Many families coordinate rides to ESL, job fairs, and appointments through informal car pools; post timing and neighborhood in Discussion if you need a lift or can offer one.',
      'For housing emergencies, food, or legal deadlines, use 211, 988, or NH Legal Assistance in Urgent numbers — the board is for community coordination, not crisis response.',
    ],
    conversationStarters: [],
    updates: [],
  },
  {
    id: 'kenyan',
    name: 'Kenyan Community',
    flag: '🇰🇪',
    desc: 'A tight-knit community offering strong local networks, mentorship for youth, and vibrant cultural celebrations across New Hampshire.',
    fullDesc:
      'The Kenyan community in New Hampshire includes many families and professionals. People often connect around education, youth mentorship, culture, and local business.',
    highlights: [
      'Youth mentorship and homework help often start with a simple post — many teens are looking for study partners for SAT and college applications.',
      'Small business owners share wholesale contacts and market tables; keep posts specific (date, location) so others can respond quickly.',
      'If rent, immigration, or safety is urgent, call 211 or NH Legal Assistance — use this hub for everyday community networking.',
    ],
    conversationStarters: [],
    updates: [],
  },
  {
    id: 'syrian',
    name: 'Syrian Community',
    flag: '🇸🇾',
    desc: 'With a spirit of entrepreneurship and profound generosity, our Syrian families continue to establish local businesses and foster community support.',
    fullDesc:
      'Many Syrian families have made Manchester home. Neighbors contribute through small businesses, food traditions, interpretation help, and informal support for new arrivals.',
    highlights: [
      'Arabic interpretation for doctor or school meetings is often coordinated here — offer a time window you can take calls.',
      'Restaurant shifts, catering, and halal pop-ups move fast; share availability or staffing needs clearly.',
      'For immigration court dates or shelters, call NH Legal Assistance — do not post private case details publicly.',
    ],
    conversationStarters: [],
    updates: [],
  },
  {
    id: 'afghan',
    name: 'Afghan Community',
    flag: '🇦🇫',
    desc: 'A deeply welcoming and supportive network, providing newly arrived Afghan families with traditional comforts, translation, and housing aid.',
    fullDesc:
      'In recent years Manchester has welcomed many Afghan families. Neighbors often help with housing, employment, and schooling while staying connected to hospitality and culture.',
    highlights: [
      'Welcome visits and first-week shopping are often matched neighbor-to-neighbor — say if you are new or if you can host a quick tour.',
      'Driving practice posts should include neighborhood and language you are comfortable instructing in.',
      'School enrollment and housing paperwork questions are common — share only non-sensitive tips here; for personal cases, email Beacon NH.',
    ],
    conversationStarters: [],
    updates: [],
  },
  {
    id: 'ukrainian',
    name: 'Ukrainian Community',
    flag: '🇺🇦',
    desc: 'A fast-growing, highly organized network of mutual aid, standing together to ensure rapid housing and educational enrollment for all arrivals.',
    fullDesc:
      'The Ukrainian community in New Hampshire includes many families who organize mutual aid, school support, and practical help for neighbors during difficult transitions.',
    highlights: [
      'School enrollment checklists are easier when parents share which documents the district asked for — redact personal IDs before posting photos.',
      'Mutual aid funds and rent pools are coordinated carefully; link to trusted organizers or Beacon NH for donations.',
      'Stress, sleep, and trauma support: call or text 988 — free 24/7 — this board complements professional help.',
    ],
    conversationStarters: [],
    updates: [],
  },
  {
    id: 'somali',
    name: 'Somali Community',
    flag: '🇸🇴',
    desc: 'A cornerstone of the Manchester community, our Somali members lead many local volunteer initiatives and provide essential translation services.',
    fullDesc:
      'Somali neighbors are part of Manchester’s wider refugee and immigrant communities. Many are involved in local businesses, interpretation, faith community life, and volunteer efforts.',
    highlights: [
      'Hospital and clinic interpretation requests often need same-day help — morning posts get faster replies.',
      'Baby supplies, diapers, and formula swaps are welcome; keep locations public but avoid sharing home addresses.',
      'Business referrals and job leads help everyone — short posts with contact through Beacon NH avoid spam.',
    ],
    conversationStarters: [],
    updates: [],
  },
]

export function getCommunity(id: string | undefined): Community | undefined {
  if (!id) return undefined
  return COMMUNITIES.find((c) => c.id === id)
}
