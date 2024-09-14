import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useCallback } from 'react'
import { SettingsScreen } from 'screens/SettingsScreen'
import { BottomTabBar } from 'components/BottomTabBar'
import { FavoritesScreen } from 'screens/FavoritesScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { bottomTabBarItemOptions, TabBarNavigatorRoutes } from './tabBarRoutes'

const Tab = createBottomTabNavigator()

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false
}

export const TabBarNavigation = () => {
  const TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar items={Object.values(bottomTabBarItemOptions)} {...props} />,
    []
  )

  return (
    <Tab.Navigator tabBar={TabBar} initialRouteName={TabBarNavigatorRoutes.Home} screenOptions={screenOptions}>
      <Tab.Screen name={TabBarNavigatorRoutes.Favorites} component={FavoritesScreen} />
      <Tab.Screen name={TabBarNavigatorRoutes.Home} component={HomeScreen} />
      <Tab.Screen name={TabBarNavigatorRoutes.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  )
}
