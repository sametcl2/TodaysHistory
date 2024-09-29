import { createStyles } from 'theme'

export const useSegmentedTabsSwitcherItemStyles = createStyles(({ colors }) => ({
  item: {
    overflow: 'hidden',
    marginRight: 10,
    paddingHorizontal: 8,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary
  },
  title: {
    paddingBottom: 8,
    paddingTop: 4
  }
}))
