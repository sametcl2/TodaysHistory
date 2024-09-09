import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { useMemo } from 'react'
import { ActivityIndicator, Pressable } from 'react-native'
import { useAddRemoveFavorites } from 'hooks/useAddRemoveFavorites'
import { useSelector } from 'store'
import { selectCurrentFavorites } from 'store/favorites'
import { FavoriteType } from 'types/favorite'
import { SelectedType } from 'types/onThisDayAllToday'
import { useGetThumbnail } from 'hooks/useGetThumbnail'
import { selectCurrentDate } from 'store/date'

type ToggleFavoriteButtonProps = {
  item?: SelectedType
  favoriteItem?: FavoriteType
}

export const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({ item, favoriteItem }) => {
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
        id: item?.pages[0].tid ?? '',
        thumbnail,
        text: item?.text ?? '',
        url: '',
        day: day!,
        month: month!,
        year: item?.year ?? 0
      },
    [day, favoriteItem, item, month, thumbnail]
  )

  const isInFavorites = useMemo(
    () => !!favoriteItem || currentFavorites.some((fav) => fav.id === item?.pages[0].tid),
    [currentFavorites, favoriteItem, item?.pages]
  )

  const handleAddToFavorites = () => {
    addToFavorites(favoriteItem ?? formattedForFavorite)
  }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(favoriteItem ?? formattedForFavorite)
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <Pressable onPress={isInFavorites ? handleRemoveFromFavorites : handleAddToFavorites}>
      <MaterialIcons name={isInFavorites ? 'favorite' : 'favorite-border'} size={24} color={colors.yellow} />
    </Pressable>
  )
}
