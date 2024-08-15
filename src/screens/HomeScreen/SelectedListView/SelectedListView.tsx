import { Button, View, Text } from 'react-native'
import { Loader } from 'components/Loader'
import { Container } from 'components/Container'

export const SelectedListView = ({ data, error, isError, isFetching, refetch, handleViewAll }) => (
  <Loader error={error} isError={isError} isFetching={isFetching} refetch={refetch}>
    <Container>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>TEST</Text>
        <Button color='#f194ff' title='View all' onPress={handleViewAll} />
      </View>
    </Container>
  </Loader>
)
