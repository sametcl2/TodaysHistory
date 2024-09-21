import { useTranslation } from 'react-i18next'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { AppScreenHeader } from 'components/AppScreenHeader'
import { Container } from 'components/Container'
import { ViewTypeSelector } from 'components/ViewTypeSelector'
import { DividerTitle } from 'components/elements/DividerTitle'
import { RemoveAllFavroitesButton } from 'components/RemoveAllFavroitesButton'
import { useSettingsScreenStyles } from './SettingsScreen.styles'

export const SettingsScreen = () => {
  const { t } = useTranslation()

  const styles = useSettingsScreenStyles()

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  return (
    <>
      <AppScreenHeader scrollY={scrollY} title={t('screenTitles.settings')} />
      <Container>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={styles.cardList}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <ViewTypeSelector title={t('viewType')} containerStyle={styles.viewTypeSelector} />
          <DividerTitle size={20} direction='horizontal' dividerColor='grayLight' />
          <RemoveAllFavroitesButton />
        </Animated.ScrollView>
      </Container>
    </>
  )
}
