import Animated, { CurvedTransition, ZoomIn, ZoomOut } from 'react-native-reanimated'
import Share from 'react-native-share'

import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from 'constants/colors'
import { SelectedType } from 'types/onThisDayAllToday'

type ShareButtonProps = {
  item?: SelectedType
}

export const ShareButton: React.FC<ShareButtonProps> = ({ item }) => {
  const onSharePress = async () => {
    const urls: string[] = []

    if (item) {
      item?.pages.map((item) => urls.push(item.content_urls.mobile.page))

      const shareOptions = {
        title: item?.pages[0].title,
        message: item?.pages[0].title,
        urls
      }

      try {
        await Share.open(shareOptions)
      } catch (error) {
        //
      }
    }
  }

  return (
    <Pressable onPress={onSharePress}>
      <Animated.View entering={ZoomIn} exiting={ZoomOut} layout={CurvedTransition}>
        <MaterialIcons name={'share'} size={24} color={colors.yellow} />
      </Animated.View>
    </Pressable>
  )
}
