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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik'
import { passwordSchema } from '../schema'
import GeneralService from '../services/general.service'
import { useNavigation } from '@react-navigation/native'

const isTestMode = true

const ResetPassword = ({ navigation, route }) => {
    const initialState = {
        inputValues: {
            password: "",
            confirm_password: "",
        },
    }
    const navigate = useNavigation();
    const [isEnable, setIsEnable] = useState(true)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const { otp, email } = route.params;

    const updatePassword = async (values) => {

        // console.log(values);
        try {
            // let userId = await AsyncStorage.getItem("_id");
            // console.log(otp, password, values.password);
            setIsLoading(true);
            setIsEnable(false);
            console.log(values.password);
            const timeout = 8000;
            const response = await Promise.race([
                GeneralService.updatePassword(otp, email, values.password),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), timeout))
            ]);

            if (response) {
                Alert.alert('Success', 'Information updated successfully');
                navigate.replace("Login");
            } else {
                throw new Error('No response from the server');
            }
            // const response = await GeneralService.updateUserById(values.name, values.address, values.phone, values.email, userId);
            // console.log('SignUp response:', response);
            setIsLoading(false);
            setIsEnable(true);
            // Alert.alert('Success', 'User registered successfully');
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsEnable(true);
            // setEmailError("");
            // setPhoneError("");
            Alert.alert("Error", "Server error. Please try again later.");
        }
    };

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

    return (
        <Formik
            initialValues={initialState.inputValues}
            validationSchema={passwordSchema}
            enableReinitialize={true}
            onSubmit={updatePassword}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                    <StatusBar style="light" />
                    <View style={commonStyles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={commonStyles.backIcon}>
                            <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={commonStyles.headerTitle}>Reset Password</Text>
                        <Text
                            style={commonStyles.subHeaderTitle}>Please reset your password to get started</Text>
                    </View>
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={commonStyles.footer}>
                        < KeyboardAwareScrollView>
                            <Text style={commonStyles.inputHeader}>Password</Text>
                            <Input
                                id="password"
                                name="password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                // onInputChanged={inputChangedHandler}
                                // errorText={formState.inputValidities['password']}
                                placeholder="*************"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={true}
                            />
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                            <Text style={commonStyles.inputHeader}>Re-Type Password</Text>
                            <Input
                                id="confirm_password"
                                name="confirm_password"
                                onChangeText={handleChange('confirm_password')}
                                onBlur={handleBlur('confirm_password')}
                                value={values.confirm_password}
                                // onInputChanged={inputChangedHandler}
                                // errorText={formState.inputValidities['password']}
                                placeholder="*************"
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={true}
                            />
                            {touched.confirm_password && errors.confirm_password && <Text style={styles.error}>{errors.confirm_password}</Text>}

                            <Button
                                title="RESET"
                                isLoading={isLoading}
                                filled
                                isEnable={isEnable}
                                // onPress={() => navigation.navigate('Login')}
                                onPress={handleSubmit}
                                style={commonStyles.btn1}
                            />
                        </KeyboardAwareScrollView>
                    </Animatable.View>
                </View>
            )}
        </Formik>
    )
}


const styles = StyleSheet.create({
    error: {
        color: "red"
    },
});

export default ResetPassword