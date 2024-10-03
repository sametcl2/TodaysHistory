import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { Typography } from 'components/elements/Typography'
import { ToggleFavoriteButton } from 'components/ToggleFavoriteButton'
import { useGetThumbnail } from 'hooks/useGetThumbnail'
import { SelectedType } from 'types/onThisDayAllToday'
import { ShareButton } from 'components/ShareButton'
import { useEventCardStyles } from './EventCard.styles'

type EventCardProps = {
  item: SelectedType
  onPress: () => void
}

const fallbackImage = require('assets/images/no-image.jpg')

export const EventCard: React.FC<EventCardProps> = ({ item, onPress }) => {
  const uri = useGetThumbnail(item)

  const [isPressed, setIsPressed] = useState(false)

  const styles = useEventCardStyles()

  const handlePressItem = () => {
    onPress()
  }

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <TouchableOpacity
      style={[styles.card, { opacity: isPressed ? 0.4 : 1 }]}
      onPress={handlePressItem}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <ImageBackground source={uri ? { uri } : fallbackImage} resizeMode='cover' style={styles.image}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleContainerLeft}>
              <ToggleFavoriteButton style={styles.favButton} item={item} />
              <ShareButton item={item} />
            </View>
            <Typography color='secondary' variant='bodyBoldLarge'>
              {item.year}
            </Typography>
          </View>
          <Typography variant='bodyBoldLarge' color='textWhite' ellipsizeMode='tail' numberOfLines={3}>
            {item.text}
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
