import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalDatePicker } from 'components/GlobalDatePicker'
import { Typography } from 'components/elements/Typography'
import { useSelector } from 'store'
import { selectCurrentDate } from 'store/date'
import { HEIGHT } from 'utils/scale'
import { useHomeScreenHeaderStyle } from './HomeScreenHeader.styles'

type HomeScreenHeaderProps = {
  scrollY: SharedValue<number>
}

export const HomeScreenHeader: React.FC<HomeScreenHeaderProps> = ({ scrollY }) => {
  const { t } = useTranslation()
  const { displayValue } = useSelector(selectCurrentDate)

  const styles = useHomeScreenHeaderStyle()

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 20], [HEIGHT / 4, HEIGHT / 8], Extrapolation.CLAMP)
  }))

  const dateTextStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(scrollY.value, [0, 15], [0, -45], Extrapolation.CLAMP)
      }
    ]
  }))

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <LinearGradient colors={['#3069bf', '#1e55a6', '#104491']} style={styles.gradient}>
        {/* <LinearGradient colors={['#1e55a6', 'transparent']} style={styles.gradient}> */}
        <View style={{ alignItems: 'center' }}>
          <Animated.View style={dateTextStyle}>
            <Typography variant='bodyBoldLarge' color={'textWhite'}>
              {t('general.welcome')}
            </Typography>
          </Animated.View>
          <View style={[{ flexDirection: 'row' }]}>
            <Animated.View style={[{ marginRight: 6 }]}>
              <Typography variant='h3Bold' color='textWhite'>
                Today is
              </Typography>
            </Animated.View>
            <Animated.View style={dateTextStyle}>
              <Typography variant='h3Bold' color='textWhite'>
                {displayValue}
              </Typography>
            </Animated.View>
          </View>
        </View>
        <GlobalDatePicker scrollY={scrollY} />
      </LinearGradient>
    </Animated.View>
  )
}
