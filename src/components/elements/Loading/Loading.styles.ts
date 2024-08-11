import { createStyles } from 'theme'

export const useLoadingStyles = createStyles(({ gaps }) => ({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: gaps.xxlg
  }
}))
