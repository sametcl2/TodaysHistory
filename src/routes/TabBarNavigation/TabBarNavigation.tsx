import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import SettingScreen from 'screens/SettingScreen/SettingScreen';
import FavoriteScreen from 'screens/FavoriteScreen/FavoriteScreen';

export enum TabBarRoutes {
  Home = 'Home',
  Favorites = 'Favorite',
  Settings = 'Setting'
}

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={TabBarRoutes.Home}>
      <Tab.Screen name={TabBarRoutes.Home} component={HomeScreen} />
      <Tab.Screen name={TabBarRoutes.Settings} component={SettingScreen} />
      <Tab.Screen name={TabBarRoutes.Favorites} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
