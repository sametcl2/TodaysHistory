import { useState } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Container } from 'components/Container'
import { ViewTypes, ViewTypeSelector } from 'components/ViewTypeSelector'
import { useDispatch, useSelector } from 'store'
import { selectCurrentFavorites } from 'store/favorites'
import { FavoritesScreenHeader } from 'components/FavoritesScreenHeader'
import { WebDrawer } from 'drawer/WebDrawer'
import { setCurrentPages } from 'store/data'
import { PageType } from 'types/events'
import { FavoriteCard } from './FavoriteCard'
import { useFavoritesScreenStyles } from './FavoritesScreen.styles'

export const FavoritesScreen = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const { t } = useTranslation()

  const dispatch = useDispatch()

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

  const onPress = (pages?: PageType[]) => {
    const urls: { url: string; title: string }[] = []
    pages?.map((page) => urls.push({ url: page.content_urls.mobile.page, title: page.titles.normalized }))
    dispatch(setCurrentPages(urls))
    setIsDrawerVisible(true)
  }

  return (
    <>
      <FavoritesScreenHeader scrollY={scrollY} />
      <Container>
        <ViewTypeSelector viewType={viewType} onChange={handleViewTypeChange} title={t('screenTitles.favorites')} />
        <Animated.FlatList
          key={viewType}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={styles.cardList}
          numColumns={viewType === ViewTypes.Grid ? 2 : 1}
          showsVerticalScrollIndicator={false}
          data={favorites}
          initialNumToRender={16}
          renderItem={({ item, index }) => <FavoriteCard key={index} item={item} onPress={() => onPress(item.pages)} />}
        />
      </Container>
      {isDrawerVisible && <WebDrawer isOpen={isDrawerVisible} onDismiss={setIsDrawerVisible} />}
    </>
  )
}
