import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, illustrations } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/core'

const LocationAccess = ({ navigation }) => {
    const arrayGPS = []
    const [gps, setGps] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [address, setAddress] = useState(null)
    // Image.prefetch(illustrations.mapLocation);

    // const prefetchImage = async () => {
    //     await Image.prefetch(illustrations.mapLocation);
    // };

    const checkAuthentication = async () => {
        let userId = await AsyncStorage.getItem("_id");
        let userType = await AsyncStorage.getItem("user_type");
        // console.log(`login-type=${userType}`);

        if (userId) {
            // console.log(userType);
            if (userType == 'user') {
                // navigation.replace('Main');
                // navigation.replace('RiderOrders');
            } else {
                navigation.replace('RiderOrders');
            }
        }
    }

    // useEffect(() => {
    //     checkAuthentication();
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            // Code to run when the screen gains focus
            checkAuthentication();

            return () => {
                // Code to run when the screen loses focus
                // console.log('location Screen blurred');
            };
        }, [])
    );

    // Get user location
    useEffect(() => {
        const getPermissions = async () => {
            let userType = await AsyncStorage.getItem("user_type");
            // console.log(`location-type=${userType}`);

            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            const text = JSON.stringify(location)
            const parsedData = JSON.parse(text)
            const longitude = parsedData.coords.longitude
            const latitude = parsedData.coords.latitude
            arrayGPS.push(longitude, latitude)

            let address = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude,
            })
            // console.log(address[0]);
            await AsyncStorage.setItem("user_address", address[0].district + " " + address[0].city);
            await AsyncStorage.setItem("user_delivery_address", address[0].district + " " + address[0].city);
            setAddress(
                `${address[0].name}, ${address[0].district}, ${address[0].city}`
            )
            setGps(arrayGPS)
        }

        getPermissions()
    }, [gps])

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden={true} />
            <View style={styles.center}>

                <Image
                    source={illustrations.mapLocation}
                    resizeMode="contain"
                    style={styles.locationImage}
                />
                <TouchableOpacity
                    onPress={() => navigation.replace('Main')}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Use Current Location</Text>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color={COLORS.white}
                        />
                    </View>
                </TouchableOpacity>
                {/* Add New Address button */}
                {/* <TouchableOpacity style={styles.addButton}>
                    <View style={styles.buttonContent} color={COLORS.white}>
                        <Text
                            style={styles.addButtonText}
                            onPress={() => {
                                console.log('Add New Address text pressed!')

                                navigation.navigate('LocationSearch')
                            }}
                        >
                            Add New Address
                        </Text>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="add"
                                size={20}
                                color={COLORS.white}
                            />
                        </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.addButton}>
                    <View style={styles.buttonContent} color={COLORS.white}>
                        <Text
                            style={styles.addButtonText}
                            onPress={() => {
                                console.log('open map!')

                                navigation.navigate('MapLocation')
                            }}
                        >
                            Open Map
                        </Text>
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name="add"
                                size={20}
                                color={COLORS.white}
                            />
                        </View>
                    </View>
                </TouchableOpacity> */}

                <Text style={styles.bottomText}>
                    VEGGIE KING WILL ACCESS YOUR LOCATION ONLY WHILE USING THE
                    APP
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
})
export default LocationAccess
