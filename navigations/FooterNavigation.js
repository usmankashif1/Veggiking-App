import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
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
    const windowWidth = Dimensions.get('window').width;

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
                style={styles.tab}
                onPress={() => handleNavigation('Home')}
            >
                <SimpleLineIcons
                    name="home"
                    size={24}
                    color={activeTab === 'Home' ? COLORS.primary : COLORS.black}
                />
            </TouchableOpacity>

            {userId && (
                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => handleNavigation('MyOrders')}
                >
                    <Ionicons
                        name="gift-outline"
                        size={24}
                        color={activeTab === 'MyOrders' ? COLORS.primary : COLORS.black}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleNavigation('Cart')}
            >
                <View style={styles.cartIconContainer}>
                    <Ionicons
                        name={activeTab === 'Cart' ? "cart-sharp" : "cart-outline"}
                        size={24}
                        color={activeTab === 'Cart' ? COLORS.primary : COLORS.black}
                    />
                    {cartCounter > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartCounter}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tab}
                onPress={() => handleNavigation(userId ? 'Profile' : 'Login')}
            >
                <Ionicons
                    name="person-outline"
                    size={24}
                    color={activeTab === (userId ? 'Profile' : 'Login') ? COLORS.primary : COLORS.black}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: Dimensions.get('window').height * 0.1, // Dynamically adjusts based on screen size
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10, // Consistent spacing
        width: Dimensions.get('window').width / 5, // Equal space for each tab
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
});

export default FooterNavigation;
