import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { View, Pressable, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import Animated from 'react-native-reanimated'
import { useRef } from 'react'
import { Typography } from 'components/elements/Typography'
import { ViewTypes } from 'constants/view'
import { useDispatch, useSelector } from 'store'
import { selectCurrentViewType, setCurrentViewType } from 'store/viewType'
import { saveToLocalStorage } from 'utils/storage'
import { LocalStorageKeys } from 'constants/storage'
import { homeSegmentedTabOptions, HomeSegmentedTabTypes } from 'constants/homeSegmentedTabs'
import { useHomeSegmentedTabsStyles } from './HomeSegmentedTabs.styles'

type HomeSegmentedTabsProps = {
  containerStyle?: StyleProp<ViewStyle>
  onTabChange: (selectedTab: HomeSegmentedTabTypes) => void
  selectedTab: HomeSegmentedTabTypes
}

export const HomeSegmentedTabs: React.FC<HomeSegmentedTabsProps> = ({ containerStyle, onTabChange, selectedTab }) => {
  const { t } = useTranslation()
  const {
    theme: { colors }
  } = useTheme()

  const dispatch = useDispatch()

  const flatListRef = useRef<Animated.FlatList<unknown>>(null)

  const viewType = useSelector(selectCurrentViewType)

  const styles = useHomeSegmentedTabsStyles()

  const handleViewTypeChange = async (selectedType: ViewTypes) => {
    await saveToLocalStorage(LocalStorageKeys.ViewType, selectedType)
    dispatch(setCurrentViewType(selectedType))
  }

  const handlePress = (selectedTab: HomeSegmentedTabTypes, index: number) => {
    onTabChange(selectedTab)
    flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
  }

  return (
    <View style={[styles.container, containerStyle]}>
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
      <Animated.FlatList
        ref={flatListRef}
        data={Object.values(homeSegmentedTabOptions)}
        contentContainerStyle={styles.segmentedTabsContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(item.value, index)}
            style={[
              styles.segmentedTab,
              { backgroundColor: item.value === selectedTab ? colors.teal : colors.primary }
            ]}
          >
            <Typography color={'white'} variant='bodyLarge'>
              {t(item.title)}
            </Typography>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  )
}
