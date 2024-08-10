import { ScaledSize } from 'react-native'
import { gaps } from 'theme'
import { typography } from 'theme/typography'
import { ColorsType } from 'types/color'

export * from '@rneui/themed'

declare module '@rneui/themed' {
  export interface Theme {
    colors: ColorsType
    typography: typeof typography
    gaps: typeof gaps
    dimensions: {
      window: ScaledSize
      screen: ScaledSize
    } & ScaledSize
    fontScale: number
  }
}
