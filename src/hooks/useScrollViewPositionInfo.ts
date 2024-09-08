import { useCallback, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

import type { ScrollView } from 'react-native'
import { ScrollView as ScrollViewGH } from 'react-native-gesture-handler'

type ScrollRef = ScrollView | ScrollViewGH

export const useScrollViewPositionInfo = (
  onCustomScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
) => {
  const scrollViewRef = useRef<ScrollRef>(null)
  const scrollViewAreaRef = useRef({ top: 0, height: 0 })

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { nativeEvent } = event
      onCustomScroll?.(event)
      const value = {
        top: nativeEvent.contentOffset.y,
        height: nativeEvent.layoutMeasurement.height
      }
      scrollViewAreaRef.current = value
    },
    [onCustomScroll]
  )

  return {
    scrollViewAreaRef,
    scrollViewRef,
    onScroll
  }
}
