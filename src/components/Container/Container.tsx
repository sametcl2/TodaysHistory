import { StatusBar, StatusBarProps } from 'expo-status-bar'
import { PropsWithChildren, useMemo } from 'react'
import { ScrollView, ScrollViewProps, StyleProp, View, ViewStyle } from 'react-native'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { useTheme } from '@rneui/themed'
import { useContainerStyles } from './Container.styles'

type AppScreenContainerProps = {
  scrollable?: boolean
  safeAreaProps?: SafeAreaViewProps
  statusBarProps?: StatusBarProps
  scrollViewProps?: ScrollViewProps
  containerStyles?: StyleProp<ViewStyle>
  contentContainerStyles?: StyleProp<ViewStyle>
}

export const Container: React.FC<PropsWithChildren<AppScreenContainerProps>> = ({
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
        <ScrollView contentContainerStyle={[styles.scrollContent, contentContainerStyles]} {...scrollViewProps}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.container}>{children}</View>
      )

    return containerElement
  }, [contentContainerStyles, scrollViewProps, scrollable, styles.container, styles.scrollContent])

  return (
    <SafeAreaView style={[styles.container, containerStyles]} {...safeAreaProps}>
      <StatusBar translucent style='auto' {...statusBarProps} backgroundColor={colors.primary} />
      <ContainerComponent>{children}</ContainerComponent>
    </SafeAreaView>
  )
}
