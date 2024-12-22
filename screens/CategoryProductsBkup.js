import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { MaterialCommunityIcons, Octicons, Fontisto, AntDesign, Ionicons, Feather } from "@expo/vector-icons"
import { recentKeywords } from '../data/keywords'
import { popularBurgers } from '../data/foods'
import { Modal } from 'react-native'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import GeneralService from '../services/general.service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cartStyles } from '../styles/CartStyles'


const CategoryProducts = ({ route }) => {
  const { catId, catName } = route.params;
  const [cartCounter, setCartCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedStars, setSelectedStars] = useState(Array(5).fill(false));
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState(Array.from({ length: 6 }, (_, index) => ({ id: index, name: 'Loading...', image: '' })));

  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const getCartCounter = async () => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data: cartData } = cartResponse;
      // console.log(`home-data=${cartData}`);
      const { counter: cartNo, address } = cartData;
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

      getCartCounter();
    }, [])
  );


  const addCart = async (prodId) => {
    try {
      // setScreenLoading(true);
      const updatedProducts = products.map(product => {
        if (product.id === prodId) {
          return {
            ...product,
            quantity_added: parseInt(product.quantity_added || 0) + 1
          };
        }
        return product;
      });
      setProducts(updatedProducts);

      const timeout = 2000;
      let userId = await AsyncStorage.getItem("_id");

      const response = await Promise.race([
        GeneralService.addCart(userId, prodId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        // showToast('Added to cart');

        getCartCounter();
        // fetchProducts();
        // setScreenLoading(false);
      } else {
        throw new Error('No response from the server');
      }
    } catch (err) {
      // setScreenLoading(false);
    }
  }

  const decreaseQuantity = (prodId) => {
    const decreaseQnty = async () => {
      try {
        // setScreenLoading(true);

        const updatedProducts = products.map(product => {
          if (product.id === prodId) {
            return {
              ...product,
              quantity_added: parseInt(product.quantity_added || 0) - 1
            };
          }
          return product;
        });
        setProducts(updatedProducts);

        const timeout = 2000;
        let userId = await AsyncStorage.getItem("_id");
        const response = await Promise.race([
          GeneralService.decreaseQty(userId, prodId),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
        ]);

        if (response) {

          console.log(response);
          // showToast('Quantity decreased');

          getCartCounter();
          // setScreenLoading(false);
        } else {
          throw new Error('No response from the server');
        }
      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    decreaseQnty();
  };

  const removeCart = async (id) => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      setScreenLoading(true);

      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.addCart(userId, id),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        getCartCounter();
        // fetchProducts();
        setScreenLoading(false);
      } else {
        throw new Error('No response from the server');
      }
    } catch (err) {
      setScreenLoading(false);
    }
  }

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      let userId = await AsyncStorage.getItem("_id");
      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.listProductByCatCart(catId, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setProducts(response.data.response);
      } else {
        throw new Error('No response from the server');
      }
      // const response = await GeneralService.listProductByCat(catId);
      // setProducts(response.data.response);
      setProductsLoading(false);
      console.error('Featured products fetched');
    } catch (error) {
      setProductsLoading(false);
      setProducts([]);
      console.error('Error fetching featured:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [navigation]);

  const handleStarPress = (index) => {
    const newSelectedStars = selectedStars.map((_, i) => i <= index);
    setSelectedStars(newSelectedStars);
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
      <Text style={styles.headerTitle}>{catName}</Text>
    </View>
    );
  };
  // <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>{catName.toUpperCase()}</Text>
 

  const renderRestaurantDetails = () => {
    const navigation = useNavigation();
    return (
      <View style={{ marginTop: 16 }}>
        <View style={{ marginVertical: 16 }}>
          <FlatList
            horizontal={true}
            data={recentKeywords}
            keyExtractor={item => item.id}
            renderItem=
            {({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("FoodByKeywords")}
                style={{
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: COLORS.gray6,
                  borderRadius: 30,
                  paddingHorizontal: 10,
                  marginHorizontal: 8
                }}
                key={index}>
                <Text style={{ color: COLORS.tertiaryBlack, fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    )
  }

  const renderFoodsByCategories = () => {
    const navigation = useNavigation();
  
    const cardWidth = width / 2 - 35; // Dynamic width for cards
  
    const result = (
      <View style={styles.container}>
        {products.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('FoodDetails', {
                id: item.id,
                description: item.description,
                name: item.name,
                image: item.image,
                price: item.price,
                minQty: 1,
                type: 'kg',
              })
            }
            style={[styles.card, { width: cardWidth }]}
          >
            <Image
              source={{ uri: `https://api.veggieking.pk/public/upload/${item.image}` }}
              resizeMode="cover"
              style={styles.image}
            />
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>Rs. {item.price}</Text>
              <View style={styles.quantityContainer}>
                {item.quantity_added >= 1 && (
                  <>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.id)}
                      style={[styles.quantityButton, styles.decreaseButton]}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity_added}</Text>
                  </>
                )}
                <TouchableOpacity
                  onPress={() => addCart(item.id)}
                  style={[styles.quantityButton, styles.increaseButton]}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  
    const response =
      products.length > 0 ? (
        result
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No record found</Text>
        </View>
      );
  
    return response;
  };

  const renderSearchModal = () => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [isStarSelected, setIsStarSelected] = useState(false);

    const handleOfferSelection = (offer) => {
      setSelectedOffer(offer);
    }

    const handlePriceSelection = (price) => {
      setSelectedPrice(price);
    }

    const handleTimeSelection = (time) => {
      setSelectedTime(time)
    }
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPressOut={() => setModalVisible(false)}
          activeOpacity={0.1}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: SIZES.height,
            width: SIZES.width,
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                height: "auto",
                width: SIZES.width * 0.9,
                borderRadius: 12,
                backgroundColor: COLORS.white,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 12
                }}>
                <Text style={{ fontSize: 17, fontFamily: 'bold' }}>Filter your search</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={commonStyles.header3Icon}
                >
                  <Image
                    source={icons.close}
                    style={{
                      height: 24,
                      width: 24,
                      tintColor: COLORS.black
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>OFFERS</Text>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === "Delivery" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleOfferSelection("Delivery")}
                  >
                    <Text style={[selectedOffer === "Delivery" && styles.checkboxText]}>Delivery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === "Pick Up" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleOfferSelection("Pick Up")}
                  >
                    <Text style={[selectedOffer === "Pick Up" && styles.checkboxText]}>Pick Up</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === "Offer" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleOfferSelection("Offer")}
                  >
                    <Text style={
                      [
                        selectedOffer === "Offer" && styles.checkboxText
                      ]
                    }>Offer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedOffer === "Oline payment available" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleOfferSelection("Oline payment available")}
                  >
                    <Text style={
                      [
                        selectedOffer === "Oline payment available" && styles.checkboxText
                      ]
                    }>Oline payment available</Text>
                  </TouchableOpacity>

                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 2 }}>DELIVER TIME</Text>

                <View style={{ flexDirection: "row", marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === "10-15" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleTimeSelection("10-15")}
                  >
                    <Text style={[selectedTime === "10-15" && styles.checkboxText]}>10-15 min</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === "20" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleTimeSelection("20")}
                  >
                    <Text style={[selectedTime === "20" && styles.checkboxText]}>20 min</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTime === "30" && styles.selectedCheckbox
                    ]}
                    onPress={() => handleTimeSelection("30")}
                  >
                    <Text style={
                      [
                        selectedTime === "30" && styles.checkboxText
                      ]
                    }>30 min</Text>
                  </TouchableOpacity>

                </View>

              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>PRICING</Text>
                <View style={{ flexDirection: "row", marginVertical: 13 }}>
                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === "$" && styles.selectedCheckbox
                    ]}
                    onPress={() => handlePriceSelection("$")}
                  >
                    <Text style={[selectedPrice === "$" && styles.checkboxText]}>$</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === "$$" && styles.selectedCheckbox
                    ]}
                    onPress={() => handlePriceSelection("$$")}
                  >
                    <Text style={[selectedPrice === "$$" && styles.checkboxText]}>$$</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roundedCheckBoxContainer,
                      selectedPrice === "$$$" && styles.selectedCheckbox
                    ]}
                    onPress={() => handlePriceSelection("$$$")}
                  >
                    <Text style={
                      [
                        selectedPrice === "$$$" && styles.checkboxText
                      ]
                    }>$$$</Text>
                  </TouchableOpacity>


                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 10 }}>RATING</Text>
                <View style={{ flexDirection: 'row', marginVertical: 13 }}>
                  {selectedStars.map((isSelected, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.starContainer}
                      onPress={() => handleStarPress(index)}
                    >
                      <Ionicons
                        name="star-sharp"
                        size={24}
                        color={isSelected ? COLORS.primary : COLORS.gray}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Button
                title="FILTER"
                filled
                onPress={() => setModalVisible(false)}
                style={{
                  marginBottom: 12
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
        {renderHeader()}
      <View style={{ flex: 1, marginHorizontal: 16, marginTop: 10 }}>
        {
          screenLoading ?
            <ActivityIndicator size="large" color="blue" /> : null
        }
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* {renderRestaurantDetails()} */}
          {renderFoodsByCategories()}
        </ScrollView>
      </View>
      {renderSearchModal()}
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
  checkboxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.gray6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12

  },
  roundedCheckBoxContainer: {
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
  starContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.secondaryGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.gray6,
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'bold',
    marginVertical: 8,
    color: COLORS.black,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontFamily: 'bold',
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decreaseButton: {
    backgroundColor: COLORS.gray4,
    marginRight: 4,
  },
  increaseButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'regular',
    marginHorizontal: 4,
    color: COLORS.black,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'regular',
    color: COLORS.black,
  },

})

export default CategoryProducts