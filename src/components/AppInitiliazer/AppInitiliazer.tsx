import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from 'components/Container'
import { Loading } from 'components/elements/Loading'
import { SupportedLanguages } from 'constants/language'
import { LocalStorageKeys } from 'constants/storage'
import { useLoadFavorites } from 'hooks/useLoadFavorites'
import { TabBarNavigation } from 'routes/TabBarNavigation'
import { useDispatch } from 'store'
import { setCurrentLanguage } from 'store/language'
import { getValueFromLocalStorage } from 'utils/storage'
import { ViewTypes } from 'constants/view'
import { setCurrentViewType } from 'store/viewType'
import { useAppInitializerStyles } from './AppInitializer.styles'

export const AppInitializer = () => {
  const { i18n } = useTranslation()

  const styles = useAppInitializerStyles()

  const dispatch = useDispatch()

  const { isLoading: isFavoritesLoading } = useLoadFavorites()

  const [isLanguageLoading, setIsLanguageLoading] = useState(true)
  const [isViewTypeLoading, setIsViewTypeLoading] = useState(true)

  const getSavedLanguage = async () => {
    try {
      const currentLanguage = await getValueFromLocalStorage<SupportedLanguages>(
        LocalStorageKeys.Language,
        SupportedLanguages.ENGLISH
      )
      i18n.changeLanguage(currentLanguage)
      dispatch(setCurrentLanguage(currentLanguage))
    } catch (error) {
      console.error('Error getting saved language LocalStorage')
    } finally {
      setIsLanguageLoading(false)
    }
  }

  const getSelectedViewType = async () => {
    try {
      const selectedVariant = await getValueFromLocalStorage<ViewTypes>(LocalStorageKeys.ViewType)
      if (selectedVariant) {
        dispatch(setCurrentViewType(selectedVariant))
      }
    } catch (error) {
      console.error('Error getting view type from LocalStorage')
    } finally {
      setIsViewTypeLoading(false)
    }
  }

  useEffect(() => {
    getSavedLanguage()
    getSelectedViewType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLanguageLoading || isFavoritesLoading || isViewTypeLoading) {
    return (
      <Container contentContainerStyles={styles.contentContainer}>
        <Loading />
      </Container>
    )
  }

  return <TabBarNavigation />
}
