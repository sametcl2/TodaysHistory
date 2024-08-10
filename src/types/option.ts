export type OptionsType<T extends PropertyKey> = Record<T, OptionItemType<T>>

export type OptionItemType<T> = {
  title: string
  subtitle?: string
  value: T
  icon?: React.ReactNode
  description?: string
  color?: string
  disabled?: boolean
}
