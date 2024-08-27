import { Button, View } from 'react-native'
import { Typography } from 'components/elements/Typography'
import { Loader } from 'components/Loader'
import { LoaderPropsTypes } from 'types/loader'
import { OnThisDayAllTodayType } from 'types/onThisDayAllToday'

type SelectedListViewProps = {
  data: OnThisDayAllTodayType
  loaderProps: LoaderPropsTypes
  handleViewAll: () => void
}

export const SelectedListView: React.FC<SelectedListViewProps> = ({ data, loaderProps, handleViewAll }) => {
  const { error, isError, isFetching, refetch } = loaderProps

  return (
    <Loader error={error} isError={isError} isFetching={isFetching} refetch={refetch}>
      <View>
        <Typography variant='bodySemiBoldLarge' color={'textBlack'}>
          Selected Events for today
        </Typography>
        <Button color='#f194ff' title='View all' onPress={handleViewAll} />
      </View>
    </Loader>
  )
}
