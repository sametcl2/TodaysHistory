import { createStyles } from 'theme'

export const useFavoritesScreenHeaderStyles = createStyles(() => ({
  innerContainer: { alignItems: 'center' },
  textContainer: { flexDirection: 'row' },
  todayTitle: { marginRight: 6 },
  gradient: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
}))
