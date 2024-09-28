// import { RefreshControl } from 'react-native-gesture-handler'
import Animated, { ScrollHandlerProcessed } from 'react-native-reanimated'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { RefreshControl } from 'react-native'
import { EventFilterTypes } from 'constants/homeSegmentedTabs'
import { ViewTypes } from 'constants/view'
import { PageType } from 'types/events'
import { OnThisDayAllTodayType } from 'types/onThisDayAllToday'
import { EventCard } from 'components/EventCard'
import { useEventListStyles } from './EventList.styles'

type EventListProps = {
  viewType: ViewTypes
  data?: OnThisDayAllTodayType
  dataKey: EventFilterTypes
  onPress: (pages: PageType[]) => void
  isRefreshing?: boolean
  onRefresh: () => void
  scrollHandler: ScrollHandlerProcessed<Record<string, unknown>>
}

export const EventList: React.FC<EventListProps> = ({
  viewType,
  data,
  dataKey,
  onPress,
  isRefreshing,
  onRefresh,
  scrollHandler
}) => {
  const { t } = useTranslation()

  const {
    theme: { colors }
  } = useTheme()

  const styles = useEventListStyles()

  return (
    <Animated.FlatList
      key={viewType}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      contentContainerStyle={styles.contentContainer}
      numColumns={viewType === ViewTypes.Grid ? 2 : 1}
      showsVerticalScrollIndicator={false}
      data={data?.[dataKey]}
      initialNumToRender={16}
      renderItem={({ item, index }) => <EventCard key={index} item={item} onPress={() => onPress(item.pages)} />}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={!!isRefreshing}
          size={36}
          tintColor={colors.teal}
          colors={[colors.teal, colors.primary]}
          title={t('pullToRefresh')}
          titleColor={colors.teal}
          progressBackgroundColor={colors.teal}
        />
      }
    />
  )
}
