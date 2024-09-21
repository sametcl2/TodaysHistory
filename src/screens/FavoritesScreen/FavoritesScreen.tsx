import { useState } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Container } from 'components/Container'
import { ViewTypeSelector } from 'components/ViewTypeSelector'
import { useDispatch, useSelector } from 'store'
import { selectCurrentFavorites } from 'store/favorites'
import { AppScreenHeader } from 'components/AppScreenHeader'
import { WebDrawer } from 'drawers/WebDrawer'
import { setCurrentPages } from 'store/data'
import { PageType } from 'types/events'
import { selectCurrentViewType } from 'store/viewType'
import { ViewTypes } from 'constants/view'
import { FavoriteCard } from './FavoriteCard'
import { useFavoritesScreenStyles } from './FavoritesScreen.styles'

export const FavoritesScreen = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const styles = useFavoritesScreenStyles()

  const favorites = useSelector(selectCurrentFavorites)
  const viewType = useSelector(selectCurrentViewType)

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  const onPress = (pages?: PageType[]) => {
    const urls: { url: string; title: string }[] = []
    pages?.map((page) => urls.push({ url: page.content_urls.mobile.page, title: page.titles.normalized }))
    dispatch(setCurrentPages(urls))
    setIsDrawerVisible(true)
  }

  return (
    <>
      <AppScreenHeader scrollY={scrollY} title={t('screenTitles.favorites')} />
      <Container>
        <ViewTypeSelector title={t('screenTitles.favorites')} />
        <Animated.FlatList
          key={viewType}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={styles.cardList}
          contentContainerStyle={styles.contentContainer}
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
