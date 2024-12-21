import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from "@expo/vector-icons"
import { forgotSchema } from '../schema'
import { Formik } from 'formik'
import GeneralService from '../services/general.service'
import { useNavigation } from '@react-navigation/native'

const initialState = {
    inputValues: {
        email: '',
    },
    inputValidities: {
        email: false,
    },
}

const ForgotPassword = () => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isEnable, setIsEnable] = useState(true)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const navigation = useNavigation();

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


    const handleForgot = async (values) => {
        try {
            setIsLoading(true);
            setIsEnable(false);
            const response = await GeneralService.forgot(values); // Call the forgot method and capture the response
            console.log('Forgot response:', response); // Log the response to see the structure and extract the message if needed
            setIsLoading(false);
            setIsEnable(true);
            // Display the response message, assuming the response contains a 'message' field
            // Alert.alert('Success', 'Check your email to reset password'); // Modify the field according to your API response structure
            navigation.navigate("opt", { email: values.email });
        } catch (err) {
            console.error('Error occurred:', err);
            if (err?.response?.status == 404) {
                Alert.alert("Error", "No user found");
            } else {
                Alert.alert("Error", "Server error. Please try again later.");
            }
            setIsLoading(false);
            setIsEnable(true);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar hidden={true} style="light" />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Forgot Password</Text>
                <Text style={commonStyles.subHeaderTitle}>Please provide your email address</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <Formik
                    initialValues={{ email: '' }}
                    enableReinitialize={true}
                    validationSchema={forgotSchema}
                    onSubmit={handleForgot}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <Text style={commonStyles.inputHeader}>Email Address</Text>
                            <Input
                                name="email"
                                id="email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email Address"
                                placeholderTextColor={COLORS.black}
                                keyboardType="email-address"
                            />
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <Button
                                title="Send Code"
                                isEnable={isEnable}
                                isLoading={isLoading}
                                filled
                                onPress={handleSubmit}
                                style={commonStyles.btn1}
                            />
                        </>
                    )}
                </Formik>
            </Animatable.View>
        </View>
    )
}
const styles = StyleSheet.create({
    error: {
        color: "red"
    },
});

export default ForgotPassword