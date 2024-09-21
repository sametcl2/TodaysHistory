import { useMemo } from 'react'
import { DimensionValue } from 'react-native'
import { createStyles, gaps } from 'theme'

import { ButtonColorType, ButtonTypes } from 'types/button'

const backgroundColor: ButtonColorType = {
  primary: 'buttonPrimary',
  secondary: 'primary',
  secondaryNew: 'white',
  dark: 'black',
  secondaryDark: 'transparent',
  secondaryDarkSolid: 'white',
  danger: 'errorFG'
}

const titleColor: ButtonColorType = {
  primary: 'white',
  secondary: 'black',
  secondaryNew: 'black',
  dark: 'white',
  secondaryDark: 'white',
  secondaryDarkSolid: 'black',
  danger: 'white'
}

export interface ButtonStyleProps {
  buttonType: ButtonTypes
  disabled?: boolean
  gutterBottom?: number
  height?: DimensionValue
}

export const useButtonStyles = createStyles(
  ({ colors, typography, fontScale }, { disabled, buttonType, gutterBottom = 0, height }: ButtonStyleProps) => {
    const buttonTitleColor = useMemo(() => {
      if (disabled) {
        return colors.grayDark
      }

      return colors[titleColor[buttonType]]
    }, [buttonType, colors, disabled])

    return {
      titleStyle: {
        color: buttonTitleColor,
        textAlign: 'center'
      },
      longTitleStyle: {
        lineHeight: typography.lineHeight.control.sm * fontScale,
        fontSize: typography.size.control.xxs * fontScale,
        textAlign: 'center'
      },
      buttonStyle: {
        height: height ?? 55,
        minHeight: height ?? 0,
        backgroundColor: colors[backgroundColor[buttonType]],
        color: colors[titleColor[buttonType]],
        paddingHorizontal: gaps.lg,
        borderRadius: 16
      },
      containerStyle: {
        borderRadius: 0,
        marginBottom: gutterBottom
      },
      containerWrapperStyle: {
        borderRadius: 100
      },
      iconStyle: {
        marginRight: 8
      },
      disabledStyle: {
        backgroundColor: colors.gray13,
        borderColor: colors.gray2
      },
      pressableStyle: {
        backgroundColor: 'transparent',
        borderRadius: 100
      }
    }
  }
)
