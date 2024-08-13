import { Text } from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store'
import { hideToast, selectToast } from 'store/toast'
import { useToastStyles } from './Toast.styles'

export const Toast = () => {
  const toast = useSelector(selectToast)
  const dispatch = useDispatch()

  const { title, subTitle, showToast, type } = toast

  const styles = useToastStyles({ type })
  const positionY = useSharedValue(-100)

  useEffect(() => {
    if (showToast) {
      positionY.value = withSpring(positionY.value + 150)
      setTimeout(() => {
        dispatch(hideToast())
      }, 2000)
    }
  }, [dispatch, positionY, showToast])

  if (!showToast) {
    positionY.value = withSpring(-100)
  }

  return (
    <Animated.View style={[styles.commonToastStyle, { top: positionY }]}>
      <Text>{title}</Text>
      <Text>{subTitle}</Text>
    </Animated.View>
  )
}
