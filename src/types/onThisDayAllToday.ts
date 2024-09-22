import { PageType } from './events'

export type OnThisDayAllTodayType = {
  selected: SelectedType[]
  births: BirthType[]
  deaths: DeathType[]
  events: EventType[]
  holidays: HolidayType[]
}

type EventType = {
  text: string
  pages: PageType[]
  year: number
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
  year: number
}

type DeathType = {
  text: string
  pages: PageType[]
  year: number
}
