import moment from 'moment'

export const getDate = () => {
  const date = moment()

  const day = date.format('D')
  const month = date.format('M')

  const formatted = date.format('MMMM Do')

  return { day, month, formatted }
}
