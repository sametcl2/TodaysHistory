import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

type KeyboardInfo = {
  height: number
  shown: boolean
}

export const useKeyboardInfo = (): KeyboardInfo => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
    height: 0,
    shown: false
  })

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardInfo({
        height: e.endCoordinates?.height || 0,
        shown: true
      })
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardInfo({
        height: e.endCoordinates?.height || 0,
        shown: false
      })
    })

    const removeSubscription = () => {
      showSubscription.remove()
      hideSubscription.remove()
    }

    return removeSubscription
  }, [])

  return keyboardInfo
}
