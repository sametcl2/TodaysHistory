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

type ToggleFavoriteButtonProps = {
  item: SelectedType
}

export const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({ item }) => {
  const {
    theme: { colors }
  } = useTheme()
  const currentFavorites = useSelector(selectCurrentFavorites)

  const thumbnail = useGetThumbnail(item)

  const { addToFavorites, removeFromFavorites, isLoading } = useAddRemoveFavorites()

  const formattedForFavorite: FavoriteType = useMemo(
    () => ({
      id: item.pages[0].tid,
      thumbnail,
      text: item.text,
      url: ''
    }),
    [item.pages, item.text, thumbnail]
  )

  const isInFavorites = useMemo(
    () => currentFavorites.some((fav) => fav.id === item.pages[0].tid),
    [currentFavorites, item.pages]
  )

  const handleAddToFavorites = () => {
    addToFavorites(formattedForFavorite)
  }

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(formattedForFavorite)
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
