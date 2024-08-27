import { createStyles } from 'theme'

export const useEventCardStyle = createStyles(() => ({
  card: {
    height: 'auto',
    backgroundColor: '#0f2515',
    marginBottom: 20,
    borderRadius: 12
  },
  image: { height: 130, width: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  year: { position: 'absolute', right: 8, bottom: 8 }
}))
