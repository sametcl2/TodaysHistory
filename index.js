import 'expo-dev-client'
import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import App from './src/App'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Do not call Hooks inside useEffect'])

registerRootComponent(App)
