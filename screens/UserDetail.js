import { View, StyleSheet, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TransactionHistoryData } from '../data/utils'
import Header from '../components/Header'
import OrdDtlCard from '../components/OrdDtlCard'
import GeneralService from '../services/general.service'
import UserDtlCard from '../components/UserDtlCard'

const UserDetail = ({ route, navigation }) => {

  const { custName, custEmail, custPhone, custAddress } = route.params;
  // console.log(orderId);
  const [isLoading, setIsLoading] = useState(false)
  const [detailData, setDetailData] = useState([]);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="User Details" />
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>Order Detail</Text>
</View> */}

        <UserDtlCard
          name={custName}
          email={custEmail}
          phone={custPhone}
          address={custAddress}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
    alignItems: "center"
  },
  headerIcon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: COLORS.gray
  },
  arrowLeft: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
})

export default UserDetail