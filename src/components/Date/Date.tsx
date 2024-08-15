import moment from 'moment'
import { Typography } from 'components/elements/Typography'

export const Date = () => {
  const todaysDate = moment().format('LL')
  return (
    <Typography variant='h3Bold' color='textWhite'>
      Today is {todaysDate}
    </Typography>
  )
}
