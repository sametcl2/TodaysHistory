import { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { AppColors } from 'types/color'
import { useDividerTitleStyles } from './DividerTitle.styles'
import { Typography, TypographyComponentProps, Variant } from '../Typography'

type DividerTitleProps = {
  direction?: 'vertical' | 'horizontal'
  title?: string
  titleSize?: number
  size?: number
  thickness?: number
  titleProps?: Omit<TypographyComponentProps, 'variant'>
  variant?: Variant
  borderStyle?: StyleProp<ViewStyle>
  dividerColor?: AppColors
}

export const DividerTitle: FC<DividerTitleProps> = ({
  direction = 'horizontal',
  title,
  titleSize,
  size,
  thickness = 1,
  titleProps,
  variant = 'bodySmall',
  borderStyle,
  dividerColor = 'gray11'
}) => {
  const styles = useDividerTitleStyles({
    dividerColor,
    titleSize,
    size,
    thickness,
    direction,
    hasTitle: !!title?.length
  })

  const isHorizontal = direction === 'horizontal'

  return (
    <View style={[isHorizontal ? styles.container : styles.verticalContainer]}>
      <View style={[isHorizontal ? styles.border : styles.borderVertical, borderStyle, styles.borderFirst]} />
      {title && (
        <View>
          <Typography variant={variant} {...titleProps} style={[isHorizontal ? styles.title : styles.titleVertical]}>
            {title}
          </Typography>
        </View>
      )}
      <View style={[isHorizontal ? styles.border : styles.borderVertical, borderStyle, styles.borderLast]} />
    </View>
  )
}
