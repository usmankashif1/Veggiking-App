import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { AntDesign } from "@expo/vector-icons"

const TransactionCard = ({ image, name, date, type, amount }) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={{ flexDirection: "row" }}>
            <Image
              source={image}
              resizeMode="contain"
              style={styles.carImage}
            />
            <View style={{
                marginLeft: 12,
                height: "100%",
                justifyContent: "space-between",
                paddingVertical: 8
                }}>
                <Text style={styles.carName}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
        <View style={{
                marginLeft: 12,
                height: "100%",
                justifyContent: "space-between",
                paddingVertical: 8
                }}>
            <Text style={styles.amount}>${amount}</Text>
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
              <Text style={styles.type}>{type}</Text>
              <View style={{ 
                height: 12, 
                width: 12, 
                borderRadius: 4, 
                backgroundColor: type == "Top Up" ? COLORS.green: COLORS.red,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 12
                }}>
                    <AntDesign name={ type == "Top Up" ? "arrowdown": "arrowup"} size={10} color={COLORS.white} />
              </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 58,
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 8
    },
    carImage: {
        width: 58,
        height: 58,
        borderRadius: 8
    },
    carName: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
    date: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray"
    },
    amount: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
    type: {
        fontSize: 12,
        color: COLORS.black,
        fontFamily: "regular",
    }
})

export default TransactionCard