import { View, Text, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/CommonStyles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StatusBar } from 'expo-status-bar';
import GeneralService from '../services/general.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to determine color based on order status
// Function to determine color based on order status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#FFA726';  // Orange for Pending
    case 'delivered':
      return '#66BB6A';  // Green for Delivered
    case 'cancelled':
      return '#EF5350';  // Red for Cancelled
    case 'packing':
      return '#29B6F6';  // Light Blue for Packing
    case 'transit':
      return '#FFEB3B';  // Yellow for Transit
    default:
      return '#757575';  // Grey for unknown statuses
  }
};



const OngoingRoute = ({ index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ongoingData, setOngoingData] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    fetchData();
  }, [index]);

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("_id");
    getOrderOngoing(userId);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const getOrderOngoing = async (id) => {
    try {
      setIsLoading(true);
      const ordersData = await GeneralService.listOrdersByUserIdOngoing(id);
      const { data } = ordersData;
      const { response } = data;
      setOngoingData(response);
    } catch (err) {
      console.log(err);
      setOngoingData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, marginBottom: "20%" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
      ) : ongoingData.length > 0 ? (
        <FlatList
          data={ongoingData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()} // Ensure unique keys
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.orderRow}>
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
                  <Text style={[styles.statusText, { backgroundColor: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>

              </View>
            <View style={styles.separator}></View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => navigate.navigate("TrackingOrders", {
                    orderId: item.id,
                    orderStatus: item.status,
                    orderNo: item.order_no,
                    orderDate: item.created_at
                  })}
                  style={styles.trackButton}
                >
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.noRecordText}>No record found</Text>
        </View>
      )}
    </View>
  );
};

const HistoryRoute = ({ index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    fetchData();
  }, [index]);

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("_id");
    getOrderHistory(userId);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const getOrderHistory = async (id) => {
    try {
      setIsLoading(true);
      const ordersData = await GeneralService.listOrdersByUserIdHistory(id);
      const { data } = ordersData;
      const { response } = data;
      setHistoryData(response);
    } catch (err) {
      console.log(err);
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, marginBottom: "20%" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
      ) : historyData.length > 0 ? (
        <FlatList
          data={historyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()} // Ensure unique keys
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
            <View style={styles.orderRow}>
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
              <Text style={[styles.statusText, { backgroundColor: getStatusColor(item.status) }]}>
{item.status}
</Text>

            </View>
            <View style={styles.actionRow}>
            <TouchableOpacity
                onPress={() => navigate.navigate("OrderDetail", { orderId: item.id })}
                style={styles.detailsButton}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.noRecordText}>No record found</Text>
        </View>
      )}
    </View>
  );
};

const renderScene = SceneMap({
  first: OngoingRoute,
  second: HistoryRoute,
});

const MyOrders = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Ongoing' },
    { key: 'second', title: 'History' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{ backgroundColor: '#fff' }}
      renderLabel={({ route, focused }) => (
        <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderHeader = () => {
    const navigate = useNavigation();
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

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()} style={commonStyles.header1Icon}>
          <Image
            resizeMode='contain'
            source={icons.arrowLeft}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={true} />
      {renderHeader()}
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  tabViewContainer: {
    flex: 1,
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10, // Adjust border radius for a sleek look
    marginHorizontal: 8, // Reduced margin for a smaller card
    marginVertical: 6,
    padding: 12, // Reduced padding for a compact appearance
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray6,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6, // Reduced margin
  },
  orderIdText: {
    fontSize: 16, // Decreased font size
    fontWeight: 'bold',
    color: COLORS.black,
  },
  orderDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4, // Reduced vertical margin
  },
  orderAmountText: {
    fontSize: 15, // Decreased font size
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderDateText: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold', // Change font weight for emphasis
    textTransform: 'capitalize',
    paddingVertical: 6, // Adjust padding for better spacing
    paddingHorizontal: 12, // Adjust padding for better spacing
    borderRadius: 15, // Rounded corners for a badge look
    overflow: 'hidden', // Ensure content does not overflow
    textAlign: 'center', // Center the text for better alignment
    elevation: 3, // Add shadow for depth
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    backgroundColor: 'transparent', // Make background transparent to enable gradient
  },
  
  
  trackButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10, // Rounded corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    alignItems: 'center', // Center the text
    elevation: 2, // Add shadow for depth
  },
  trackButtonText: {
    color: COLORS.white, // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10, // Rounded corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    alignItems: 'center', // Center the text
    elevation: 2, // Add shadow for depth
    marginTop: 5
  },
  detailsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noRecordText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.darkGray,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray6,
    marginVertical: 8, // Space between elements
  },
});

export default MyOrders;
