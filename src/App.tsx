import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@rneui/themed'
import { navigationRef } from 'routes/RootNavigation'
import { store } from 'store/store'
import { theme } from 'theme'
import { initI18N } from 'lang/i18n'
import { AppInitializer } from 'components/AppInitiliazer'
import { Toast } from 'components/elements/Toast'

initI18N()

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <AppInitializer />
            <Toast />
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
