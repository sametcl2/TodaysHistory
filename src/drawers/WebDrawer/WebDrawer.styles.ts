import { createStyles } from 'theme'

export const useWebDrawerStyles = createStyles(() => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap'
  },
  drawerContentContainer: {
    paddingHorizontal: 0
  },
  buttonPrev: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  buttonNext: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  prevPlaceholder: {
    flex: 1
  },
  webView: {
    marginTop: -55
  }
}))
