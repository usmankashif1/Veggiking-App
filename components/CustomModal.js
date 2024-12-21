import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomModal = ({ heading, body, button, body2, modalVisible, setModalVisible, onPressGotIt }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPressOut={() => setModalVisible(false)}
        activeOpacity={0.1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          height: SIZES.height,
          width: SIZES.width,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LinearGradient
            colors={['#FFEB34', '#E76F00', '#E76F00']}
            style={{
              height: 400,
              width: SIZES.width * 0.8,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: 'extraBold', marginTop: 30, color: COLORS.white }}>
              {heading}
            </Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 68, marginHorizontal: 2, textAlign: "center" }}>{body2}</Text>
            <Text style={{ fontSize: 13, fontFamily: 'regular', color: COLORS.white }}>{body}</Text>
            <TouchableOpacity
              onPress={onPressGotIt} // Pass the onPressGotIt prop as the onPress event
              style={{
                height: 62,
                width: SIZES.width * 0.72,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 38,
              }}
            >
              <Text style={{ ...FONTS.body5, color: COLORS.white }}>{button}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
