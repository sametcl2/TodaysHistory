import DateTimePicker, { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker'
import { Platform, View } from 'react-native'
import { Typography } from '../Typography'

type DatePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  title?: string
  showDatePicker: boolean
  setShowDatePicker: (showDatePicker: boolean) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ title, value, showDatePicker, setShowDatePicker, ...rest }) => (
  <View>
    {!!title && <Typography variant='bodySemiBold'>{title}</Typography>}
    {Platform.OS === 'ios' ? (
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
