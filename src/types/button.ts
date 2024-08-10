import { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { ColorsType } from 'types/color'

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  SecondaryNew = 'secondaryNew',
  SecondaryDarkSolid = 'secondaryDarkSolid',
  Dark = 'dark',
  SecondaryDark = 'secondaryDark'
}

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'secondaryNew'
  | 'secondaryDarkSolid'
  | 'dark'
  | 'secondaryDark'
  | 'orange'

export type ButtonColorType = {
  [name in ButtonTypes]: keyof ColorsType
}

export interface CustomViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>
}
