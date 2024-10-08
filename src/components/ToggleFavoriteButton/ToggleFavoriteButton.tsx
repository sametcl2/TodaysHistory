import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { useMemo } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import Animated, { CurvedTransition, StretchInY, StretchOutY, ZoomIn, ZoomOut } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { useGetThumbnail } from 'hooks/useGetThumbnail'
import { useAddRemoveFavorites } from 'hooks/useAddRemoveFavorites'
import { useSelector } from 'store'
import { selectCurrentDate } from 'store/date'
import { selectCurrentFavorites } from 'store/favorites'
import { FavoriteType } from 'types/favorite'
import { SelectedType } from 'types/onThisDayAllToday'

type ToggleFavoriteButtonProps = {
  item?: SelectedType
  favoriteItem?: FavoriteType
  style?: StyleProp<ViewStyle>
}

export const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({ item, favoriteItem, style }) => {
  const {
    theme: { colors }
  } = useTheme()
  const currentFavorites = useSelector(selectCurrentFavorites)

  const { day, month } = useSelector(selectCurrentDate)

  const thumbnail = useGetThumbnail(item)

  const { addToFavorites, removeFromFavorites, isLoading } = useAddRemoveFavorites()

  const formattedForFavorite: FavoriteType = useMemo(
    () =>
      favoriteItem ?? {
        id: item?.pages[0]?.tid ?? '',
        thumbnail,
        text: item?.text ?? '',
        url: '',
        day: day!,
        month: month!,
        year: item?.year ?? 0,
        pages: item?.pages
      },
    [day, favoriteItem, item, month, thumbnail]
  )

  const isInFavorites = useMemo(
    () => !!favoriteItem || currentFavorites.some((fav) => fav.id === item?.pages[0].tid),
    [currentFavorites, favoriteItem, item?.pages]
  )

  const handleAddToFavorites = () => {
    addToFavorites(favoriteItem ?? formattedForFavorite)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(favoriteItem ?? formattedForFavorite)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  return (
    <Pressable
      key={isLoading.toString()}
      style={style}
      onPress={isInFavorites ? handleRemoveFromFavorites : handleAddToFavorites}
    >
      {isInFavorites ? (
        <Animated.View entering={ZoomIn} exiting={ZoomOut} layout={CurvedTransition}>
          <MaterialIcons name={isInFavorites ? 'favorite' : 'favorite-border'} size={24} color={colors.yellow} />
        </Animated.View>
      ) : (
        <Animated.View entering={StretchInY} exiting={StretchOutY} layout={CurvedTransition}>
          <MaterialIcons name={isInFavorites ? 'favorite' : 'favorite-border'} size={24} color={colors.yellow} />
        </Animated.View>
      )}
    </Pressable>
  )
}
