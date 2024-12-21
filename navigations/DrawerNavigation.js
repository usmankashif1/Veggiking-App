import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import {
  Feather,
  Ionicons,
  AntDesign
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { COLORS, images } from "../constants";
import { Address, Menu, Notifications, PaymentMethod, Cart, MyOrders, HomeV1, HomeV2, Search, TrackingOrderV1, History, TrackingOrderV2, TransactionHistory, PersonalProfile, Contact, EditProfile, Login } from "../screens";
import Otp from "../screens/Otp";
import Logout from "../screens/Logout";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditPassword from "../screens/EditPassword";

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      let userId = await AsyncStorage.getItem("_id");
      let name = await AsyncStorage.getItem("user_name");
      setName(name);
      setUserId(userId);
    }
    fetchInfo();
  }, []);

  if (!userId) {
    return (
      <Drawer.Navigator
        drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={images.icon}
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      marginVertical: 6,
                      fontFamily: "bold",
                      color: COLORS.black
                    }}
                  >{name}</Text>
                  {/* <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.black,
                    fontFamily: 'regular'
                  }}
                >Product Manager</Text> */}
                </View>
                <DrawerItemList {...props} />
              </SafeAreaView>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: COLORS.white,
            width: 250,
          },
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerShown: false,
          headerTintColor: COLORS.black,
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerLabelStyle: {
            color: COLORS.black,
            fontFamily: "regular",
            fontSize: 14,
            marginLeft: -10,
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            headerShadowVisible: false,
            drawerIcon: () => (
              <Ionicons name="home-outline" size={24} color={COLORS.black} />
            )
          }}
          component={HomeV2}
        />

        <Drawer.Screen
          name="Cart"
          options={{
            drawerLabel: "Cart",
            title: "Cart",
            drawerIcon: () => (
              <Ionicons name="cart-outline" size={24} color={COLORS.black} />
            )
          }}
          component={Cart}
        />

        <Drawer.Screen
          name="Login"
          options={{
            drawerLabel: "Login",
            title: "Login",
            drawerIcon: () => (
              <Ionicons name="log-in-outline" size={24} color={COLORS.black} />
            )
          }}
          component={Login}
        />

      </Drawer.Navigator>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={
        (props) => {
          return (
            <SafeAreaView>
              <View
                style={{
                  height: 200,
                  width: '100%',
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={images.icon}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50
                  }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    marginVertical: 6,
                    fontFamily: "bold",
                    color: COLORS.black
                  }}
                >{name}</Text>
                {/* <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.black,
                    fontFamily: 'regular'
                  }}
                >Product Manager</Text> */}
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }
      }
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.white,
          width: 250,
        },
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerShown: false,
        headerTintColor: COLORS.black,
        headerTitleStyle: {
          fontWeight: "bold"
        },
        drawerLabelStyle: {
          color: COLORS.black,
          fontFamily: "regular",
          fontSize: 14,
          marginLeft: -10,
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          title: "Home",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} color={COLORS.black} />
          )
        }}
        component={HomeV2}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="briefcase-outline" size={24} color={COLORS.black} />
          )
        }}
        component={PersonalProfile}
      />
      <Drawer.Screen
        name="EditPassword"
        options={{
          drawerLabel: "Change Password",
          title: "EditPassword",
          headerShadowVisible: false,
          drawerIcon: () => (
            <Ionicons name="key-outline" size={24} color={COLORS.black} />
          )
        }}
        component={EditPassword}
      />
      <Drawer.Screen
        name="Orders"
        options={{
          drawerLabel: "Orders",
          title: "Orders",
          drawerIcon: () => (
            <Ionicons name="gift-outline" size={24} color={COLORS.black} />
          )
        }}
        component={MyOrders}
      />


      <Drawer.Screen
        name="Cart"
        options={{
          drawerLabel: "Cart",
          title: "Cart",
          drawerIcon: () => (
            <Ionicons name="cart-outline" size={24} color={COLORS.black} />
          )
        }}
        component={Cart}
      />

      <Drawer.Screen
        name="Contact"
        options={{
          drawerLabel: "Contact Us",
          title: "Contact",
          drawerIcon: () => (
            <Ionicons name="mail-outline" size={24} color={COLORS.black} />
          )
        }}
        component={Contact}
      />

      <Drawer.Screen
        name="Logout"
        options={{
          drawerLabel: "Logout",
          title: "Logout",
          drawerIcon: () => (
            <Ionicons name="log-out-outline" size={24} color={COLORS.black} />
          )
        }}
        component={Logout}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigation