import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, illustrations } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../context/CartContext';

const Thankyou = ({ navigation, route }) => {
    const { updateCartCounter } = useCart();
    updateCartCounter(0);
    
    const { orderNo } = route.params;
    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden={true} />
            <View style={styles.center}>

                <Image
                    source={illustrations.thnkyou}
                    resizeMode="contain"
                    style={styles.locationImage}
                />
                <Text style={styles.thnkyou}>Thank You</Text>
                <Text style={styles.bottomText}>
                    Order placed Successfully{"\n"}
                    Your Order Will Reach Soon
                </Text>
                <Text style={styles.bottomText}>
                    Order ID: {orderNo}
                </Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.replace("Main")}
                >
                    <Text style={styles.btnText}>Dashboard</Text>
                </TouchableOpacity>
                <Text style={styles.contact}>For any query please contact us at{"\n"}
                    0346-5477825
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: COLORS.primary, // Replace 'primary' with your desired color
        borderWidth: 1,
        borderColor: COLORS.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: COLORS.white,
        marginLeft: 5, // Adjust the spacing between the icon and text as needed
    },
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 22,
    },
    btn: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.width - 44,
        marginTop: SIZES.padding2 * 4,
        marginBottom: SIZES.padding2 * 2,
        backgroundColor: COLORS.primary,
    },
    locationImage: {
        height: SIZES.width * 0.7,
        width: SIZES.width * 0.7,
    },
    btnText: {
        ...FONTS.body3,
        textTransform: 'uppercase',
        color: COLORS.white,
    },
    iconContainer: {
        marginLeft: SIZES.padding3,
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    bottomText: {
        ...FONTS.body4,
        textTransform: 'uppercase',
        marginVertical: SIZES.padding * 2,
        textAlign: 'center',
    },
    thnkyou: {
        color: '#f44c00',
        fontWeight: 'bold',
        fontSize: 30,
    },

    contact: {
        color: '#f44c00',
        fontSize: 15,
        textAlign: 'center'
    }
})
export default Thankyou
