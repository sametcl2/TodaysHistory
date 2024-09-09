import { useEffect, useState } from 'react'
import { LocalStorageKeys } from 'constants/storage'
import { useDispatch } from 'store'
import { setCurrentFavorites } from 'store/favorites'
import { FavoriteType } from 'types/favorite'
import { getValueFromLocalStorage } from 'utils/storage'

export const useLoadFavorites = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const getDataFromAsyncStorage = async () => {
    const favorites = await getValueFromLocalStorage<FavoriteType[]>(LocalStorageKeys.Favorites, [])
    dispatch(setCurrentFavorites(favorites))
    setIsLoading(false)
  }

  useEffect(() => {
    getDataFromAsyncStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { isLoading }
}
