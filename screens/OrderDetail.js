import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons } from '../constants';
import GeneralService from '../services/general.service';
import { commonStyles } from '../styles/CommonStyles';

const OrderDetail = ({ route }) => {
  const { orderId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const ordersData = await GeneralService.listOrdersDetailByOrderId(orderId);
        const { data } = ordersData;
        const { response } = data;
        setDetailData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.header1Icon}>
        <Image
          resizeMode='contain'
          source={icons.arrowLeft}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Orders Details</Text>
    </View>
  );

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found for this order.</Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return COLORS.yellow;
      case 'Shipped':
        return COLORS.green;
      case 'Delivered':
        return COLORS.blue;
      case 'Cancelled':
        return COLORS.red;
      default:
        return COLORS.gray;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.orderRow}>
        {/* Image for the order */}
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: item.prod_image }}  // Updated to use item.prod_image
            style={styles.orderImage}
            onError={() => console.log('Error loading image')} // Log error if image fails to load
            defaultSource={require('../assets/images/blnk.jpg')} // Add a placeholder image
          />
        </View>
        <View style={styles.orderInfo}>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.orderIdText}>Order ID: {item.order_no}</Text>
            <View style={styles.separator}></View>
            <View style={styles.orderDetailsRow}>
              <Text style={styles.orderAmountText}>Rs. {item.bill}</Text>
              <Text style={styles.orderDateText}> | {item.created_at}</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.statusText, { backgroundColor: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
    </View>
  );
  
  return (
    <GestureHandlerRootView style={styles.area}>
      <SafeAreaView style={styles.area}>
        <View style={styles.container}>
          <FlatList
            data={detailData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={isLoading ? renderLoadingIndicator() : renderEmptyState()}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
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
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.gray6,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80, // Larger image area
    height: 80,
    borderRadius: 10, // Rounded corners
    overflow: 'hidden',
    backgroundColor: COLORS.gray6,
  },
  orderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray6,
    marginVertical: 8,
  },
  orderDetailsRow: {
    flexDirection: 'row',
  },
  orderAmountText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  orderDateText: {
    fontSize: 16,
    color: COLORS.gray5,
  },
  statusText: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: COLORS.white,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.gray,
  },
});

export default OrderDetail;
