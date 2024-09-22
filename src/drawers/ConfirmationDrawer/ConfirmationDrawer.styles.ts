import { createStyles } from 'theme'

export const useConfirmationDrawerStyles = createStyles(({ gaps, colors }) => ({
  contentContainer: {
    paddingTop: gaps.md,
    backgroundColor: colors.white
  },
  actionsContainer: {
    paddingBottom: gaps.md
  },
  titleContainer: {
    alignContent: 'center',
    flexDirection: 'row'
  },
  subtitle: {
    marginBottom: gaps.lg
  },
  header: {
    backgroundColor: colors.teal
  }
}))
