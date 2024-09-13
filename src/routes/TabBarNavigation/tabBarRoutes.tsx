import { Feather, MaterialIcons } from '@expo/vector-icons'
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabsFavoriteBadge } from 'components/BottomTabsFavoriteBadge'
import { BottomTabBarItemType } from 'types/bottomTabs'
import { t } from 'utils/common'

export enum TabBarNavigatorRoutes {
  Home = 'Home',
  Favorites = 'Favorites',
  Settings = 'Settings'
}

export type TabBarNavigationParamsList = {
  [TabBarNavigatorRoutes.Home]?: undefined
  [TabBarNavigatorRoutes.Favorites]: undefined
  [TabBarNavigatorRoutes.Settings]: undefined
}

export const bottomTabBarItemOptions: Record<TabBarNavigatorRoutes, BottomTabBarItemType<TabBarNavigatorRoutes>> = {
  [TabBarNavigatorRoutes.Favorites]: {
    id: TabBarNavigatorRoutes.Favorites,
    title: t('bottomTabs.analysis'),
    routeName: TabBarNavigatorRoutes.Favorites,
    icon: <MaterialIcons name='favorite' size={28} />,
    badge: <BottomTabsFavoriteBadge />
  },
  [TabBarNavigatorRoutes.Home]: {
    id: TabBarNavigatorRoutes.Home,
    title: t('bottomTabs.home'),
    routeName: TabBarNavigatorRoutes.Home,
    icon: <Feather name='home' size={30} />
  },
  [TabBarNavigatorRoutes.Settings]: {
    id: TabBarNavigatorRoutes.Settings,
    title: t('bottomTabs.statistics'),
    routeName: TabBarNavigatorRoutes.Settings,
    icon: <Feather name='settings' size={28} />
  }
}

export type TabBarStackNavigationType = NativeStackNavigationProp<TabBarNavigationParamsList>
export type TabBarStackNavigationParamsType = NavigatorScreenParams<TabBarNavigationParamsList>
export type TabBarStackRouteType<T extends TabBarNavigatorRoutes> = RouteProp<TabBarNavigationParamsList, T>
