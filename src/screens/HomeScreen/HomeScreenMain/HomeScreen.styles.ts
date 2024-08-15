import { createStyles } from 'theme'
import { HEIGHT } from 'utils/scale'

export const useHomeScreenStyle = createStyles(() => ({
  header: {
    height: HEIGHT / 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
