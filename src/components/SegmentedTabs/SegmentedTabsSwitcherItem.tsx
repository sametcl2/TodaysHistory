import Animated, { Easing, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@rneui/themed'

import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Typography } from 'components/elements/Typography'
import { OptionItemType } from 'types/option'
import { useSegmentedTabsSwitcherItemStyles } from './SegmentedTabsSwitcherItem.styles'

type SegmentedTabsSwitcherItemProps<T> = {
  index: number
  isActive: boolean
  item: OptionItemType<T>
  onPress: (value: T, index: number) => void
}

export const SegmentedTabsSwitcherItem = <T,>({
  index,
  isActive,
  item,
  onPress
}: SegmentedTabsSwitcherItemProps<T>) => {
  const { t } = useTranslation()
  const {
    theme: { colors }
  } = useTheme()

  const styles = useSegmentedTabsSwitcherItemStyles()

  const animatedMaskStyles = useAnimatedStyle(
    () => ({
      position: 'absolute',
      width: 16,
      height: 16,
      borderRadius: 8,
      left: 0,
      top: 10,
      backgroundColor: colors.teal,
      transform: [
        { scale: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, 10]), { duration: 300, easing: Easing.ease }) }
      ]
    }),
    [isActive]
  )

  return (
    <TouchableWithoutFeedback key={index} onPress={() => onPress(item.value, index)} style={styles.item}>
      <Animated.View style={animatedMaskStyles} />
      <Typography color={'white'} variant='bodyLarge' style={styles.title}>
        {t(item.title)}
      </Typography>
    </TouchableWithoutFeedback>
  )
}
