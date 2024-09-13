import { memo } from 'react'
import { View } from 'react-native'
import Animated, { CurvedTransition, FadeInUp, FadeOutDown } from 'react-native-reanimated'

import { Badge } from '@rneui/themed'

import { useBottomTabBarBadgeStyles } from './BottomTabBarBadge.styles'

const BADGE_ANIMATION_DURATION = 200

export type BottomTabBarBadgeComponentProps = {
  count: number
}

export const BottomTabBarBadgeComponent: React.FC<BottomTabBarBadgeComponentProps> = ({ count }) => {
  const styles = useBottomTabBarBadgeStyles()

  const show = count > 0

  if (!show) {
    return null
  }

  return (
    <View style={styles.badge}>
      <Badge
        value={count}
        // @ts-ignore
        Component={() => (
          <View style={styles.container}>
            <Animated.Text
              key={count}
              style={styles.text}
              entering={FadeInUp.duration(BADGE_ANIMATION_DURATION)}
              exiting={FadeOutDown.duration(BADGE_ANIMATION_DURATION)}
              layout={CurvedTransition}
            >
              {count}
            </Animated.Text>
          </View>
        )}
      />
    </View>
  )
}

export const BottomTabBarBadge = memo(BottomTabBarBadgeComponent)
