import { SafeAreaView, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { Container } from 'components/Container'
import { useGetAllTypesTodayQuery } from 'services/onthisday/onThisDayApi'
import { Header } from 'components/Header'
import { Date } from 'components/Date'
import { HEIGHT } from 'utils/scale'
import { Typography } from 'components/elements/Typography'
import { DatePicker } from 'components/DatePicker'
import { Loader } from 'components/Loader'
import { Cart } from 'components/Cart'
import { WebDrawer } from 'drawer/WebDrawer'
import { useDispatch } from 'store'
import { setCurrentPages } from 'store/data'
import { Page } from 'types/onThisDayAllToday'
import { useHomeScreenStyle } from './HomeScreen.styles'
import { useGetTodaysDate } from './HomeScreen.hooks'

export const HomeScreen = () => {
  const { currentDay, currentMonth, formatted } = useGetTodaysDate()
  const [date, setDate] = useState({ day: currentDay, month: currentMonth })

  const {
    data: allTypesData,
    isError,
    error,
    isFetching,
    refetch
  } = useGetAllTypesTodayQuery({ day: date.day, month: date.month })

  const bottomSheetRef = useRef<BottomSheet>(null)
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

  const onPress = (pages: Page[]) => {
    const urls: { url: string; title: string }[] = []
    pages.map((page) => urls.push({ url: page.content_urls.mobile.page, title: page.titles.normalized }))
    dispatch(setCurrentPages(urls))
    bottomSheetRef.current?.expand()
  }

  return (
    <SafeAreaView>
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={{ alignItems: 'center' }}>
          <Header textStyle={fadeOutStyle} />
          <Date date={formatted} staticTextStyle={fadeOutStyle} dateTextStyle={dateTextStyle} />
        </View>
        <DatePicker animatedStyle={fadeOutStyle} setDate={() => setDate('')} /> {/* SET CUSTOM DATE, WIP */}
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ height: HEIGHT }}
        showsVerticalScrollIndicator={false}
      >
        <Loader error={error} isError={isError} isFetching={isFetching} refetch={refetch}>
          <Container>
            <Typography variant='h4Bold'>Selected Events</Typography>
            {allTypesData?.selected.map((item, index) => (
              <Cart key={index} item={item} onPress={() => onPress(item.pages)} />
            ))}
          </Container>
        </Loader>
      </Animated.ScrollView>
      <WebDrawer ref={bottomSheetRef} />
    </SafeAreaView>
  )
}
