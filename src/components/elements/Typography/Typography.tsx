import { memo, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

import { Text, TextProps } from '@rneui/themed'

import { StylingProps, useTypographyStyles } from './Typography.styles'

export type TypographyComponentProps = {
  isCheckboxDisabled?: boolean
  isAnimated?: boolean
} & StylingProps &
  TextProps

export const TypographyComponent: React.FC<TypographyComponentProps> = ({
  color,
  variant,
  children,
  isAnimated,
  ...props
}) => {
  const typographyComponentStyles = useTypographyStyles({ ...props, color, variant })

  const style = useMemo(
    () => StyleSheet.flatten([{ ...typographyComponentStyles.root }, props.style]),
    [props.style, typographyComponentStyles.root]
  )

  if (isAnimated) {
    return (
      <Animated.Text
        {...props}
        allowFontScaling={false}
        // Flattening to prevent undefines in snapshots
        style={style}
      >
        {children}
      </Animated.Text>
    )
  }

  return (
    <Text
      {...props}
      allowFontScaling={false}
      // Flattening to prevent undefines in snapshots
      style={style}
    >
      {children}
    </Text>
  )
}

export const Typography = memo(TypographyComponent)
