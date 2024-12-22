import {
  Dimensions, View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList,
  ActivityIndicator, Alert, useWindowDimensions, Animated
} from
  'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS, FONTS, SIZES, icons, images } from '../constants'
import { Feather, Ionicons, MaterialIcons, AntDesign, Octicons, MaterialCommunityIcons, Fontisto } from
  "@expo/vector-icons"
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import CustomModal from '../components/CustomModal'
import Carousel from 'react-native-reanimated-carousel';
import restaurant6 from '../assets/images/restaurants/restaurant6.png';
import GeneralService from '../services/general.service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { categories } from '../data/categories'
import MyLoader from './MyLoader'
import { ToastAndroid } from 'react-native';
import { cartStyles } from '../styles/CartStyles'
import { useCart } from '../context/CartContext';
import { debounce } from 'lodash';
const placeholderImage = require('../assets/images/restaurants/restaurant6.png');

const HomeV2 = ({ navigation }) => {
  const [loadedImages, setLoadedImages] = useState(Array(1).fill(false));

  const [scrollOffset, setScrollOffset] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollOffset(contentOffset.y);
  };

  const { updateCartCounter, updateUserAddress, addItemToCart, removeItemFromCart, decreaseQty, cartItems } = useCart();
  const [sliders, setSliders] = useState([restaurant6]);
  // const [sliders, setSliders] = useState(Array.from({ length: 6 }, (_, index) => ({ id: index, name: 'Loading...', image: '' })));
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationData, setNotificationData] = useState({});

  const [userAddress, setUserAddress] = useState('');
  const [cartCounter, setCartCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [featureLoading, setFeatureLoading] = useState(false);
  const [featureProd, setFeatureProd] = useState(Array.from({ length: 6 }, (_, index) => ({ id: index, name: 'Loading...', image: '' })));
  const [category, setCategory] = useState(Array.from({ length: 6 }, (_, index) => ({ id: index, name: 'Loading...', image: '' })));
  const [moreProd, setMoreProd] = useState([]);
  const [vegetables, setVegetables] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [fruits, setFruits] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [dryFruits, setDryFruits] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [snacks, setSnacks] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [spices, setSpices] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [peeledVgs, setPeeledVgs] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [meat, setMeat] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [milk, setMilk] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [aata, setAata] = useState(Array.from({ length: 4 }, (_, index) => ({ id: index, name: 'Loading...', image: '', price: '', quantity_added: '' })));
  const [prodCategory, setProdCategory] = useState([]);
  const [prodCatLoading, setProdCatLoading] = useState(false);
  const [storedNotificationId, setStoredNotificationId] = useState(null);

  const navigate = useNavigation();

  const handleImageLoad = (index) => {
    const newLoadedImages = [...loadedImages];
    newLoadedImages[index] = true;
    setLoadedImages(newLoadedImages);
  };

  useEffect(() => {
    const preloadImages = async () => {
      const promises = sliders.map((item, index) =>
        Image.prefetch(`https://api.veggieking.pk/public/upload/${item}`).then(() => {
          const newLoadedImages = [...loadedImages];
          newLoadedImages[index] = true;
          setLoadedImages(newLoadedImages);
        })
      );
      await Promise.all(promises);
    };

    preloadImages();
  }, []);


  const handlePressGotIt = async () => {
    setModalVisible(false);
    const notificationId = notificationData.id;
    // console.log(`not-id=${notificationData.id}`);
    // await AsyncStorage.setItem('notificationAcknowledged', 'true');
    await AsyncStorage.setItem('storedNotificationId', notificationId.toString()); // Store the new notification ID
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCartCounterNew = async () => {
    try {
      const response = await cartCounting();
      console.log(`counter=${response}`);
      setCartCounter(response);

    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  }

  const getQuantityInCart = (productId) => {
    // console.log(`id=${productId}`);
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const decreaseQuantity = (catId, prodId, product) => {
    const decreaseQnty = async () => {
      try {
        if (catId == 1) {
          const updatedProducts = fruits.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setFruits(updatedProducts);
        } else if (catId == 2) {
          const updatedProducts = vegetables.map(product => {
            console.log(product);
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setVegetables(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 8) {
          const updatedProducts = dryFruits.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setDryFruits(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 9) {
          const updatedProducts = snacks.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setSnacks(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 13) {
          const updatedProducts = spices.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setSpices(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 12) {
          const updatedProducts = peeledVgs.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setPeeledVgs(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 14) {
          const updatedProducts = meat.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setMeat(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 15) {
          const updatedProducts = milk.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setMilk(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 16) {
          const updatedProducts = aata.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) - 1
              };
            }
            return product;
          });
          setAata(updatedProducts);
          console.log(updatedProducts);
        }

        decreaseQty(product);
      } catch (err) {
        console.log(err);
      }
    }
    // getCartCounter();
    decreaseQnty();
  };

  const decreaseQuantityNew = (id) => {
    const decreaseQnty = async () => {
      try {
        console.log(id);
        // let userId = await AsyncStorage.getItem("_id");
        const response = await decreaseQty(id);
        // console.log(response.data.response);
        // getCartCounter();
        // fetchData();

      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    decreaseQnty();
  };

  const increaseQuantity = (id) => {
    console.log(id);
    const increaseQty = async () => {
      try {
        let userId = await AsyncStorage.getItem("_id");
        // let userId = 1;
        const response = await GeneralService.increaseQty(userId, id);
        const { data: cartData } = response;
        // console.log(`home-data=${cartData}`);
        const { response: cartNo } = cartData;
        setCartCounter(cartNo);


        // const response = await addToCart(id);
        // console.log(response.data.response);
        // getCartCounter();

        // fetchData();

      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    increaseQty();
    // setQuantity(quantity + 1);
  };

  const increaseQuantityNew = (id) => {
    const increaseQty = async () => {
      try {
        // let userId = await AsyncStorage.getItem("_id");
        const response = await addToCart(id);
        // console.log(response.data.response);
        getCartCounter();

        fetchData();

      } catch (err) {
        console.log(err?.response?.data);
      }
    }

    increaseQty();
    // setQuantity(quantity + 1);
  };

  const fetchNotifiaction = async () => {
    try {
      const response = await GeneralService.getNotification();
      const { data } = response;
      const { response: res } = data;
      const { id, body, body2, heading, button } = res;
      // console.log(`fetch-id=${id}`);

      // setNotificationData({ body: res.body, body2: res.body2, heading: res.heading, button: res.button });
      // setModalVisible(res.notification_status == 'yes' ? true : false);

      const storedId = await AsyncStorage.getItem('storedNotificationId');
      // console.log(`id=${id}, store-id=${storedId}`);
      if (id != storedId) {
        // console.log("not calling");
        setNotificationData({ id: id, body: res.body, body2: res.body2, heading: res.heading, button: res.button });
        setModalVisible(true); // Show the modal
        setStoredNotificationId(id); // Store the new notification ID
      }
      // if (res.notification_status === 'yes' && !(await AsyncStorage.getItem('notificationAcknowledged'))) {
      //   setNotificationData({ body: res.body, body2: res.body2, heading: res.heading, button: res.button });
      //   setModalVisible(true); // Show the modal
      // }
      // console.log(`home-data=${cartData}`);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchSliders = async () => {
    try {
      const response = await GeneralService.getSliders();
      const { data } = response;
      const { response: res } = data;
      // console.log(res.map(item => item.image));
      setSliders(res.map(item => item.image));
      // setSliders(["restaurant6.png"]);
      // const url = "https://api.veggieking.pk/public/upload/";
      // setSliders(res.map(item => ({ source: { uri: url + item.image } })));

    } catch (err) {
      console.log(err);
    }
  }

  const getCartCounter = async () => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const cartResponse = await GeneralService.cartCounterByUserId(userId);
      const { data: cartData } = cartResponse;
      // console.log(`home-data=${cartData}`);
      const { counter: cartNo, address } = cartData;
      setCartCounter(cartNo);
      updateCartCounter(cartNo);
      updateUserAddress(address);
    } catch (err) {
      console.log(err);
      setCartCounter(0);
    }
  }

  
  const addCart = async (catId, prodId, product) => {
    // if (!loggedInId) {
    //   navigate("/sign-in");
    // }

    // alert(JSON.stringify(product));
    let allowdStock = product.stock_available;
    let allowdQty = product.max_qty;
    let addedQty = getQuantityInCart(prodId);

    const increaseQnty = async () => {
      try {
        if (catId == 1) {
          const updatedProducts = fruits.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setFruits(updatedProducts);
        } else if (catId == 2) {
          const updatedProducts = vegetables.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setVegetables(updatedProducts);
          // console.log(updatedProducts);
        } else if (catId == 8) {
          const updatedProducts = dryFruits.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setDryFruits(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 9) {
          const updatedProducts = snacks.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setSnacks(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 13) {
          const updatedProducts = spices.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setSpices(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 12) {
          const updatedProducts = peeledVgs.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setPeeledVgs(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 14) {
          const updatedProducts = meat.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setMeat(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 15) {
          const updatedProducts = milk.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setMilk(updatedProducts);
          console.log(updatedProducts);
        } else if (catId == 16) {
          const updatedProducts = aata.map(product => {
            if (product.id === prodId) {
              return {
                ...product,
                quantity_added: parseInt(product.quantity_added || 0) + 1
              };
            }
            return product;
          });
          setAata(updatedProducts);
          console.log(updatedProducts);
        }

        addItemToCart(product);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(`${parseInt(allowdStock)}`);
    // getCartCounter();
    if (parseInt(addedQty) < parseInt(allowdStock)) {
      if (parseInt(addedQty) < parseInt(allowdQty)) {
        increaseQnty();
      }
    }
  }

  const fetchAllProducts = async () => {
    const response = await GeneralService.listAllProducts();
    // console.log(`all-products=${JSON.stringify(response.data.response)}`);
    const { response: res } = await syncProducts(response.data.response);
    // console.log(`sync-status=${res}`);
  }

  useEffect(() => {
    // fetchAllProducts();

  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Code to run when the screen gains focus
      categories();
      // featureProducts();
      fetchVegetables();
      fetchFruits();
      fetchDryFruits();
      fetchSnacks();
      fetchSpices();
      fetchPeeledVgs();
      fetchMeat();
      // cartCounter();
      fetchAddress();
      fetchMilk();
      fetchAata();
      // fetchVegetables();
      // fetchFruits();
      // Cleanup function (optional)
      return () => {
        // fetchAllProducts();

        // Code to run when the screen loses focus
        // console.log('cart Screen blurred');
      };
    }, [])
  );

  const categories = async () => {
    try {
      setCategoryLoading(true);

      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.listAllCategories(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setCategory(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setCategoryLoading(false);
    } catch (error) {
      console.log(error);
      setCategoryLoading(false);
      setCategory([]);
      Alert.alert("Error", "No response from server");
    }
  };

  const featureProducts = async () => {
    try {
      setFeatureLoading(true);
      let userId = await AsyncStorage.getItem("_id");
      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.listFeaturedProductByCart(userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        console.log(response.data.response);
        setFeatureProd(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setFeatureProd([]);
    }
  };


  const fetchVegetables = async () => {
    try {
      setFeatureLoading(true);

      let userId = await AsyncStorage.getItem("_id");
      console.log(`user-id=${userId}`);
      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(2, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);
      // console.log(response.data.response);
      if (response) {
        setVegetables(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setVegetables([]);
    }
  };

  const fetchFruits = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(1, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        console.log(response.data.response);
        setFruits(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setFruits([]);
    }
  };

  const fetchDryFruits = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(8, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setDryFruits(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setDryFruits([]);
    }
  };

  const fetchSnacks = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(9, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setSnacks(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setSnacks([]);
    }
  };

  const fetchSpices = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(13, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setSpices(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setSpices([]);
    }
  };

  const fetchPeeledVgs = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(12, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setPeeledVgs(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setFeatureLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setFeatureLoading(false);
      setPeeledVgs([]);
    }
  };

  const fetchMeat = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(14, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setMeat(response.data.response);
      } else {
        throw new Error('No response from the server');
      }
      setFeatureLoading(false);
    } catch (error) {
      setFeatureLoading(false);
      setMeat([]);
    }
  };

  const fetchMilk = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(15, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setMilk(response.data.response);
      } else {
        throw new Error('No response from the server');
      }
      setFeatureLoading(false);
    } catch (error) {
      setFeatureLoading(false);
      setMilk([]);
    }
  };

  const fetchAata = async () => {
    try {
      setFeatureLoading(true);

      const timeout = 8000;
      let userId = await AsyncStorage.getItem("_id");
      const response = await Promise.race([
        GeneralService.listLimProductByCatCart(16, userId),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setAata(response.data.response);
      } else {
        throw new Error('No response from the server');
      }
      setFeatureLoading(false);
    } catch (error) {
      setFeatureLoading(false);
      setAata([]);
    }
  };

  const productsByCategory = async (id) => {
    try {
      setProdCatLoading(true);

      const timeout = 8000;
      const response = await Promise.race([
        GeneralService.listProductByCat(id),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
      ]);

      if (response) {
        setProdCategory(response.data.response);
      } else {
        throw new Error('No response from the server');
      }

      setProdCatLoading(false);
      // console.error('More products fetched');
    } catch (error) {
      setProdCatLoading(false);
      setProdCategory([]);
    }
  };

  const fetchAddress = async () => {
    let userAddress = await AsyncStorage.getItem("user_address");
    // let cartCounter = await AsyncStorage.getItem("cart_counter");
    // console.log(userAddress);
    setUserAddress(userAddress);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartCounter();
      fetchNotifiaction();
      fetchSliders()
    }, [])
  );

  const renderCarousel = () => {
    const width = Dimensions.get('window').width;
    return (
      <View style={{ height: "auto" }}>
        <View style={{
          marginVertical: 10,
        }}>
        </View>

        <Carousel loop width={width} height={width / 3} autoPlay={true} data={sliders}
          scrollAnimationDuration={3500}
          // onSnapToItem={(index) => console.log('current index:', index)}
          style={{
            width: SIZES.width - 32,
            borderColor: COLORS.tertiaryGray,
            borderWidth: 1,
            paddingBottom: 2,
            marginBottom: 12,
            borderRadius: 15
          }}
          renderItem={({ item, index }) => (
            // console.log(item),
            <View style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
              {loadedImages[index] ? (
                <Image
                  source={{ uri: `https://api.veggieking.pk/public/upload/${item}` }}
                  onLoad={() => handleImageLoad(index)}
                  style={{
                    width: SIZES.width - 1,
                    height: width / 2,
                    borderRadius: 15
                  }}
                />
              ) : (
                <Image
                  source={placeholderImage}
                  style={{
                    width: SIZES.width - 1,
                    height: width / 2,
                    borderRadius: 15
                  }}
                />
              )}

            </View>
          )}
        />
      </View>
    );
  }

  const renderProductItem = () => {
    // return (
    <TouchableOpacity style={{
      alignItems: 'center',
      margin: 8,
    }} onPress={() => navigateToProductView(item.id)}
    >
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
      }}>
        <Image source={item.image} style={{ width: '50%', height: '100%', borderRadius: 50 }} />
      </View>
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ color: 'green' }}>{item.discount}</Text>
    </TouchableOpacity>
    // );

    return (
      <FlatList data={products} keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProductItem}
        contentContainerStyle={{ padding: 16 }}
      />
    )
  }

  const renderCategoriesOld = () => {
    let result = <>
      <View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 8,
          alignItems: 'center',
        }}>
          <Text style={{ ...FONTS.body2 }}>Categories</Text>
        </View>

        <FlatList
          ref={flatListRef}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={category}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <TouchableOpacity key={index} onPress={() => navigate.navigate("CategoryProducts", {
                  catId: item.id, catName:
                    item.name
                })}
                >
                  <View style={{
                    height: 90,
                    width: 90,
                    borderRadius: 61,
                    overflow: 'hidden',
                    shadowColor: '#F1F1F1',
                    margin: 5,
                    shadowOffset: {
                      width: 12,
                      height: 12,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    elevation: 0.1,
                    borderColor: COLORS.tertiaryGray,
                    borderWidth: 2,
                    backgroundColor: 'orange',
                    borderColor: "#c65201",
                  }}>
                    <Image source={{ uri: `https://api.veggieking.pk/public/upload/${item.image}` }} resizeMode='cover'
                      style={{
                        flex: 1,
                        height: '100%',
                        width: '100%',
                      }} />
                  </View >
                  <Text style={{ fontSize: 16, fontFamily: 'bold', marginTop: 10, textAlign: 'center' }}>{item.name}</Text>
                </TouchableOpacity >
              </View >
            )
          }}
        />
      </View >
    </>

    let response = category.length > 0 ? result : <View style={{ flex: 1 }}>
      <Text style={{
        color: COLORS.black,
        fontSize: 14,
        fontFamily: 'regular',
        textAlign: 'center'
      }}>No record found</Text></View>;

    response = categoryLoading ?
      <ActivityIndicator size="large" color="blue" /> : result
    return (
      response
    )
  }

  const renderCategories = () => {
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 4 : 3;  // Adjusting columns for mobile vs desktop views
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Create the infinite scroll effect
    const extendedCategories = [...category, ...category]; // Duplicate the array for infinite scroll
  
    useEffect(() => {
      const interval = setInterval(() => {
        // Loop over the original category array, ensuring smooth transition
        setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
      }, 2000); // Auto-slide every 2 seconds
  
      return () => clearInterval(interval);
    }, [category.length]);
  
    useEffect(() => {
      // This effect controls the sliding behavior with animation
      Animated.timing(scrollX, {
        toValue: currentIndex * (width / numColumns),
        duration: 500, // Smooth transition duration
        useNativeDriver: true,
      }).start();
    }, [currentIndex, width, numColumns]);
  
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
        </View>
  
        <View>
          <Animated.View
            style={{
              flexDirection: 'row',
              transform: [{ translateX: Animated.multiply(scrollX, -1) }], // Controls the smooth horizontal scroll
            }}
          >
            {extendedCategories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("CategoryProducts", { catId: item.id, catName: item.name })}
                style={{
                  alignItems: 'center',
                  marginBottom: 15,
                  width: `${100 / numColumns}%`, // Adjust item width based on number of columns
                  paddingHorizontal: 5, // To prevent item overcrowding on small screens
                }}
              >
                <View
                  style={{
                    height: width > 600 ? 120 : 100,  // Adjust circle size based on screen width
                    width: width > 600 ? 120 : 100,   // Same here for consistency
                    borderRadius: 60,
                    overflow: 'hidden',
                    shadowColor: '#000', 
                    shadowOffset: { width: 5, height: 5 }, 
                    shadowOpacity: 0.7,
                    shadowRadius: 10,
                    elevation: 10, 
                    borderWidth: 3,
                    borderColor: 'rgb(129, 196, 8)', 
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{ scale: 1.05 }],
                    transition: 'transform 0.3s',
                  }}
                >
                  <Image
                    source={{ uri: `https://api.veggieking.pk/public/upload/${item.image}` }}
                    resizeMode="cover"
                    style={{
                      flex: 1,
                      height: '100%',
                      width: '100%',
                      borderRadius: 60,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      backgroundColor: 'rgb(129, 196, 8)',
                      width: '100%',
                      alignItems: 'center',
                      paddingVertical: 5, 
                      justifyContent: 'center',
                      paddingHorizontal: 8, 
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15, 
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width > 600 ? 10 : 8,  // Decreased font size on mobile for better fit
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      numberOfLines={1} // Ensure text stays on a single line
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </View>
    );
  };
  

  const renderVerticalProducts = (id, title, data, isLast) => {
    const [quantity, setQuantity] = useState(1);
    const windowWidth = Dimensions.get('window').width;
    const horizontalSpacing = 13; // Adjust as needed
    const marginRight = 13; // Adjust as needed
    const itemWidth = (windowWidth - 2 * horizontalSpacing - marginRight) / 2;
    // const itemWidth = (windowWidth - 24) / 2;

    const numColumns = 2;
    let marginBottomStyle = {};
    if (isLast) {
      marginBottomStyle = { marginBottom: "20%" };
    }

    // let result = <View style={{ flex: 1, ...marginBottomStyle }}>
    let result = <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal: 16
      }}>
        <Text style={{ ...FONTS.body2, fontFamily: "bold", color: COLORS.primary }}>{title}</Text>

        <TouchableOpacity onPress={() => navigate.navigate("CategoryProducts", {
          catId: id, catName: title
        })}
          style={{ flexDirection: 'row', alignItems: 'center', position: "absolute", right: 6 }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'bold', color: COLORS.primary }}>See All</Text>
          <View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          if (quantity > 2) {
            setQuantity(quantity - 1)
          }
        }}
          style={{
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.2)'
          }}
        >
          <Text style={{ color: COLORS.white }}>-</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: COLORS.white }}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}
          style={{
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.2)'
          }}
        >
          <Text style={{ color: COLORS.white }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          // horizontal={true}
          numColumns={numColumns}
          data={data} keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          style={{
            marginBottom: "5%",
          }}
          renderItem={({ item, index }) => {
            // console.log(`${item.stock_available}`);
            return (
              <TouchableOpacity
              onPress={() =>
                navigation.navigate("FoodDetails", {
                  id: item.id,
                  description: item.description,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  minQty: 1,
                  quantity_added: item.quantity_added,
                  type: "kg",
                  stock: item.stock_available,
                  max_qty: item.max_qty,
                })
              }
              key={index}
              style={{
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingVertical: 10,
                width: itemWidth,
                borderWidth: 1,
                borderColor: COLORS.gray6,
                borderRadius: 15,
                marginRight: 10,
                marginBottom: 16,
                backgroundColor: '#fff',  // Adds a clean white background
                shadowColor: "#000",  // Adds shadow for depth effect
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 2,
                transition: 'all 0.3s ease-in-out',  // Smooth transition effect
              }}
            >
              {/* Image */}
              <Image
                source={{ uri: `https://api.veggieking.pk/public/upload/${item.image}` }}
                resizeMode='cover'
                style={{
                  width: "100%",
                  height: 110,  // Increased height for better image view
                  borderRadius: 15,
                  transition: 'transform 0.3s ease-in-out',  // Smooth zoom effect on hover
                }}
              />
            
              {/* Product Name */}
              <Text style={{
                fontSize: 14,
                fontFamily: "bold",
                marginVertical: 6,
                color: COLORS.primary,  // Highlighting the name with primary color
                flex: 1,  // Make this take available space
              }}>
                {item.name}
              </Text>
            
              {/* Price and Cart Actions */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8,  // Space between text and buttons
              }}>
                {item.stock_available > 0 && (<Text style={{ fontSize: 16, fontFamily: 'bold', color: COLORS.black }}>Rs. {item.price}</Text>)}
                {item.stock_available == 0 && (
    <View style={styles.outOfStockBadge}>
        <Text style={styles.outOfStockText}>Out of Stock</Text>
    </View>
)}                 {
              item.stock_available > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {getQuantityInCart(item.id) > 0 && (
                    <>
                      <TouchableOpacity
                        onPress={() => decreaseQuantity(id, item.id, item)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: '#7cc000',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 6,
                        }}
                      >
                        <Text style={{ color: COLORS.white, fontSize: 16 }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ fontSize: 16, marginHorizontal: 4 }}>
                        {getQuantityInCart(item.id)}
                      </Text>
                    </>
                  )}
                  <TouchableOpacity
                    onPress={() => addCart(id, item.id, item)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: '#f44c00',  // Button with brand color
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontSize: 16 }}>+</Text>
                  </TouchableOpacity>
                </View>
              )
            }
              </View>
            </TouchableOpacity>
            
            )
          }}
        />
      </View>
    </View>;

    let response = data.length > 0 && result;

    // response = featureLoading ? <ActivityIndicator size="large" color="blue" /> : result
    // response = result
    return (
      response
    );
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <StatusBar hidden={true} />
        <View style={{
          flexDirection: 'row',
          justifyContent: "space-between",
          alignItems: 'center',
          marginTop: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}
              style={{
                height: 45,
                width: 45,
                borderRadius: 22.5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.secondaryGray
              }}>
              <Image source={icons.menu} style={{
                height: 24,
                width: 24,
              }} />
            </TouchableOpacity>
            <View style={{
              flexDirection: 'column',
              marginLeft: 12
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: COLORS.primary
              }}>Veggie King</Text>
              {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'regular'
                }}>{userAddress ?? "N/A"}</Text>
              </View> */}
            </View>
          </View>
        </View>

        {
          screenLoading ?
            <ActivityIndicator size="large" color="blue" /> : null
        }

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: "15%" }}>
          {renderCarousel()}
          {renderCategories()}
          {/* {renderFeatureProducts()} */}
          {renderVerticalProducts(2, "Vegetables", vegetables)}
          {renderVerticalProducts(1, "Fruits", fruits)}
          {renderVerticalProducts(8, "Dry Fruits", dryFruits)}
          {renderVerticalProducts(9, "Snacks", snacks)}
          {renderVerticalProducts(13, "Spices", spices)}
          {renderVerticalProducts(12, "Peeled Vgs", peeledVgs)}
          {renderVerticalProducts(14, "Meat", meat)}
          {renderVerticalProducts(15, "Milk", milk)}
          {renderVerticalProducts(16, "Desi Chakki Aata", aata)}
          {/* {featureProducts()} */}
          {/* {renderVegetables()} */}
          {/* {renderProducts("Vegetables", "vegetables", vegetables)} */}
          {/* {renderProducts("Fruits", "fruits", fruits, true)} */}
        </ScrollView>
      </View>
      <CustomModal heading={notificationData.heading} body={notificationData.body} body2={notificationData.body2}
        button={notificationData.button}
        modalVisible={modalVisible} setModalVisible={setModalVisible} onPressGotIt={handlePressGotIt}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  outOfStockBadge: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start', // Align the badge to the start of the container
    marginVertical: 5, // Add some spacing around the badge
},
outOfStockText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'bold', // Ensure you have the custom font set up, or use a system font
    textAlign: 'center',
},
})

export default HomeV2