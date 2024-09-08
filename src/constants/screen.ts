import { Dimensions, StatusBar } from 'react-native'

export enum ScreenSizes {
  Small = 'sm',
  Large = 'lg'
}

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')
export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

const [IPHONE_6S_SCREEN_WIDTH] = [374, 667]

export const SCREEN_SIZE = SCREEN_WIDTH < IPHONE_6S_SCREEN_WIDTH ? ScreenSizes.Small : ScreenSizes.Large
