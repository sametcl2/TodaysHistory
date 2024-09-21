import { PropsWithChildren, ReactNode, useState } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import { ButtonProps } from '@rneui/base'
import { Button, ButtonComponentProps } from 'components/elements/Button'
import { ConfirmationDrawer } from 'drawers/ConfirmationDrawer'
import { ButtonTypes } from 'types/button'

type ConfirmButtonProps = PropsWithChildren<{
  id: string
  title?: string
  subtitle?: string
  onConfirm: () => void
  onDecline?: () => void
  ButtonComponent?: ReactNode
  style?: StyleProp<ViewStyle>
  buttonType?: ButtonTypes
  buttonColor?: ButtonProps['color']
  isDisabled?: boolean
  buttonProps?: ButtonComponentProps
}>

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  id,
  title,
  subtitle,
  ButtonComponent,
  onConfirm,
  onDecline,
  children,
  style,
  buttonType = 'primary',
  buttonColor = 'white',
  isDisabled,
  buttonProps
}) => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)

  const handleOpenConfirmation = () => {
    setIsConfirmVisible(true)
  }

  const handleConfirm = () => {
    setIsConfirmVisible(false)
    onConfirm()
  }

  const handleDecline = () => {
    setIsConfirmVisible(false)
    onDecline?.()
  }

  return (
    <>
      {ButtonComponent && (
        <Pressable disabled={isDisabled} onPress={handleOpenConfirmation} style={style} {...buttonProps}>
          {ButtonComponent}
        </Pressable>
      )}
      {!ButtonComponent && (
        <Button
          buttonType={buttonType}
          onPress={handleOpenConfirmation}
          disabled={isDisabled}
          style={style}
          color={buttonColor}
          {...buttonProps}
        >
          {children}
        </Button>
      )}
      <ConfirmationDrawer
        id={id}
        isOpen={isConfirmVisible}
        title={title}
        subtitle={subtitle}
        onConfirm={handleConfirm}
        onDecline={handleDecline}
      />
    </>
  )
}
