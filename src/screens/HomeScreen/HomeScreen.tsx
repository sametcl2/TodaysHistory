import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Container } from 'components/Container'
import { EventCard } from 'components/EventCard'
import { HomeScreenHeader } from 'components/HomeScreenHeader'
import { Loader } from 'components/Loader'
import { WebDrawer } from 'drawer/WebDrawer'
import { useLazyGetAllEventsTodayQuery } from 'services/onThisDay/getAllEventsToday'
import { useDispatch, useSelector } from 'store'
import { setCurrentPages } from 'store/data'
import { selectCurrentDate } from 'store/date'
import { PageType } from 'types/events'
import { ViewTypes, ViewTypeSelector } from './ViewTypeSelector'
import { useHomeScreenStyles } from './HomeScreen.styles'

export const HomeScreen = () => {
  const [fetchAllEvents, { data: allTypesData, isError, error, isFetching }] = useLazyGetAllEventsTodayQuery()
  const { month, day } = useSelector(selectCurrentDate)

  const styles = useHomeScreenStyles()

  const [viewType, setViewType] = useState(ViewTypes.List)

  useEffect(() => {
    if (day && month) {
      fetchAllEvents({ day, month })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month])

  const bottomSheetRef = useRef<BottomSheetModal>(null)

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
    bottomSheetRef.current?.present()
  }

  const handleViewTypeChange = (selectedType: ViewTypes) => {
    setViewType(selectedType)
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
          <ViewTypeSelector viewType={viewType} onChange={handleViewTypeChange} />
          <Animated.FlatList
            key={viewType}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            style={styles.cardList}
            numColumns={viewType === ViewTypes.Grid ? 2 : 1}
            showsVerticalScrollIndicator={false}
            data={allTypesData?.selected}
            renderItem={({ item, index }) => <EventCard key={index} item={item} onPress={() => onPress(item.pages)} />}
          />
        </Container>
      </Loader>
      <WebDrawer ref={bottomSheetRef} />
    </>
  )
}
