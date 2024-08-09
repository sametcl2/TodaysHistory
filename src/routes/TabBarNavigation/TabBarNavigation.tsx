import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import SettingScreen from 'screens/SettingScreen/SettingScreen';
import FavoriteScreen from 'screens/FavoriteScreen/FavoriteScreen';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from 'constants/colors';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTabBarNavigationStyles } from './TabBarNavigation.styles';
import { PropsWithChildren } from 'react';

export enum TabBarRoutes {
  Home = 'Home',
  Favorites = 'Favorite',
  Settings = 'Setting'
}

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress, style, children }: PropsWithChildren<BottomTabBarButtonProps>) => (
  <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
    {children}
  </TouchableOpacity>
);

const TabBarNavigation = () => {
  const styles = useTabBarNavigationStyles();

  return (
    <Tab.Navigator
      initialRouteName={TabBarRoutes.Home}
      screenOptions={{
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name={TabBarRoutes.Favorites}
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name='favorite' size={28} color={focused ? colors.primary : colors.grayLight} />
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
            <Feather name='settings' size={28} color={focused ? colors.primary : colors.grayLight} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
