import moment from 'moment'

export const useGetTodaysDate = () => {
  const date = moment()

  const currentDay = date.format('D')
  const currentMonth = date.format('M')

  const formatted = date.format('MMMM Do')

  return { currentDay, currentMonth, formatted }
}
