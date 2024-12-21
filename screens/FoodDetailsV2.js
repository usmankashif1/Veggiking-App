import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons, Fontisto, Octicons } from "@expo/vector-icons";
import { ScrollView } from 'react-native-virtualized-view'
import Button from "../components/Button"
import { StatusBar } from 'expo-status-bar'

const ingridents = [icons.salt, icons.chickenLeg, icons.onion, icons.chili]
const FoodDetailsV2 = () => {

  const renderFoodDetails = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(2);
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false)

    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    }
    return (
      <View style={{ marginVertical: 16, marginHorizontal: 16 }}>
        {/* Food details images */}
        <View>
          <View style={{
            flexDirection: 'row',
            position: 'absolute',
            Top: 50,
            zIndex: 999,
            width: SIZES.width - 32,
            paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
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
            <TouchableOpacity
              onPress={() => setIsFavourite(!isFavourite)}
              style={{
                height: 45,
                width: 45,
                borderRadius: 22.5,
                backgroundColor: 'rgba(255,255,255,0.6)',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Ionicons
                name={isFavourite ? "heart-sharp" : "heart-outline"}
                size={24}
                color={isFavourite ? COLORS.primary : COLORS.white} />
            </TouchableOpacity>
          </View>
          <Image
            source={images.food}
            resizeMode='contain'
            style={{
              width: SIZES.width - 32,
              height: 184,
              borderRadius: 32
            }}
          />
        </View>
        {/* Food details infos */}
        <View style={{ marginVertical: 16 }}>
          <View style={{
            flexDirection: 'row',
            height: 47,
            width: 220,
            borderRadius: 50,
            paddingHorizontal: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.gray6,
          }}>
            <Image
              source={images.restaurantLogo}
              resizeMode='contain'
              style={{
                width: 22,
                height: 22
              }}
            />
            <Text
              style={{
                marginLeft: 12,
                fontFamily: 'regular',
                fontSize: 14
              }}
            >Uttora Coffe House</Text>
          </View>
          <Text style={{
            fontSize: 18,
            fontFamily: 'bold',
            textTransform: 'capitalize',
            marginVertical: 10
          }}>pizza calzone european</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: 'regular',
            color: COLORS.gray5
          }}>
            Prosciutto e funghi is a pizza variety that is topped with tomato sauce.</Text>

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

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 14, fontFamily: "regular", marginRight: 20 }}>SIZE: </Text>

            <View style={{ flexDirection: "row", marginVertical: 18 }}>
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "10”" && styles.selectedCheckbox
                ]}
                onPress={() => handleSizeSelection("10”")}
              >
                <Text style={[selectedSize === "10”" && styles.checkboxText]}>10”</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "14”" && styles.selectedCheckbox
                ]}
                onPress={() => handleSizeSelection("14”")}
              >
                <Text style={[selectedSize === "14”" && styles.checkboxText]}>14”</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedSize === "16”" && styles.selectedCheckbox
                ]}
                onPress={() => handleSizeSelection("16”")}
              >
                <Text style={
                  [
                    selectedSize === "16”" && styles.checkboxText
                  ]
                }>16”</Text>
              </TouchableOpacity>


            </View>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontFamily: 'regular', textTransform: 'uppercase' }}>ingridents</Text>
            <View style={{ flexDirection: 'row', marginVertical: 16 }}>
              {
                ingridents.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.orange,
                      marginRight: 16
                    }}>
                    <Image
                      source={item}
                      resizeMode='contain'
                      style={{
                        height: 24,
                        width: 24,
                        tintColor: COLORS.primary
                      }}
                    />
                  </View>
                ))
              }
            </View>
          </View>

          <View style={{
            backgroundColor: COLORS.tertiaryGray,
            borderRadius: 24,
            paddingHorizontal: 10,
            paddingVertical: 16
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <Text style={{ fontSize: 28, fontFamily: 'regular' }}>$32</Text>
              <View style={{
                backgroundColor: COLORS.blue,
                width: 125,
                height: 48,
                borderRadius: 24,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity
                  onPress={() => {
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
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
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
            </View>
            <Button
              filled
              title="ADD TO CART"
              onPress={() => navigation.navigate("Cart")}
            />
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderFoodDetails()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

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
})

export default FoodDetailsV2