import { SafeAreaView, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useEffect, useRef, useState } from 'react'
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Container } from 'components/Container'
import { Header } from 'components/Header'
import { Date } from 'components/Date'
import { HEIGHT } from 'utils/scale'
import { Typography } from 'components/elements/Typography'
import { DatePicker } from 'components/DatePicker'
import { Loader } from 'components/Loader'
import { EventCard } from 'components/EventCard'
import { WebDrawer } from 'drawer/WebDrawer'
import { useDispatch } from 'store'
import { setCurrentPages } from 'store/data'
import { useGetTodaysDate } from 'hooks/useGetTodaysDate'
import { PageType } from 'types/events'
import { useGetAllEventsTodayQuery, useLazyGetAllEventsTodayQuery } from 'services/onThisDay/getAllEventsToday'
import { useHomeScreenStyle } from './HomeScreen.styles'

export const HomeScreen = () => {
  const { currentDay, currentMonth, formatted } = useGetTodaysDate()
  const [date, setDate] = useState({ day: currentDay, month: currentMonth })

  const [fetchAllEvents, { data: allTypesData, isError, error, isFetching }] = useLazyGetAllEventsTodayQuery()

  useEffect(() => {
    fetchAllEvents({ day: date.day, month: date.month })
  }, [date])

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const styles = useHomeScreenStyle()

  const dispatch = useDispatch()

  const scrollY = useSharedValue(0)

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 20], [HEIGHT / 4, HEIGHT / 10], Extrapolation.CLAMP)
  }))

  const fadeOutStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 15], [1, 0], Extrapolation.CLAMP)
  }))

  const dateTextStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(scrollY.value, [0, 15], [0, -45], Extrapolation.CLAMP)
      }
    ]
  }))

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
    <SafeAreaView>
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={{ alignItems: 'center' }}>
          <Header textStyle={fadeOutStyle} />
          <Date date={formatted} staticTextStyle={fadeOutStyle} dateTextStyle={dateTextStyle} />
        </View>
        {/* SET CUSTOM DATE, WIP */}
        <DatePicker animatedStyle={fadeOutStyle} setDate={() => setDate()} />
      </Animated.View>
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
          refetch={() => fetchAllEvents({ day: date.day, month: date.month })}
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
    </SafeAreaView>
  )
}
