import { View, Text, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants';
import { HomeV1, Profile, MyOrders, PersonalProfile, Cart, Login } from '../screens';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import DrawerNavigation from './DrawerNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false, // Hide labels
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 25,
        left: 10,
        right: 10,
        elevation: 5,
        height: Platform.OS === 'ios' ? 80 : 70,
        backgroundColor: '#f44c00',
        borderRadius: 25,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        borderTopWidth: 0,
    },
};

const BottomTabNavigation = () => {
    const { cartCounter } = useCart();
    const [userId, setUserId] = useState(null);

    const checkAuthentication = async () => {
        const id = await AsyncStorage.getItem('_id');
        setUserId(id);
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={DrawerNavigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
                            <SimpleLineIcons name="home" size={28} color={focused ? '#f44c00' : '#ddd'} style={styles.icon} />
                        </View>
                    ),
                }}
            />

            {userId && (
                <Tab.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
                                <Ionicons name="gift-outline" size={28} color={focused ? '#f44c00' : '#ddd'} style={styles.icon} />
                            </View>
                        ),
                    }}
                />
            )}

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
                            <Ionicons name={focused ? 'cart-sharp' : 'cart-outline'} size={28} color={focused ? '#f44c00' : '#ddd'} style={styles.icon} />
                            {cartCounter > 0 && (
                                <View style={styles.cartBadge}>
                                    <Text style={styles.cartBadgeText}>{cartCounter}</Text>
                                </View>
                            )}
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={userId ? PersonalProfile : Login}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
                            <Ionicons name="person-outline" size={28} color={focused ? '#f44c00' : '#ddd'} style={styles.icon} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 10, // Adjust icon alignment
    },
    activeIcon: {
        backgroundColor: '#fff',
        transform: [{ scale: 1.15 }],
        shadowColor: '#f44c00',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
    },
    cartBadge: {
        backgroundColor: 'red',
        borderRadius: 12,
        height: 20,
        minWidth: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 4, // Improved positioning
        right: -5,
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: 5, // Better alignment for icons
    },
});

export default BottomTabNavigation;
