import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Container } from 'components/Container'
import { EventList } from 'components/EventList'
import { HomeScreenHeader } from 'components/HomeScreenHeader'
import { Loader } from 'components/Loader'
import { SegmentedTabs } from 'components/SegmentedTabs/SegmentedTabs'
import { ViewTypeSelector } from 'components/ViewTypeSelector'
import { homeSegmentedTabOptions, HomeSegmentedTabTypes } from 'constants/homeSegmentedTabs'
import { WebDrawer } from 'drawers/WebDrawer'
import { useLazyGetAllEventsTodayQuery } from 'services/onThisDay/getAllEventsToday'
import { useDispatch, useSelector } from 'store'
import { setCurrentPages } from 'store/data'
import { selectCurrentDate } from 'store/date'
import { selectCurrentViewType } from 'store/viewType'
import { PageType } from 'types/events'
import { SegmentTabItemType } from 'types/segmentedTabs'
import { MixpanelInstance } from 'analytics/mixpanel'
import { MixpanelEvents } from 'constants/mixpanel'

export const HomeScreen = () => {
  const { t } = useTranslation()

  const [fetchAllEvents, { data: allTypesData, isError, error, isFetching }] = useLazyGetAllEventsTodayQuery()
  const { month, day } = useSelector(selectCurrentDate)

  const viewType = useSelector(selectCurrentViewType)

  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const [selectedTab, setSelectedTab] = useState(HomeSegmentedTabTypes.Featured)

  useEffect(() => {
    if (day && month) {
      fetchAllEvents({ day, month })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month])

  const dispatch = useDispatch()

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  const onPress = (pages: PageType[]) => {
    const urls: { url: string; title: string }[] = []
    pages.map((page) => urls.push({ url: page.content_urls.mobile.page, title: page.titles.normalized }))
    dispatch(setCurrentPages(urls))
    setIsDrawerVisible(true)
    MixpanelInstance.track(MixpanelEvents.ViewItem, { urls, pages, isFavorite: true })
  }

  const handleRefresh = () => {
    if (day && month) {
      setIsRefreshing(true)
      fetchAllEvents({ day, month })
        .unwrap()
        .finally(() => {
          setIsRefreshing(false)
        })
    }
  }

  const handleTabChange = (tab: HomeSegmentedTabTypes) => {
    setSelectedTab(tab)
  }

  const segmentedTabItems: SegmentTabItemType<HomeSegmentedTabTypes>[] = useMemo(
    () =>
      Object.values(homeSegmentedTabOptions).map((option) => ({
        title: t(option.title),
        value: option.value,
        content: (
          <EventList
            data={allTypesData}
            dataKey={option.filterKey}
            onPress={onPress}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
            scrollHandler={scrollHandler}
            viewType={viewType}
          />
        )
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTypesData, viewType]
  )

  return (
    <>
      <HomeScreenHeader scrollY={scrollY} />
      <Loader
        error={error}
        isError={isError}
        isFetching={isFetching}
        onRefetch={() => fetchAllEvents({ day: day!, month: month! })}
      >
        <Container>
          <ViewTypeSelector />
          <SegmentedTabs defaultActiveTab={selectedTab} items={segmentedTabItems} onChange={handleTabChange} />
        </Container>
      </Loader>
      {isDrawerVisible && <WebDrawer isOpen={isDrawerVisible} onDismiss={setIsDrawerVisible} />}
    </>
  )
}
