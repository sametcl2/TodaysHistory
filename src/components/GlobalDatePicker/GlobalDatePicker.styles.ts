import { createStyles } from 'theme'

export const useGlobalDatePickerStyles = createStyles(({ colors }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 40,
    backgroundColor: colors.gray3
  }
}))
