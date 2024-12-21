import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import * as Animatable from "react-native-animatable"
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from "../styles/CommonStyles"
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/utils'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GeneralService from '../services/general.service'
import { useFocusEffect } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const Cart = ({ navigation }) => {
  const basket = require("../assets/images/basket.png");

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemNo, setItemNo] = useState(0)
  const [cartCounter, setCartCounter] = useState(0); ``
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const { updateCartCounter, updateUserAddress, userAddress } = useCart();

  const getCartCounter = async () => {
    try {
      console.log(`user-address=${userAddress}`);
      let userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data: cartData } = cartResponse;
      // console.log(`home-data=${cartData}`);
      const { counter: cartNo, address } = cartData;
      // console.log(address);
      setCartCounter(cartNo);
      updateCartCounter(cartNo);
      updateUserAddress(address);
    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  }

  // const showToast = (message) => {
  //   ToastAndroid.show(message, ToastAndroid.SHORT);
  // };

  // const { response, status } = await listCart('user_id');
  // console.log(response, status);


  // const fetchDataNew = async () => {
  //   try {
  //     let userId = await AsyncStorage.getItem("_id");
  //     let userAddress = await AsyncStorage.getItem("user_address");
  //     setInputText(userAddress);
  //     const response = await listCart(userId);
  //     const { response: res } = response;

  //     console.log(`success-cart=${res}`);
  //     // const { data } = response;
  //     // const { response: res } = data;
  //     const totalPrice = res.reduce((accumulator, currentValue) => {
  //       return accumulator + (currentValue.quantity * currentValue.product_price);
  //     }, 0);

  //     const numberOfItems = res.reduce((count, obj) => {
  //       return count + 1;
  //     }, 0);
  //     setItemNo(numberOfItems);
  //     setTotalPrice(totalPrice);
  //     setCart(res);

  //   } catch (err) {
  //     // console.log("Error");
  //     console.log(err);
  //     setCart([]);
  //   }
  // }

  const fetchData = async () => {
    try {
      console.log("asjdhskdh");
      let userId = await AsyncStorage.getItem("_id");
      // let userAddress = await AsyncStorage.getItem("my_address");
      // console.log(`user-address=${userAddress}`);
      if (typeof userAddress !== "string") {
        userAddress = JSON.stringify(userAddress);
      }
      // console.log(userAddress);
      setInputText(userAddress);
      const response = await GeneralService.listCartByUserId(userId);
      const { data } = response;
      const { response: res } = data;
      const totalPrice = res.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.product_price);
      }, 0);

      const numberOfItems = res.reduce((count, obj) => {
        return count + 1;
      }, 0);

      setItemNo(numberOfItems);
      setTotalPrice(totalPrice);
      setCart(res);
      getCartCounter();
    } catch (err) {
      // console.log("Error");
      Alert.alert("Error", err);
      // console.log(`error-response=${err}`);
      setCart([]);
    }
  }


  // const fetchDataOld2 = async () => {
  //   try {
  //     let userId = await AsyncStorage.getItem("_id");
  //     let userAddress = await AsyncStorage.getItem("user_address");
  //     setInputText(userAddress);
  //     const response = await GeneralService.listCartByUserId(userId);
  //     const { data } = response;
  //     const { response: res } = data;
  //     const totalPrice = res.reduce((accumulator, currentValue) => {
  //       return accumulator + (currentValue.quantity * currentValue.product_price);
  //     }, 0);

  //     const numberOfItems = res.reduce((count, obj) => {
  //       return count + 1;
  //     }, 0);
  //     setItemNo(numberOfItems);
  //     setTotalPrice(totalPrice);
  //     setCart(res);

  //   } catch (err) {
  //     console.log("Error");
  //     console.log(err);
  //     setCart([]);
  //   }
  // }

  const fetchDeliveryCharges = async () => {
    try {
      const response = await GeneralService.getCharges();
      const { data } = response;
      const { response: res } = data;
      // console.log(res);
      setDeliveryCharges(res.price);
    } catch (err) {
      setDeliveryCharges(0);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchDeliveryCharges();
    }, [])
  );

  const decreaseQuantity = (id) => {
    const decreaseQty = async () => {
      try {
        let userId = await AsyncStorage.getItem("_id");
        const response = await GeneralService.decreaseQty(userId, id);
        console.log(response.data.response);

        fetchData();

      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    decreaseQty();
  };

  const increaseQuantity = (id) => {
    const increaseQty = async () => {
      try {
        let userId = 35;
        const response = await GeneralService.increaseQty(userId, id);
        console.log(response.data.response);

        fetchData();

      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    increaseQty();
    // setQuantity(quantity + 1);
  };


  // const deleteCartNew = (id) => {
  //   console.log(id);
  //   const delCart = async () => {
  //     try {
  //       const response = await deleteToCart(id);
  //       fetchData();
  //       // showToast("Item removed");

  //     } catch (err) {
  //       console.log("delete error");
  //       console.log(err?.response?.data);
  //     }
  //   }

  //   delCart();
  //   // setQuantity(quantity + 1);
  // };

  const deleteCart = (id) => {
    console.log(id);
    const delCart = async () => {
      try {

        const updatedCart = cart.filter(cart => {
          return cart.id !== id;
        });
        setCart(updatedCart);

        let userId = await AsyncStorage.getItem("_id");
        const response = await GeneralService.deleteCart(userId, id);
        console.log(response);
        getCartCounter();

        fetchData();

      } catch (err) {
        console.log("delete error");
        console.log(err?.response?.data);
      }
    }

    delCart();
  };

  const handleInputChange = (text) => {
    setInputText(text);
  };
  const placeOrder = () => {
    const orderPlace = async () => {
      if (inputText) {
        setInputError("");
        navigation.navigate("PaymentMethod", { total: totalPrice, delivery: deliveryCharges, items: itemNo, address: inputText });
      } else {
        setInputError("Please enter address");
      }
      console.log(inputText);
    }
    if (parseInt(totalPrice) >= 1000) {
      orderPlace();
    } else {
      Alert.alert("Price Alert", "Minimum order is Rs 1000");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightGrey' }}>
      <StatusBar hidden={true} />
      <View style={cartStyles.header}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={commonStyles.header1Icon}
            >
              <Image
                resizeMode='contain'
                source={icons.arrowLeft}
                style={{ height: 24, width: 24, tintColor: COLORS.black }}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular', color: '#000' }}>Cart</Text>
          </View>

        </View>

        {
          cartCounter == 0 ? (
            <View style={[styles.centeredContainer, { backgroundColor: 'lightGrey' }]}>
              <Image source={basket} style={{ width: "40%", height: "20%", marginHorizontal: 10 }} />
              <Text style={{
                color: COLORS.black,
                fontSize: 14,
                fontFamily: 'regular',
                textAlign: 'center'
              }}>Your cart is empty</Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <View style={cartStyles.cardContainer}>
                    <View style={cartStyles.card}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Delete Button */}
                        <TouchableOpacity
                          onPress={() => deleteCart(item.prod_id)}
                          style={styles.deleteButton}
                        >
                          <FontAwesome name="remove" size={24} color="red" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                        <View style={{ width: 80, marginRight: 10 }}>
                          <Image
                            source={{ uri: `https://api.veggieking.pk/public/upload/${item.product_image}` }}
                            resizeMode='contain'
                            style={{
                              height: 80,
                              flex: 1,
                              borderRadius: 10,
                            }}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#000',
                              fontFamily: 'regular',
                              textTransform: 'capitalize',
                              marginBottom: 6,
                            }}>{item.product_name}</Text>
                          <Text style={{
                            fontSize: 20,
                            color: '#f44c00',
                            fontFamily: 'bold',
                            marginBottom: 6,
                          }}>Rs. {item.product_price * item.quantity}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                          {/* Minus Button */}
                          <TouchableOpacity
                            onPress={() => decreaseQuantity(item.prod_id)}
                            style={styles.roundedBtn}
                          >
                            <Text style={cartStyles.body2}>-</Text>
                          </TouchableOpacity>
                          {/* Quantity Text */}
                          <Text style={{
                            fontSize: 16,
                            fontFamily: 'regular',
                            color: '#000',
                            marginHorizontal: 12
                          }}>{item.quantity}</Text>
                          {/* Plus Button */}
                          <TouchableOpacity
                            onPress={() => increaseQuantity(item.prod_id)}
                            style={styles.roundedBtn}
                          >
                            <Text style={cartStyles.body2}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}

            />
          )
        }


      </View>
      {
        cart.length > 0 && (
          <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={cartStyles.body3}>Delivery Address</Text>
            </View>
            <Input
              name="address"
              id="address"
              onChangeText={handleInputChange}
              value={inputText}
              placeholder="Delivery Address"
              placeholderTextColor={COLORS.gray4}
              keyboardType="text"
            />
            {inputError && <Text style={styles.error}>{inputError}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={cartStyles.body3}>Total:</Text>
                <Text style={{ fontSize: 24, fontFamily: "bold", color: COLORS.black, marginLeft: 12 }}>Rs. {totalPrice}</Text>
              </View>
            </View>

            <Button
              filled
              title="PLACE ORDER"
              isEnable={true}
              // onPress={() => navigation.navigate("PaymentMethod")}
              onPress={() => placeOrder()}
              style={{ marginVertical: 0 }}
            />
          </Animatable.View>
        )
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  error: {
    color: "red"
  },
  bannerContainer: {
    backgroundColor: '#f44c00',
    padding: 16,
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 12,
    // flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    fontSize: 20,
    fontFamily: 'bold',
    color: '#FFFFFF',
  },
  bannerDescription: {
    fontSize: 16,
    fontFamily: 'regular',
    color: '#FFFFFF',
  },
  progressContainer: {
    width: '90%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10
  },
  progressBar: {
    height: 8,
    backgroundColor: '#fff',
  },
  roundedBtn: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "#f44c00",
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Cart