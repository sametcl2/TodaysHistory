import { createStyles } from 'theme'

export const useHomeScreenStyle = createStyles(({ colors }) => ({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.background,
    height: 300
  },
  content: {
    backgroundColor: 'red'
  }
}))
