import { createStyles } from 'theme'

export const useContainerStyles = createStyles(({ gaps }) => ({
  container: {
    flex: 1,
    paddingHorizontal: gaps.sm
  },
  scrollContent: {
    flex: 1
  }
}))
