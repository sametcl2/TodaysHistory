import { forwardRef, PropsWithChildren } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useTheme } from '@rneui/themed'

type HomeDrawerTypes = {
  snapPoints: string[]
}

export const HomeDrawer = forwardRef(({ children, snapPoints }: PropsWithChildren<HomeDrawerTypes>, ref) => {
  const {
    theme: { colors }
  } = useTheme()

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enableOverDrag={false}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      // eslint-disable-next-line react-native/no-inline-styles
      handleIndicatorStyle={{ display: 'none' }}
      backgroundStyle={{ backgroundColor: colors.drawer }}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  )
})
