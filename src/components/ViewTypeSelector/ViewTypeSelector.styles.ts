import { createStyles } from 'theme'

export const useViewTypeSelectorStyles = createStyles(() => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -40,
    marginBottom: -20
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonLast: {
    marginLeft: 8
  }
}))
