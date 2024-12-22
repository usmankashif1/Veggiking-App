import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
            const id = await AsyncStorage.getItem("_id");
            setUserId(id);
        };
        checkAuthentication();
    }, []);

    const handleNavigation = (screen) => {
        setActiveTab(screen);
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
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
                    style={[styles.tab, activeTab === 'MyOrders' && styles.activeTab]}
                    onPress={() => handleNavigation('MyOrders')}
                >
                    <Ionicons
                        name="gift-outline"
                        size={24}
                        color={activeTab === 'MyOrders' ? COLORS.white : COLORS.lightGray}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.tab, activeTab === 'Cart' && styles.activeTab]}
                onPress={() => handleNavigation('Cart')}
            >
                <View style={styles.cartIconContainer}>
                    <Ionicons
                        name={activeTab === 'Cart' ? "cart-sharp" : "cart-outline"}
                        size={24}
                        color={activeTab === 'Cart' ? COLORS.white : COLORS.lightGray}
                    />
                    {cartCounter > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCounter}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === (userId ? 'Profile' : 'Login') && styles.activeTab]}
                onPress={() => handleNavigation(userId ? 'Profile' : 'Login')}
            >
                <Ionicons
                    name="person-outline"
                    size={24}
                    color={activeTab === (userId ? 'Profile' : 'Login') ? COLORS.white : COLORS.lightGray}
                />
            </TouchableOpacity>
        </View>
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
    },
    activeIcon: {
        backgroundColor: '#fff',
        transform: [{ scale: 1.15 }],
        shadowColor: '#f44c00',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Ensures the icons are spaced evenly
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: Dimensions.get('window').height * 0.1,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
    },
    activeTab: {
        backgroundColor: COLORS.secondary, // Optional active tab background color
    },
    cartIconContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
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
    label: {
        marginTop: 5,
        fontSize: 12,
        color: COLORS.lightGray,
    },
    activeLabel: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default FooterNavigation;
