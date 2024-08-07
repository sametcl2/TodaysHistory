import { isAndroid } from 'utils/platform';

export const typography = {
  font: {
    bold: isAndroid ? 'circular_std_bold' : 'CircularStd-Bold',
    book: isAndroid ? 'circular_std_book' : 'CircularStd-Book',
    medium: isAndroid ? 'circular_std_medium' : 'CircularStd-Medium'
  },
  size: {
    heading: {
      lg: 36,
      md: 32,
      sm: 24,
      xs: 20,
      xxs: 18
    },
    body: {
      xl: 17,
      md: 15,
      sm: 13
    },
    control: {
      md: 15,
      sm: 13,
      xxs: 11
    }
  },
  lineHeight: {
    heading: {
      lg: 40,
      md: 35,
      sm: 29,
      xs: 24,
      xxs: 22
    },
    body: {
      md: 18,
      sm: 16
    },
    control: {
      xl: 22,
      lg: 18,
      md: 16,
      sm: 13
    }
  }
};
