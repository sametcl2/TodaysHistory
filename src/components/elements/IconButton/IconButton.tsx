import { ReactNode, forwardRef, memo } from 'react'
import { GestureResponderEvent, Pressable, PressableProps, View } from 'react-native'
import * as Haptics from 'expo-haptics'

type IconButtonProps = PressableProps & {
  iconSvg?: ReactNode
}

export const IconButtonComponent = forwardRef<View, IconButtonProps>(({ iconSvg, onPress, ...props }, ref) => {
  const handlePress = (event: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onPress?.(event)
  }

  return (
    <Pressable ref={ref} {...props} onPress={handlePress}>
      {iconSvg}
    </Pressable>
  )
})

export const IconButton = memo(IconButtonComponent)
