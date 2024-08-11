import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const navigate: typeof navigationRef.navigate = (...args) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(...args)
  }
}
