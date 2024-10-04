import { createStyles } from 'theme'

export const useSegmentedTabsSwitcherStyles = createStyles(({ gaps, colors }) => ({
  segmentedTabsContainer: {
    paddingBottom: gaps.sm
  },

  animatedView: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.teal
  }
}))
