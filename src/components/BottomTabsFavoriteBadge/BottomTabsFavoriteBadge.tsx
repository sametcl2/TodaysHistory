import { memo } from 'react'
import { View } from 'react-native'
import Animated, { CurvedTransition, FadeInUp, FadeOutDown } from 'react-native-reanimated'

import { Badge } from '@rneui/themed'

import { useSelector } from 'store'
import { selectCurrentFavorites } from 'store/favorites'
import { useBottomTabsFavoriteBadgeStyles } from './BottomTabsFavoriteBadge.styles'

const BADGE_ANIMATION_DURATION = 200

export const BottomTabsFavoriteBadgeComponent = () => {
  const styles = useBottomTabsFavoriteBadgeStyles()

  const currentFavorites = useSelector(selectCurrentFavorites)
  const count = currentFavorites.length

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

export const BottomTabsFavoriteBadge = memo(BottomTabsFavoriteBadgeComponent)
