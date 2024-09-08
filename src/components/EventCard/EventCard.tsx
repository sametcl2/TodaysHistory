import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ImageBackground, Pressable, TouchableOpacity, View } from 'react-native'
import { Typography } from 'components/elements/Typography'
import { useGetThumbnail } from 'hooks/useGetThumbnail'
import { SelectedType } from 'types/onThisDayAllToday'
import { useEventCardStyle } from './EventCard.styles'

type EventCardProps = {
  item: SelectedType
  onPress: () => void
}

export const EventCard: React.FC<EventCardProps> = ({ item, onPress }) => {
  const uri = useGetThumbnail(item)

  const styles = useEventCardStyle()

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri }} resizeMode='cover' style={styles.image}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Pressable>
              <MaterialIcons name='favorite-border' size={24} color='#ffd35c' />
            </Pressable>
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
