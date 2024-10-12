import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import moment from 'moment'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Button } from 'components/elements/Button'
import { useDispatch, useSelector } from 'store'
import { selectCurrentDate, setCurrentDate } from 'store/date'
import { MixpanelInstance } from 'analytics/mixpanel'
import { MixpanelEvents } from 'constants/mixpanel'
import { useGlobalDatePickerStyles } from './GlobalDatePicker.styles'

export const GlobalDatePicker = () => {
  const {
    theme: { colors }
  } = useTheme()

  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const styles = useGlobalDatePickerStyles()

  const dispatch = useDispatch()

  const selectedDate = useSelector(selectCurrentDate)

  const handleDateChange = (date?: Date) => {
    if (date) {
      setIsPickerVisible(false)
      dispatch(setCurrentDate({ currentDate: date }))
      MixpanelInstance.track(MixpanelEvents.SelectDate, { date: date.toString() })
    }
  }

  const handleOpenDatePicker = () => {
    setIsPickerVisible(true)
  }

  const handlePrevious = () => {
    const previousDay = moment(selectedDate.currentDate).startOf('day').subtract(1, 'day')
    dispatch(setCurrentDate({ currentDate: previousDay.toDate() }))
    MixpanelInstance.track(MixpanelEvents.SelectDate, { date: previousDay.toString() })
  }

  const handleNext = () => {
    const nextDay = moment(selectedDate.currentDate).startOf('day').add(1, 'day')
    dispatch(setCurrentDate({ currentDate: nextDay.toDate() }))
    MixpanelInstance.track(MixpanelEvents.SelectDate, { date: nextDay.toString() })
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePrevious}>
        <MaterialIcons name='chevron-left' size={36} color={colors.teal} />
      </Pressable>
      <Button buttonType='primary' size='sm' onPress={handleOpenDatePicker} style={styles.button}>
        {selectedDate.displayValue}
      </Button>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode='date'
        date={selectedDate.currentDate}
        onConfirm={handleDateChange}
        onCancel={() => setIsPickerVisible(false)}
      />
      <Pressable onPress={handleNext}>
        <MaterialIcons name='chevron-right' size={36} color={colors.teal} />
      </Pressable>
    </View>
  )
}
