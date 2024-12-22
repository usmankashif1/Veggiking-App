import { View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
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

  const navigation = useNavigation(); // Add useNavigation hook here

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const fetchData = async (id) => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const response = await GeneralService.getProductCartById(id, userId);
      const { data } = response;
      const { response: res } = data;
      setQuantity(res);
    } catch (err) {
      console.log(err);
      setQuantity(0);
    }
  };

  const getCartCounter = async () => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data: cartData } = cartResponse;
      const { response: cartNo } = cartData;
      setCartCounter(cartNo);
    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(prodId);
      getCartCounter();
    }, [])
  );

  const decreaseQuantity = (id) => {
    const decreaseQty = async () => {
      try {
        let userId = await AsyncStorage.getItem("_id");

        const timeout = 8000;
        const response = await Promise.race([
          GeneralService.decreaseQty(userId, id),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);

        if (response) {
          fetchData(prodId);
          getCartCounter();
        } else {
          throw new Error('No response from the server');
        }
      } catch (err) {
        console.log(err?.response?.data);
      }
    };

    decreaseQty();
  };

  const cartAddition = (id) => {
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
          getCartCounter();
          setScreenLoading(false);
        } else {
          throw new Error('No response from the server');
        }
      } catch (err) {
        setScreenLoading(false);
      }
    };
    addCart();
  };

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
        <Text style={styles.headerTitle}>Product Detail</Text>
      </View>
    );
  };

  const renderFoodDetails = () => {
    const [isFavourite, setIsFavourite] = useState(false);

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
          <Text style={styles.foodName}>{name}</Text>
          <Text style={styles.foodPrice}>Rs. {price}</Text>
          <Text style={styles.descriptionTitle}>Description</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.foodDescription}>{description}</Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      {renderHeader()}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderFoodDetails()}
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
            }} />
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    elevation: 3,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
    color: COLORS.white,
  },
  foodName: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  foodPrice: {
    fontSize: 22,
    fontWeight: 'regular',
    color: COLORS.primary,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    textTransform: 'capitalize',
  },
  foodDescription: {
    fontSize: 16,
    fontFamily: 'regular',
    textAlign: 'justify',
    color: COLORS.black,
    lineHeight: 24,
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
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#ccc',
    overflow: 'hidden',
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
});

export default FoodDetailsV1;
