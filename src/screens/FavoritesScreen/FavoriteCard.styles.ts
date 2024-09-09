import { createStyles } from 'theme'

export const useFavoriteCardStyles = createStyles(({ colors, gaps }) => ({
  card: {
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 4,
    flex: 1,
    backgroundColor: colors.grayLight
  },
  image: {
    height: 220,
    width: '100%'
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    maxHeight: 120,
    backgroundColor: 'rgba(8, 51, 97, 0.8)',
    padding: 12
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  dateItem: {
    marginLeft: gaps.xxs
  }
}))
