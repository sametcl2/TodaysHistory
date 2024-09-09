import { PageType } from './events'

export type FavoriteType = {
  id: string
  url: string
  thumbnail?: string
  text: string
  day: string
  month: string
  year: number
  pages?: PageType[]
}
