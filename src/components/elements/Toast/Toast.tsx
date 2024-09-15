import { View } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'

import { Icon, useTheme } from '@rneui/themed'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store'
import { hideToast, selectToast } from 'store/toast'
import { Typography } from '../Typography'
import { useToastStyles } from './Toast.styles'

export const Toast = () => {
  const toast = useSelector(selectToast)
  const dispatch = useDispatch()

  const {
    theme: { colors }
  } = useTheme()

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

  const handleTouch = () => {
    dispatch(hideToast())
  }

  if (!show) {
    return null
  }

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutUp} style={styles.commonToastStyle} onTouchStart={handleTouch}>
      <Icon name='exclamationcircleo' type='antdesign' size={32} color={colors.yellow} />
      <View style={styles.textContainer}>
        <Typography variant='bodyBold' style={styles.title} color={type === 'error' ? 'yellow' : undefined}>
          {title}
        </Typography>
        <Typography variant='body' color={type === 'error' ? 'white' : undefined}>
          {subTitle}{' '}
        </Typography>
      </View>
    </Animated.View>
  )
}
