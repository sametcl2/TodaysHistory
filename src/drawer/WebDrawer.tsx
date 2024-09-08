import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
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
  const {
    theme: { colors }
  } = useTheme()

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
      name='WebDrawer'
      onDismiss={handleDismiss}
      enableDismissOnClose
      snapPoints={['95%', '100%']}
      enableDynamicSizing={false}
      hasCloseButton={false}
      contentContainerStyle={styles.drawerContentContainer}
      additionalTopElement={
        <View style={styles.header}>
          {pageIndex !== 0 ? (
            <TouchableOpacity onPress={handlePrevPage} style={styles.button}>
              <MaterialIcons name='chevron-left' size={32} color={colors.white} />
              <Typography variant='bodySmall' color='textWhite' numberOfLines={2} ellipsizeMode='tail'>
                {pages[pageIndex - 1].title}
              </Typography>
            </TouchableOpacity>
          ) : (
            <View style={styles.prevPlaceholder} />
          )}
          {pageIndex < pages.length - 1 && (
            <TouchableOpacity onPress={handleNextPage} style={styles.button}>
              <Typography variant='bodySmall' color='textWhite'>
                {pages[pageIndex + 1].title}
              </Typography>
              <MaterialIcons name='chevron-right' size={32} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      }
    >
      <WebView source={{ uri: pages[pageIndex].url }} style={styles.webView} />
    </BottomSheetDrawer>
  )
}
