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
import { useAppInitializerStyles } from './AppInitializer.styles'

export const AppInitializer = () => {
  const { i18n } = useTranslation()

  const styles = useAppInitializerStyles()

  const dispatch = useDispatch()

  const { isLoading: isFavoritesLoading } = useLoadFavorites()

  const [isLanguageLoading, setIsLanguageLoading] = useState(true)

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

  useEffect(() => {
    getSavedLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLanguageLoading || isFavoritesLoading) {
    return (
      <Container contentContainerStyles={styles.contentContainer}>
        <Loading />
      </Container>
    )
  }

  return <TabBarNavigation />
}
