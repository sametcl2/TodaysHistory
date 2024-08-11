import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { useLoadingStyles } from './Loading.styles'

export const LoadingComponent: React.FC = () => {
  const styles = useLoadingStyles()
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  )
}

export const Loading = memo(LoadingComponent)
