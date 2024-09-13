import { createStyles } from 'theme'

export const useBottomTabBarBadgeStyles = createStyles(({ colors }) => ({
  badge: {
    position: 'absolute',
    transform: [{ translateX: 12 }, { translateY: 6 }]
  },
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    width: 18,
    height: 18,
    overflow: 'visible'
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500'
  }
}))
