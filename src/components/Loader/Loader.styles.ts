import { createStyles } from 'theme'

export const useLoaderStyles = createStyles(({ gaps }) => ({
  errorMessage: {
    marginBottom: gaps.md
  },
  button: {
    borderRadius: 12
  }
}))
