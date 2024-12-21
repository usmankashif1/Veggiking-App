import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import { signInSchema } from '../schema'
import { Ionicons } from '@expo/vector-icons';
import GeneralService from '../services/general.service'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState = {
    inputValues: {
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
    },
    inputValidities: {
        name: false,
        address: false,
        phone: false,
        email: false,
        password: false,
    },
};

const Signup = ({ navigation }) => {
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(true);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleAlertOK = () => {
        navigation.replace('Login');
    };

    const handleLogin = async (values) => {
        try {
            const response = await GeneralService.login(values);
            const { data } = response;
            const { access_token, user } = data;
            const { id, user_type, first_name, last_name, phone, email, address } = user;

            const cartResponse = await GeneralService.cartCounterByUserId(id);
            const { data: cartData } = cartResponse;
            const { response: cartNo } = cartData;

            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);

            await AsyncStorage.setItem("accessToken", access_token);
            await AsyncStorage.setItem("_id", String(id));
            await AsyncStorage.setItem("user_type", user_type);
            await AsyncStorage.setItem("user_name", first_name + " " + last_name);
            await AsyncStorage.setItem("user_phone", phone);
            await AsyncStorage.setItem("user_email", email);
            await AsyncStorage.setItem("user_address", address);
            await AsyncStorage.setItem("cart_counter", String(cartNo));
            navigation.replace('Main');
        } catch (err) {
            console.log(err)
            Alert.alert("Login Error", "Server error. Please try again later.");
        }
    };

    const handleSignUp = async (values) => {
        try {
            setIsLoading(true);
            setIsEnable(false);
            console.log(values);
            const response = await GeneralService.register(values);
            console.log('SignUp response:', response);
            setIsLoading(false);
            setIsEnable(true);

            handleLogin(values);
            // Alert.alert('Success', 'User registered successfully');
            // Alert.alert('Success', 'User registered successfully', [{ text: 'OK', onPress: handleAlertOK }]);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setIsEnable(true);
            setEmailError("");
            setPhoneError("");
            if (err?.response?.status === 422) {
                console.log(err?.response?.data);
                if (err?.response?.data?.email) {
                    setEmailError(err?.response?.data?.email[0]);
                }

                if (err?.response?.data?.phone) {
                    setPhoneError(err?.response?.data?.phone[0]);
                }
            } else {
                Alert.alert("Error", "Server error. Please try again later.");
            }
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                        <StatusBar hidden={true} style="light" />
                        <View style={commonStyles.header}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={commonStyles.backIcon}>
                                <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                            </TouchableOpacity>
                            <Text style={commonStyles.headerTitle}>Sign up</Text>
                            <Text
                                style={commonStyles.subHeaderTitle}>Please sign up to get started</Text>
                        </View>
                        <Animatable.View
                            animation="fadeInUpBig"
                            style={commonStyles.footer}>
                            <Formik
                                initialValues={initialState.inputValues}
                                validationSchema={signInSchema}
                                enableReinitialize={true}
                                onSubmit={handleSignUp}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <Text style={commonStyles.inputHeader}>Name</Text>
                                        <Input
                                            id="name"
                                            name="name"
                                            autoCapitalize="words"
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            placeholder="Full Name"
                                            placeholderTextColor={COLORS.black}
                                        />
                                        {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                                        <Text style={commonStyles.inputHeader}>Address</Text>
                                        <Input
                                            name="address"
                                            id="address"
                                            onChangeText={handleChange('address')}
                                            onBlur={handleBlur('address')}
                                            value={values.address}
                                            placeholder="Address"
                                            placeholderTextColor={COLORS.black}
                                        />
                                        {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

                                        <Text style={commonStyles.inputHeader}>Phone No</Text>
                                        <Input
                                            name="phone"
                                            id="phone"
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            value={values.phone}
                                            placeholder="Phone No"
                                            placeholderTextColor={COLORS.black}
                                            keyboardType="numeric"
                                        />
                                        {!phoneError && touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                                        {!errors.phone && phoneError && <Text style={styles.error}>{phoneError}</Text>}

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
                                        {!emailError && touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                        {!errors.email && emailError && <Text style={styles.error}>{emailError}</Text>}

                                        <Text style={commonStyles.inputHeader}>Password</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Input
                                                name="password"
                                                id="password"
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                autoCapitalize="none"
                                                placeholder="*************"
                                                placeholderTextColor={COLORS.black}
                                                secureTextEntry={!isPasswordVisible}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility} style={{ padding: 0, marginLeft: -40 }}>
                                                <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                                        <Button
                                            title="Sign Up"
                                            isLoading={isLoading}
                                            filled onPress={handleSubmit}
                                            isEnable={isEnable}
                                            style={commonStyles.btn1}
                                        />
                                    </>
                                )}
                            </Formik>
                        </Animatable.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "red"
    },
});

export default Signup