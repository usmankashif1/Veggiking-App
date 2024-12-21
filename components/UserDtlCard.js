import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { AntDesign } from "@expo/vector-icons"

const UserDtlCard = ({ name, email, phone, address }) => {
    console.log(name, email, phone, address);
    return (
        <>
            <View style={{
                marginLeft: 12,
                justifyContent: "space-between",
                paddingVertical: 8
            }}>
                <Text style={styles.amount}>Name: {name}</Text>
            </View>
            <View style={{
                marginLeft: 12,
                justifyContent: "space-between",
                paddingVertical: 8
            }}>
                <Text style={styles.amount}>Phone: {phone}</Text>
            </View>
            <View style={{
                marginLeft: 12,
                justifyContent: "space-between",
                paddingVertical: 8
            }}>
                <Text style={styles.amount}>Delivery Address: {address}</Text>
            </View>
        </>
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

export default UserDtlCard