import { createTheme } from '@rneui/themed';
import { colors } from 'constants/colors';
import { gaps } from 'constants/gaps';
import { typography } from './typography';
import { Dimensions, PixelRatio } from 'react-native';

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
});
