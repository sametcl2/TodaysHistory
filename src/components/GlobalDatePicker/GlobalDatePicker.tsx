import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import moment from 'moment'
import { Pressable, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@rneui/themed'
import { useState } from 'react'
import { DatePicker } from 'components/elements/DatePicker'
import { useDispatch, useSelector } from 'store'
import { selectCurrentDate, setCurrentDate } from 'store/date'
import { useGlobalDatePickerStyles } from './GlobalDatePicker.styles'

export const GlobalDatePicker = () => {
  const {
    theme: { colors }
  } = useTheme()

  const [showDatePicker, setShowDatePicker] = useState(false)

  const styles = useGlobalDatePickerStyles()

  const dispatch = useDispatch()

  const selectedDate = useSelector(selectCurrentDate)

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (_event.type === 'dismissed' || _event.type === 'set') {
      setShowDatePicker(false)
    }
    if (date) {
      dispatch(setCurrentDate({ currentDate: date }))
    }
  }

  const handlePrevious = () => {
    const previousDay = moment(selectedDate.currentDate).startOf('day').subtract(1, 'day')
    dispatch(setCurrentDate({ currentDate: previousDay.toDate() }))
  }

  const handleNext = () => {
    const nextDay = moment(selectedDate.currentDate).startOf('day').add(1, 'day')
    dispatch(setCurrentDate({ currentDate: nextDay.toDate() }))
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePrevious}>
        <MaterialIcons name='chevron-left' size={36} color={colors.teal} />
      </Pressable>
      <DatePicker
        value={selectedDate.currentDate}
        onChange={handleDateChange}
        themeVariant='dark'
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />

      <Pressable onPress={handleNext}>
        <MaterialIcons name='chevron-right' size={36} color={colors.teal} />
      </Pressable>
    </View>
  )
}
