import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { useLoadingStyles } from './Loading.styles'

type RingProps = {
  delay: number
}

const Ring: React.FC<RingProps> = ({ delay }) => {
  const styles = useLoadingStyles()

  const ring = useSharedValue(0)

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.8 - ring.value,
    transform: [
      {
        scale: interpolate(ring.value, [0, 1], [0, 4])
      }
    ]
  }))
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000
        }),
        -1,
        false
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Animated.View style={[styles.ring, ringStyle]} />
}

export const Loading = () => {
  const styles = useLoadingStyles()

  return (
    <View style={styles.container}>
      <Ring delay={0} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Ring delay={3000} />
    </View>
  )
}
