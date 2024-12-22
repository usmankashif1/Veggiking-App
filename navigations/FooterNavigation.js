import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useCart } from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FooterNavigation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cartCounter } = useCart();
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('Home');

    useEffect(() => {
        const checkAuthentication = async () => {
            const id = await AsyncStorage.getItem('_id');
            setUserId(id);
        };
        checkAuthentication();
    }, []);

    const handleNavigation = (screen) => {
        setActiveTab(screen);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.tabBarStyle}>
            <TouchableOpacity
                style={[styles.iconWrapper, activeTab === 'Home' && styles.activeIcon]}
                onPress={() => handleNavigation('Home')}
            >
                <SimpleLineIcons
                    name="home"
                    size={28}
                    color={activeTab === 'Home' ? '#f44c00' : '#ddd'}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {userId && (
                <TouchableOpacity
                    style={[styles.iconWrapper, activeTab === 'MyOrders' && styles.activeIcon]}
                    onPress={() => handleNavigation('MyOrders')}
                >
                    <Ionicons
                        name="gift-outline"
                        size={28}
                        color={activeTab === 'MyOrders' ? '#f44c00' : '#ddd'}
                        style={styles.icon}
                   />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.iconWrapper, activeTab === 'Cart' && styles.activeIcon]}
                onPress={() => handleNavigation('Cart')}
            >
                <View style={styles.cartIconContainer}>
                    <Ionicons
                        name={activeTab === 'Cart' ? 'cart-sharp' : 'cart-outline'}
                        size={28}
                        color={activeTab === 'Cart' ? '#f44c00' : '#ddd'}
                        style={styles.icon}
                  />
                    {cartCounter > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCounter}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.iconWrapper, activeTab === (userId ? 'Profile' : 'Login') && styles.activeIcon]}
                onPress={() => handleNavigation(userId ? 'Profile' : 'Login')}
            >
                <Ionicons
                    name="person-outline"
                    size={28}
                    color={activeTab === (userId ? 'Profile' : 'Login') ? '#f44c00' : '#ddd'}
                    style={styles.icon}
               />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f44c00',
        position: 'absolute',
        bottom: 25, // Ensure proper placement above the screen edge
        left: 10,
        right: 10,
        borderRadius: 25,
        height: 70, // Adjust height to fit the design
        paddingVertical: 5, // Add padding for better spacing
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        elevation: 5,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -15, // Adjusted to move icons upwards, touching the tab bar's top edge
        backgroundColor: 'transparent',
    },
    activeIcon: {
        backgroundColor: '#fff',
        transform: [{ scale: 1.15 }],
        shadowColor: '#f44c00',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        marginTop: -40,
    },
    cartIconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center', // Ensure the cart icon is vertically aligned
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5, // Adjusted to ensure proper placement
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 16,
        minHeight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    icon: {
        marginTop: -10,

    },
});



export default FooterNavigation;
