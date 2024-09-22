import { OptionsType } from 'types/option'
import { t } from 'utils/common'

export enum HomeSegmentedTabTypes {
  Featured = 'selected',
  Events = 'events',
  Births = 'births',
  Deaths = 'deaths',
  Holidays = 'holidays'
}

export const homeSegmentedTabOptions: OptionsType<HomeSegmentedTabTypes> = {
  [HomeSegmentedTabTypes.Featured]: { title: t('homeSegmentedTabs.featured'), value: HomeSegmentedTabTypes.Featured },
  [HomeSegmentedTabTypes.Events]: { title: t('homeSegmentedTabs.events'), value: HomeSegmentedTabTypes.Events },
  [HomeSegmentedTabTypes.Births]: { title: t('homeSegmentedTabs.births'), value: HomeSegmentedTabTypes.Births },
  [HomeSegmentedTabTypes.Deaths]: { title: t('homeSegmentedTabs.deaths'), value: HomeSegmentedTabTypes.Deaths },
  [HomeSegmentedTabTypes.Holidays]: { title: t('homeSegmentedTabs.holidays'), value: HomeSegmentedTabTypes.Holidays }
}
