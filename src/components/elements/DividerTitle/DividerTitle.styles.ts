import { colors } from 'constants/colors'
import { createStyles } from 'theme'
import { AppColors } from 'types/color'

type UseDividerTitleStylesProps = {
  dividerColor: AppColors
  titleSize?: number
  size?: number
  thickness: number
  direction: 'vertical' | 'horizontal'
  hasTitle: boolean
}

export const useDividerTitleStyles = createStyles(
  ({ gaps }, { dividerColor, titleSize, size, thickness, direction, hasTitle }: UseDividerTitleStylesProps) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: size ?? 10
    },
    verticalContainer: {
      flexDirection: 'column',
      marginHorizontal: size
    },
    title: {
      textAlign: 'center',
      width: titleSize,
      flex: titleSize ? undefined : 1
    },
    titleVertical: {
      textAlign: 'center',
      height: titleSize ?? 'auto'
    },
    border: {
      flex: 1,
      height: thickness,
      backgroundColor: colors[dividerColor]
    },
    borderVertical: {
      flex: 1,
      alignSelf: 'center',
      height: size,
      width: thickness,
      backgroundColor: colors[dividerColor]
    },
    borderFirst: {
      marginRight: hasTitle && direction === 'horizontal' ? gaps.xs : undefined
    },
    borderLast: {
      marginLeft: hasTitle && direction === 'horizontal' ? gaps.xs : undefined
    }
  })
)
