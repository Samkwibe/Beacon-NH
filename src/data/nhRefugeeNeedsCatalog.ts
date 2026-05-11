/**
 * “I need…” topics → verifiable NH starting points for newcomers.
 * Each topic includes `lastVerified` (YYYY-MM). Re-check URLs and phones quarterly.
 */

import { IINE_URLS } from './iinePublicInfo'

const V = '2026-05' as const

export type NhHelpLink = {
  label: string
  href: string
  tel?: string
  note?: string
  /** YYYY-MM — when a staff member last checked this URL/phone */
  lastVerified?: string
}

export type RefugeeNeedTopic = {
  id: string
  title: string
  summary: string
  emoji: string
  firstStep: string
  links: NhHelpLink[]
  lastVerified: string
}

export const NH_REFUGEE_NEED_TOPICS: RefugeeNeedTopic[] = [
  {
    id: 'safety-emergency',
    title: 'Safety & emergencies',
    emoji: '🚨',
    summary: 'Immediate danger, violence, or medical emergency.',
    firstStep: 'Call 911 for police, fire, or ambulance. For mental health crisis, use 988.',
    lastVerified: V,
    links: [
      {
        label: '988 Suicide & Crisis Lifeline',
        href: 'https://988lifeline.org',
        tel: '988',
        lastVerified: V,
      },
      { label: '211 NH (when not an emergency)', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'housing-shelter',
    title: 'Housing & shelter',
    emoji: '🏠',
    summary: 'Emergency shelter, homelessness prevention, or longer-term housing search.',
    firstStep: '211 NH can refer you to shelter and housing programs statewide, 24/7.',
    lastVerified: V,
    links: [
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
      {
        label: 'Families in Transition (FIT)',
        href: 'https://www.fitnh.org',
        note: 'Manchester-area housing & shelter services — confirm intake on their site.',
        lastVerified: V,
      },
      {
        label: 'NH DHHS housing & homelessness (state info)',
        href: 'https://www.dhhs.nh.gov/programs-services/homeless',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'food-nutrition',
    title: 'Food & nutrition',
    emoji: '🍎',
    summary: 'Food pantry, SNAP (food stamps), food resources for families.',
    firstStep: 'Dial 211 for the nearest pantry and SNAP application help.',
    lastVerified: V,
    links: [
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
      { label: 'NH Food Bank', href: 'https://www.nhfoodbank.org', lastVerified: V },
      {
        label: 'NH SNAP (Food Stamp Program)',
        href: 'https://www.dhhs.nh.gov/programs-services/nh-food-stamp-program',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'wic-babies',
    title: 'WIC (women, infants & children)',
    emoji: '🍼',
    summary: 'Nutrition support, breastfeeding help, and referrals for young children and pregnant or postpartum parents.',
    firstStep: 'Apply through NH DHHS WIC or ask 211 to connect you to the nearest clinic.',
    lastVerified: V,
    links: [
      {
        label: 'NH DHHS — WIC program',
        href: 'https://www.dhhs.nh.gov/programs-services/wic',
        lastVerified: V,
      },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'dental-oral',
    title: 'Dental & oral health',
    emoji: '🦷',
    summary: 'Low-cost dental clinics, Medicaid dental benefits, and school oral health information.',
    firstStep: '211 NH can refer to sliding-fee clinics; ask your Medicaid plan which dentists accept your coverage.',
    lastVerified: V,
    links: [
      {
        label: 'NH DHHS — public health oral health hub',
        href: 'https://www.dhhs.nh.gov/programs-services/disease-prevention/nh-oral-health-program',
        lastVerified: V,
      },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
      {
        label: 'NH Medicaid (dental coverage depends on eligibility)',
        href: 'https://www.dhhs.nh.gov/programs-services/medical-assistance',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'health-coverage',
    title: 'Health insurance & doctors',
    emoji: '🩺',
    summary: 'Medicaid, finding a primary care doctor, vaccines, and special needs.',
    firstStep: 'Your resettlement agency often helps with first Medicaid applications; 211 can also refer.',
    lastVerified: V,
    links: [
      {
        label: 'NH Medicaid (Medical Assistance)',
        href: 'https://www.dhhs.nh.gov/programs-services/medical-assistance',
        lastVerified: V,
      },
      { label: '211 NH — health referrals', href: 'https://211nh.org', tel: '211', lastVerified: V },
      {
        label: 'NH DHHS — Refugee program (context)',
        href: 'https://www.dhhs.nh.gov/programs-services/health-equity/operation-united-states-refugee-admissions-program-new-hampshire',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'mental-health',
    title: 'Mental health & trauma support',
    emoji: '🧠',
    summary: 'Counseling, crisis support, and community mental health centers.',
    firstStep: '988 is free and confidential 24/7. For ongoing care, ask 211 or your health plan for local providers.',
    lastVerified: V,
    links: [
      { label: '988 Lifeline', href: 'https://988lifeline.org', tel: '988', lastVerified: V },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
      {
        label: 'Mental Health Center of Greater Manchester',
        href: 'https://www.mhcgm.org',
        note: 'Local community mental health center — confirm intake numbers on their site.',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'lgbtq-safety',
    title: 'LGBTQ+ newcomers & asylum',
    emoji: '🏳️‍🌈',
    summary: 'Anti-discrimination resources, legal help for asylum on LGBTQ+ grounds, and local affirming health access.',
    firstStep:
      'For emergencies use 911. For civil legal screening (housing, benefits, family) start with 603 Legal Aid. LGBTQ+ immigration questions may also need specialized nonprofit attorneys.',
    lastVerified: V,
    links: [
      {
        label: 'GLBTQ Legal Advocates & Defenders (New England)',
        href: 'https://www.glad.org',
        note: 'Regional LGBTQ+ legal org — verify which cases they accept.',
        lastVerified: V,
      },
      {
        label: '603 Legal Aid',
        href: 'https://www.603legalaid.org',
        tel: '+18006395290',
        lastVerified: V,
      },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'unaccompanied-youth',
    title: 'Unaccompanied minors & youth',
    emoji: '🧒',
    summary: 'Federal programs for children arriving without a parent; legal custody and sponsor rules are complex.',
    firstStep:
      'Do not post a child’s full story publicly. Call 211 for crisis needs; contact a qualified immigration attorney or accredited representative immediately for court dates.',
    lastVerified: V,
    links: [
      {
        label: 'U.S. ORR — Office of Refugee Resettlement (overview)',
        href: 'https://www.acf.hhs.gov/orr',
        lastVerified: V,
      },
      {
        label: 'U.S. DOJ — accredited representatives roster',
        href: 'https://www.justice.gov/eoir/recognition-accreditation-roster-reports',
        lastVerified: V,
      },
      {
        label: 'IINE — contact Manchester for youth programs & services',
        href: 'https://iine.org/contact/',
        tel: '+16036471500',
        note: 'Ask which youth programs are active; do not share minor’s details in public chat.',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'interpretation',
    title: 'Interpreters & document translation',
    emoji: '🗣️',
    summary: 'Professional interpreters for medical, legal, and school meetings; certified document translation.',
    firstStep:
      'Ask the office that scheduled the appointment to book an interpreter. IINE Language Services is headquartered in Manchester for commercial / institutional contracts.',
    lastVerified: V,
    links: [
      {
        label: 'IINE Language Services — overview',
        href: IINE_URLS.languageServices,
        tel: '+16036471500',
        note: 'OPI, VRI, on-site (select languages), and document translation.',
        lastVerified: V,
      },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'immigration-legal',
    title: 'Immigration paperwork & court',
    emoji: '📋',
    summary: 'Work permits, adjustment of status, naturalization, immigration court.',
    firstStep: 'Nonprofit immigration legal providers usually require intake; avoid “notarios” who are not licensed attorneys.',
    lastVerified: V,
    links: [
      {
        label: 'IINE — Immigration legal services (family / humanitarian / citizenship)',
        href: IINE_URLS.legal,
        note: 'Use IINE’s intake forms.',
        lastVerified: V,
      },
      {
        label: 'Catholic Charities NH — Immigration legal services',
        href: 'https://www.cc-nh.org/services/immigration-legal-services/',
        tel: '+16038899431',
        lastVerified: V,
      },
      {
        label: 'U.S. DOJ — accredited representatives roster',
        href: 'https://www.justice.gov/eoir/recognition-accreditation-roster-reports',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'civil-legal',
    title: 'Housing law, benefits letters, family safety (civil legal)',
    emoji: '⚖️',
    summary: 'Eviction defense, domestic violence protective orders, some benefit denials — civil (not immigration) legal aid.',
    firstStep: 'Start with 603 Legal Aid screening; they partner with NH Legal Assistance.',
    lastVerified: V,
    links: [
      { label: '603 Legal Aid', href: 'https://www.603legalaid.org', tel: '+18006395290', lastVerified: V },
      { label: 'NH Legal Assistance — Manchester', href: 'https://www.nhla.org', tel: '+16036682900', lastVerified: V },
    ],
  },
  {
    id: 'esl-education',
    title: 'English (ESOL) & adult education',
    emoji: '📚',
    summary: 'English classes, digital literacy, sometimes high school equivalency.',
    firstStep: 'Ask your resettlement case manager; IINE publishes ESOL programming on their Education page.',
    lastVerified: V,
    links: [
      {
        label: 'IINE — Education & ESOL',
        href: IINE_URLS.education,
        tel: '+16036471500',
        lastVerified: V,
      },
      {
        label: 'NH Bureau of Adult Education (state)',
        href: 'https://www.education.nh.gov/who-we-are/division-of-educator-effectiveness-and-support/adult-education',
        lastVerified: V,
      },
    ],
  },
  {
    id: 'jobs-employment',
    title: 'Jobs & training',
    emoji: '💼',
    summary: 'First job search, résumé, training pathways, NH Works.',
    firstStep:
      'Resettlement agencies provide early employment services; IINE describes an 18-week LNA (Licensed Nursing Assistant) track in Manchester for eligible English learners.',
    lastVerified: V,
    links: [
      { label: 'Ascentria Care Alliance', href: 'https://www.ascentria.org', lastVerified: V },
      {
        label: 'IINE — Employment support & Manchester LNA program',
        href: IINE_URLS.employment,
        tel: '+16036471500',
        lastVerified: V,
      },
      { label: 'NH Employment Security (NH Works)', href: 'https://www.nhes.nh.gov', lastVerified: V },
    ],
  },
  {
    id: 'schools-children',
    title: 'Children in school',
    emoji: '🎒',
    summary: 'Enrollment, language support, transportation, homelessness protections (McKinney-Vento).',
    firstStep: 'Contact your school district office; mention if your housing is temporary — McKinney-Vento rights may apply.',
    lastVerified: V,
    links: [
      {
        label: 'NH DOE — McKinney-Vento (homeless education)',
        href: 'https://www.education.nh.gov/who-we-are/division-of-educator-effectiveness-and-support/consolidated-programs/homeless-education-mckinney-vento',
        lastVerified: V,
      },
      { label: '211 NH — family support', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'cash-benefits',
    title: 'Cash assistance & benefits',
    emoji: '💵',
    summary: 'TANF, refugee cash assistance (when eligible), SNAP, heating help — rules change by program.',
    firstStep: 'Your resettlement agency and NH DHHS are authoritative for eligibility; 211 can explain where to apply.',
    lastVerified: V,
    links: [
      { label: 'NH DHHS — benefit programs hub', href: 'https://www.dhhs.nh.gov', lastVerified: V },
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
    ],
  },
  {
    id: 'transportation',
    title: 'Transportation',
    emoji: '🚌',
    summary: 'Bus passes, rides to appointments, driver licensing.',
    firstStep: 'Ask 211 and your case manager; Manchester Transit Authority has local routes.',
    lastVerified: V,
    links: [
      { label: '211 NH', href: 'https://211nh.org', tel: '211', lastVerified: V },
      { label: 'Manchester Transit Authority', href: 'https://www.mtabus.org', lastVerified: V },
      { label: 'NH DMV — driver licensing', href: 'https://www.dmv.nh.gov', lastVerified: V },
    ],
  },
]
