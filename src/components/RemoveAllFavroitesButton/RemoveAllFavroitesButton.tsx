import { Icon, useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ConfirmButton } from 'components/ConfirmButton'
import { Typography } from 'components/elements/Typography'
import { LocalStorageKeys } from 'constants/storage'
import { useDispatch } from 'store'
import { clearCurrentFavorites } from 'store/favorites'
import { removeFromLocalStorage } from 'utils/storage'
import { useRemoveAllFavroitesButtonStyles } from './RemoveAllFavroitesButton.styles'

export const RemoveAllFavroitesButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const {
    theme: { colors }
  } = useTheme()

  const styles = useRemoveAllFavroitesButtonStyles()

  const handleConfirm = () => {
    removeFromLocalStorage(LocalStorageKeys.Favorites)
    dispatch(clearCurrentFavorites())
  }

  return (
    <ConfirmButton
      id='logout'
      onConfirm={handleConfirm}
      buttonType='secondary'
      buttonColor={colors.white}
      subtitle={t('removeAllFavoritesDescription')}
      ButtonComponent={
        <View style={styles.container}>
          <Typography variant='h4Bold' color='errorFG'>
            {t('removeAllFavorites')}
          </Typography>
          <Icon name='trash-o' type='font-awesome' color={colors.errorFG} />
        </View>
      }
    />
  )
}
