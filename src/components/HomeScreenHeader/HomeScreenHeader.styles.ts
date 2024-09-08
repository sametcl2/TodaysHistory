import { createStyles } from 'theme'

export const useHomeScreenHeaderStyle = createStyles(({ colors }) => ({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.primary,
    height: 300
  }
}))
