import { t } from 'utils/common'

export enum HomeSegmentedTabTypes {
  Featured = 'Featured',
  Events = 'Events',
  Births = 'Births',
  Deaths = 'Deaths',
  Holidays = 'Holidays'
}

export enum EventFilterTypes {
  Featured = 'selected',
  Events = 'events',
  Births = 'births',
  Deaths = 'deaths',
  Holidays = 'holidays'
}

export const eventFilterTypes: Record<HomeSegmentedTabTypes, EventFilterTypes> = {
  [HomeSegmentedTabTypes.Featured]: EventFilterTypes.Featured,
  [HomeSegmentedTabTypes.Events]: EventFilterTypes.Events,
  [HomeSegmentedTabTypes.Births]: EventFilterTypes.Births,
  [HomeSegmentedTabTypes.Deaths]: EventFilterTypes.Deaths,
  [HomeSegmentedTabTypes.Holidays]: EventFilterTypes.Holidays
}

type HomeSegmentedTabItemType = {
  title: string
  value: HomeSegmentedTabTypes
  filterKey: EventFilterTypes
}

export const homeSegmentedTabOptions: Record<HomeSegmentedTabTypes, HomeSegmentedTabItemType> = {
  [HomeSegmentedTabTypes.Featured]: {
    title: t('homeSegmentedTabs.featured'),
    value: HomeSegmentedTabTypes.Featured,
    filterKey: EventFilterTypes.Featured
  },
  [HomeSegmentedTabTypes.Events]: {
    title: t('homeSegmentedTabs.events'),
    value: HomeSegmentedTabTypes.Events,
    filterKey: EventFilterTypes.Events
  },
  [HomeSegmentedTabTypes.Births]: {
    title: t('homeSegmentedTabs.births'),
    value: HomeSegmentedTabTypes.Births,
    filterKey: EventFilterTypes.Births
  },
  [HomeSegmentedTabTypes.Deaths]: {
    title: t('homeSegmentedTabs.deaths'),
    value: HomeSegmentedTabTypes.Deaths,
    filterKey: EventFilterTypes.Deaths
  },
  [HomeSegmentedTabTypes.Holidays]: {
    title: t('homeSegmentedTabs.holidays'),
    value: HomeSegmentedTabTypes.Holidays,
    filterKey: EventFilterTypes.Holidays
  }
}
