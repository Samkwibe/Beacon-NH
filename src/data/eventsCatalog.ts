export type Event = {
  id: string
  title: string
  desc: string
  date: string
  location: string
  category: string
  img: string
  isFeatured?: boolean
}

export const EVENT_CATEGORIES = [
  'Community',
  'Education',
  'Legal',
  'Wellbeing',
  'Civic',
] as const
