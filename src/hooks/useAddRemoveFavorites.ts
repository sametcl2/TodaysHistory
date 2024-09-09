import { useState } from 'react'
import { LocalStorageKeys } from 'constants/storage'
import { useDispatch, useSelector } from 'store'
import { selectCurrentFavorites, setCurrentFavorites } from 'store/favorites'
import { FavoriteType } from 'types/favorite'
import { saveToLocalStorage } from 'utils/storage'

export const useAddRemoveFavorites = () => {
  const dispatch = useDispatch()

  const currentFavorites = useSelector(selectCurrentFavorites)

  const [isLoading, setIsLoading] = useState(false)

  const addToFavorites = async (favItem: FavoriteType) => {
    setIsLoading(true)
    try {
      const existingData = new Set(currentFavorites.map((item) => item.id))
      const newData = currentFavorites.filter((item) => !existingData.has(item.id))
      if (!newData.length) {
        const newFavorites = [...currentFavorites, favItem]
        await saveToLocalStorage(LocalStorageKeys.Favorites, newFavorites)
        dispatch(setCurrentFavorites(newFavorites))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromFavorites = async (favItem: FavoriteType) => {
    setIsLoading(true)
    try {
      const newData = currentFavorites.filter((item) => item.id !== favItem.id)
      if (newData.length) {
        await saveToLocalStorage(LocalStorageKeys.Favorites, newData)
        dispatch(setCurrentFavorites(newData))
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { addToFavorites, removeFromFavorites, isLoading }
}
