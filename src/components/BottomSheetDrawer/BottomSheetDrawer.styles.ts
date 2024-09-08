import { SCREEN_SIZE, STATUS_BAR_HEIGHT, WINDOW_HEIGHT } from 'constants/screen'
import { createStyles } from 'theme'
import { isAndroid } from 'utils/platform'

export const DRAWER_MARGIN = 22
export const DRAWER_HEADER_HEIGHT = 48
export const DRAWER_HEADER_HEIGHT_LARGE = 70
export const DRAWER_SMALL_HEADER_HEIGHT = 16
export const MAX_DRAWER_CONTENT_HEIGHT = WINDOW_HEIGHT - STATUS_BAR_HEIGHT - DRAWER_MARGIN

export const useBottomSheetStyles = createStyles(({ gaps, colors, fontScale }, props) => ({
  handleIndicator: {
    height: 3,
    opacity: 0.2,
    width: 64,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: colors.grayLighter
  },
  headerHeight: {
    height: fontScale === 1 ? DRAWER_HEADER_HEIGHT : DRAWER_HEADER_HEIGHT_LARGE
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: gaps.sm
  },
  background: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  handleContainer: {
    zIndex: 99999,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.primary
  },
  drawerContentContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: gaps[SCREEN_SIZE],
    paddingBottom: props.safeBottomArea + (props.hasCloseButton ? DRAWER_HEADER_HEIGHT : DRAWER_SMALL_HEADER_HEIGHT)
  },
  fullSizeContainer: {
    height: MAX_DRAWER_CONTENT_HEIGHT - (props.hasCloseButton ? DRAWER_HEADER_HEIGHT : DRAWER_SMALL_HEADER_HEIGHT)
  },
  contentFullHeight: {
    height: '100%'
  },
  additionalTopElement: {
    paddingLeft: 12,
    paddingRight: props.hasCloseButton ? 0 : 12,
    top: -12,
    flex: 1
  },
  closeButtonContainer: {
    top: -12,
    paddingRight: gaps[SCREEN_SIZE]
  },
  footer: {
    paddingHorizontal: gaps[SCREEN_SIZE],
    paddingTop: gaps.lg,
    paddingBottom: gaps.sm + props.safeBottomArea,
    backgroundColor: colors.white,
    elevation: 16,
    shadowColor: colors[isAndroid ? 'black' : 'grayLight'],
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  pressableBackdropContainer: {
    flex: 1
  }
}))
