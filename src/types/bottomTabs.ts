import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

export type BottomTabBarItemType<T extends string> = {
  id: string
  title: string
  icon: JSX.Element
  routeName: T
  isTabBarHidden?: boolean
  badge?: JSX.Element
  params?: Record<string, unknown>
  onPress?: () => void
}

export type HomeBottomTabProps<T extends string> = {
  items: BottomTabBarItemType<T>[]
} & BottomTabBarProps

export type BottomTabItemSizesType = Record<
  string,
  {
    width: number
    left: number
  }
>
