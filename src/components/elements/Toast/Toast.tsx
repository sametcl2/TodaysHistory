import { Text } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store'
import { hideToast, selectToast } from 'store/toast'
import { useToastStyles } from './Toast.styles'

export const Toast = () => {
  const toast = useSelector(selectToast)
  const dispatch = useDispatch()

  const { title, subTitle, show, type } = toast

  const styles = useToastStyles({ type })

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        dispatch(hideToast())
      }, 2000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dispatch, show])

  if (!show) {
    return null
  }

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.commonToastStyle}>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
    </Animated.View>
  )
}
