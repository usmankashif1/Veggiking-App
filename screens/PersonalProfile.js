import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneralService from '../services/general.service';
import { commonStyles } from '../styles/CommonStyles';

const Header = ({ title }) => {
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
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const PersonalProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const getProfile = async () => {
    try {
      let userId = await AsyncStorage.getItem("_id");
      const response = await GeneralService.getUserById(userId);
      setName(response.data.response.first_name + " " + response.data.response.last_name);
      setEmail(response.data.response.email);
      setPhone(response.data.response.phone);
      setAddress(response.data.response.address);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const renderUserProfileInfo = () => (
    <View style={{ flexDirection: 'column', paddingHorizontal: 8 }}>
      <View style={styles.container}>
        <ProfileInfoItem icon={<Feather name="user" size={24} color={COLORS.primary} />} label="Full Name" value={name} />
        <ProfileInfoItem icon={<MaterialCommunityIcons name="email-outline" size={24} color="#413DFB" />} label="Email" value={email} />
        <ProfileInfoItem icon={<Feather name="phone" size={24} color="#369BFF" />} label="Phone Number" value={phone} />
        <ProfileInfoItem icon={<Feather name="map-pin" size={24} color="#369BFF" />} label="Address" value={address} />
      </View>
    </View>
  );

  const ProfileInfoItem = ({ icon, label, value }) => (
    <TouchableOpacity style={styles.subContainer}>
      <View style={styles.subLeftContainer}>
        <View style={styles.rounded}>{icon}</View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.boldBody}>{label}</Text>
          <Text style={styles.textBody}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        <Header title="My Profile" />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {renderUserProfileInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    backgroundColor: '#f44c00',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
  editButton: {
    position: 'absolute',
    right: 16,  // Align to the right edge of the header
    top: '50%',  // Center vertically
    transform: [{ translateY: -8 }],  // Adjust for centering
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  editButtonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#f44c00', // Using preferred color
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 12,
  },
  subLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rounded: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f4e8e8', // Soft background for icons
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  textBody: {
    fontSize: 14,
    color: "#32343E",
  },
  boldBody: {
    fontSize: 16,
    color: COLORS.black,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
});

export default PersonalProfile;
