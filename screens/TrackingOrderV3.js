import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons, SIZES, COLORS, FONTS, illustrations } from '../constants';
import { TouchableOpacity } from 'react-native';
import VerticalStepper from '../components/VerticalStepper';
import { StatusBar } from 'expo-status-bar';
import GeneralService from '../services/general.service';
import { ScrollView } from 'react-native-virtualized-view';

const TrackingOrderV3 = ({ route, navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { orderId, orderNo, orderDate, orderStatus } = route.params;

  useEffect(() => {
    getOrderDetailById(orderId);
  }, [navigation]);

  const getOrderDetailById = async (id) => {
    try {
      setIsLoading(true);
      const ordersData = await GeneralService.listOrdersDetailByOrderId(id);
      const { data } = ordersData;
      const { response } = data;
      setIsLoading(false);
      setData(response);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setData([]);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBackground }}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={icons.arrowLeft}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <>
              <View style={styles.orderDetails}>
                <Text style={styles.orderNumber}>{orderNo}</Text>
                <Text style={styles.orderDate}>Ordered at {orderDate}</Text>
                {data.map((res, index) => (
                  <View key={index} style={styles.productDetail}>
                    <Text style={styles.productQuantity}>{res.quantity}x</Text>
                    <Text style={styles.productName}>{res.prod_name}</Text>
                  </View>
                ))}
              </View>

              <VerticalStepper status={orderStatus} />

              <Image
                source={orderStatus === "PENDING" ? illustrations.received :
                  (orderStatus === "DELIVERED" ? illustrations.deliverd :
                    (orderStatus === "PACKING" ? illustrations.packing :
                      (orderStatus === "CANCELLED" ? COLORS.red : illustrations.deliverd)))}
                style={styles.locationImage}
              />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  container: {
    flex: 1,
    width: SIZES.width - 32,
    marginHorizontal: 16,
    top: 30,
  },
  orderDetails: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    elevation: 4,
    marginBottom: 10,
  },
  orderNumber: {
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderDate: {
    ...FONTS.body3,
    color: COLORS.gray5,
    marginBottom: 4,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    backgroundColor: COLORS.lightGray,
    padding: 0,
    borderRadius: 4,
  },
  productQuantity: {
    ...FONTS.body3,
    color: COLORS.black,
    marginRight: 10,
  },
  productName: {
    ...FONTS.body3,
    color: COLORS.gray5,
  },
  locationImage: {
    height: SIZES.width * 0.7,
    width: SIZES.width * 0.7,
    alignSelf: 'center',
    marginTop: 20,
  },
})

export default TrackingOrderV3;
