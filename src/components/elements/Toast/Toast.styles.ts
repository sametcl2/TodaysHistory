import { createStyles } from 'theme'

export const useToastStyles = createStyles(({ colors, gaps }, { type }) => ({
  commonToastStyle: {
    height: 72,
    borderRadius: 8,
    margin: gaps.xs,
    padding: gaps.md,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'absolute',
    top: 90,
    right: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: type === 'success' ? colors.gray : colors.errorBG
  }
}))
