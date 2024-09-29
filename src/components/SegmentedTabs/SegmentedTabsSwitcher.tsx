import Animated, { SharedValue, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { StyleProp, ViewStyle } from 'react-native'
import { useEffect, useRef } from 'react'
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
}

export const SegmentedTabsSwitcher = <T extends PropertyKey>({
  data,
  onTabChange,
  activeIndex,
  containerStyle
}: SegmentedTabsSwitcherProps<T>) => {
  const styles = useSegmentedTabsSwitcherStyles()

  const flatListRef = useRef<Animated.FlatList<unknown>>(null)
  const scrollValue = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x
    }
  })

  const handlePress = (selectedTab: T, index: number) => {
    onTabChange(selectedTab, index)
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: activeIndex, animated: true, viewPosition: 0.5 })
  }, [activeIndex])

  return (
    <Animated.FlatList<OptionItemType<T>>
      ref={flatListRef}
      data={Object.values(data)}
      contentContainerStyle={[styles.segmentedTabsContainer, containerStyle]}
      renderItem={({ item, index }) => (
        <SegmentedTabsSwitcherItem<T>
          index={index}
          item={item}
          isActive={index === activeIndex}
          onPress={handlePress}
        />
      )}
      onScroll={scrollHandler}
      decelerationRate='fast'
      keyboardShouldPersistTaps='handled'
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}
