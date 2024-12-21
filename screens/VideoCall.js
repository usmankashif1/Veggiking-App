import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../constants'
import { Ionicons, Feather } from "@expo/vector-icons"
import { COLORS } from '../constants'

const VideoCall = ({ navigation }) => {
  const [isMute, setIsMute] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallOff, setIsCallOff] = useState(false);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={images.user}>
      <View style={styles.bottomContainer}>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => setIsMute(!isMute)}
          >
            <Ionicons name={isMute ? "mic-off-outline" : "mic-outline"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: COLORS.primary }]}
            onPress={() => {
              setIsVideoOff(!isVideoOff);
              navigation.goBack();
            }
            }
          >
            <Feather name={isVideoOff ? "video-off" : "video"} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnContainer, { backgroundColor: COLORS.red }]}
            onPress={() => setIsCallOff(!isCallOff)}
          >
            <Feather name={isCallOff ? "phone-off" : "phone"} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.callerContainer}>
        <Image
          source={images.avatar3}
          resizeMode='cover'
          style={styles.callerAvatar}
        />
      </View>
      <View style={styles.doctorInfoContainer}>
        <Text style={{
          fontSize: 16,
          fontFamily: "bold",
          color: COLORS.white
        }}>Mrs. Dream Yup</Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <View
            style={[styles.timeContainer, { marginRight: 12 }]}
          />
          <Text style={styles.time}>10 : 00</Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    justifyContent: "center"
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  btnContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 999,
    marginHorizontal: 6
  },
  callerAvatar: {
    height: 188,
    width: 146,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: COLORS.primary
  },
  callerContainer: {
    position: "absolute",
    bottom: 92,
    right: 12
  },
  doctorInfoContainer: {
    position: "absolute",
    bottom: 120,
    left: 12
  },
  timeContainer: {
    height: 10,
    width: 10,
    borderRadius: 999,
    backgroundColor: COLORS.green
  },
  time: {
    fontSize: 14,
    fontFamily: "bold",
    color: COLORS.white
  }
})

export default VideoCall