import { TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Typography } from 'components/elements/Typography'
import { useDatePickerStyle } from './DatePicker.styles'

export const DatePicker = ({ animatedStyle }) => {
  const styles = useDatePickerStyle()

  return (
    <TouchableOpacity>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.button}>
          <Typography variant='button' color='grayLight'>
            Search for another date
          </Typography>
        </View>
      </Animated.View>
    </TouchableOpacity>
  )
}
