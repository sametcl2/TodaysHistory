import { useTheme } from '@rneui/themed'
import { StatusBar, StatusBarProps } from 'expo-status-bar'
import { PropsWithChildren, useMemo } from 'react'
import { ScrollViewProps, StyleProp, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { useContainerStyles } from './Container.styles'

type AppScreenContainerProps = PropsWithChildren<{
  scrollable?: boolean
  safeAreaProps?: SafeAreaViewProps
  statusBarProps?: StatusBarProps
  scrollViewProps?: ScrollViewProps
  containerStyles?: StyleProp<ViewStyle>
  contentContainerStyles?: StyleProp<ViewStyle>
}>

export const Container: React.FC<AppScreenContainerProps> = ({
  scrollable,
  safeAreaProps,
  statusBarProps,
  scrollViewProps,
  containerStyles,
  contentContainerStyles,
  children
}) => {
  const styles = useContainerStyles()

  const {
    theme: { colors }
  } = useTheme()

  const ContainerComponent = useMemo(() => {
    const containerElement: React.FC<PropsWithChildren> = ({ children }) =>
      scrollable ? (
        <Animated.ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyles]}
          {...scrollViewProps}
        >
          {children}
        </Animated.ScrollView>
      ) : (
        <View style={styles.container}>{children}</View>
      )

    return containerElement
  }, [contentContainerStyles, scrollViewProps, scrollable, styles.container, styles.scrollContent])

  return (
    <SafeAreaView style={[styles.container, containerStyles]} {...safeAreaProps}>
      <StatusBar translucent style='light' {...statusBarProps} backgroundColor={colors.primary} />
      <ContainerComponent>{children}</ContainerComponent>
    </SafeAreaView>
  )
}
