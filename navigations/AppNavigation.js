import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
    Onboarding1, Onboarding2, Onboarding3, Signup, Verification, Login, StartUpScreen, ForgotPassword, ResetPassword, Onboarding4,
    LocationAccess, HomeV1, FoodDetailsV1, FoodDetailsV2, RestaurantView1, RestaurantView2, FoodByKeywords, Cart, EditCart, PaymentMethod,
    PaymentMethodNoCard, AddPaymentCard, PaymentSuccess, TrackingOrderV1, Message, Menu, PersonalProfile, EditProfile, Address, AddNewAddress,
    Call, TrackingOrderV2, Chat, VideoCall, OpenShops, AddReview, CancelOrders, Profile, TransactionHistory, Faqs, Settings, SubmitQuestion,
    History, HomeV3, HomeV2, MyOrders, RiderOrders
} from '../screens'
import LocationSearch from '../screens/LocationSearch';
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'
import DrawerNavigation from './DrawerNavigation'
import MapLocation from '../screens/MapLocation';
import Otp from '../screens/Otp';
import OrderDetail from '../screens/OrderDetail';
import UserDetail from '../screens/UserDetail';
import { createStackNavigator } from '@react-navigation/stack';
import TrackingOrderV3 from '../screens/TrackingOrderV3';
import CategoryProducts from '../screens/CategoryProducts';
import Thankyou from '../screens/Thankyou';
import Contact from '../screens/Contact';
import EditPassword from '../screens/EditPassword';
// import { Toast } from '@react-native-toast-message';

const Stack = createNativeStackNavigator()
// const Stack = createStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched');
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true');
                    setIsFirstLaunch(true);
                } else {
                    setIsFirstLaunch(false);
                }
            } catch (error) {
                setIsFirstLaunch(false);
            }
            setIsLoading(false);
        };

        checkIfFirstLaunch();
    }, []);

    const shouldShowBottomTab = (routeName) => {
        // Define the routes where BottomTabNavigation should NOT be displayed
        const hiddenRoutes = [
            'Login',
            'Signup',
            'ForgotPassword',
            'ResetPassword',
            'Verification',
            // Add any other routes here as needed
        ];
        return !hiddenRoutes.includes(routeName);
    };

    if (isLoading) {
        return null; // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                })}
                initialRouteName={'Main'}
            >
                {/* Onboarding and Auth Screens */}
                <Stack.Screen name="Onboarding1" component={Onboarding1} />
                <Stack.Screen name="Onboarding2" component={Onboarding2} />
                <Stack.Screen name="Onboarding3" component={Onboarding3} />
                <Stack.Screen name="Onboarding4" component={Onboarding4} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="LocationAccess" component={LocationAccess} />
                <Stack.Screen name="LocationSearch" component={LocationSearch} />
                
                {/* Main Screens */}
                <Stack.Screen name="Main" component={shouldShowBottomTab('Main') ? BottomTabNavigation : StartUpScreen} />
                <Stack.Screen name="HomeV1" component={HomeV1} />
                <Stack.Screen name="HomeV2" component={HomeV2} />
                <Stack.Screen name="HomeV3" component={HomeV3} />
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                <Stack.Screen name="FoodByKeywords" component={FoodByKeywords} />
                <Stack.Screen name="FoodDetails" component={FoodDetailsV1} />
                <Stack.Screen name="RestaurantView" component={RestaurantView1} />
                <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="Thankyou" component={Thankyou} />
                <Stack.Screen name="EditCart" component={EditCart} />
                <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
                <Stack.Screen name="PaymentMethodNoCard" component={PaymentMethodNoCard} />
                <Stack.Screen name="AddPaymentCard" component={AddPaymentCard} />
                <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
                <Stack.Screen name="TrackingOrders" component={TrackingOrderV3} />
                <Stack.Screen name="Call" component={Call} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="EditPassword" component={EditPassword} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="VideoCall" component={VideoCall} />
                <Stack.Screen name="OpenShops" component={OpenShops} />
                <Stack.Screen name="AddReview" component={AddReview} />
                <Stack.Screen name="CancelOrders" component={CancelOrders} />
                <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
                <Stack.Screen name="MyOrders" component={MyOrders} />
                <Stack.Screen name="RiderOrders" component={RiderOrders} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} />
                <Stack.Screen name="UserDetail" component={UserDetail} />
                <Stack.Screen name="Faqs" component={Faqs} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="SubmitQuestion" component={SubmitQuestion} />
                <Stack.Screen name="History" component={History} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
