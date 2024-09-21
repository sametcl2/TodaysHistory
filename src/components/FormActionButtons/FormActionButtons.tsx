import { useTranslation } from 'react-i18next'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import { Button } from 'components/elements/Button'
import { useFormActionButtonsStyles } from './FormActionButtons.styles'

type FormActionButtonsProps = {
  confirmTitle?: string
  declineTitle?: string
  onConfirm: () => void
  onDecline: () => void
  confirmDisabled?: boolean
  declineDisabled?: boolean
  buttonHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  confirmStyle?: StyleProp<ViewStyle>
  declineStyle?: StyleProp<ViewStyle>
  buttonTextStyle?: StyleProp<TextStyle>
}

export const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  confirmTitle,
  declineTitle,
  onConfirm,
  onDecline,
  confirmDisabled,
  declineDisabled,
  buttonHeight = 48,
  containerStyle,
  confirmStyle,
  declineStyle,
  buttonTextStyle
}) => {
  const { t } = useTranslation()
  const styles = useFormActionButtonsStyles()

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={[styles.buttonsContainer, containerStyle]}>
      <Button
        buttonType='primary'
        disabled={confirmDisabled}
        height={buttonHeight}
        onPress={onConfirm}
        containerStyle={[styles.confirm, confirmStyle]}
        titleStyle={buttonTextStyle}
      >
        {confirmTitle ?? t('yes')}
      </Button>
      <Button
        buttonType='danger'
        disabled={declineDisabled}
        height={buttonHeight}
        onPress={onDecline}
        containerStyle={[styles.cancel, declineStyle]}
        titleStyle={buttonTextStyle}
      >
        {declineTitle ?? t('cancel')}
      </Button>
    </Animated.View>
  )
}
