import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, SIZES, icons, images } from "../constants"
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/CommonStyles'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { launchImagePicker } from '../utils/imagePickerHelper'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import { Formik } from 'formik'
import { contactSchema, signInSchema, userProfile } from '../schema'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GeneralService from '../services/general.service'

const Contact = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState();
    const [profileInfo, setProfileInfo] = useState({
        message: "",
    });
    const [messageError, setMessageError] = useState("");
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
            message: "",
        },
        inputValidities: {
            message: false,
        },
        formIsValid: false,
    }

    const submitMessage = async (values) => {
        try {
            let userId = await AsyncStorage.getItem("_id");

            setIsLoading(true);
            setIsEnable(false);
            const timeout = 8000;
            const response = await Promise.race([
                GeneralService.submitMessage(userId, values.message),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
            ]);

            if (response) {
                Alert.alert('Contact Us', 'Your message has been sent');
            } else {
                throw new Error('No response from the server');
            }
            setIsLoading(false);
            setIsEnable(true);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsEnable(true);
            setMessageError("");
            // console.log(err?.response);
            if (err?.response?.status === 422) {
                setMessageError("Message is required");
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
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Contact Us</Text>
                </View>

            </View>
        )
    }

    const renderEditProfileForm = () => {
        const navigation = useNavigation()
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>For more information, contact us on WhatsApp at </Text>
                <Ionicons name="logo-whatsapp" size={24} color={COLORS.green} />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>0346-5477825</Text>
                <Formik
                    initialValues={initialState.inputValues}
                    validationSchema={contactSchema}
                    enableReinitialize={true}
                    onSubmit={submitMessage}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{
                            width: SIZES.width - 32, marginVertical: 25
                        }}>
                            <Text style={commonStyles.inputHeader}>Message</Text>
                            <Input
                                id="message"
                                name="message"
                                onChangeText={handleChange('message')}
                                onBlur={handleBlur('message')}
                                value={values.message}
                                multiline={true}
                                placeholder="Message"
                                placeholderTextColor={COLORS.black}
                            />
                            {touched.message && errors.message && <Text style={styles.error}>{errors.message}</Text>}

                            <Button
                                title="Send Message"
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

export default Contact