import { createStyles } from 'theme'

export const useDatePickerStyle = createStyles(({ colors }) => ({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    backgroundColor: colors.backgroundLight,
    borderColor: colors.grayDark,
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
