import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import * as Haptics from 'expo-haptics'
import { FormActionButtons } from 'components/FormActionButtons'
import { BottomSheetDrawer } from 'components/BottomSheetDrawer'
import { Typography } from 'components/elements/Typography'
import { useConfirmationDrawerStyles } from './ConfirmationDrawer.styles'

type ConfirmationDrawerProps = {
  id: string
  isOpen: boolean
  title?: string
  subtitle?: string
  onConfirm: () => void
  onDecline: () => void
}

export const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
  id,
  isOpen,
  title,
  subtitle,
  onConfirm,
  onDecline
}) => {
  const { t } = useTranslation()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const styles = useConfirmationDrawerStyles()

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    } else {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [isOpen])

  return (
    <BottomSheetDrawer
      ref={bottomSheetModalRef}
      name={`ConfirmationDrawer-${id}`}
      onDismiss={onDecline}
      enableDismissOnClose
      contentContainerStyle={styles.contentContainer}
      headerStyle={styles.header}
      handleStyle={styles.header}
      additionalTopElement={
        <View style={styles.titleContainer}>
          <Typography variant='bodyBoldLarge' color='gray10' align='center'>
            {title ?? t('areYouSure')}
          </Typography>
        </View>
      }
    >
      {subtitle && (
        <Typography variant='body' color='errorFG' align='center' style={styles.subtitle}>
          {subtitle}
        </Typography>
      )}
      <FormActionButtons onConfirm={onConfirm} onDecline={onDecline} containerStyle={styles.actionsContainer} />
    </BottomSheetDrawer>
  )
}
