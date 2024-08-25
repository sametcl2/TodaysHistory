import { Image, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Typography } from 'components/elements/Typography'
import { Selected } from 'types/onThisDayAllToday'
import { useGetThumbnail } from './Cart.hooks'
import { useCartStyle } from './Cart.styles'

type CartTypes = {
  item: Selected
  onPress: () => void
}

export const Cart = ({ item, onPress }: CartTypes) => {
  const uri = useGetThumbnail(item)

  const styles = useCartStyle()

  return (
    <TouchableOpacity onPress={onPress} style={styles.cart}>
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
