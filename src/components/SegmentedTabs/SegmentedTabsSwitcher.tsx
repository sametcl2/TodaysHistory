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
  contentWidth: number
  activeIndex: number
  data: OptionsType<T>
}

export const SegmentedTabsSwitcher = <T extends PropertyKey>({
  data,
  onTabChange,
  activeIndex,
  scrollX,
  contentWidth,
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

  const onScrollFailed = (info: { index: number }) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 200))
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true })
    })
  }

  return (
    <Animated.FlatList<OptionItemType<T>>
      ref={flatListRef}
      data={Object.values(data)}
      onScrollToIndexFailed={onScrollFailed}
      contentContainerStyle={[styles.segmentedTabsContainer, containerStyle]}
      renderItem={({ item, index }) => (
        <SegmentedTabsSwitcherItem<T>
          index={index}
          item={item}
          scrollX={scrollX}
          contentWidth={contentWidth}
          activeIndex={activeIndex}
          numItems={Object.values(data).length}
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
