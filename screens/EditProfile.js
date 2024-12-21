import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import React, { useState, useReducer, useEffect, useCallback } from 'react';
import {
    COLORS,
    SIZES,
    icons,
    images,
} from '../constants';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/CommonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { launchImagePicker } from '../utils/imagePickerHelper';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { signInSchema, userProfile } from '../schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneralService from '../services/general.service';
import { useCart } from '../context/CartContext';

const EditProfile = () => {
    const { updateUserAddress } = useCart();
    const [image, setImage] = useState(null);
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEnable, setIsEnable] = useState(true);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue });
    }, [dispatchFormState]);

    const getUserById = async () => {
        try {
            let userId = await AsyncStorage.getItem('_id');
            const response = await GeneralService.getUserById(userId);
            if (response) {
                setProfileInfo({
                    name: response.data.response.first_name + ' ' + response.data.response.last_name,
                    address: response.data.response.address,
                    phone: response.data.response.phone,
                    email: response.data.response.email,
                });
            } else {
                throw new Error('No response from server');
            }
        } catch (err) {
            Alert.alert('Error', 'Unable to fetch profile data');
        }
    };

    const initialState = {
        inputValues: {
            name: profileInfo.name,
            email: profileInfo.email,
            phone: profileInfo.phone,
            address: profileInfo.address,
        },
        inputValidities: {
            name: false,
            email: false,
            phone: false,
            address: profileInfo.address,
        },
        formIsValid: false,
    };

    useFocusEffect(
        React.useCallback(() => {
            getUserById();
        }, [])
    );

    const updateProfile = async (values) => {
        try {
            let userId = await AsyncStorage.getItem('_id');
            setIsLoading(true);
            setIsEnable(false);
            const response = await GeneralService.updateUserById(
                values.name,
                values.address,
                values.phone,
                values.email,
                userId
            );

            if (response) {
                await AsyncStorage.setItem('my_address', values.address);
                updateUserAddress(values.address);
                Alert.alert('Success', 'Profile updated successfully');
                getUserById();
            } else {
                throw new Error('No response from the server');
            }
        } catch (err) {
            Alert.alert('Error', 'Unable to update profile. Please try again.');
        } finally {
            setIsLoading(false);
            setIsEnable(true);
        }
    };

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();
            if (tempUri) setImage({ uri: tempUri });
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const renderHeader = () => {
        const navigation = useNavigation();
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.header1Icon}>
                    <Image
                        resizeMode='contain'
                        source={icons.arrowLeft}
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </View>
        );
    };

    const renderEditProfileForm = () => (
        <Formik
            initialValues={initialState.inputValues}
            validationSchema={userProfile}
            enableReinitialize={true}
            onSubmit={updateProfile}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
                    {/* <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                        <Image
                            source={image === null ? images.avatar2 : image}
                            style={styles.profileImage}
                        />
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            size={24}
                            color={COLORS.white}
                            style={styles.editImageIcon}
                        />
                    </TouchableOpacity> */}

                    <Input
                        label="Name"
                        placeholder="Full Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        errorMessage={touched.name && errors.name}
                    />
                    <Input
                        label="Address"
                        placeholder="Address"
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        errorMessage={touched.address && errors.address}
                    />
                    <Input
                        label="Phone No."
                        placeholder="Phone No."
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        keyboardType="numeric"
                        errorMessage={touched.phone && errors.phone || phoneError}
                    />
                    <Input
                        label="Email Address"
                        placeholder="Email Address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        errorMessage={touched.email && errors.email || emailError}
                    />

                    <Button
                        title="Update"
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        isEnable={isEnable}
                        style={styles.updateButton} // Ensure this style includes necessary changes
                    />
                </View>
            )}
        </Formik>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            {renderHeader()}
            <ScrollView contentContainerStyle={styles.scrollView}>
                {renderEditProfileForm()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerIcon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        color: COLORS.white,
        textTransform: 'capitalize',
    },
    formContainer: {
        paddingHorizontal: 16,
    },
    profileImageContainer: {
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 20, // Added top margin for the profile image
    },
    profileImage: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    editImageIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 20,
    },
    updateButton: {
        backgroundColor: COLORS.white, // Changed button color to white
        borderColor: COLORS.primary, // Optional: Add border color to match the theme
        borderWidth: 1, // Optional: Add border width for visibility
        borderRadius: 10, // Rounded corners
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        alignItems: 'center', // Center the text
        elevation: 2, // Add shadow for depth
    },
    error: {
        color: 'red',
    },
});

export default EditProfile;
