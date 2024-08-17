import moment from 'moment'
import Animated from 'react-native-reanimated'
import { View } from 'react-native'
import { Typography } from 'components/elements/Typography'

export const Date = ({ staticTextStyle, dateTextStyle }) => {
  const todaysDate = moment().format('MMMM D')
  return (
    <View style={[{ flexDirection: 'row' }]}>
      <Animated.View style={[{ marginRight: 6 }, staticTextStyle]}>
        <Typography variant='h3Bold' color='textWhite'>
          Today is
        </Typography>
      </Animated.View>
      <Animated.View style={dateTextStyle}>
        <Typography variant='h3Bold' color='textWhite'>
          {todaysDate}
        </Typography>
      </Animated.View>
    </View>
  )
}
