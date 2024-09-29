import { createStyles } from 'theme'

export const useViewTypeSelectorStyles = createStyles(() => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -50,
    marginBottom: -30
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonLast: {
    marginLeft: 8
  }
}))
