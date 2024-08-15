import { View } from 'react-native'
import { useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { useTheme } from '@rneui/themed'
import { Container } from 'components/Container'
import { useGetAllTypesTodayQuery } from 'services/onthisday/onThisDayApi'
import { Header } from 'components/Header'
import { Date } from 'components/Date'
import { HomeDrawer } from 'drawer/HomeDrawer'
import { AllDataView, SelectedListView } from '../index'
import { useHomeScreenStyle } from './HomeScreen.styles'

export const HomeScreen = () => {
  const [viewAll, setViewAll] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const {
    theme: { colors }
  } = useTheme()
  const {
    data: allTypesData,
    isError,
    error,
    isFetching,
    refetch
  } = useGetAllTypesTodayQuery({ day: '02', month: '04' })
  const snapPoints = useMemo(() => ['60%', '93%'], [])
  const styles = useHomeScreenStyle()

  const handleViewAll = () => {
    setViewAll(true)
    bottomSheetRef.current?.snapToIndex(1)
  }

  return (
    <>
      <Container containerStyles={{ backgroundColor: colors.background }}>
        <View style={styles.header}>
          <Header />
          <Date />
        </View>
      </Container>
      <HomeDrawer ref={bottomSheetRef} snapPoints={snapPoints}>
        {viewAll ? (
          <AllDataView />
        ) : (
          <SelectedListView
            data={allTypesData?.selected}
            isError={isError}
            error={error}
            isFetching={isFetching}
            refetch={refetch}
            handleViewAll={handleViewAll}
          />
        )}
      </HomeDrawer>
    </>
  )
}
