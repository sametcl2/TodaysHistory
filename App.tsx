import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabBarNavigation from 'routes/TabBarNavigation/TabBarNavigation';
import { navigationRef } from 'routes/RootNavigation';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { Loading } from 'components/elements/Loading/Loading';
import { ThemeProvider } from '@rneui/themed';
import { theme } from 'theme';
import { initI18N } from 'lang/i18n';

initI18N();

export default function App() {
  return (
    <SafeAreaProvider>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
              <TabBarNavigation />
            </NavigationContainer>
          </Provider>
        </ThemeProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}
