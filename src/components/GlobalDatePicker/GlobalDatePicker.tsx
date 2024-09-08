import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import moment from 'moment'
import { DatePicker } from 'components/elements/DatePicker'
import { useDispatch, useSelector } from 'store'
import { selectCurrentDate, setCurrentDate } from 'store/date'

export const GlobalDatePicker = () => {
  const dispatch = useDispatch()

  const selectedDate = useSelector(selectCurrentDate)

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      dispatch(setCurrentDate({ currentDate: date }))
    }
  }

  return (
    <DatePicker
      value={selectedDate.currentDate}
      onChange={handleDateChange}
      themeVariant='dark'
      locale={moment.locale()}
    />
  )
}
