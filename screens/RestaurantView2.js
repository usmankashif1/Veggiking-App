import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import { MaterialCommunityIcons, Octicons, Fontisto, AntDesign } from "@expo/vector-icons"
import { recentKeywords } from '../data/keywords'
import { popularBurgers } from '../data/foods'
import ImageSlider from '../components/ImageSlider'
import { StatusBar } from 'expo-status-bar'

const RestaurantView2 = () => {
  

  const renderHeader = () => {
    const navigation = useNavigation();

    return (
      <View style={{
        position: 'absolute',
        top: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        width: SIZES.width - 32,
        zIndex: 999
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.header3Icon}
        >
          <Image
            resizeMode='contain'
            source={icons.arrowLeft}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Move to another screen")}
          style={commonStyles.header3Icon}
        >
          <Image
            resizeMode='contain'
            source={icons.more}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderRestaurantDetails = () => {
    const navigation = useNavigation();
    return (
      <View>
        <ImageSlider />

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="star" size={24} color={COLORS.primary} />
              <Text style={{ marginLeft: 8 }}>4.7</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: SIZES.padding3 }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
              <Text style={{ marginLeft: 8 }}>Free</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
              <Text style={{ marginLeft: 8 }}>20 min</Text>
            </View>
          </View>
          <Text style={{
            fontSize: 18,
            fontFamily: 'bold',
            textTransform: 'capitalize',
            marginVertical: 10
          }}>Spicy Restaurant</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: 'regular',
            color: COLORS.gray5
          }}>Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</Text>

          {/* Render Keyword related to restaurants */}
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
      </View>
    )
  }

  const renderFoodsByCategories = () => {
    const navigation = useNavigation()
    return (
      <View style={{ marginHorizontal: 16 }}>
        <Text style={{ ...FONTS.body3, marginBottom: 12 }}>Burger (10) </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: SIZES.width - 32,
          }}
        >
          {
            popularBurgers.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("FoodDetails")}
                key={index}
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  height: "auto",
                  width: 160,
                  borderWidth: 1,
                  borderColor: COLORS.gray6,
                  borderRadius: 15,
                  marginRight: "auto",
                }}>
                <Image
                  source={item.image}
                  style={{ width: "100%", height: 84, borderRadius: 15 }}
                />
                <Text style={{ fontSize: 14, fontFamily: "bold", marginVertical: 4 }}>{item.name}</Text>
                <Text style={{ fontSize: 13, fontFamily: "regular", marginVertical: 4 }}>{item.restaurant}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, fontFamily: 'bold' }}>${item.price}</Text>
                  <TouchableOpacity
                    onPress={() => console.log("Add to cart")}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.primary
                    }}>
                    <AntDesign name="plus" size={12} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderRestaurantDetails()}
          {renderFoodsByCategories()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default RestaurantView2