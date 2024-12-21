import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

export default function VerticalStepper({ status }) {
  const isPacking = status === "PACKING" || status === "TRANSIT" || status === "DELIVERED";
  const isTransit = status === "TRANSIT" || status === "DELIVERED";
  const isDelivered = status === "DELIVERED";

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={[styles.stepIndicator, { backgroundColor: COLORS.primary }]}>
          <MaterialIcons name="check-circle" size={16} color="#FFF" />
        </View>
        <Text style={styles.stepText}>Your order has been received</Text>
      </View>
      {/* Connecting line for the first step - always gray since the next step has not been reached */}
      <View style={[styles.line,  { backgroundColor: isPacking ? COLORS.primary : COLORS.gray4 }]} />

      <View style={styles.stepContainer}>
        <View style={[styles.stepIndicator, { backgroundColor: isPacking ? COLORS.primary : COLORS.gray4 }]}>
          <MaterialIcons name="archive" size={16} color="#FFF" />
        </View>
        <Text style={styles.stepText}>The order is being packed</Text>
      </View>
      {/* Connecting line for the second step - filled only if packing or beyond */}
      <View style={[styles.line, { backgroundColor: isPacking ? COLORS.primary : COLORS.gray4 }]} />

      <View style={styles.stepContainer}>
        <View style={[styles.stepIndicator, { backgroundColor: isTransit ? COLORS.primary : COLORS.gray4 }]}>
          <MaterialIcons name="delivery-dining" size={16} color="#FFF" />
        </View>
        <Text style={styles.stepText}>Your order has been picked up for delivery</Text>
      </View>
      {/* Connecting line for the third step - filled only if transit or beyond */}
      <View style={[styles.line, { backgroundColor: isTransit ? COLORS.primary : COLORS.gray4 }]} />

      <View style={styles.stepContainer}>
        <View style={[styles.stepIndicator, { backgroundColor: isDelivered ? COLORS.primary : COLORS.gray4 }]}>
          <MaterialIcons name="check" size={16} color="#FFF" />
        </View>
        <Text style={styles.stepText}>Delivered!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  stepIndicator: {
    width: 30, // Size for the circle
    height: 30, // Size for the circle
    borderRadius: 15, // Make it a circle
    alignItems: 'center', // Center content
    justifyContent: 'center', // Center content
    marginRight: 10,
  },
  stepText: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: 'regular',
  },
  line: {
    width: 2, // Width of the line
    marginLeft: 15, // Position the line to align with the circle
    marginRight: 10, // Space between the line and the next circle
    alignSelf: 'flex-start', // Align the line with the start of the container
    height: 20, // Height of the line, adjust as needed
  },
});
