import { useTranslation } from 'react-i18next'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { PropsWithChildren } from 'react'
import { Button } from '@rneui/themed'
import { Text } from 'react-native'
import { SerializedError } from '@reduxjs/toolkit'
import { Container } from 'components/Container'
import { Loading } from 'components/elements/Loading'

type LoaderProps = {
  error: FetchBaseQueryError | SerializedError | unknown
  isError: boolean
  isFetching: boolean
  refetch: () => void
}

export const Loader = ({ error, isError, isFetching, refetch, children }: PropsWithChildren<LoaderProps>) => {
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
