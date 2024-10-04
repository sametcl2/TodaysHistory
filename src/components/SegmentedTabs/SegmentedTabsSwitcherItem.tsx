import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Typography } from 'components/elements/Typography'
import { OptionItemType } from 'types/option'
import { useSegmentedTabsSwitcherItemStyles } from './SegmentedTabsSwitcherItem.styles'

type SegmentedTabsSwitcherItemProps<T> = {
  index: number
  item: OptionItemType<T>
  onPress: (value: T, index: number) => void
}

export const SegmentedTabsSwitcherItem = <T,>({ index, item, onPress }: SegmentedTabsSwitcherItemProps<T>) => {
  const { t } = useTranslation()

  const styles = useSegmentedTabsSwitcherItemStyles()

  return (
    <TouchableWithoutFeedback key={index} onPress={() => onPress(item.value, index)} style={styles.item}>
      <Typography color={'white'} variant='bodyLarge' style={styles.title}>
        {t(item.title)}
      </Typography>
    </TouchableWithoutFeedback>
  )
}
