import { View, Text, FlatList, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, AntDesign, Octicons, MaterialCommunityIcons, Fontisto, MaterialIcons } from "@expo/vector-icons"
import { popularBurgers } from '../data/foods'
import { restaurants } from '../data/restaurants'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'

const FoodByKeywords = () => {

    const renderHeader = ()=>{
        const navigation = useNavigation()
        return (
            <View style={commonStyles.header1}>
                <View style={{flexDirection: 'row',}}>
                    <TouchableOpacity 
                       onPress={()=>navigation.goBack()}
                       style={commonStyles.header1Icon}
                       >
                        <Image
                          resizeMode='contain'
                          source={icons.arrowLeft}
                          style={{height: 24, width: 24, tintColor: COLORS.black}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 45, 
                        borderRadius: 33,
                        borderWidth: 1,
                        borderColor: COLORS.gray6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        justifyContent: 'center',
                        marginLeft: 8
                    }}
                    >
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'bold'
                        }}>Burger</Text>
                        <View>
                            <Image
                              source={icons.arrowDown2}
                              style={{
                                width: 12,
                                height: 12,
                                marginLeft: 6,
                                tintColor: COLORS.primary
                              }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={()=>navigation.navigate("Search")}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 22.5,
                        backgroundColor: COLORS.black,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 6
                      }}
                    >
                        <Ionicons name="ios-search" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                       style={commonStyles.header1Icon}
                       onPress={()=>console.log("Filtering")}
                    >
                        < Image
                          source={icons.filter}
                          style={{
                            height: 24,
                            width: 24
                          }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderFoods = () =>{
      const navigation = useNavigation()
      return (
        <View style={{marginVertical: 22}}>
          <Text style={{...FONTS.body3, marginBottom: 12}}>Popular Foods</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: SIZES.width-32,
            }}
          >
              {
                popularBurgers.map((item,index) =>(
                  <TouchableOpacity
                   onPress={() =>navigation.navigate("FoodDetails")}
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
                        resizeMode='contain'
                        style={{width: "100%", height: 84, borderRadius: 15 }}
                      />
                      <Text style={{fontSize: 14, fontFamily: "bold", marginVertical: 4}}>{item.name}</Text>
                      <Text style={{fontSize: 13, fontFamily: "regular", marginVertical: 4}}>{item.restaurant}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                          <Text style={{fontSize: 15, fontFamily: 'bold'}}>${item.price}</Text>
                          <TouchableOpacity 
                          onPress={() =>console.log("Add to cart")}
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

    const renderRestaurants = ()=>{
      const navigation = useNavigation() 
      return (
        <View style={{height: "auto"}}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
            alignItems: 'center',
            }}>
              <Text style={{...FONTS.body2}}>Open Restaurants</Text>
              <TouchableOpacity 
                onPress={()=>console.log("See all open restaurants")}
                style={{flexDirection: 'row', alignItems: 'center'}}
              >
                <Text style={{fontSize: 16, fontFamily: 'regular'}}>See All</Text>
                <View>
                  <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.gray4} />
                </View>
              </TouchableOpacity>
           </View>
           <FlatList
             nestedScrollEnabled
             data={restaurants}
             keyExtractor={item => item.id}
             renderItem=
           {({ item, index })=>(
              <TouchableOpacity 
               onPress={()=>navigation.navigate("RestaurantView")}
              style={{
                width: SIZES.width - 32,
                borderColor: COLORS.tertiaryGray,
                borderWidth: 1,
                paddingBottom: 2,
                marginBottom: 12,
                borderRadius: 15
                }}>
                  <Image
                    source={item.image}
                    style={{
                      width: SIZES.width -32,
                      height: 136,
                      borderRadius: 15
                    }}
                  />
                  <Text style={{fontSize: 18, fontFamily: 'regular', marginVertical: 6}}>{item.name}</Text>
                  <View style={{marginBottom: 4, flexDirection: 'row'}}>
                    {item.keywords.map((keyword, index) => (
                      <Text key={index} style={{ fontSize: 14, color: COLORS.gray5, textTransform: "capitalize" }}>
                        {keyword}{index !== item.keywords.length - 1 ? "-" : ""}
                      </Text>
                    ))}
                  </View>
                  
                  <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                         <Octicons name="star" size={24} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>{item.rating}</Text>
                      </View> 
                      <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: SIZES.padding3}}>
                      <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>{item.shipping}</Text>
                      </View> 
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>{item.deliveryTime} min</Text>
                      </View> 
                  </View>
              </TouchableOpacity>
             )}
             />
        </View>
      )
    }
  return (
   <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <StatusBar hidden={true} />
      <View style={{flex: 1, marginHorizontal: 16}}>
        {renderHeader()}
        <ScrollView>
        {renderFoods()}
        {renderRestaurants()}
        </ScrollView>
      </View>
   </SafeAreaView>
  )
}

export default FoodByKeywords