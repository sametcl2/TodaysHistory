import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BottomTabBarButtonProps, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PropsWithChildren, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { colors } from 'constants/colors'
import { FavoritesScreen } from 'screens/FavoritesScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { SettingScreen } from 'screens/SettingScreen'
import { BottomTabBar } from 'components/BottomTabBar'
import { useTabBarNavigationStyles } from './TabBarNavigation.styles'
import { bottomTabBarItemOptions, TabBarNavigatorRoutes } from './tabBarRoutes'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ onPress, style, children }: PropsWithChildren<BottomTabBarButtonProps>) => (
  <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
    {children}
  </TouchableOpacity>
)

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false
}

export const TabBarNavigation = () => {
  const styles = useTabBarNavigationStyles()

  const TabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabBar items={Object.values(bottomTabBarItemOptions)} {...props} />,
    []
  )

  return (
    <Tab.Navigator tabBar={TabBar} initialRouteName={TabBarNavigatorRoutes.Home} screenOptions={screenOptions}>
      <Tab.Screen
        name={TabBarNavigatorRoutes.Favorites}
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name='favorite' size={28} color={focused ? colors.teal : colors.grayLight} />
          )
        }}
      />
      <Tab.Screen
        name={TabBarNavigatorRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} style={styles.customButton} />,
          tabBarIcon: () => <Feather name='home' size={30} color={colors.grayLighter} />
        }}
      />
      <Tab.Screen
        name={TabBarNavigatorRoutes.Settings}
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name='settings' size={28} color={focused ? colors.teal : colors.grayLight} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
