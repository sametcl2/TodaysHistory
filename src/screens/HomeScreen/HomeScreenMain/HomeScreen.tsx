import { SafeAreaView, View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { Container } from 'components/Container'
import { useGetAllTypesTodayQuery } from 'services/onthisday/onThisDayApi'
import { Header } from 'components/Header'
import { Date } from 'components/Date'
import { HEIGHT } from 'utils/scale'
import { Typography } from 'components/elements/Typography'
import { DatePicker } from 'components/DatePicker'
import { Loader } from 'components/Loader'
import { useHomeScreenStyle } from './HomeScreen.styles'

export const HomeScreen = () => {
  const {
    data: allTypesData,
    isError,
    error,
    isFetching,
    refetch
  } = useGetAllTypesTodayQuery({ day: '02', month: '04' })

  const styles = useHomeScreenStyle()

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

  return (
    <SafeAreaView>
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={{ alignItems: 'center' }}>
          <Header textStyle={fadeOutStyle} />
          <Date staticTextStyle={fadeOutStyle} dateTextStyle={dateTextStyle} />
        </View>
        <DatePicker animatedStyle={fadeOutStyle} />
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={{ height: HEIGHT }}
        showsVerticalScrollIndicator={false}
      >
        <Loader error={error} isError={isError} isFetching={isFetching} refetch={refetch}>
          <Container>
            {allTypesData?.selected.map((item, index) => (
              <View key={index} style={{ borderWidth: 1, marginBottom: 10 }}>
                <Typography variant='body'>{item.text}</Typography>
                <Typography variant='label'>{item.year}</Typography>
              </View>
            ))}
          </Container>
        </Loader>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

{
  /* {viewAll ? (
  <AllDataView />
) : (
  <SelectedListView
    data={allTypesData?.selected}
    loaderProps={{ isError, error, isFetching, refetch }}
    handleViewAll={handleViewAll}
  />
)} */
}
