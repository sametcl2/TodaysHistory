import { Platform } from 'react-native'

export const BOTTOM_TABS_ANIMATION_DURATION = Platform.select({
  ios: 300,
  android: 200,
  default: 300
})

export const BOTTOM_TABS_ANIMATION_DELAY = Platform.select({
  ios: 300,
  android: 200,
  default: 300
})
