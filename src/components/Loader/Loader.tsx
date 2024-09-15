import { useTranslation } from 'react-i18next'
import { PropsWithChildren } from 'react'
import { Button } from '@rneui/themed'
import { Container } from 'components/Container'
import { Loading } from 'components/elements/Loading'
import { LoaderPropsTypes } from 'types/loader'
import { Typography } from 'components/elements/Typography'
import { handleCreateToast } from 'utils/toast'
import { useLoaderStyles } from './Loader.styles'

type LoaderProps = PropsWithChildren<LoaderPropsTypes>

export const Loader: React.FC<LoaderProps> = ({ error, isError, isFetching, onRefetch, children }) => {
  const { t } = useTranslation()

  const styles = useLoaderStyles()

  const refetchQuery = () => {
    onRefetch()
    handleCreateToast({
      title: 'asdds',
      subTitle: 'asacas',
      show: true,
      type: 'error'
    })
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
