import { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import Animated, { CurvedTransition, FadeInDown, FadeOutDown } from 'react-native-reanimated'

import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { BOTTOM_TABS_ANIMATION_DELAY, BOTTOM_TABS_ANIMATION_DURATION } from 'constants/bottomTabsAnimation'
import { useKeyboardInfo } from 'hooks/useKeyboardInfo'
import { BottomTabBarItemType } from 'types/bottomTabs'
import { BottomTabBarItem } from '../BottomTabBarItem'
import { useBottomTabBarStyles } from './BottomTabBar.styles'

type NavigationProps<T extends string> = {
  items: BottomTabBarItemType<T>[]
} & BottomTabBarProps

const NavigationComponent = <T extends string>({ items, navigation }: NavigationProps<T>) => {
  const styles = useBottomTabBarStyles()
  const { shown: isKeyboardShown } = useKeyboardInfo()

  const activeIndex = navigation.getState().index
  const activeRouteName = useMemo(() => {
    const activeTabRoute = navigation.getState().routeNames[activeIndex]
    return activeTabRoute
  }, [activeIndex, navigation])

  const isTabBarHidden = useMemo(
    () => !!items.find((item) => item.routeName === activeRouteName)?.isTabBarHidden,
    [activeRouteName, items]
  )

  const emitTabPress = useCallback(
    (routeName: string) => {
      const state = navigation.getState()
      const { key } = state.routes[state.index]

      if (routeName !== activeRouteName) {
        return
      }

      navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true
      })
    },
    [activeRouteName, navigation]
  )

  if (isTabBarHidden || isKeyboardShown) {
    return null
  }

  return (
    <View style={styles.container}>
      <Animated.View
        exiting={FadeOutDown.duration(BOTTOM_TABS_ANIMATION_DURATION)}
        entering={FadeInDown.duration(BOTTOM_TABS_ANIMATION_DURATION).delay(BOTTOM_TABS_ANIMATION_DELAY)}
        layout={CurvedTransition}
        style={[styles.navigationContainer]}
      >
        {items.map((item) => (
          <BottomTabBarItem
            key={item.id}
            item={item}
            isActive={activeRouteName === item.routeName}
            onPress={emitTabPress}
          />
        ))}
      </Animated.View>
    </View>
  )
}

export const BottomTabBar = memo(NavigationComponent)
