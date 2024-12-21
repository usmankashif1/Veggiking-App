import { View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons, MaterialCommunityIcons, Fontisto, Octicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { StatusBar } from 'expo-status-bar';
import GeneralService from '../services/general.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ingridents = [icons.salt, icons.chickenLeg, icons.onion, icons.chili];

const FoodDetailsV1 = ({ route }) => {
  const { id: prodId, name, description, image, price, minQty, quantity_added, type } = route.params;

  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [cartCounter, setCartCounter] = useState(0);
  const [screenLoading, setScreenLoading] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const fetchData = async (id) => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const response = await GeneralService.getProductCartById(id, userId);
      const { data } = response;
      const { response: res } = data;
      console.log(res);
      // console.log(`home-data=${cartData}`);
      // const { response: cartNo } = cartData;
      setQuantity(res);
    } catch (err) {
      console.log(err);
      setQuantity(0);
    }
  }

  const getCartCounter = async () => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data: cartData } = cartResponse;
      // console.log(`home-data=${cartData}`);
      const { response: cartNo } = cartData;
      setCartCounter(cartNo);

    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      // const cartCounter = async () => {
      //   let cartCounter = await AsyncStorage.getItem("cart_counter");
      //   console.log(`cart-counter=${cartCounter}`);
      //   setCartCounter(cartCounter);
      // };
      fetchData(prodId);
      getCartCounter();

    }, [])
  );

  const decreaseQuantity = (id) => {
    const decreaseQty = async () => {
      try {
        let userId = await AsyncStorage.getItem("_id");
        // const response = await GeneralService.decreaseQty(userId, id);

        const timeout = 8000;
        const response = await Promise.race([
          GeneralService.decreaseQty(userId, id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);
        // console.log(response.data.response);
        if (response) {
          fetchData(prodId);
          getCartCounter();

        } else {
          throw new Error('No response from the server');
        }
      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    decreaseQty();
  };

  const cartAddition = (id) => {
    console.log(`id=${id}`);

    const addCart = async () => {
      try {
        let userId = await AsyncStorage.getItem("_id");
        setScreenLoading(true);

        const timeout = 8000;
        const response = await Promise.race([
          GeneralService.addCart(userId, id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);

        if (response) {
          fetchData(prodId);
          // if (response.status == 200) {
          //   let cartCounter = await AsyncStorage.getItem("cart_counter");
          //   cartCounter = parseInt(cartCounter, 10);
          //   cartCounter++;
          //   await AsyncStorage.setItem("cart_counter", cartCounter.toString());
          // }

          getCartCounter();
          // setCartCounter(cartCounter);
          setScreenLoading(false);
        } else {
          throw new Error('No response from the server');
        }
      } catch (err) {
        setScreenLoading(false);
      }
    }
    addCart();
  }

  const renderHeader = () => {
    const navigation = useNavigation();
    return (
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
          <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Product Details</Text>
        </View>
        {/* <View style={{
          height: 45,
          width: 45,
          borderRadius: 22.5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.tertiaryBlack
        }}>
          <View>
            <View style={{
              position: 'absolute',
              top: -16,
              left: 12,
              backgroundColor: COLORS.primary,
              height: 25,
              width: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12.5,
              zIndex: 999
            }}>
              <Text style={{
                fontSize: 16,
                color: COLORS.white
              }}>{cartCounter}</Text>
            </View>
            <Feather name="shopping-bag" size={24} color={COLORS.white} />
          </View>
        </View> */}
      </View>
    );
  };

  const renderFoodDetails = () => {
    const [isFavourite, setIsFavourite] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    }


    return (
      <View style={{ marginVertical: 16 }}>
        <View>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            style={{
              position: 'absolute',
              bottom: 18,
              right: 18,
              zIndex: 999,
              height: 37,
              width: 37,
              borderRadius: 18.5,
              backgroundColor: 'rgba(255,255,255,0.6)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Ionicons
              name={isFavourite ? "heart-sharp" : "heart-outline"}
              size={24}
              color={isFavourite ? COLORS.primary : COLORS.white} />
          </TouchableOpacity>
          <Image
            source={{ uri: `https://api.veggieking.pk/public/upload/${image}` }}
            resizeMode='contain'
            style={{
              width: SIZES.width - 32,
              height: 190,
              borderRadius: 32,
              borderColor: COLORS.gray6,
              borderWidth: 2
            }}
          />
        </View>
        <View style={{ marginVertical: 16 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 22, fontFamily: 'bold', textTransform: 'capitalize', marginVertical: 0 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 22, fontFamily: 'regular' }}>
              Rs. {price}
            </Text>
          </View>

          <Text style={{
            fontSize: 22,
            fontFamily: 'bold',
            textTransform: 'capitalize',
            marginVertical: 15
          }}>Description</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: '100%' }}>
              <Text style={{
                fontSize: 16,
                fontFamily: 'regular',
                textTransform: 'capitalize',
                color: COLORS.black,
                // fontSize: 14,
                fontFamily: 'regular',
                textAlign: 'justify',
                hyphens: 'auto',
              }}>{description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderHeader()}
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {renderFoodDetails()}
        {/* </ScrollView> */}
        <View style={styles.addToCartContainer}>
          <View style={{
            backgroundColor: COLORS.tertiaryGray,
            borderRadius: 24,
            paddingHorizontal: 10,
            paddingVertical: 16,
            position: 'relative'
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
            </View>
            {quantity > 0 ? (
              <View style={quantityStyle.container}>
                <TouchableOpacity onPress={() => decreaseQuantity(prodId)} style={quantityStyle.button}>
                  <Text style={quantityStyle.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={quantityStyle.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={() => cartAddition(prodId)} style={quantityStyle.button}>
                  <Text style={quantityStyle.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Button
                filled
                onPress={() => cartAddition(prodId)}
                isEnable={true}
                title={`ADD TO CART`}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12
  },
  selectedCheckbox: {
    backgroundColor: COLORS.primary
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'regular'
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
});

const quantityStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    borderRadius: 5,
    borderColor: '#ccc',
    overflow: 'hidden', // Clip any content that exceeds the container
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 30,
  },
  // Apply borders only to the buttons and quantity text
  buttonBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  quantityBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});


export default FoodDetailsV1;
