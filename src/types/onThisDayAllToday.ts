import { EventFilterTypes } from 'constants/homeSegmentedTabs'
import { PageType } from './events'

export type OnThisDayAllTodayType = {
  [EventFilterTypes.Featured]: SelectedType[]
  [EventFilterTypes.Births]: BirthType[]
  [EventFilterTypes.Deaths]: DeathType[]
  [EventFilterTypes.Events]: EventType[]
  [EventFilterTypes.Holidays]: HolidayType[]
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
