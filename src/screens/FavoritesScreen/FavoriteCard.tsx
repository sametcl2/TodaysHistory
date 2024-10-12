import { ImageBackground, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { Typography } from 'components/elements/Typography'
import { FavoriteType } from 'types/favorite'
import { ToggleFavoriteButton } from 'components/ToggleFavoriteButton'
import { useFavoriteCardStyles } from './FavoriteCard.styles'

type FavoriteCardProps = {
  item: FavoriteType
  onPress: () => void
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ item, onPress }) => {
  const styles = useFavoriteCardStyles()

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: item.thumbnail }} resizeMode='cover' style={styles.image}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <ToggleFavoriteButton favoriteItem={item} />
            <View style={styles.dateContainer}>
              <Typography color='secondary' variant='bodyBoldLarge'>
                {item.day}
              </Typography>
              <Typography color='secondary' variant='bodyBoldLarge' style={styles.dateItem}>
                {moment(item.month, 'M').format('MMM')}
              </Typography>
              <Typography color='secondary' variant='bodyBoldLarge' style={styles.dateItem}>
                {item.year}
              </Typography>
            </View>
          </View>
          <Typography variant='bodyBoldLarge' color='textWhite' ellipsizeMode='tail' numberOfLines={3}>
            {item.text}
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
