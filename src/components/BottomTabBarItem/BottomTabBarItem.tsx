import { cloneElement, memo, SVGProps } from 'react'
import { Pressable } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useTheme } from '@rneui/themed'
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { BottomTabBarItemType } from 'types/bottomTabs'
import { Typography } from 'components/elements/Typography'
import { useBottomTabBarItemStyles } from './BottomTabBarItem.styles'

export type BottomTabBarItemProps<T extends string> = {
  item: BottomTabBarItemType<T>
  isActive: boolean
  onPress: (routeName: string) => void
}

const BottomTabBarItemComponent = <T extends string>({ item, isActive, onPress }: BottomTabBarItemProps<T>) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const {
    theme: { colors }
  } = useTheme()

  const styles = useBottomTabBarItemStyles()

  const { routeName } = item

  const animatedStyles = useAnimatedStyle(
    () => ({
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [40, 40])),
      top: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, -36]))
    }),
    [isActive]
  )

  const animatedMaskStyles = useAnimatedStyle(
    () => ({
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 40,
      transform: [{ scale: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, 1])) }],
      top: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, -60])),
      backgroundColor: withTiming(interpolateColor(isActive ? 1 : 0, [0, 1], [colors.white, colors.teal])),
      shadowColor: isActive ? colors.grayDark : colors.transparent,
      shadowOffset: {
        width: 0,
        height: isActive ? 8 : 0
      },
      shadowOpacity: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, 0.5])),
      shadowRadius: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, 5])),
      elevation: withTiming(interpolate(isActive ? 1 : 0, [0, 1], [0, 5]))
    }),
    [isActive]
  )

  // Inject active and inactive colors to Icon
  const renderIcon = (IconElement?: JSX.Element) => {
    if (!IconElement) {
      return null
    }

    return cloneElement<SVGProps<SVGSVGElement>>(IconElement, {
      ...IconElement.props,
      color: isActive ? colors.white : colors.grayLight
    })
  }

  const handlePress = () => {
    item.onPress?.()
    // @ts-ignore
    navigation.navigate(routeName, { ...item.params })
    onPress(item.routeName)
  }

  return (
    <Pressable style={[styles.item]} onPress={handlePress}>
      <Animated.View style={animatedMaskStyles} />
      <Animated.View style={[animatedStyles]}>
        <Animated.View style={[styles.icon]}>{renderIcon(item.icon)}</Animated.View>
      </Animated.View>
      {isActive && (
        <Animated.View entering={FadeInUp} exiting={FadeOutUp} layout={CurvedTransition}>
          <Typography variant='bodyBold' color='teal'>
            {t(item.title)}
          </Typography>
        </Animated.View>
      )}
      {!isActive && item.badge}
    </Pressable>
  )
}

export const BottomTabBarItem = memo(BottomTabBarItemComponent)
