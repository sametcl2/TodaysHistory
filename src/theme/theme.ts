import { createTheme } from '@rneui/themed'
import { Dimensions, PixelRatio } from 'react-native'
import { colors } from 'constants/colors'
import { gaps } from 'constants/gaps'
import { typography } from './typography'

export const theme = createTheme({
  colors,
  typography,
  gaps,
  dimensions: {
    ...Dimensions.get('window'),
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  },
  fontScale: Math.min(PixelRatio.getFontScale(), 2)
})
