import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@rneui/themed'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { navigationRef } from 'routes/RootNavigation'
import { theme } from 'theme'
import { initI18N } from 'lang/i18n'
import { AppInitializer } from 'components/AppInitiliazer'
import { Toast } from 'components/elements/Toast'
import store from 'store'

initI18N()

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
              <BottomSheetModalProvider>
                <AppInitializer />
                <Toast />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
