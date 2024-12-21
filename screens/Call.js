import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'

const Call = ({ navigation }) => {
  const [isMute, setIsMute] = useState(false)
  const [isVolumeMute, setIsVolumeMute] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray6 }}>
      <StatusBar hidden={true} />
      <View style={styles.bottomContainer}>
        <Image
          source={images.avatar}
          resizeMode='contain'
          style={styles.callingImg}
        />
        <Text style={{ ...FONTS.h4 }}>Linda Bi.</Text>
        <Text style={{
          fontSize: 14,
          color: COLORS.gray5,
          marginVertical: 6
        }}>Connecting...</Text>

        <View
          style={{
            width: 240,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 50
          }}
        >
          <TouchableOpacity
            onPress={() => setIsMute(!isMute)}
            style={styles.btn1}
          >
            <MaterialCommunityIcons name={isMute ? "microphone-outline" : "microphone-off"} size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btn2}
          >
            <Feather name="phone" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsVolumeMute(!isVolumeMute)}
            style={styles.btn1}
          >
            <Ionicons name={isVolumeMute ? "volume-mute" : "volume-medium-outline"} size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    height: 380,
    width: SIZES.width,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 22
  },
  btn1: {
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray6
  },
  btn2: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.red,
    borderWidth: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingImg: {
    height: 106,
    width: 106,
    borderRadius: 53,
    marginVertical: 22
  }
})
export default Call