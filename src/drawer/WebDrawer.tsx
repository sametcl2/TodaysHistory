import { forwardRef, useCallback, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet'
import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'store'
import { currentPages } from 'store/data'
import { Typography } from 'components/elements/Typography'
import { useWebDrawerStyles } from './WebDrawer.styles'

export const WebDrawer = forwardRef<BottomSheetModal>((_, ref) => {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const pages = useSelector(currentPages)
  const styles = useWebDrawerStyles()

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={1} pressBehavior='close' appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  const handlePrevPage = () => {
    setPageIndex(pageIndex !== 0 ? pageIndex - 1 : pageIndex)
  }

  const handleNextPage = () => {
    setPageIndex(pageIndex < pages.length - 1 ? pageIndex + 1 : pageIndex)
  }

  return (
    <BottomSheetModal ref={ref} snapPoints={['85%', '100%']} backdropComponent={renderBackdrop} enablePanDownToClose>
      {pages.length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Typography variant='h2'>Related Readings</Typography>
            {pageIndex !== 0 && (
              <TouchableOpacity onPress={handlePrevPage}>
                <Typography variant='link'>Prev reading: {pages[pageIndex - 1].title}</Typography>
              </TouchableOpacity>
            )}
            {pageIndex < pages.length - 1 && (
              <TouchableOpacity onPress={handleNextPage}>
                <Typography variant='link'>Next reading: {pages[pageIndex + 1].title}</Typography>
              </TouchableOpacity>
            )}
          </View>
          <WebView source={{ uri: pages[pageIndex].url }} style={styles.webView} />
        </View>
      )}
    </BottomSheetModal>
  )
})
