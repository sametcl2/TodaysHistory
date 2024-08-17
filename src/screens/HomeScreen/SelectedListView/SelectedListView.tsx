import { Button, View } from 'react-native'
import { useTheme } from '@rneui/themed'
import { Loader } from 'components/Loader'
import { Container } from 'components/Container'
import { GetOnThisDayAllTodayTypes } from 'types/onThisDayAllToday'
import { LoaderPropsTypes } from 'types/loader'
import { Typography } from 'components/elements/Typography'

type SelectedViewListTypes = {
  data: GetOnThisDayAllTodayTypes
  loaderProps: LoaderPropsTypes
  handleViewAll: () => void
}

export const SelectedListView = ({ data, loaderProps, handleViewAll }: SelectedViewListTypes) => {
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
