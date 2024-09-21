import { Button } from '@rneui/themed'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from 'components/Container'
import { Loading } from 'components/elements/Loading'
import { Typography } from 'components/elements/Typography'
import { LoaderPropsTypes } from 'types/loader'
import { useLoaderStyles } from './Loader.styles'

type LoaderProps = PropsWithChildren<LoaderPropsTypes>

export const Loader: React.FC<LoaderProps> = ({ error, isError, isFetching, onRefetch, children }) => {
  const { t } = useTranslation()

  const styles = useLoaderStyles()

  const refetchQuery = () => {
    onRefetch()
  }

  if (isFetching) {
    return <Loading />
  }

  if (isError && error) {
    return (
      <Container>
        <Typography variant='bodyLarge' align='center' style={styles.errorMessage} color='primary'>
          {t('error')}
        </Typography>
        <Typography variant='body' align='center' style={styles.errorMessage}>
          {/* @ts-ignore */}
          {error.data?.title}
        </Typography>
        <Button containerStyle={styles.button} onPress={refetchQuery}>
          {t('refetch')}
        </Button>
      </Container>
    )
  }

  return children
}
