import { SelectedType } from 'types/onThisDayAllToday'

export const useGetThumbnail = (data?: SelectedType) => {
  const thumbnail = data?.pages.map((item) => {
    if (item.thumbnail) {
      return item.thumbnail.source
    }
  })
  return thumbnail?.[0]
}
