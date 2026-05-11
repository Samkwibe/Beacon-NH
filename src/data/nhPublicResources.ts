/**
 * New Hampshire public help contacts for Beacon NH UI (sidebar, modals, resource blocks).
 * Verify periodically with official sites. Each block includes `lastVerified` (YYYY-MM).
 *
 * Sources:
 * - 211 NH / Granite United Way: https://211nh.org , https://www.graniteuw.org
 * - NH Legal Assistance: https://www.nhla.org/contact-us
 * - 603 Legal Aid: https://www.603legalaid.org
 * - Catholic Charities NH immigration: https://www.cc-nh.org/services/immigration-legal-services/
 */

export const NH_211 = {
  name: '211 NH',
  summary: 'Information and referral — housing, food, utilities, health, and more. 24/7 with language support.',
  dial: '211',
  telHref: 'tel:211',
  tollFreeDisplay: '1-866-444-4211',
  telTollFreeHref: 'tel:+18664444211',
  website: 'https://211nh.org',
  lastVerified: '2026-05',
} as const

export const CRISIS_988 = {
  name: '988 Suicide & Crisis Lifeline',
  summary: 'Free, confidential, 24/7 support for mental health crises in the U.S.',
  telHref: 'tel:988',
  website: 'https://988lifeline.org',
  lastVerified: '2026-05',
} as const

/** Civil legal help intake (partners with NHLA and others). */
export const LEGAL_603_INTAKE = {
  name: '603 Legal Aid',
  summary: 'Screening for free civil legal help in New Hampshire',
  phoneDisplay: '1-800-639-5290',
  telHref: 'tel:+18006395290',
  website: 'https://www.603legalaid.org',
  lastVerified: '2026-05',
} as const

/** NH Legal Assistance — Manchester office */
export const NHLA_MANCHESTER = {
  name: 'NH Legal Assistance — Manchester',
  summary: 'Nonprofit civil legal services; apply via 603 Legal Aid or NHLA for eligibility',
  phoneDisplay: '603-668-2900',
  telHref: 'tel:+16036682900',
  tollFreeDisplay: '1-800-562-3174',
  telTollFreeHref: 'tel:+18005623174',
  website: 'https://www.nhla.org',
  address: '1850 Elm Street, Suite 7, Manchester, NH 03104',
  lastVerified: '2026-05',
} as const

export const CCNH_IMMIGRATION = {
  name: 'Catholic Charities NH — Immigration legal services',
  summary: 'Immigration legal services (applications, naturalization, etc.); not a government agency',
  phoneDisplay: '603-889-9431',
  telHref: 'tel:+16038899431',
  website: 'https://www.cc-nh.org/services/immigration-legal-services/',
  lastVerified: '2026-05',
} as const
