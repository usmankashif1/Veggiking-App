import { View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS,icons} from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import OrdDtlCard from '../components/OrdDtlCard';
import GeneralService from '../services/general.service';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const OrderDetail = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  const getCartCounter = async () => {
    try {
      const userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data } = cartResponse;
      const { response: cartNo } = data;
      setCartCounter(cartNo);
    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartCounter();
    }, [])
  );

  useEffect(() => {
    const getOrderDetail = async (id) => {
      try {
        setIsLoading(true);
        const ordersData = await GeneralService.listOrdersDetailByOrderId(id);
        const { data } = ordersData;
        const { response } = data;
        setIsLoading(false);
        setDetailData(response);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setDetailData([]);
      }
    };

    getOrderDetail(orderId);
  }, [orderId]);

  const renderItemSeparator = () => <View style={styles.itemSeparator} />;

  const renderHeader = () => {
    return (
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconContainer}>
        <Image
          resizeMode='contain'
          source={icons.arrowLeft}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Order Detail</Text>
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden={true} />
      {renderHeader()}
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading Order Details...</Text>
          </View>
        ) : detailData.length > 0 ? (
          <FlatList
            data={detailData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <OrdDtlCard
                image={item.prod_image}
                amount={item.prod_price}
                type={item.type}
                price={item.price}
                date={item.date}
                name={item.prod_name}
                quantity={item.quantity}
                totalAmt={item.order_amount}
                style={[styles.card, styles.enhancedCard]}
              />
            )}
            ItemSeparatorComponent={renderItemSeparator}
            contentContainerStyle={styles.flatlistContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptyText}>
              It seems like there are no order details available at the moment. Please check back later or contact support if you believe this is an error.
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.retryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 16,
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
    borderBottomLeftRadius: 15,  // Added rounded corner for visual appeal
    borderBottomRightRadius: 15, // Added rounded corner for visual appeal
  },
  headerIconContainer: {
    width: 40,  // Increased size for better tap area
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,  // Background color for the icon
    borderRadius: 20,  // Rounded corners for the icon container
    elevation: 3,  // Shadow effect for the icon background
  },
  headerIcon: {
    width: 24,  // Adjusted size for the icon
    height: 24,
    tintColor: COLORS.primary,  // Icon color
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 8,
  },
  flatlistContent: {
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  enhancedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    color: COLORS.primary,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  retryButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default OrderDetail;
