import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Container } from 'components/Container'
import { Typography } from 'components/elements/Typography'
import { EventCard } from 'components/EventCard'
import { HomeScreenHeader } from 'components/HomeScreenHeader'
import { Loader } from 'components/Loader'
import { WebDrawer } from 'drawer/WebDrawer'
import { useLazyGetAllEventsTodayQuery } from 'services/onThisDay/getAllEventsToday'
import { useDispatch, useSelector } from 'store'
import { setCurrentPages } from 'store/data'
import { selectCurrentDate } from 'store/date'
import { PageType } from 'types/events'
import { HEIGHT } from 'utils/scale'

export const HomeScreen = () => {
  const [fetchAllEvents, { data: allTypesData, isError, error, isFetching }] = useLazyGetAllEventsTodayQuery()
  const { month, day } = useSelector(selectCurrentDate)

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

  return (
    <>
      <HomeScreenHeader scrollY={scrollY} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ height: HEIGHT }}
        showsVerticalScrollIndicator={false}
      >
        <Loader
          error={error}
          isError={isError}
          isFetching={isFetching}
          refetch={() => fetchAllEvents({ day: day!, month: month! })}
        >
          <Container>
            <Typography variant='h4Bold'>Selected Events</Typography>
            {allTypesData?.selected.map((item, index) => (
              <EventCard key={index} item={item} onPress={() => onPress(item.pages)} />
            ))}
          </Container>
        </Loader>
      </Animated.ScrollView>
      <WebDrawer ref={bottomSheetRef} />
    </>
  )
}
