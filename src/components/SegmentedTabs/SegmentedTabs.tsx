import { useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native'
import Animated, {
  CurvedTransition,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated'

import { OptionsType } from 'types/option'
import { isAndroid } from 'utils/platform'
import { SegmentTabItemType } from '../../types/segmentedTabs'
import { SegmentedTabContentItem } from './SegmentedTabContentItem'
import { useSegmentedTabsStyles } from './SegmentedTabs.styles'
import { SegmentedTabsSwitcher } from './SegmentedTabsSwitcher'

export type SegmentedTabsProps<T> = {
  items: SegmentTabItemType<T>[]
  defaultActiveTab?: string
  scrollDisabled?: boolean
  onChange?: (selectedTab: T, selectedIndex: number) => void
  switcherStyles?: StyleProp<ViewStyle>
}

export const SegmentedTabs = <T extends PropertyKey>({
  items,
  defaultActiveTab,
  scrollDisabled,
  onChange,
  switcherStyles
}: SegmentedTabsProps<T>) => {
  const styles = useSegmentedTabsStyles()

  const [contentWidth, setContentWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const switcherItems = useMemo(
    () =>
      items.reduce(
        (acc, item) => ({
          ...acc,
          [item.value]: {
            title: item.title,
            value: item.value
          }
        }),
        {} as OptionsType<T>
      ),
    [items]
  )

  useEffect(() => {
    if (!defaultActiveTab && items) {
      const selectedItem = items[activeIndex]
      onChange?.(selectedItem?.value, activeIndex)
    }
  }, [activeIndex, defaultActiveTab, items, onChange])

  // If defaultActiveKey, set activeIndex by defaultKey, scroll to defaultActiveTab
  useEffect(() => {
    const defaultIndex = items?.findIndex((item) => item.value === defaultActiveTab) ?? 0
    setActiveIndex(defaultIndex >= 0 ? defaultIndex : 0)
  }, [contentWidth, defaultActiveTab, items])

  const scrollValue = useSharedValue(0)
  const scrollRef = useAnimatedRef()
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x
    }
  })

  // React to active index change, scroll to related tab
  useDerivedValue(() => {
    scrollTo(scrollRef, contentWidth * activeIndex, 0, true)
  }, [activeIndex])

  // Calculate layout to set flatlist intervals and to calculate activeIndex
  const handleLayout = (event: LayoutChangeEvent) => {
    setContentWidth(event.nativeEvent.layout.width)
  }

  const handleChange = (selectedIndex: number) => {
    if (!items) {
      return
    }
    setActiveIndex(selectedIndex)
    const selectedItem = items[selectedIndex]
    onChange?.(selectedItem?.value, selectedIndex)
  }

  const handleSegmentedSwitcherPress = (_: T, index: number) => {
    setActiveIndex(index)
    if (isAndroid) {
      handleChange(index)
    }
  }

  // Set activeIndex on scroll end
  const scrollMomentumEndHandler = useAnimatedScrollHandler({
    onMomentumEnd: (event) => {
      const scrollDiff = event.contentOffset.x % contentWidth
      if (scrollDiff > contentWidth / 32) {
        const toIndex = Math.ceil(event.contentOffset.x / contentWidth)
        runOnJS(handleChange)(toIndex)
      } else {
        const toIndex = Math.floor(event.contentOffset.x / contentWidth)
        runOnJS(handleChange)(toIndex)
      }
    }
  })

  return (
    <View style={styles.tabs} onLayout={handleLayout}>
      <SegmentedTabsSwitcher<T>
        scrollX={scrollValue}
        activeIndex={activeIndex}
        data={switcherItems}
        onTabChange={handleSegmentedSwitcherPress}
        containerStyle={switcherStyles}
      />
      <Animated.FlatList
        // @ts-ignore
        ref={scrollRef}
        layout={CurvedTransition}
        snapToInterval={contentWidth}
        decelerationRate='fast'
        onMomentumScrollEnd={scrollMomentumEndHandler}
        onScroll={scrollHandler}
        scrollEnabled={!scrollDisabled}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyboardShouldPersistTaps='handled'
        scrollEventThrottle={16}
        data={items}
        renderItem={({ item, index }) => (
          <SegmentedTabContentItem
            key={item.value.toString()}
            scrollX={scrollValue}
            contentWidth={contentWidth}
            tabs={items}
            item={item}
            itemIndex={index}
          />
        )}
      />
    </View>
  )
}
