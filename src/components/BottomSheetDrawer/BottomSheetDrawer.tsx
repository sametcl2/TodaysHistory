import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  BackHandler,
  LayoutChangeEvent,
  NativeEventSubscription,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetHandle,
  BottomSheetHandleProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import {
  BottomSheetScrollViewMethods,
  BottomSheetScrollViewProps
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types'
import { useFocusEffect } from '@react-navigation/native'

import { CloseButton } from 'components/elements/CloseButton'
import { useCloneRef } from 'hooks/useCloneRef'
import { useScrollViewPositionInfo } from 'hooks/useScrollViewPositionInfo'
import { useBottomSheetStyles } from './BottomSheetDrawer.styles'

export type BottomSheetDrawerMethods = import('@gorhom/bottom-sheet/lib/typescript/types').BottomSheetModalMethods

const BACKDROP_OPACITY = 0.7
const DEFAULT_BACKDROP_APPEARANCE_INDEX = 0
const DEFAULT_BACKDROP_DISAPPEARANCE_INDEX = -1

type BottomSheetProps = PropsWithChildren<
  BottomSheetModalProps & {
    contentContainerStyle?: StyleProp<ViewStyle>
    snapPoints?: BottomSheetModalProps['snapPoints']
    useDefaultSnapPoints?: boolean
    hasCloseButton?: boolean
    closeButtonSize?: number
    additionalTopElement?: ReactNode
    scrollable?: boolean
    showsVerticalScrollIndicator?: boolean
    hasHeader?: boolean
    headerStyle?: StyleProp<ViewStyle>
    handleStyle?: StyleProp<ViewStyle>
    additionalTopElementStyle?: StyleProp<ViewStyle>
    zIndex?: number
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
    initialSnapPoints?: Array<string | number>
    onScroll?: BottomSheetScrollViewProps['onScroll']
    bounces?: BottomSheetScrollViewProps['bounces']
    scrollEnabled?: BottomSheetScrollViewProps['scrollEnabled']
    showBasePaddings?: boolean
    onClose?: () => void
    onOpen?: () => void
    footerStyle?: ViewStyle
    isFullSize?: boolean
    scrollToTop?: boolean
    closeButtonRef?: RefObject<View>
  }
>

const BottomSheetDrawerComponent = forwardRef<BottomSheetDrawerMethods, BottomSheetProps>((props, ref) => {
  const {
    hasCloseButton = true,
    closeButtonSize,
    contentContainerStyle,
    handleStyle,
    additionalTopElement,
    additionalTopElementStyle,
    handleIndicatorStyle,
    children,
    scrollable,
    hasHeader = true,
    headerStyle,
    showsVerticalScrollIndicator = true,
    footerComponent,
    keyboardShouldPersistTaps,
    onScroll,
    bounces,
    scrollEnabled,
    showBasePaddings = true,
    footerStyle,
    onClose,
    onOpen,
    scrollToTop,
    isFullSize,
    closeButtonRef,
    enableDynamicSizing = true,
    ...restProps
  } = props

  // refs
  const bottomSheetRef = useCloneRef<BottomSheetDrawerMethods>(ref)
  const backHandler = useRef<NativeEventSubscription>()
  const footerRef = useRef<number>()

  // hooks
  const { top: safeTopArea, bottom: safeBottomArea } = useSafeAreaInsets()
  const styles = useBottomSheetStyles({ safeBottomArea, hasCloseButton })

  const { scrollViewRef, onScroll: onScrollViewPositionInfoScroll } = useScrollViewPositionInfo()

  // By default footer height is not included into automatic drawer height calculation
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (scrollToTop) {
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true
      })
    }
  }, [scrollToTop, scrollViewRef])

  const dismissModal = useCallback(async () => {
    setTimeout(() => {
      bottomSheetRef?.current?.dismiss()
    }, 0)
  }, [bottomSheetRef])

  // callbacks
  const handleClosePress = useCallback(async () => {
    await onClose?.()
    dismissModal()
  }, [dismissModal, onClose])

  const onChange = useCallback(
    (index: number) => {
      // 0: opened
      // -1: closed
      if (index === 0) {
        backHandler.current = BackHandler.addEventListener('hardwareBackPress', () => {
          bottomSheetRef.current?.dismiss()
          return true
        })
        onOpen?.()
      } else {
        backHandler.current?.remove()
      }
    },
    [bottomSheetRef, onOpen]
  )

  const handleFooterLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout
      footerRef.current = height
      if (enableDynamicSizing) {
        setFooterHeight(height)
      }
    },
    [enableDynamicSizing]
  )

  // styles
  const drawerContentContainerStyle = useMemo(
    () => [
      showBasePaddings && styles.drawerContentContainer,
      isFullSize && styles.fullSizeContainer,
      contentContainerStyle,
      footerComponent &&
        enableDynamicSizing && {
          paddingBottom: styles.drawerContentContainer.paddingBottom + footerHeight
        },
      !enableDynamicSizing ? styles.contentFullHeight : undefined
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contentContainerStyle, footerHeight]
  )

  const handleComponentStyle = useMemo(
    () => [styles.handleContainer, handleStyle],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleStyle]
  )

  const renderHeader = useCallback(
    () =>
      hasHeader ? (
        <View
          style={StyleSheet.flatten([
            styles.header,
            additionalTopElement || hasCloseButton ? styles.headerHeight : undefined,
            headerStyle
          ])}
        >
          {additionalTopElement && (
            <View style={StyleSheet.flatten([styles.additionalTopElement, additionalTopElementStyle])}>
              {additionalTopElement}
            </View>
          )}
          {hasCloseButton && (
            <View style={styles.closeButtonContainer}>
              <CloseButton
                ref={closeButtonRef}
                size={closeButtonSize}
                iconColor='grayLight'
                onPress={handleClosePress}
              />
            </View>
          )}
        </View>
      ) : null,

    [
      hasHeader,
      styles.header,
      styles.headerHeight,
      styles.additionalTopElement,
      styles.closeButtonContainer,
      additionalTopElement,
      hasCloseButton,
      headerStyle,
      additionalTopElementStyle,
      closeButtonRef,
      closeButtonSize,
      handleClosePress
    ]
  )

  const onDrawerScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (typeof onScroll === 'function') {
        onScroll(event)
      }
      onScrollViewPositionInfoScroll(event)
    },
    [onScroll, onScrollViewPositionInfoScroll]
  )

  // render
  const renderDrawerContent = useCallback(
    (content: React.ReactNode | ReactNode[]) => {
      if (scrollable) {
        return (
          <View>
            {renderHeader()}
            <BottomSheetScrollView
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              bounces={bounces}
              ref={scrollViewRef as unknown as RefObject<BottomSheetScrollViewMethods>}
              focusHook={useFocusEffect}
              contentContainerStyle={drawerContentContainerStyle}
              onScroll={onDrawerScroll}
              scrollEnabled={scrollEnabled}
            >
              {content}
            </BottomSheetScrollView>
          </View>
        )
      }

      return (
        <View>
          {renderHeader()}
          <BottomSheetView focusHook={useFocusEffect} style={drawerContentContainerStyle}>
            {content}
          </BottomSheetView>
        </View>
      )
    },
    [
      scrollable,
      renderHeader,
      drawerContentContainerStyle,
      scrollViewRef,
      keyboardShouldPersistTaps,
      showsVerticalScrollIndicator,
      bounces,
      onDrawerScroll,
      scrollEnabled
    ]
  )

  const renderBackdrop = useCallback(
    (backDropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backDropProps}
        opacity={BACKDROP_OPACITY}
        pressBehavior='close'
        appearsOnIndex={DEFAULT_BACKDROP_APPEARANCE_INDEX}
        disappearsOnIndex={DEFAULT_BACKDROP_DISAPPEARANCE_INDEX}
        onPress={handleClosePress}
      />
    ),
    [handleClosePress]
  )

  const renderHandleComponent = useCallback(
    (headerProps: BottomSheetHandleProps) => (
      <BottomSheetHandle
        {...headerProps}
        style={handleComponentStyle}
        indicatorStyle={[styles.handleIndicator, handleIndicatorStyle]}
      />
    ),
    [handleComponentStyle, styles.handleIndicator, handleIndicatorStyle]
  )

  const renderFooter = useCallback(
    (footerProps: BottomSheetFooterProps) =>
      footerComponent ? (
        <BottomSheetFooter {...footerProps}>
          <View onLayout={handleFooterLayout} style={StyleSheet.flatten([styles.footer, footerStyle])}>
            {footerComponent(footerProps)}
          </View>
        </BottomSheetFooter>
      ) : null,
    [footerComponent, footerStyle, styles.footer, handleFooterLayout]
  )

  return (
    <BottomSheetModal
      enableOverDrag={false}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
      ref={bottomSheetRef}
      onChange={onChange}
      topInset={safeTopArea}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleComponent={renderHandleComponent}
      enablePanDownToClose
      handleIndicatorStyle={styles.handleIndicator}
      stackBehavior='push'
      enableDynamicSizing={enableDynamicSizing}
      {...restProps}
      footerComponent={renderFooter}
    >
      {renderDrawerContent(children)}
    </BottomSheetModal>
  )
})

export const BottomSheetDrawer = memo(BottomSheetDrawerComponent)
