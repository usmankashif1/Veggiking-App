import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from "../constants";
import Header from '../components/Header';
import { history } from '../data/utils';

const History = ({ navigation }) => {
  return (
     <SafeAreaView style={styles.area}>
        <View style={styles.container}>
            <Header title="History"/>
            <FlatList
      data={history}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'column' }}>
          <View style={{
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
            marginVertical: 12,
            flexDirection: 'row',
            paddingBottom: 4
          }}>
            <Text style={{ fontSize: 14, fontFamily: 'bold' }}>{item.type}</Text>
            <Text style={{
              fontSize: 14,
              fontFamily: 'bold',
              color: item.status == "Completed" ? COLORS.green : COLORS.red,
              marginLeft: 12
            }}>{item.status}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={item.image}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 8
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>{item.name}</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4
                }}>
                  <Text style={{ fontSize: 14, fontFamily: 'bold' }}>${item.price}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'regular', marginHorizontal: 2 }}> | {item.date}</Text>
                  <Text style={{ fontSize: 12, fontFamily: 'regular' }}> | {item.numberOfItems} Items</Text>
                </View>
              </View>
            </View>
            <Text style={{
              fontSize: 14,
              textDecorationLine: 'underline',
              textDecorationColor: COLORS.gray5,
              fontFamily: 'regular'
            }}>{item.receipt}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 18
          }}>
            <TouchableOpacity
              onPress={()=>navigation.navigate("AddReview")}
              style={{
                height: 38,
                width: 140,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                borderColor: COLORS.primary,
                borderWidth: 1,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: COLORS.primary,
                fontSize: 14,
                fontFamily: 'regular'
              }}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 38,
                width: 140,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 14,
                fontFamily: 'regular'
              }}>Re-Order</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    />
        </View>
     </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  }
})

export default History