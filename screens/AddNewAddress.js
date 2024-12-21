import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useRef, useEffect, useReducer, useCallback, useState } from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  icons, SIZES, COLORS, FONTS } from '../constants'
import { TouchableOpacity } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet"
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const initialState = {
    inputValues: {
        address: '',
        street: '',
        postalCode: '',
        appartment: ''
    },
    inputValidities: {
        address: false,
        street: false,
        postalCode: false,
        appartment: false
    },
    formIsValid: false,
}

const AddNewAddress = ({ navigation }) => {
    const bottomSheetRef = useRef(null);
    const [error, setError] = useState()
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [selectedLabel, setSelectedLabel] = useState(null);

    const handleLabelSelection = (label) => {
        setSelectedLabel(label)
    }

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    // Open the bottom sheet on component mount
    useEffect(() => {
        bottomSheetRef.current.open();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <View style={{
                position: 'absolute',
                marginHorizontal: 16,
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                top: 22,
                zIndex: 999
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        height: 45,
                        width: 45,
                        borderRadius: 22.5,
                        backgroundColor: COLORS.black,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 16,
                        zIndex: 9999
                    }}
                >
                    <Image
                        source={icons.arrowLeft}
                        resizeMode="contain"
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.body3 }}>Add New Address</Text>
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 48.8566,
                        longitude: 2.3522,
                    }}
                    image={icons.mapMarkerIcon}
                    title="Move"
                    description="Address"
                    onPress={() => console.log("Move to another screen")}
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                    }}
                                >
                                    User Address
                                </Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <RBSheet
                ref={bottomSheetRef}
                height={530}
                openDuration={250}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: COLORS.gray6,
                        width: 100
                    }
                }}
            >
                <View style={{
                    width: SIZES.width - 32,
                    marginHorizontal: 16,
                }}>
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <View style={{ marginVertical: 0 }}>
                            <View style={{ marginTop: 0, width: SIZES.width - 32 }}>
                                <Text style={commonStyles.inputHeader}>Address</Text>
                                <Input
                                    id="address"
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['address']}
                                    placeholder="3235 Royal Ln. mesa, new jersy 34567"
                                    placeholderTextColor={COLORS.black}

                                />
                            </View>

                            <View style={{ marginTop: 12 }}>
                                <Text style={commonStyles.inputHeader}>Appartment</Text>
                                <Input
                                    id="appartment"
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['appartment']}
                                    placeholder="2143"
                                    placeholderTextColor={COLORS.black}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                                <View style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                                    <Text style={commonStyles.inputHeader}>Street</Text>
                                    <Input
                                        id="street"
                                        onInputChanged={inputChangedHandler}
                                        errorText={formState.inputValidities['street']}
                                        placeholder="hason nagar"
                                        placeholderTextColor={COLORS.black}
                                    />
                                </View>
                                <View style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                                    <Text style={commonStyles.inputHeader}>Post Code</Text>
                                    <Input
                                        id="postalCode"
                                        onInputChanged={inputChangedHandler}
                                        errorText={formState.inputValidities['postalCode']}
                                        placeholder="3456"
                                        placeholderTextColor={COLORS.black}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 13, fontFamily: 'regular', marginBottom: 2 }}>DELIVER TIME</Text>

                        <View style={{ flexDirection: "row", marginVertical: 13 }}>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "home" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("home")}
                            >
                                <Text style={[selectedLabel === "home" && styles.checkboxText]}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "work" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("work")}
                            >
                                <Text style={[selectedLabel === "work" && styles.checkboxText]}>Work</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === "other" && styles.selectedCheckbox
                                ]}
                                onPress={() => handleLabelSelection("other")}
                            >
                                <Text style={
                                    [
                                        selectedLabel === "other" && styles.checkboxText
                                    ]
                                }>Other</Text>
                            </TouchableOpacity>

                        </View>
                        <Button
                            filled
                            title="SAVE LOCATION"
                            onPress={() => navigation.navigate("Address")}
                        />
                    </View>
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        zIndex: 1
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    body3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
    },
    h3: {
        fontSize: 12,
        color: COLORS.gray5,
        marginVertical: 3,
        fontFamily: 'bold',
        marginRight: 6
    },
    btn1: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn2: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.gray6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginBottom: 12

    },
    roundedCheckBoxContainer: {
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
    starContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.secondaryGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    }
})

export default AddNewAddress