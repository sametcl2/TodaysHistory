import 'expo-dev-client'
import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import App from './src/App'
import { LogBox } from 'react-native'

const originalError = console.error;

console.error = (message, ...args) => {
  if (message.includes('Do not call Hooks inside useEffect')) {
    return;
  }
  originalError(message, ...args);
};


LogBox.ignoreLogs(['Do not call Hooks inside useEffect'])

registerRootComponent(App)
