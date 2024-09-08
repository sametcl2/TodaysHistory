import { createStyles } from 'theme'

export const useLoadingStyles = createStyles(({ gaps, colors }) => ({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: gaps.xxlg
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  ring: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: colors.teal,
    borderWidth: 10
  }
}))
