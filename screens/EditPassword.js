import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, SIZES, icons, images } from "../constants"
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/CommonStyles'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { launchImagePicker } from '../utils/imagePickerHelper'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import { passwordProfile, signInSchema, userProfile } from '../schema'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GeneralService from '../services/general.service'

const EditPassword = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState();
    const [profileInfo, setProfileInfo] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(true);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    const initialState = {
        inputValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
        inputValidities: {
            current_password: false,
            new_password: false,
            confirm_password: false,
        },
        formIsValid: false,
    }


    const updatePassword = async (values) => {
        // console.log(values);
        try {
            let userId = await AsyncStorage.getItem("_id");

            setIsLoading(true);
            setIsEnable(false);
            // console.log(values);
            const timeout = 8000;
            const response = await Promise.race([
                GeneralService.updatePasswordById(values.current_password, values.new_password, userId),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
            ]);

            if (response) {
                Alert.alert('Success', 'Password updated successfully');
            } else {
                throw new Error('No response from the server');
            }
            // const response = await GeneralService.updateUserById(values.name, values.address, values.phone, values.email, userId);
            // console.log('SignUp response:', response);
            setIsLoading(false);
            setIsEnable(true);
            // Alert.alert('Success', 'User registered successfully');
        } catch (err) {
            console.log(err?.response?.status);
            setIsLoading(false);
            setIsEnable(true);
            // setEmailError("");
            // setPhoneError("");
            if (err?.response?.status === 422) {
                Alert.alert("Error", "Current Password is incorrect");
            } else {
                Alert.alert("Error", "Server error. Please try again later.");
            }
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker()

            if (!tempUri) return

            // set the image
            setImage({ uri: tempUri })
        } catch (error) { }
    }

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
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Change Password</Text>
                </View>

            </View>
        )
    }

    const renderEditProfileForm = () => {
        const navigation = useNavigation()
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* <View style={{ marginVertical: 12 }}>
                    <Image
                        source={
                            image === null ?
                                images.avatar2 :
                                image
                        }
                        resizeMode='contain'
                        style={{
                            height: 130,
                            width: 130,
                            borderRadius: 65
                        }}
                    />
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            height: 42,
                            width: 42,
                            borderRadius: 21,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}
                    >
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            size={24}
                            color={COLORS.white} />
                    </TouchableOpacity>
                </View> */}
                <Formik
                    initialValues={initialState.inputValues}
                    validationSchema={passwordProfile}
                    enableReinitialize={true}
                    onSubmit={updatePassword}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{
                            width: SIZES.width - 32, marginVertical: 25
                        }}>
                            <Text style={commonStyles.inputHeader}>Current Password</Text>
                            <Input
                                id="current_password"
                                name="current_password"
                                autoCapitalize="none"
                                onChangeText={handleChange('current_password')}
                                onBlur={handleBlur('current_password')}
                                value={values.password}
                                placeholder="Enter Current Password"
                                placeholderTextColor={COLORS.black}
                            />
                            {touched.current_password && errors.current_password && <Text style={styles.error}>{errors.current_password}</Text>}

                            <Text style={commonStyles.inputHeader}>New Password</Text>
                            <Input
                                id="new_password"
                                name="new_password"
                                autoCapitalize="none"
                                onChangeText={handleChange('new_password')}
                                onBlur={handleBlur('new_password')}
                                value={values.new_password}
                                placeholder="Enter New Password"
                                placeholderTextColor={COLORS.black}
                            />
                            {touched.new_password && errors.new_password && <Text style={styles.error}>{errors.new_password}</Text>}

                            <Text style={commonStyles.inputHeader}>Confirm Password</Text>
                            <Input
                                id="confirm_password"
                                name="confirm_password"
                                autoCapitalize="none"
                                onChangeText={handleChange('confirm_password')}
                                onBlur={handleBlur('confirm_password')}
                                value={values.confirm_password}
                                placeholder="Enter Confirm Password"
                                placeholderTextColor={COLORS.black}
                            />
                            {touched.confirm_password && errors.confirm_password && <Text style={styles.error}>{errors.confirm_password}</Text>}

                            <Button
                                title="Update"
                                isLoading={isLoading}
                                filled onPress={handleSubmit}
                                isEnable={isEnable}
                                style={commonStyles.btn1}
                            />
                        </View>
                    )}
                </Formik>
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
                <ScrollView>
                    {renderEditProfileForm()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "red"
    },
});

export default EditPassword