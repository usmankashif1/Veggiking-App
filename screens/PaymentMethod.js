import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { SIZES, illustrations, images } from '../constants'
import GeneralService from '../services/general.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PaymentMethod = ({ route }) => {
  const [instruction, setInstruction] = useState("");
  const [showStickyNote, setShowStickyNote] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setShowStickyNote(contentOffset.y > 0);
  };
  // const location = useLocation();

  const navigation = useNavigation();
  const { cart, address, items, delivery, total } = route.params;

  // const { cart, address, items, delivery, total } = location.state || {};

  const handleChangeText = (text) => {
    setInstruction(text);
  };

  const placeOrder = () => {
    const orderPlacement = async () => {
      try {
        // const response = listCart();
        // console.log(response);
        let userId = await AsyncStorage.getItem("_id");
        const timeout = 8000;
        const response = await Promise.race([
          GeneralService.placeOrder(cart, userId, address, instruction),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);
        if (response) {
          let orderNumber = response.data.response;
          console.log(response.data.response);
          await AsyncStorage.setItem("cart_counter", String(0));
          navigation.replace("Thankyou", { orderNo: orderNumber });
        } else {
          Alert.alert("Error", "No response from the server");
          throw new Error('No response from the server');
        }
        console.log(response);

      } catch (err) {
        if (err?.response?.status === 404) {
          Alert.alert("Error", "No items in cart");
        } else if (err?.response?.status === 403) {
          Alert.alert("Error", "You are disabled, contact Admin");
        } else {
          Alert.alert("Error", "Error in order");
        }
        console.log(err?.response?.data);
        // console.log("order-response");
      }
    }
    orderPlacement();
  }


  const placeOrderOld = () => {
    const orderPlacement = async () => {
      try {
        const timeout = 8000;
        const response = await Promise.race([
          GeneralService.placeOrder(userId, address, instruction),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);
        if (response) {
          let orderNumber = response.data.response;
          console.log(response.data.response);
          // setCategory(response.data.response);
          await AsyncStorage.setItem("cart_counter", String(0));
          navigation.replace("Thankyou", { orderNo: orderNumber });
        } else {
          Alert.alert("Error", "No response from the server");
          throw new Error('No response from the server');
        }
        // const response = await GeneralService.placeOrder(userId, address);
        console.log(response);


      } catch (err) {
        console.log(err);
        Alert.alert("Error", "Error in order");
        console.log("order-response");
      }
    }
    orderPlacement();
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
          {/* Your existing content here */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Checkout</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <View style={styles.summaryItem}>
                <Text>Subtotal</Text>
                <Text>Rs {total}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text>No. of Items</Text>
                <Text>{items}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text>Delivery Charges</Text>
                <Text>Rs {delivery}</Text>
              </View>
              {/* <View style={styles.summaryItem}>
                <Text>Discount</Text>
                <Text>Rs 5</Text>
              </View> */}
              {/* <View style={styles.section1}>
                <Text style={styles.summaryItem}>Shopping Bag(s)</Text>
                <Switch
                  trackColor={{ false: "#d3d3d3", true: "#d3d3d3" }}
                  thumbColor={switchValue ? "#f44c00" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(value) => setSwitchValue(value)}
                  value={switchValue}
                />
                <Text style={styles.amountText}>Rs 32</Text>
              </View> */}
              <View style={styles.totalAmount}>
                <Text style={styles.sectionTitle}>Total Amount</Text>
                <Text style={styles.totalPrice}>Rs {parseInt(total) + parseInt(delivery)}</Text>
              </View>
              {/* <View style={styles.card}>
                <View style={styles.circle}>
                  <Text style={styles.discountText}>10% off</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.subText}>For new customers</Text>
                  <View style={styles.line}></View>
                  <TouchableOpacity style={styles.applyButton2}>
                    <Text style={styles.applyButtonText2}>Apply</Text>
                  </TouchableOpacity>
                  <Text style={styles.dateTimeText}>31-Dec-2025 5:15 PM</Text>
                </View>
              </View> */}
            </View>
            {/* <View style={styles.section}>
          <View style={styles.promoCodeContainer}>
            <TextInput style={styles.promoCodeInput} placeholder="Enter promo code" />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View> */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.radioContainer}>
                {/* <TouchableOpacity style={styles.radio}>
              <Image source={images.jazzcash} resizeMode="contain" style={styles.locationImage} />
              <Text>JazzCash</Text>
            </TouchableOpacity> */}

                <TouchableOpacity style={styles.radio}>
                  <Image source={images.cashDelivery} resizeMode="contain" style={styles.locationImage} />
                  <Text>COD</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
              <Text>
                {address}
              </Text>
              {/* <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="chevron-forward" size={24} color="#f44c00" />
              </TouchableOpacity> */}
            </View>


            {/* <View style={styles.editSection}>
              <Text style={styles.editText}>Delivery Time</Text>
              <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="chevron-forward" size={24} color="#f44c00" />
              </TouchableOpacity>
            </View> */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Instructions</Text>
              <TextInput style={styles.deliveryInstructionsInput} placeholder="Add delivery instructions" value={instruction} onChangeText={handleChangeText} />
            </View>
          </View>

          <View style={styles.checkoutButtonVisible}>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => placeOrder()}>
              <Text style={styles.checkoutButtonText}>Confirm Checkout</Text>
            </TouchableOpacity>
          </View>

          {/* Adjusted Sticky Note Section */}
          {/* <View style={showStickyNote ? styles.stickyNoteVisible : styles.stickyNoteHidden}>
            <Text style={styles.noteText}>
              <Text style={styles.note}>NOTE: </Text>
              Order delivery time is 2 hours before 3:30PM. Order placed after 3:30 PM will be delivered tomorrow morning on
              priority.
            </Text>
          </View> */}

          {/* Adjusted Checkout Button */}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingBottom: 180,
  },
  header: {
    backgroundColor: '#f44c00',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  totalPrice: {
    color: '#f44c00',
    fontWeight: 'bold',
    fontSize: 18,
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shoppingBag: {
    flexDirection: 'auto',
    alignItems: 'center',
  },
  amountText: {
    marginLeft: 'auto',
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#f44c00',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoCodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#f44c00',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f44c00',
    width: '50%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#fff',
    color: '#f44c00',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C70039',
  },
  subText: {
    fontSize: 13,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  },
  line: {
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 0,
  },
  applyButton2: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  applyButtonText2: {
    color: '#f44c00',
    fontSize: 12,
    textAlign: 'center'

  },
  dateTimeText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center'
  },
  applyButton: {
    backgroundColor: '#f44c00',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radio: {
    borderWidth: 1,
    borderColor: '#f44c00',
    padding: 10,
    marginRight: 10,
  },
  locationImage: {
    height: SIZES.width * 0.3,
    width: SIZES.width * 0.3,
  },
  editSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  editIcon: {
    borderWidth: 1,
    borderColor: '#f44c00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editIconText: {
    color: '#f44c00',
    fontSize: 18,
  },
  deliveryInstructionsInput: {
    borderWidth: 1,
    borderColor: '#f44c00',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  noteSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
  },
  note: {
    color: '#f44c00',
  },
  noteText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  checkoutButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  checkoutButton: {
    backgroundColor: '#f44c00',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stickyNoteSection: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    top: "74%",
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  stickyNoteVisible: {
    position: 'absolute',
    bottom: 120, // Adjusted to avoid overlap with the checkout button
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  stickyNoteHidden: {
    display: 'none',
  },
  checkoutButtonVisible: {
    position: 'absolute',
    bottom: 20, // Adjusted to set proper distance from the bottom
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  checkoutButtonHidden: {
    display: 'none',
  },

});

export default PaymentMethod;