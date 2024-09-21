import { createStyles } from 'theme'

export const useLoaderStyles = createStyles(({ gaps }) => ({
  errorMessage: {
    marginBottom: gaps.md,
    fontWeight: '500'
  },
  button: {
    borderRadius: 12
  }
}))
