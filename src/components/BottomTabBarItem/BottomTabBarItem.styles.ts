import { createStyles } from 'theme'

export const useBottomTabBarItemStyles = createStyles(() => ({
  item: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconHidden: {
    height: 0,
    opacity: 0,
    transform: [
      {
        scale: 0
      }
    ]
  },
  badge: {
    position: 'absolute',
    transform: [
      {
        translateX: 12
      },
      {
        translateY: 6
      }
    ]
  }
}))
