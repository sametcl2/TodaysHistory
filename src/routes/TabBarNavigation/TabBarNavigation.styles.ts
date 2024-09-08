import { createStyles } from 'theme'

export const useTabBarNavigationStyles = createStyles(({ colors }) => ({
  customButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    top: -40,
    backgroundColor: colors.teal,
    shadowColor: colors.grayDark,
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  }
}))
