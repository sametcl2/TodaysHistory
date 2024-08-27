import { useTranslation } from 'react-i18next'
import { PropsWithChildren } from 'react'
import { Button } from '@rneui/themed'
import { Text } from 'react-native'
import { Container } from 'components/Container'
import { Loading } from 'components/elements/Loading'
import { LoaderPropsTypes } from 'types/loader'

type LoaderProps = PropsWithChildren<LoaderPropsTypes>

export const Loader: React.FC<LoaderProps> = ({ error, isError, isFetching, refetch, children }) => {
  const { t } = useTranslation()

  const refetchQuery = () => {
    refetch()
  }

  if (isFetching) {
    return <Loading />
  }

  if (isError && error) {
    const errMsg = JSON.stringify(error)
    return (
      <Container>
        <Text>{errMsg}</Text>
        <Button onPress={refetchQuery}>{t('refetch')}</Button>
      </Container>
    )
  }

  return children
}
