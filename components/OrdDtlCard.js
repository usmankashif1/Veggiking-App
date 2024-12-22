import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants'; // Ensure COLORS contains all the necessary colors

const OrdDtlCard = ({ image, name, date, type, amount, quantity, totalAmt }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.cardContent}>
        {/* Product Image */}
        <Image
          source={{ uri: `https://api.veggieking.pk/public/upload/${image}` }}
          resizeMode="cover"
          style={styles.productImage}
        />
        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productInfo}>Quantity: {quantity} | Rs: {amount}</Text>
        </View>
      </View>

      {/* Total Amount Section */}
      {/* <View style={styles.amountContainer}>
        <Text style={styles.totalAmount}>Rs. {totalAmt}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 8, // Increased elevation for a more prominent shadow
    marginVertical: 12,
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 }, // Slightly deeper shadow for more depth
    shadowOpacity: 0.15, // Softer shadow
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden', // Ensures rounded corners are respected
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, // Space between the image and details
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 6, // Increased space between name and other details for better clarity
  },
  productInfo: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 6, // Consistent spacing between info lines
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end', // Align the total amount to the right
  },
  totalAmount: {
    fontSize: 20, // Larger font size for emphasis
    fontWeight: 'bold',
    color: COLORS.primary, // Highlighted with primary color for emphasis
    textAlign: 'right',
    marginTop: 12, // Increase space from the rest of the content
  },
});

export default OrdDtlCard;
