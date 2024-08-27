import { PageType } from './events'

export type OnThisDayAllTodayType = {
  selected: SelectedType[]
  births: BirthType[]
  deaths: DeathType[]
  events: EventType[]
  holidays: HolidayType[]
}

// TODO: Get correct type
type EventType = {
  title: string
}

export type SelectedType = {
  text: string
  pages: PageType[]
  year: number
}

type BirthType = {
  text: string
  pages: PageType[]
  year: number
}

type HolidayType = {
  text: string
  pages: PageType[]
}

type DeathType = {
  text: string
  pages: PageType[]
  year: number
}
