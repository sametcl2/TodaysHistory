import { useEffect, useMemo, useState } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { RefreshControl } from 'react-native-gesture-handler'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { Container } from 'components/Container'
import { EventCard } from 'components/EventCard'
import { HomeScreenHeader } from 'components/HomeScreenHeader'
import { Loader } from 'components/Loader'
import { WebDrawer } from 'drawers/WebDrawer'
import { useLazyGetAllEventsTodayQuery } from 'services/onThisDay/getAllEventsToday'
import { useDispatch, useSelector } from 'store'
import { setCurrentPages } from 'store/data'
import { selectCurrentDate } from 'store/date'
import { PageType } from 'types/events'
import { selectCurrentViewType } from 'store/viewType'
import { ViewTypes } from 'constants/view'
import { HomeSegmentedTabs } from 'components/HomeSegmentedTabs'
import { eventFilterTypes, HomeSegmentedTabTypes } from 'constants/homeSegmentedTabs'
import { useHomeScreenStyles } from './HomeScreen.styles'

export const HomeScreen = () => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()

  const [fetchAllEvents, { data: allTypesData, isError, error, isFetching }] = useLazyGetAllEventsTodayQuery()
  const { month, day } = useSelector(selectCurrentDate)

  const styles = useHomeScreenStyles()

  const viewType = useSelector(selectCurrentViewType)

  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)

  const [selectedTab, setSelectedTab] = useState(HomeSegmentedTabTypes.Featured)
  const [filterType, setFilterType] = useState(eventFilterTypes.Featured)

  const listData = useMemo(() => allTypesData?.[filterType], [allTypesData, filterType])

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
    setFilterType(eventFilterTypes[tab])
  }

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
          <HomeSegmentedTabs selectedTab={selectedTab} onTabChange={handleTabChange} />
          <Animated.FlatList
            key={viewType + selectedTab}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            style={styles.cardList}
            contentContainerStyle={styles.contentContainer}
            numColumns={viewType === ViewTypes.Grid ? 2 : 1}
            showsVerticalScrollIndicator={false}
            data={listData}
            initialNumToRender={16}
            renderItem={({ item, index }) => <EventCard key={index} item={item} onPress={() => onPress(item.pages)} />}
            refreshControl={
              <RefreshControl
                onRefresh={handleRefresh}
                refreshing={!!isRefreshing}
                size={36}
                tintColor={colors.teal}
                colors={[colors.teal, colors.primary]}
                title={t('pullToRefresh')}
                titleColor={colors.teal}
                progressBackgroundColor={colors.teal}
              />
            }
          />
        </Container>
      </Loader>
      {isDrawerVisible && <WebDrawer isOpen={isDrawerVisible} onDismiss={setIsDrawerVisible} />}
    </>
  )
}
