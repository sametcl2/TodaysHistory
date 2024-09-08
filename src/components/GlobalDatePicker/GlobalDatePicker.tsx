import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import moment from 'moment'
import { DatePicker } from 'components/elements/DatePicker'
import { useDispatch, useSelector } from 'store'
import { selectCurrentDate, setCurrentDate } from 'store/date'

type GlobalDatePickerProps = {
  scrollY: SharedValue<number>
}

export const GlobalDatePicker: React.FC<GlobalDatePickerProps> = ({ scrollY }) => {
  const dispatch = useDispatch()

  const selectedDate = useSelector(selectCurrentDate)

  const fadeOutStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 15], [1, 0], Extrapolation.CLAMP)
  }))

  const handleDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      dispatch(setCurrentDate({ currentDate: date }))
    }
  }

  return (
    <Animated.View style={fadeOutStyle}>
      <DatePicker
        value={selectedDate.currentDate}
        onChange={handleDateChange}
        themeVariant='dark'
        locale={moment.locale()}
      />
    </Animated.View>
  )
}
