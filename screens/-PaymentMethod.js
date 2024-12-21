import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { Feather } from '@expo/vector-icons';
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const PaymentCard = ({ cardImage, isSelected, onSelect, cardName }) => {
  const cardStyle = isSelected ? styles.selectedCard : styles.card;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onSelect} style={cardStyle}>
        <Image source={cardImage} style={styles.cardImage} />

      </TouchableOpacity>
      <Text style={styles.cardText}>{cardName}</Text>
    </View>

  );
};


const PaymentMethod = ({ navigation }) => {
  const renderHeader = () => {
    const navigation = useNavigation()
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.header1Icon}
        >
          <Image
            resizeMode='contain'
            source={icons.arrowLeft}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Payment</Text>
      </View>
    )
  }

  const renderAvailablePayments = () => {
    const [selectedCard, setSelectedCard] = useState('');
    const navigation = useNavigation();

    const data = [
      { id: '1', cardImage: images.cash, cardName: "JazzCash" },
      // { id: '2', cardImage: images.visa, cardName: "Visa" },
      { id: '3', cardImage: images.mastercard, cardName: "MasterCard" },
      { id: '4', cardImage: images.paypal, cardName: "Easypaisa" }
    ];

    const renderItem = ({ item }) => (
      <PaymentCard
        cardImage={item.cardImage}
        cardName={item.cardName}
        isSelected={selectedCard === item.id}
        onSelect={() => setSelectedCard(item.id)}
      />
    );

    return (
      <View style={{ marginVertical: 22 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
        <TouchableOpacity
          onPress={() => console.log("Pressed")}
          style={{
            width: SIZES.width - 32,
            borderRadius: 10,
            backgroundColor: COLORS.gray,
            height: 82,
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10
          }}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ ...FONTS.h4, marginBottom: 10 }}>Mastercard</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={images.mastercard}
                style={{
                  width: 28,
                  height: 16
                }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'regular' }}>*****************436</Text>
            </View>
          </View>
          <View>
            <Image
              source={icons.arrowDown}
              style={{
                height: 12,
                width: 12,
                tintColor: COLORS.black
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPaymentCard")}
          style={{
            height: 62,
            width: SIZES.width - 32,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: COLORS.gray,
            borderWidth: 2
          }}
        >
          <Feather name="plus" size={24} color={COLORS.primary} />
          <Text style={{
            fontSize: 16,
            textTransform: "uppercase",
            color: COLORS.primary,
            marginLeft: 12
          }}>ADD NEW</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderPaymentBtn = () => {
    return (
      <View style={{
        position: 'absolute',
        bottom: 250,
        width: SIZES.width - 32
      }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12
          }}>
          <Text style={{
            fontSize: 16,
            fontFamily: 'regular',
            textTransform: "uppercase",
            color: COLORS.black
          }}>TOTAL: {" "}</Text>
          <Text style={{ ...FONTS.h2 }}>$96</Text>
        </View>
        <Button
          filled
          title="PAY & CONFIRM"
          onPress={() => navigation.navigate("PaymentSuccess")}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
        {renderHeader()}
        {renderAvailablePayments()}
        {renderPaymentBtn()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 4,
    marginRight: 10,
    backgroundColor: COLORS.gray6
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cardImage: {
    width: 150,
    height: 100,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: 'regular',
    marginVertical: 4
  }
});

export default PaymentMethod