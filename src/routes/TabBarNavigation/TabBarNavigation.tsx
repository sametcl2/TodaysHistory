import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PropsWithChildren } from 'react'
import { TouchableOpacity } from 'react-native'
import { colors } from 'constants/colors'
import { FavoritesScreen } from 'screens/FavoritesScreen'
import { HomeScreen } from 'screens/HomeScreen'
import { SettingScreen } from 'screens/SettingScreen'
import { useTabBarNavigationStyles } from './TabBarNavigation.styles'

export enum TabBarRoutes {
  Home = 'Home',
  Favorites = 'Favorite',
  Settings = 'Setting'
}

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ onPress, style, children }: PropsWithChildren<BottomTabBarButtonProps>) => (
  <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
    {children}
  </TouchableOpacity>
)

export const TabBarNavigation = () => {
  const styles = useTabBarNavigationStyles()

  return (
    <Tab.Navigator
      initialRouteName={TabBarRoutes.Home}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tab.Screen
        name={TabBarRoutes.Favorites}
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name='favorite' size={28} color={focused ? colors.teal : colors.grayLight} />
          )
        }}
      />
      <Tab.Screen
        name={TabBarRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} style={styles.customButton} />,
          tabBarIcon: () => <Feather name='home' size={30} color={colors.grayLighter} />
        }}
      />
      <Tab.Screen
        name={TabBarRoutes.Settings}
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
