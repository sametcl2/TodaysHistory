import { Text } from 'react-native'
import { Container } from 'components/Container'
import { useGetAllTypesTodayQuery } from 'services/onthisday/onThisDayApi'
import { Loader } from 'components/Loader/Loader'

export const HomeScreen = () => {
  const { isError, error, isFetching, refetch } = useGetAllTypesTodayQuery({ day: '02', month: '04' })

  return (
    <Container>
      <Loader isError={isError} error={error} isFetching={isFetching} refetch={refetch}>
        <Text>Home!</Text>
      </Loader>
    </Container>
  )
}
