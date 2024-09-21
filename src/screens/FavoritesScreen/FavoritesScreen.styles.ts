import { SCROLL_PADDING_BOTTOM } from 'constants/scroll'
import { createStyles } from 'theme'

export const useFavoritesScreenStyles = createStyles(() => ({
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM
  },
  cardList: {
    flex: 1
  }
}))
