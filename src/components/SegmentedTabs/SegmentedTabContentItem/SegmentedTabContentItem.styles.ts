import { createStyles } from 'theme'

type ContentItemStylesProps = {
  contentWidth: number
}

export const useSegmentedTabContentItemStyles = createStyles((_, { contentWidth }: ContentItemStylesProps) => ({
  item: {
    justifyContent: 'center',
    width: contentWidth
  }
}))
