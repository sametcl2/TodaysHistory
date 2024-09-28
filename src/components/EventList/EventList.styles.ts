import { SCROLL_PADDING_BOTTOM } from 'constants/scroll'
import { createStyles } from 'theme'

export const useEventListStyles = createStyles(({ gaps }) => ({
  contentContainer: {
    paddingBottom: SCROLL_PADDING_BOTTOM,
    paddingTop: gaps.md
  }
}))
