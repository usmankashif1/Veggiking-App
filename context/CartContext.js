// CartContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // const [cartItems, setCartItems] = useState(async () => {
    //     const savedItems = await AsyncStorage.getItem("cartItems");
    //     return Array.isArray(JSON.parse(savedItems)) ? JSON.parse(savedItems) : [];
    // });

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const savedItems = await AsyncStorage.getItem("cartItems");
                if (savedItems) {
                    const parsedItems = JSON.parse(savedItems);
                    if (Array.isArray(parsedItems)) {
                        setCartItems(parsedItems);
                    }
                }
            } catch (error) {
                console.error("Failed to load cart items", error);
            }
        };

        loadCartItems();
    }, []);


    const [totalPrice, setTotalPrice] = useState(0);
    const [cartCounter, setCartCounter] = useState(0);
    const [userAddress, setUserAddress] = useState("");
    // const [userInfo, setUserInfo] = useState({
    //     id: AsyncStorage.getItem("cartItems"),
    //     user_type: "",
    //     first_name: "",
    //     last_name: "",
    //     address: "",
    //     phone: "",
    //     email: ""
    // });

    useEffect(() => {
        const getData = async () => {
            const savedItems = await AsyncStorage.getItem("cartItems");
            if (savedItems) {
                const parsedItems = JSON.parse(savedItems);
                if (Array.isArray(parsedItems)) {
                    setCartItems(parsedItems);
                }
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            if (Array.isArray(cartItems)) {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
                const totalPrice = cartItems.reduce((accumulator, currentValue) => {
                    return accumulator + (currentValue.quantity * currentValue.price);
                }, 0);
                setTotalPrice(totalPrice);
                setCartCounter(cartItems.length);
            }
        }
        getData();
    }, [cartItems]);


    const updateCartCounter = (count) => {
        setCartCounter(count);
    };

    const updateUserAddress = (address) => {
        setUserAddress(address);
    };

    const clearCart = () => {
        setCartItems([]);
        setCartCounter(0);
    };

    const addItemToCart = (item) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
            let updatedItems;
            if (existingItemIndex !== -1) {
                updatedItems = prevItems.map((i, index) =>
                    index === existingItemIndex ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                updatedItems = [...prevItems, { ...item, quantity: 1 }];
            }
            return updatedItems;
        });
    };

    const increaseQty = (item) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(prevItem =>
                prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
            );
            return updatedItems;
        });
    };

    const decreaseQty = (item) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(prevItem =>
                prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity - 1 } : prevItem
            ).filter(prevItem => prevItem.quantity > 0);
            return updatedItems;
        });
    };

    const removeItemFromCart = (item) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(prevItem => prevItem.id !== item.id);
            return updatedItems;
        });
    };

    return (
        <CartContext.Provider value={{
            cartCounter,
            totalPrice,
            cartItems,
            updateCartCounter,
            increaseQty,
            decreaseQty,
            removeItemFromCart,
            userAddress,
            updateUserAddress,
            addItemToCart,
            // userInfo,
            // updateUserInfo
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
