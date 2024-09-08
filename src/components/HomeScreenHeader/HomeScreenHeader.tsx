import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@rneui/themed'
import { GlobalDatePicker } from 'components/GlobalDatePicker'
import { Typography } from 'components/elements/Typography'
import { useSelector } from 'store'
import { selectCurrentDate } from 'store/date'
import { useHomeScreenHeaderStyle } from './HomeScreenHeader.styles'

type HomeScreenHeaderProps = {
  scrollY: SharedValue<number>
}

export const HomeScreenHeader: React.FC<HomeScreenHeaderProps> = ({ scrollY }) => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()

  const { displayValue } = useSelector(selectCurrentDate)

  const styles = useHomeScreenHeaderStyle()

  const fadeOutStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 60], [1, 0], Extrapolation.CLAMP)
  }))

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 60], [200, 100], Extrapolation.CLAMP)
  }))

  const animatedDateStyle = useAnimatedStyle(() => ({
    color: interpolateColor(scrollY.value, [0, 60], ['rgb(255,255,255)', colors.primary]),
    fontSize: 24
  }))

  const dateTextStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(scrollY.value, [0, 60], [0, -45], Extrapolation.CLAMP)
      }
    ]
  }))

  return (
    <Animated.View style={headerStyle}>
      {/* <LinearGradient colors={['#3069bf', '#1e55a6', '#104491']} style={styles.gradient}> */}
      <LinearGradient colors={['#1e55a6', 'transparent']} style={styles.gradient}>
        <View style={styles.innerContainer}>
          <Animated.View style={fadeOutStyle}>
            <Typography variant='bodyBoldLarge' color={'textWhite'}>
              {t('general.welcome')}
            </Typography>
          </Animated.View>
          <View style={styles.textContainer}>
            <Animated.View style={[fadeOutStyle, styles.todayTitle]}>
              <Typography variant='h3Bold' color='textWhite'>
                Today is
              </Typography>
            </Animated.View>
            <Animated.View style={dateTextStyle}>
              <Typography variant='h3Bold' color='textWhite' isAnimated style={[animatedDateStyle]}>
                {displayValue}
              </Typography>
            </Animated.View>
          </View>
        </View>
        <Animated.View style={fadeOutStyle}>
          <GlobalDatePicker />
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  )
}
