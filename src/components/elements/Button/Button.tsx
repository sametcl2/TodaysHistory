import { CSSProperties, Component, FC, memo } from 'react'
import { ActivityIndicator, Pressable, TouchableWithoutFeedback, View } from 'react-native'

import { ButtonProps, Button as RneuiButton } from '@rneui/themed'

import { ButtonTypes, CustomViewProps } from 'types/button'
import { useButtonStyles } from './Button.styles'

export type ButtonComponentProps = ButtonProps & {
  buttonType: ButtonTypes
  gutterBottom?: number
  isLongTitle?: boolean
  height?: CSSProperties['height']
}

export const ButtonComponent: FC<ButtonComponentProps> = ({
  buttonType,
  disabled,
  gutterBottom,
  icon,
  style = {},
  isLongTitle = false,
  height,
  loading,
  onPress,
  containerStyle = {},
  ...props
}) => {
  const styles = useButtonStyles({
    buttonType,
    disabled,
    gutterBottom,
    isLongTitle,
    height
  })

  const rippleEffect = { color: 'transparent', radius: 0, borderless: true }

  // ViewComponent doesn't accept functional component
  // eslint-disable-next-line react/prefer-stateless-function
  class CustomViewComponent extends Component<CustomViewProps> {
    render() {
      const { children, ...viewProps } = this.props
      return (
        <View {...viewProps} pointerEvents='none' style={[styles.containerWrapperStyle]}>
          <View style={[viewProps.style]}>{loading ? <ActivityIndicator animating={loading} /> : children}</View>
        </View>
      )
    }
  }

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable android_ripple={rippleEffect} onPress={onPress} disabled={disabled}>
        <RneuiButton
          buttonStyle={[styles.buttonStyle, style]}
          disabledStyle={styles.disabledStyle}
          iconContainerStyle={styles.iconStyle}
          disabled={disabled}
          icon={icon}
          TouchableComponent={TouchableWithoutFeedback}
          ViewComponent={CustomViewComponent}
          {...props}
        />
      </Pressable>
    </View>
  )
}

export const Button = memo(ButtonComponent)
