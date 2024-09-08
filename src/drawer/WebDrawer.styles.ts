import { createStyles } from 'theme'

export const useWebDrawerStyles = createStyles(() => ({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  drawerContentContainer: {
    paddingHorizontal: 0
  },
  webView: {
    marginTop: -55
  }
}))
