import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { AppScreenHeader } from 'components/AppScreenHeader'
import { Container } from 'components/Container'
import { ViewTypes, ViewTypeSelector } from 'components/ViewTypeSelector'
import { useSettingsScreenStyles } from './SettingsScreen.styles'

export const SettingsScreen = () => {
  const { t } = useTranslation()

  const styles = useSettingsScreenStyles()

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
    <>
      <AppScreenHeader scrollY={scrollY} title={t('screenTitles.settings')} />
      <Container>
        <ViewTypeSelector
          viewType={viewType}
          onChange={handleViewTypeChange}
          title={t('screenTitles.settings')}
          hideViewType
        />
        <Animated.ScrollView
          key={viewType}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={styles.cardList}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </>
  )
}
