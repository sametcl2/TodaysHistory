import DateTimePicker, { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker'
import { View } from 'react-native'
import { isIOS } from 'utils/platform'
import { Typography } from '../Typography'

type DatePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  title?: string
  showDatePicker: boolean
  setShowDatePicker: (showDatePicker: boolean) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ title, value, showDatePicker, setShowDatePicker, ...rest }) => (
  <View>
    {!!title && <Typography variant='bodySemiBold'>{title}</Typography>}
    {isIOS ? (
      <DateTimePicker display='default' mode='date' value={value} {...rest} />
    ) : (
      showDatePicker && (
        <DateTimePicker
          display='default'
          mode='date'
          value={value}
          onTouchStart={() => setShowDatePicker(true)}
          {...rest}
        />
      )
    )}
  </View>
)
