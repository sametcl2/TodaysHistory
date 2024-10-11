import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

import { useTheme } from '@rneui/themed'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Typography } from 'components/elements/Typography'
import { OptionItemType } from 'types/option'
import { useSegmentedTabsSwitcherItemStyles } from './SegmentedTabsSwitcherItem.styles'

type SegmentedTabsSwitcherItemProps<T> = {
  index: number
  activeIndex: number
  contentWidth: number
  scrollX: SharedValue<number>
  numItems: number
  item: OptionItemType<T>
  onPress: (value: T, index: number) => void
}

export const SegmentedTabsSwitcherItem = <T,>({
  index,
  contentWidth,
  activeIndex,
  scrollX,
  numItems,
  item,
  onPress
}: SegmentedTabsSwitcherItemProps<T>) => {
  const { t } = useTranslation()
  const {
    theme: { colors }
  } = useTheme()

  const styles = useSegmentedTabsSwitcherItemStyles()

  const isActive = index === activeIndex

  const inputRange = useMemo(
    () =>
      Array(numItems)
        .fill(0)
        .map((_, index) => index * contentWidth) ?? [],
    [contentWidth, numItems]
  )

  const outputRange = useMemo(
    () =>
      Array(numItems)
        .fill(0)
        .map((_, idx) => (idx === index ? 10 : 0)) ?? [],
    [index, numItems]
  )

  const animatedMaskStyles = useAnimatedStyle(
    () => ({
      position: 'absolute',
      width: 16,
      height: 16,
      borderRadius: 8,
      left: 0,
      top: 10,
      backgroundColor: colors.teal,
      transform: [{ scale: interpolate(scrollX.value, inputRange, outputRange, Extrapolation.CLAMP) }]
    }),
    [isActive]
  )

  return (
    <TouchableWithoutFeedback onPress={() => onPress(item.value, index)} style={styles.item}>
      <Animated.View style={animatedMaskStyles} />
      <Typography color={'white'} variant='bodyLarge' style={styles.title}>
        {t(item.title)}
      </Typography>
    </TouchableWithoutFeedback>
  )
}
