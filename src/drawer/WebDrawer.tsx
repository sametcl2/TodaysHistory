import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import { Typography } from 'components/elements/Typography'
import { BottomSheetDrawer } from 'components/BottomSheetDrawer'
import { useSelector } from 'store'
import { selectCurrentPages } from 'store/data'
import { useWebDrawerStyles } from './WebDrawer.styles'

type WebDrawerProps = {
  isOpen: boolean
  onDismiss: (isOpen: false) => void
}

export const WebDrawer: React.FC<WebDrawerProps> = ({ isOpen, onDismiss }) => {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const pages = useSelector(selectCurrentPages)
  const styles = useWebDrawerStyles()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present()
    }
  }, [isOpen])

  const handlePrevPage = () => {
    setPageIndex(pageIndex !== 0 ? pageIndex - 1 : pageIndex)
  }

  const handleNextPage = () => {
    setPageIndex(pageIndex < pages.length - 1 ? pageIndex + 1 : pageIndex)
  }

  const handleDismiss = () => {
    onDismiss(false)
  }

  return (
    <BottomSheetDrawer
      ref={bottomSheetModalRef}
      name={`WebDrawer-${pageIndex}`}
      onDismiss={handleDismiss}
      enableDismissOnClose
      snapPoints={['90%']}
      enableDynamicSizing={false}
      contentContainerStyle={styles.drawerContentContainer}
      additionalTopElement={
        <View style={styles.titleContainer}>
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
        </View>
      }
    >
      <WebView source={{ uri: pages[pageIndex].url }} style={styles.webView} />
    </BottomSheetDrawer>
  )
}
