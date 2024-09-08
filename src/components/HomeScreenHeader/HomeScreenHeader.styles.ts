import { createStyles } from 'theme'

export const useHomeScreenHeaderStyle = createStyles(({ colors }) => ({
  header: {
    height: 300
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
}))
