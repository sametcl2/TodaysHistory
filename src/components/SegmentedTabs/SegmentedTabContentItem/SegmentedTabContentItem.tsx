import { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  CurvedTransition,
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'

import { SegmentTabItemType } from 'types/segmentedTabs'
import { useSegmentedTabContentItemStyles } from './SegmentedTabContentItem.styles'

type SegmentedTabContentItemProps<T> = {
  tabs?: SegmentTabItemType<T>[]
  item: SegmentTabItemType<T>
  scrollX: SharedValue<number>
  contentWidth: number
  itemIndex: number
  style?: StyleProp<ViewStyle>
}

export const SegmentedTabContentItem = <T,>({
  tabs,
  item,
  scrollX,
  contentWidth,
  itemIndex
}: SegmentedTabContentItemProps<T>) => {
  const styles = useSegmentedTabContentItemStyles({ contentWidth })

  // Interpolation input range for FadeIn and FadeOut
  const inputRange = useMemo(() => tabs?.map((_, index) => index * contentWidth) ?? [], [contentWidth, tabs])

  // Interpolation output range for FadeIn and FadeOut
  const outputRange = useMemo(() => tabs?.map((_, index) => (itemIndex === index ? 1 : 0)) ?? [], [itemIndex, tabs])

  // Interpolate FadeIn and FadeOut based on the scroll value
  const animatedContentStyles = useAnimatedStyle(
    () => ({
      opacity: interpolate(scrollX.value, inputRange, outputRange, Extrapolation.CLAMP)
    }),
    [inputRange, scrollX, outputRange]
  )

  return (
    <Animated.View style={[styles.item, { ...animatedContentStyles }]} layout={CurvedTransition}>
      <Animated.View layout={CurvedTransition}>{item.content}</Animated.View>
    </Animated.View>
  )
}
