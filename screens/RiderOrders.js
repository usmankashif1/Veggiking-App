import { View, Text, TouchableOpacity, Image, useWindowDimensions, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../constants'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { FlatList } from 'react-native'
import { history, orders } from '../data/utils'
import { StatusBar } from 'expo-status-bar'
import { Feather, Ionicons, MaterialCommunityIcons, Fontisto, Octicons } from "@expo/vector-icons"
import GeneralService from '../services/general.service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notifications } from 'expo';

const OngoingRoute = ({ navigation, index }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [ongoingData, setOngoingData] = useState([]);

  const navigate = useNavigation();
  var userId = 0;

  useEffect(() => {
    fetchData();
  }, [index]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleNotification = async () => {
    // Request permission to send notifications (required for iOS)
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return alert('Permission to send notifications is required!');
    }

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notification Title',
        body: 'Notification Body',
        data: { dataKey: 'dataValue' }, // Optional data payload
      },
      trigger: { seconds: 1 }, // Schedule the notification to be shown immediately (1 second)
    });
    alert('Notification scheduled!');
  };


  const fetchData = async () => {
    userId = await AsyncStorage.getItem("_id");
    getOrderOngoing(userId);
  }

  const refreshPage = () => {
    fetchData();
  }

  const confirmDeliver = (orderId, orderNo) => {
    Alert.alert(
      'Confirm Delivery',
      `Are you sure you want to mark this order # ${orderNo} as delivered?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDeliveryConfirmation(orderId),
        },
      ],
      { cancelable: false }
    );
  };


  const handleDeliveryConfirmation = async (orderId) => {
    console.log(orderId);
    try {
      const response = await GeneralService.updateOrderStatus(orderId, 'delivered');
      const { data } = response;
      const { response: res } = data;
      Alert.alert(
        'Delivery Status',
        res,
        [
          {
            text: 'OK',
            onPress: () => refreshPage(),
          },
        ],
        { cancelable: false }
      );
      console.log(res);
    } catch (err) {
      console.log(err?.response);
    }
  };

  // const confirmDeliver = (orderId) => {
  //   console.log(orderId);
  //   const delivery = async () => {
  //     try {
  //       const response = await GeneralService.updateOrderStatus(orderId, 'delivered');
  //       const { data } = response;
  //       const { response: res } = data;
  //       Alert.alert(
  //         'Delivery Status',
  //         res,
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => refreshPage(),
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err?.response);
  //     }
  //   }

  //   delivery();
  // }

  const getOrderOngoing = async (id) => {
    try {
      setIsLoading(true);
      const ordersData = await GeneralService.listOngoingAssignedOrderByRiderId(id);
      const { data } = ordersData;
      const { response } = data;
      console.log(`ongoing-data=${JSON.stringify(response)}`);
      setIsLoading(false);
      setOngoingData(response);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setOngoingData([]);
    }
  }

  let result = <View style={{ flex: 1 }}>
    <FlatList
      data={ongoingData}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'column' }}>
          <View style={{
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            marginVertical: 12,
            paddingBottom: 4
          }}>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginLeft: 12 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Order ID: {item.order_no}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4
                }}>
                  <Text style={{ fontSize: 14, fontFamily: 'bold' }}>Rs. {item.bill}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'regular' }}> | {item.created_at}</Text>
                </View>
              </View>
            </View>
            <Text style={{
              fontSize: 14,
              fontFamily: 'bold',
              color: item.status === "PENDING" ? COLORS.yellow :
                (item.status === "DELIVERED" ? COLORS.green :
                  (item.status === "PACKING" ? COLORS.blue :
                    (item.status === "CANCELLED" ? COLORS.red : COLORS.blue)))

            }}>{item.status}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 18
          }}>
            <TouchableOpacity
              // onPress={() => navigate.navigate("TrackingOrders", { orderId: item.id, orderNo: item.order_no, orderDate: item.created_at })}
              onPress={() => navigate.navigate("UserDetail", { custName: item.name, custEmail: item.email, custPhone: item.phone, custAddress: item.address })}
              style={{
                height: 38,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 14,
                fontFamily: 'regular'
              }}>User Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigate.navigate("TrackingOrders", { orderId: item.id, orderNo: item.order_no, orderDate: item.created_at })}
              onPress={() => navigate.navigate("OrderDetail", { orderId: item.id })}
              style={{
                height: 38,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 14,
                fontFamily: 'regular'
              }}>Order Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigate.navigate("TrackingOrders", { orderId: item.id, orderNo: item.order_no, orderDate: item.created_at })}
              onPress={() => confirmDeliver(item.id, item.order_no)}
              style={{
                height: 38,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.green,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 14,
                fontFamily: 'regular'
              }}>Mark Deliver</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />

  </View>;

  let response = ongoingData.length > 0 ? result : <View style={{ flex: 1 }}>
    <Text style={{
      color: COLORS.black,
      fontSize: 14,
      fontFamily: 'regular',
      textAlign: 'center'
    }}>No record found</Text></View>;

  response = isLoading ? <ActivityIndicator size="large" color="blue" /> : response;

  return (
    response
  )
}


const HistoryRoute = ({ navigation, index }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigation();

  var userId = 0;
  // useEffect(() => {
  //   fetchData();
  // }, [navigation]);

  const fetchData = async () => {
    userId = await AsyncStorage.getItem("_id");
    getOrderHistory(userId);
  }

  useEffect(() => {
    fetchData();
  }, [index]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );


  const getOrderHistory = async (id) => {
    try {
      setIsLoading(true);
      const ordersData = await GeneralService.listHistoryAssignedOrderByRiderId(id);
      const { data } = ordersData;
      const { response } = data;
      console.log(`data=${JSON.stringify(response)}`);
      setIsLoading(false);
      setHistoryData(response);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setHistoryData([]);
    }
  }

  // const navigation = useNavigation();
  let result =
    <View style={{ flex: 1 }}>
      <FlatList
        data={historyData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'column' }}>
            <View style={{
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              marginVertical: 12,
              flexDirection: 'row',
              paddingBottom: 4
            }}>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 12 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold'
                  }}>Order ID: {item.order_no}</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4
                  }}>
                    <Text style={{ fontSize: 14, fontFamily: 'bold' }}>Rs. {item.bill}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'regular' }}> | {item.created_at}</Text>
                  </View>
                </View>
              </View>
              <Text style={{
                fontSize: 14,
                color: item.status === "PENDING" ? COLORS.yellow :
                  (item.status === "DELIVERED" ? COLORS.green :
                    (item.status === "PACKING" ? COLORS.blue :
                      (item.status === "CANCELLED" ? COLORS.red : COLORS.blue))),
                fontFamily: 'bold'
              }}>{item.status}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 18
            }}>
              <TouchableOpacity
                onPress={() => navigate.navigate("UserDetail", { custName: item.name, custEmail: item.email, custPhone: item.phone, custAddress: item.address })}
                // onPress={() => navigation.navigate("OrderDetail")}
                style={{
                  height: 38,
                  width: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                  borderRadius: 8
                }}
              >
                <Text style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'regular'
                }}>User Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate.navigate("OrderDetail", { orderId: item.id })}
                // onPress={() => navigation.navigate("OrderDetail")}
                style={{
                  height: 38,
                  width: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                  borderRadius: 8
                }}
              >
                <Text style={{
                  color: COLORS.white,
                  fontSize: 14,
                  fontFamily: 'regular'
                }}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>;

  let response = historyData.length > 0 ? result : <View style={{ flex: 1 }}>
    <Text style={{
      color: COLORS.black,
      fontSize: 14,
      fontFamily: 'regular',
      textAlign: 'center'
    }}>No record found</Text></View>;

  response = isLoading ? <ActivityIndicator size="large" color="blue" /> : response;

  return (
    response
  )
}

const renderScene = SceneMap({
  first: OngoingRoute,
  second: HistoryRoute,
});

const RiderOrders = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Ongoing' },
    { key: 'second', title: 'History' },
  ])

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary
      }}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderHeader = () => {
    const navigation = useNavigation()

    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("_id");
        await AsyncStorage.removeItem("user_type");
        console.error('Cleared successfully:');

        navigation.replace('Login');
      } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
      }
    };

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 16
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Orders</Text>
        </View>

        <View style={{
          height: 45,
          width: 45,
          borderRadius: 22.5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.tertiaryBlack
        }}>
          <View>
            <TouchableOpacity
              onPress={handleLogout}
            >
              <Feather name="log-out" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        {renderHeader()}
        <View style={{
          flex: 1,
          marginHorizontal: 22
        }}>
          <TabView
            navigationState={{ index, routes }}
            // renderScene={renderScene}
            renderScene={({ route }) => {
              switch (route.key) {
                case 'first':
                  return <OngoingRoute index={index} />;
                case 'second':
                  return <HistoryRoute index={index} />;
                default:
                  return null;
              }
            }}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RiderOrders