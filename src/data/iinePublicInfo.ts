/**
 * International Institute of New England — public facts & official URLs only.
 * Content is summarized in our own words; for full copy and eligibility, always use iine.org.
 *
 * Sources (retrieved 2026): https://iine.org/contact/ , https://iine.org/what-we-do/ ,
 * https://iine.org/about-iine/iine-leadership/
 */

export const IINE_ATTRIBUTION =
  'Summaries link to official IINE pages. Beacon NH is an independent student project and is not affiliated with IINE.'

export const IINE_MANCHESTER_OFFICE = {
  name: 'International Institute of New England — Manchester',
  /** Per https://iine.org/contact/ */
  street: '470 Pine Street, Lower Level',
  cityStateZip: 'Manchester, NH 03104',
  phoneDisplay: '(603) 647-1500',
  telHref: 'tel:+16036471500',
} as const

export const IINE_URLS = {
  home: 'https://iine.org',
  /** Board, Leadership Council, and Leadership Team (names & titles as published by IINE). */
  leadership: 'https://iine.org/about-iine/iine-leadership/',
  contact: 'https://iine.org/contact/',
  whatWeDo: 'https://iine.org/what-we-do/',
  education: 'https://iine.org/what-we-do/education/',
  employment: 'https://iine.org/what-we-do/employment-support/',
  legal: 'https://iine.org/what-we-do/legal-services/',
  languageServices: 'https://iine.org/what-we-do/language-and-translation-services/',
  getInvolved: 'https://iine.org/get-involved/',
  volunteer: 'https://iine.org/get-involved/join-our-community/volunteer/',
  donate: 'https://iine.org/donate/',
} as const

/**
 * IINE “Leadership Team” names and titles as listed on iine.org (not Beacon NH staff).
 * Re-verify periodically — roles change. lastVerified in ISO month.
 */
export const IINE_LEADERSHIP_PUBLISHED = {
  sourceLabel: 'International Institute of New England — Leadership page',
  sourceUrl: IINE_URLS.leadership,
  lastVerified: '2026-05',
} as const

export type IineLeadershipMember = { name: string; title: string }

/** Executive & program leadership published under “Leadership Team” on iine.org. */
export const IINE_LEADERSHIP_TEAM: IineLeadershipMember[] = [
  { name: 'Jeffrey Thielman', title: 'President and Chief Executive Officer' },
  { name: 'Alexandra Weber, LICSW', title: 'Senior Vice President and Chief Advancement Officer' },
  { name: 'Tali Friedman', title: 'Chief Operating Officer' },
  { name: 'Anca Moraru', title: 'Chief Program Officer' },
  { name: 'Celine Mukasine Bagley', title: 'Chief Financial Officer' },
  { name: 'Henry Harris, MSW', title: 'Managing Director, Manchester' },
  { name: 'Hannah Odaa', title: 'Managing Director, Boston' },
  { name: 'Caroline Rowe', title: 'Managing Director, Lowell' },
  { name: 'Leah Jacobs Varo, MSW', title: 'Unaccompanied Children’s Program Director' },
  { name: 'Rebecca LaPierre', title: 'Director of Immigration Legal Services' },
  { name: 'Alexa Drolette', title: 'Senior Director of Principal & Major Gifts' },
  { name: 'Kelly Fleming', title: 'Senior Director of Giving & Engagement' },
  { name: 'Kidist Gebre', title: 'Senior Director of HR' },
  { name: 'Atanur Arapoglu', title: 'IT Director' },
  { name: 'Jessica Cirone', title: 'Director of Community Engagement, Shelter Services' },
  { name: 'Danielle Gauthier', title: 'Director of Marketing & Communications' },
  { name: 'William Gillett', title: 'Director of Public Policy & Advocacy' },
  { name: 'Chantal Kamanzi', title: 'Director of Budgeting & Reporting' },
  { name: 'Jennifer Levine-Fried', title: 'Controller' },
  { name: 'Leilani Olson', title: 'Director of Corporate Giving & Engagement' },
  { name: 'Kayla Rossmeissl', title: 'Director of Program Design & Evaluation' },
  { name: 'Kubana Alexis', title: 'Associate Director, Workforce Development' },
  { name: 'Kristan Fitah', title: 'Associate Director, Boston ESOL Program' },
  { name: 'Joseph Gilbert', title: 'Associate Director, Manchester ESOL Program' },
]

/** Subset most relevant to the Manchester, NH office page on Beacon NH. */
export const IINE_LEADERSHIP_MANCHESTER: IineLeadershipMember[] = IINE_LEADERSHIP_TEAM.filter(
  (m) =>
    m.title.includes('Manchester') ||
    m.name.includes('Henry Harris') ||
    m.name.includes('Joseph Gilbert'),
)

/** Program areas with short, non-verbatim blurbs pointing to IINE’s own pages. */
export const IINE_PROGRAM_HIGHLIGHTS: {
  title: string
  blurb: string
  href: string
}[] = [
  {
    title: 'Welcoming & resettlement',
    blurb:
      'Reception, early case management, and orientation for refugees and asylees adjusting to life in New England — the foundation of IINE’s continuum of care.',
    href: IINE_URLS.whatWeDo,
  },
  {
    title: 'Education & ESOL',
    blurb:
      'Multi-level English for Speakers of Other Languages, focused on workplace vocabulary, conversation, and cultural skills that support employment.',
    href: IINE_URLS.education,
  },
  {
    title: 'Employment & training',
    blurb:
      'Integrated employment services: job search support, industry skills training, and — in Manchester — an English-learner pathway toward Licensed Nursing Assistant (LNA) certification.',
    href: IINE_URLS.employment,
  },
  {
    title: 'Immigration legal services',
    blurb:
      'IINE’s nonprofit legal practice emphasizes family and humanitarian immigration matters and U.S. citizenship, with intake through their own forms and staff.',
    href: IINE_URLS.legal,
  },
  {
    title: 'Children & youth programs',
    blurb:
      'IINE operates youth-focused initiatives alongside resettlement (exact schedules differ by office). Ask the Manchester team which groups or summer programs are enrolling.',
    href: IINE_URLS.whatWeDo,
  },
]
