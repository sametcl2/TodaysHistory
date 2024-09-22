import { createStyles } from 'theme'

export const useHomeSegmentedTabsStyles = createStyles(() => ({
  container: {
    top: -40,
    marginBottom: -20
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  buttonLast: {
    marginLeft: 8
  },
  segmentedTabsContainer: {
    marginTop: 16
  },
  segmentedTab: {
    marginRight: 10,
    padding: 8,
    borderRadius: 10
  }
}))
