import { createStyles } from 'theme'

export const useLoadingStyles = createStyles(({ colors }) => ({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  ring: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.teal,
    borderWidth: 10
  }
}))
