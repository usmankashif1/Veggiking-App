import { View, Text, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import * as Animatable from "react-native-animatable"
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from "../styles/CommonStyles"
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/utils'
import { StatusBar } from 'expo-status-bar'

const EditCart = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
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
            <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular', color: COLORS.white }}>Cart</Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log("Edit Items")}
          >
            <Text style={cartStyles.body3Color}>Edit Items</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cartData}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {

            return (
              <View key={index} style={cartStyles.cartItemContainer}>
                <StatusBar hidden={true} />
                <View style={{ marginRight: 2, width: 120 }}>
                  <Image
                    // source={images.food}
                    source={item.image}
                    resizeMode='contain'
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 30,
                      // tintColor: "rgba(255,255,255,0.2)"
                    }}
                  />
                </View>
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: "100%",
                  width: SIZES.width - 152,
                  paddingLeft: 10,
                  paddingRight: 6
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.white,
                        fontFamily: 'regular',
                        textTransform: 'capitalize',
                        marginRight: 20
                      }}>{item.name}</Text>
                  </View>

                  <Text style={{
                    fontSize: 20,
                    fontFamily: 'bold',
                    color: COLORS.white,
                    marginVertical: 6
                  }}>${item.price}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                      fontSize: 16,
                      color: COLORS.white,
                      fontFamily: 'regular'
                    }}>{item.size}"</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={decreaseQuantity}
                        style={cartStyles.roundedBtn}
                      >
                        <Text style={cartStyles.body2}>-</Text>
                      </TouchableOpacity>
                      <Text style={{
                        fontSize: 16,
                        fontFamily: 'regular',
                        color: COLORS.white,
                        marginHorizontal: 12
                      }}>{quantity}</Text>
                      <TouchableOpacity
                        onPress={increaseQuantity}
                        style={cartStyles.roundedBtn}
                      >
                        <Text style={cartStyles.body2}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          }
        />

      </View>
      <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={cartStyles.body3}>Delivery Address</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={cartStyles.body3Color}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Input
          id="Address"
          placeholder="2118 Thornridge Cir. Syracuse"
          placeholderTextColor={COLORS.gray4}
          editable={false}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={cartStyles.body3}>Total:</Text>
            <Text style={{ fontSize: 24, fontFamily: "bold", color: COLORS.black, marginLeft: 12 }}>$90</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={cartStyles.body3Color}>Breakdown</Text>
            <View style={{ marginLeft: 2 }}>
              <Image
                source={icons.arrowRight}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.black
                }}
              />
            </View>
          </View>
        </View>

        <Button
          filled
          title="PLACE ORDER"
          onPress={() => navigation.navigate("PaymentMethod")}
          style={{ marginVertical: 2 }}
        />
      </Animatable.View>
    </SafeAreaView>
  )
}

export default EditCart