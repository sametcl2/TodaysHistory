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
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  prevPlaceholder: {
    flex: 1
  },
  webView: {
    marginTop: -55
  }
}))
