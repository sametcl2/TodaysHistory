import { useTheme } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
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
import { Typography } from 'components/elements/Typography'
import { useSelector } from 'store'
import { selectCurrentDate } from 'store/date'
import { useFavoritesScreenHeaderStyles } from './AppScreenHeader.styles'

type AppScreenHeaderProps = {
  scrollY: SharedValue<number>
  title: string
  showDate?: boolean
}

export const AppScreenHeader: React.FC<AppScreenHeaderProps> = ({ title, scrollY, showDate = true }) => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()

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

  const { displayValue } = useSelector(selectCurrentDate)

  const styles = useFavoritesScreenHeaderStyles()

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
      {/* <LinearGradient colors={['#3069bf', '#1e55a6', '#104491']} style={styles.gradient}> */}
      <LinearGradient colors={['#1e55a6', 'transparent']} style={styles.gradient}>
        <View style={styles.innerContainer}>
          <Animated.View style={fadeOutStyle}>
            <Typography variant={showDate ? 'bodyBoldLarge' : 'h3Bold'} color={'textWhite'}>
              {title}
            </Typography>
          </Animated.View>
          {showDate && (
            <View style={styles.textContainer}>
              <Animated.View style={[fadeOutStyle, styles.todayTitle]}>
                <Typography variant='h3Bold' color='textWhite'>
                  {t('todayPrefix')}
                </Typography>
              </Animated.View>
              <Animated.View style={dateTextStyle}>
                <Typography variant='h3Bold' color='textWhite' isAnimated style={[animatedDateStyle]}>
                  {displayValue}
                </Typography>
              </Animated.View>
            </View>
          )}
        </View>
      </LinearGradient>
    </Animated.View>
  )
}
