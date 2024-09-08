import { ReactNode, forwardRef, memo } from 'react'
import { Pressable, PressableProps, View } from 'react-native'

type IconButtonProps = PressableProps & {
  iconSvg?: ReactNode
}

export const IconButtonComponent = forwardRef<View, IconButtonProps>(({ iconSvg, ...props }, ref) => (
  <Pressable ref={ref} {...props}>
    {iconSvg}
  </Pressable>
))

export const IconButton = memo(IconButtonComponent)
