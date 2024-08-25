export const useGetThumbnail = (data) => {
  if (data?.thumbnail) {
    return data.thumbnail.source
  }
  const { pages } = data
  const thumbnail = pages.map((item) => {
    if (item.thumbnail) {
      return item.thumbnail.source
    }
  })
  return thumbnail[0]
}
