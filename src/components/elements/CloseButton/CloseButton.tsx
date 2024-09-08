import { forwardRef, memo } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { useTheme } from '@rneui/themed'
import { CloseIcon } from 'assets/svg'
import { AppColors } from 'types/color'
import { IconButton } from '../IconButton'

type CloseButtonProps = {
  size?: number
  onPress: () => void
  style?: StyleProp<ViewStyle>
  iconColor?: AppColors
}

export const CloseButton = memo(
  forwardRef<View, CloseButtonProps>(({ style, size, onPress, iconColor }, ref) => {
    const {
      theme: { colors }
    } = useTheme()

    const buttonSize = size
      ? {
          height: size,
          width: size
        }
      : {}

    return (
      <IconButton
        ref={ref}
        style={style}
        iconSvg={<CloseIcon {...buttonSize} color={colors[iconColor ?? 'grayLight']} />}
        onPress={onPress}
        hitSlop={10}
      />
    )
  })
)
