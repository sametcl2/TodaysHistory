import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolation
} from 'react-native-reanimated'

import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as Haptics from 'expo-haptics'
import { OptionItemType, OptionsType } from 'types/option'
import { SegmentedTabsSwitcherItem } from './SegmentedTabsSwitcherItem'
import { useSegmentedTabsSwitcherStyles } from './SegmentedTabsSwitcher.styles'

type SegmentedTabsSwitcherProps<T extends PropertyKey> = {
  containerStyle?: StyleProp<ViewStyle>
  scrollX: SharedValue<number>
  onTabChange: (selectedTab: T, index: number) => void
  activeIndex: number
  data: OptionsType<T>
  contentWidth: number
}

export const SegmentedTabsSwitcher = <T extends PropertyKey>({
  data,
  onTabChange,
  activeIndex,
  containerStyle,
  scrollX,
  contentWidth
}: SegmentedTabsSwitcherProps<T>) => {
  const [componentWidth, setComponentWidth] = useState(0)
  const styles = useSegmentedTabsSwitcherStyles()

  const flatListRef = useRef<Animated.FlatList<unknown>>(null)
  const scrollValue = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x
    }
  })

  const handleLayout = (event: LayoutChangeEvent) => {
    setComponentWidth(event.nativeEvent.layout.width)
  }

  const handlePress = (selectedTab: T, index: number) => {
    onTabChange(selectedTab, index)
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: activeIndex, animated: true, viewPosition: 0.5 })
  }, [activeIndex])

  const maskWidth = useMemo(() => (data ? componentWidth / Object.values(data)?.length : 0), [componentWidth, data])

  const inputRange = useMemo(
    () => Object.values(data)?.map((_, index) => index * contentWidth) ?? [],
    [contentWidth, data]
  )

  const outputRange = useMemo(() => Object.values(data)?.map((_, index) => index * maskWidth) ?? [], [data, maskWidth])

  const animatedMaskStyles = useAnimatedStyle(
    () => ({
      left: interpolate(scrollX.value, inputRange, outputRange, Extrapolation.CLAMP)
    }),
    [contentWidth, scrollX, maskWidth]
  )

  return (
    <View onLayout={handleLayout}>
      <Animated.FlatList<OptionItemType<T>>
        ref={flatListRef}
        data={Object.values(data)}
        contentContainerStyle={[styles.segmentedTabsContainer, containerStyle]}
        renderItem={({ item, index }) => (
          <SegmentedTabsSwitcherItem<T> index={index} item={item} onPress={handlePress} />
        )}
        onScroll={scrollHandler}
        decelerationRate='fast'
        keyboardShouldPersistTaps='handled'
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Animated.View style={[styles.animatedView, { width: maskWidth }, { ...animatedMaskStyles }]} />
    </View>
  )
}
