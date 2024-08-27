import { Image, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Typography } from 'components/elements/Typography'
import { SelectedType } from 'types/onThisDayAllToday'
import { useGetThumbnail } from 'hooks/useGetThumbnail'
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
      <View>
        <Image source={{ uri }} resizeMode='cover' style={styles.image} />
        <View style={{ padding: 12 }}>
          <MaterialIcons name='favorite-border' size={24} color='#ffd35c' />
          <Typography variant='bodyBoldLarge' color='textWhite'>
            {item.text}
          </Typography>
          <Typography style={styles.year} color='secondary' variant='bodyBoldLarge'>
            {item.year}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  )
}
