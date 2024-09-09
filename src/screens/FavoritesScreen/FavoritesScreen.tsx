import { useState } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { Container } from 'components/Container'
import { ViewTypes, ViewTypeSelector } from 'components/ViewTypeSelector'
import { useSelector } from 'store'
import { selectCurrentFavorites } from 'store/favorites'
import { FavoriteCard } from './FavoriteCard'
import { useFavoritesScreenStyles } from './FavoritesScreen.styles'

export const FavoritesScreen = () => {
  const styles = useFavoritesScreenStyles()
  const favorites = useSelector(selectCurrentFavorites)

  const [viewType, setViewType] = useState(ViewTypes.List)

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  const handleViewTypeChange = (selectedType: ViewTypes) => {
    setViewType(selectedType)
  }

  return (
    <Container>
      <ViewTypeSelector viewType={viewType} onChange={handleViewTypeChange} />
      <Animated.FlatList
        key={viewType}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={styles.cardList}
        numColumns={viewType === ViewTypes.Grid ? 2 : 1}
        showsVerticalScrollIndicator={false}
        data={favorites}
        initialNumToRender={16}
        renderItem={({ item, index }) => <FavoriteCard key={index} item={item} onPress={() => {}} />}
      />
    </Container>
  )
}
