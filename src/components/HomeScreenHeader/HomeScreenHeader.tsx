import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from '@rneui/themed'
import { useState } from 'react'
import { GlobalDatePicker } from 'components/GlobalDatePicker'
import { Typography } from 'components/elements/Typography'
import { useSelector } from 'store'
import { selectCurrentDate } from 'store/date'
import { useHomeScreenHeaderStyles } from './HomeScreenHeader.styles'

type HomeScreenHeaderProps = {
  scrollY: SharedValue<number>
}

export const HomeScreenHeader: React.FC<HomeScreenHeaderProps> = ({ scrollY }) => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()
  const styles = useHomeScreenHeaderStyles()

  const [isVisible, setIsVisible] = useState(true)

  useAnimatedReaction(
    () => scrollY.value,
    (currentValue) => {
      if (currentValue > 60) {
        runOnJS(setIsVisible)(false)
      } else {
        runOnJS(setIsVisible)(true)
      }
    }
  )

  const { displayValue, todayDisplayValue } = useSelector(selectCurrentDate)

  const fadeOutStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(interpolate(isVisible ? 1 : 0, [0, 1], [0, 1]))
    }),
    [isVisible]
  )

  const headerStyle = useAnimatedStyle(
    () => ({
      height: withTiming(interpolate(isVisible ? 1 : 0, [0, 1], [100, 200]))
    }),
    [isVisible]
  )

  const animatedDateStyle = useAnimatedStyle(
    () => ({
      color: withTiming(interpolateColor(isVisible ? 1 : 0, [0, 1], [colors.primary, 'rgb(255,255,255)'])),
      fontSize: 24
    }),
    [isVisible]
  )

  const dateTextStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(interpolate(isVisible ? 1 : 0, [0, 1], [-45, 0]))
        }
      ]
    }),
    [isVisible]
  )

  return (
    <Animated.View style={headerStyle} onTouchStart={() => setIsVisible(true)}>
      <LinearGradient colors={['#1e55a6', 'transparent']} style={styles.gradient}>
        <View style={styles.innerContainer}>
          <Animated.View style={fadeOutStyle}>
            <Typography variant='bodyBoldLarge' color={'textWhite'}>
              {t('welcome')}
            </Typography>
          </Animated.View>
          <View style={styles.textContainer}>
            <Animated.View style={[fadeOutStyle, styles.todayTitle]}>
              <Typography variant='h3Bold' color='textWhite'>
                {t('todayPrefix')}
              </Typography>
            </Animated.View>
            <Animated.View style={dateTextStyle}>
              <Typography variant='h3Bold' color='textWhite' isAnimated style={[animatedDateStyle]}>
                {isVisible ? todayDisplayValue : displayValue}
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
