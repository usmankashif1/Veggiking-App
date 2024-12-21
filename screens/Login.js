import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants';
import Checkbox from 'expo-checkbox';
import * as Animatable from "react-native-animatable";
import Input from '../components/Input';
import Button from '../components/Button';
import icons from '../constants/icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import { commonStyles } from '../styles/CommonStyles';
import { StatusBar } from 'expo-status-bar';
import { validationSchema } from '../schema';
import { Formik } from 'formik';
import GeneralService from '../services/general.service';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreaters } from '../Redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const initialState = {
  inputValues: {
    phone: '',
    password: '',
  },
  inputValidities: {
    phone: false,
    password: false,
  }
};

const Login = ({ navigation, route }) => {
  const { page } = route.params || "";
  const [paging, setPaging] = useState("");
  const { updateUserAddress } = useCart();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Hide the Bottom Tab Navigator
      navigation.setOptions({ tabBarStyle: { display: 'none' } });

      // Code to run when the screen gains focus
      checkAuthentication();
      setPaging(page);

      return () => {
        // Show the Bottom Tab Navigator again when leaving the screen
        navigation.setOptions({ tabBarStyle: { display: 'flex' } });
      };
    }, [])
  );

  const checkAuthentication = async () => {
    let userId = await AsyncStorage.getItem("_id");
    let userType = await AsyncStorage.getItem("user_type");

    if (userId) {
      if (userType == 'user') {
        if (paging) {
          navigation.replace("Cart");
        } else {
          navigation.replace("Main");
        }
      } else {
        navigation.replace('RiderOrders');
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      setIsEnable(false);
      const response = await GeneralService.login(values);
      const { data } = response;
      const { access_token, user } = data;
      const { id, user_type, first_name, last_name, address, phone, email } = user;

      const cartResponse = await GeneralService.cartCounterByUserId(id);
      const { data: cartData } = cartResponse;
      const { response: cartNo } = cartData;

      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);

      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("_id", String(id));
      await AsyncStorage.setItem("user_type", user_type);
      await AsyncStorage.setItem("user_name", first_name + " " + last_name);
      await AsyncStorage.setItem("my_address", address);
      updateUserAddress(address);
      await AsyncStorage.setItem("user_phone", phone);
      await AsyncStorage.setItem("user_email", email);
      await AsyncStorage.setItem("cart_counter", String(cartNo));

      if (user_type == 'user') {
        navigation.replace('Main');
      } else {
        navigation.replace('RiderOrders');
      }

      setIsLoading(false);
      setIsEnable(true);
    } catch (err) {
      if (err?.response?.status == 401) {
        Alert.alert("Error", "You entered wrong phone/password");
      } else {
        Alert.alert("Error", "Server error. Please try again later.");
      }
      setIsLoading(false);
      setIsEnable(true);
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
            <StatusBar style="light" />
            <View style={commonStyles.header}>
              <Text style={commonStyles.headerTitle}>Log In</Text>
              <Text style={commonStyles.subHeaderTitle}>Please sign in to your existing account</Text>
            </View>
            <Animatable.View
              animation="fadeInUpBig"
              style={commonStyles.footer}
            >
              <Formik
                initialValues={{ phone: '', password: '' }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <Text style={commonStyles.inputHeader}>Phone No.</Text>
                    <Input
                      name="phone"
                      id="phone"
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      placeholder="Enter Phone No."
                      placeholderTextColor={COLORS.black}
                      keyboardType="numeric"
                    />
                    {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                    <Text style={commonStyles.inputHeader}>Password</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Input
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        autoCapitalize="none"
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={!isPasswordVisible}
                        style={{ flex: 1, marginRight: 10 }}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ padding: 0, marginLeft: -40 }}>
                        <Ionicons
                          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                          size={24}
                          color="black" />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                    <View
                      style={commonStyles.checkBoxContainer}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword")}
                      >
                        <Text
                          style={{ ...FONTS.body4, color: COLORS.primary }}
                        >Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>
                    <Button
                      title="Log In"
                      isEnable={isEnable}
                      isLoading={isLoading}
                      filled
                      onPress={handleSubmit}
                      style={commonStyles.btn}
                    />
                  </>
                )}
              </Formik>
              <View style={styles.hr} />
              <View style={commonStyles.center}>
                <Text
                  style={{ ...FONTS.body4, color: COLORS.black }}
                >Don't have an account?{" "}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text
                    style={{ ...FONTS.body4, color: COLORS.primary }}
                  >SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red"
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Login;
