import { createStyles } from 'theme'

export const useBottomTabsFavoriteBadgeStyles = createStyles(({ colors }) => ({
  badge: {
    position: 'absolute',
    transform: [{ translateX: 18 }, { translateY: -8 }]
  },
  container: {
    backgroundColor: colors.teal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    width: 24,
    height: 24,
    overflow: 'visible'
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500'
  }
}))
