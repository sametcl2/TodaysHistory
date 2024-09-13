import { createStyles } from 'theme'
import { isAndroid } from 'utils/platform'

export const useBottomTabBarStyles = createStyles(({ gaps, colors }) => ({
  container: {
    position: 'absolute',
    height: 80,
    bottom: 0,
    borderTopWidth: isAndroid ? 1 : undefined,
    borderTopColor: isAndroid ? colors.grayLighter : undefined,
    backgroundColor: colors.white,
    shadowColor: colors.grayLight,
    shadowOffset: {
      width: 0,
      height: -1
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 8
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: gaps.xlg,
    paddingHorizontal: gaps.lg
  }
}))
