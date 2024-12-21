import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS, images, icons } from "../constants"
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const Address = ({ navigation }) => {
    const renderHeader = () => {
        const navigation = useNavigation()
        return (
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
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Edit Profile</Text>
                </View>

            </View>
        )
    }

    const renderUserAddresses = () => {
        return (
            <View style={{ flexDirection: 'column', marginVertical: 22 }}>
                <View style={styles.container}>
                    <View
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather name="home" size={24} color="#2790C3" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.boldBody}>Home</Text>
                                <Text style={styles.textBody}>
                                    2464 Royal Ln. Mesa, New Jersey 45463
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 6,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity>
                                <Feather name="edit" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 4
                                }}
                            >
                                <MaterialCommunityIcons name="delete-outline" size={22} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={styles.container}>
                    <View
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <MaterialIcons name="work-outline" size={24} color="#A03BB1" />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.boldBody}>WORK</Text>
                                <Text style={styles.textBody}>
                                    3891 Ranchview Dr. Richardson
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 6,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity>
                                <Feather name="edit" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 4
                                }}
                            >
                                <MaterialCommunityIcons name="delete-outline" size={22} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View style={{
                flex: 1,
                marginHorizontal: 16
            }}>
                {renderHeader()}
                {renderUserAddresses()}
                <Button
                    filled
                    title="ADD NEW ADDRESS"
                    onPress={() => navigation.navigate("AddNewAddress")}
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        width: SIZES.width - 32
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray7,
        borderRadius: 16,
        width: SIZES.width - 32,
        paddingVertical: 8,
        marginBottom: 12
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.gray7,
        marginVertical: 8
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12
    },
    textBody: {
        fontSize: 12,
        fontFamily: 'regular',
        color: "#32343E"
    },
    iconRight: {
        height: 16,
        width: 16,
        marginRight: 8,
        tintColor: "#747783"
    },
    boldBody: {
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.black,
        textTransform: 'uppercase',
        marginVertical: 6
    }
})

export default Address