import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { View, Pressable } from 'react-native'
import { Typography } from 'components/elements/Typography'

export enum ViewTypes {
  Grid = 'Grid',
  List = 'List'
}

type ViewTypeSelectorProps = {
  viewType: ViewTypes
  onChange: (selectedType: ViewTypes) => void
}

export const ViewTypeSelector: React.FC<ViewTypeSelectorProps> = ({ viewType, onChange }) => {
  const {
    theme: { colors }
  } = useTheme()

  const handleViewTypeChange = (selectedType: ViewTypes) => {
    onChange(selectedType)
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: -40, marginBottom: -20 }}>
      <Typography variant='h4Bold'>Selected Events</Typography>
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => handleViewTypeChange(ViewTypes.Grid)}>
          <MaterialIcons
            name='grid-view'
            size={24}
            color={viewType === ViewTypes.Grid ? colors.teal : colors.grayDark}
          />
        </Pressable>
        <Pressable onPress={() => handleViewTypeChange(ViewTypes.List)} style={{ marginLeft: 8 }}>
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
