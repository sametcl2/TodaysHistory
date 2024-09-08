import DateTimePicker, { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker'
import { View } from 'react-native'
import { Typography } from '../Typography'

type DatePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  title?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({ title, value, ...rest }) => (
  <View>
    {!!title && <Typography variant='bodySemiBold'>{title}</Typography>}
    <DateTimePicker mode='date' value={value} {...rest} />
  </View>
)
