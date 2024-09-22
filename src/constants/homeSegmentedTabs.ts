import { OptionsType } from 'types/option'
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

export const homeSegmentedTabOptions: OptionsType<HomeSegmentedTabTypes> = {
  [HomeSegmentedTabTypes.Featured]: { title: t('homeSegmentedTabs.featured'), value: HomeSegmentedTabTypes.Featured },
  [HomeSegmentedTabTypes.Events]: { title: t('homeSegmentedTabs.events'), value: HomeSegmentedTabTypes.Events },
  [HomeSegmentedTabTypes.Births]: { title: t('homeSegmentedTabs.births'), value: HomeSegmentedTabTypes.Births },
  [HomeSegmentedTabTypes.Deaths]: { title: t('homeSegmentedTabs.deaths'), value: HomeSegmentedTabTypes.Deaths },
  [HomeSegmentedTabTypes.Holidays]: { title: t('homeSegmentedTabs.holidays'), value: HomeSegmentedTabTypes.Holidays }
}
