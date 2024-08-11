import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@rneui/themed'
import { navigationRef } from 'routes/RootNavigation'
import { store } from 'store/store'
import { Loading } from 'components/elements/Loading/Loading'
import { theme } from 'theme'
import { initI18N } from 'lang/i18n'
import { AppInitializer } from 'components/AppInitiliazer'

initI18N()

export default function App() {
  return (
    <SafeAreaProvider>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
              <AppInitializer />
            </NavigationContainer>
          </Provider>
        </ThemeProvider>
      </Suspense>
    </SafeAreaProvider>
  )
}
