import { useTranslation } from 'react-i18next'
import Animated from 'react-native-reanimated'
import { Typography } from 'components/elements/Typography'

export const Header = ({ textStyle }) => {
  const { t } = useTranslation()
  return (
    <Animated.View style={textStyle}>
      <Typography variant='bodyBoldLarge' color={'textWhite'}>
        {t('general.welcome')}
      </Typography>
    </Animated.View>
  )
}
