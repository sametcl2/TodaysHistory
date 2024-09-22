import { createStyles } from 'theme'

export const useFormActionButtonsStyles = createStyles(({ gaps }) => ({
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  confirm: {
    flex: 1,
    marginRight: gaps.lg
  },
  cancel: {
    flex: 1
  }
}))
