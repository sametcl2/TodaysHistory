import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { View, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Typography } from 'components/elements/Typography'
import { useViewTypeSelectorStyles } from './ViewTypeSelector.styles'

export enum ViewTypes {
  Grid = 'Grid',
  List = 'List'
}

type ViewTypeSelectorProps = {
  viewType: ViewTypes
  onChange: (selectedType: ViewTypes) => void
  title?: string
}

export const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({ viewType, onChange, title }) => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()

  const styles = useViewTypeSelectorStyles()

  const handleViewTypeChange = (selectedType: ViewTypes) => {
    onChange(selectedType)
  }

  return (
    <View style={styles.container}>
      <Typography variant='h4Bold'>{title ?? t('screenTitles.selectedEvents')}</Typography>
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
    </View>
  )
}
