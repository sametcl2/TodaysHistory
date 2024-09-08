import { createStyles } from 'theme'

export const useEventCardStyle = createStyles(() => ({
  card: {
    height: 220,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden'
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
  }
}))
