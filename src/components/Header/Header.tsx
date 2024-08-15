import { useTranslation } from 'react-i18next'
import { Typography } from 'components/elements/Typography'

export const Header = () => {
  const { t } = useTranslation()
  return (
    <Typography variant='bodyBoldLarge' color={'textWhite'}>
      {t('general.welcome')}
    </Typography>
  )
}
