import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { View, Pressable, StyleProp, ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import * as Haptics from 'expo-haptics'
import { Typography } from 'components/elements/Typography'
import { ViewTypes } from 'constants/view'
import { useDispatch, useSelector } from 'store'
import { selectCurrentViewType, setCurrentViewType } from 'store/viewType'
import { saveToLocalStorage } from 'utils/storage'
import { LocalStorageKeys } from 'constants/storage'
import { MixpanelInstance } from 'analytics/mixpanel'
import { MixpanelEvents } from 'constants/mixpanel'
import { useViewTypeSelectorStyles } from './ViewTypeSelector.styles'

type ViewTypeSelectorProps = {
  title?: string
  hideViewType?: boolean
  containerStyle?: StyleProp<ViewStyle>
}

export const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({ containerStyle, title, hideViewType }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const viewType = useSelector(selectCurrentViewType)

  const {
    theme: { colors }
  } = useTheme()

  const styles = useViewTypeSelectorStyles()

  const handleViewTypeChange = async (selectedType: ViewTypes) => {
    await saveToLocalStorage(LocalStorageKeys.ViewType, selectedType)
    dispatch(setCurrentViewType(selectedType))
    Haptics.selectionAsync()
    MixpanelInstance.track(MixpanelEvents.ChangeViewType, { viewType: selectedType })
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Typography variant='h4Bold'>{title ?? t('screenTitles.selectedEvents')}</Typography> : <View />}
      {!hideViewType && (
        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => handleViewTypeChange(ViewTypes.Grid)}>
            <MaterialIcons
              name='grid-view'
              size={24}
              color={viewType === ViewTypes.Grid ? colors.teal : colors.grayDark}
            />
          </Pressable>
          <Pressable onPress={() => handleViewTypeChange(ViewTypes.List)} style={styles.buttonLast}>
            <MaterialIcons
              name='list-alt'
              size={24}
              color={viewType === ViewTypes.List ? colors.teal : colors.grayDark}
            />
          </Pressable>
        </View>
      )}
    </View>
  )
}
