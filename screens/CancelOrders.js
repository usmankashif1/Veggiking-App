import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES } from "../constants"
import { SafeAreaView } from 'react-native-safe-area-context'
import ReasonItem from '../components/ReasonItem'
import Header from '../components/Header'

const CancelOrders = ({ navigation }) => {
  // const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  
  const submission = () => {
    console.log(selectedItem);
  }

  const renderContent = () => {

    const handleCheckboxPress = (itemTitle) => {
      if (selectedItem === itemTitle) {
        // If the clicked item is already selected, deselect it
        setSelectedItem(null);
      } else {
        // Otherwise, select the clicked item
        setSelectedItem(itemTitle);
      }
    };

    const handleCommentChange = (text) => {
      setComment(text);
    };
    return (
      <View style={{ marginVertical: 12 }}>
        <Text style={styles.inputLabel}>Please select the reason for the cancellations</Text>
        <View style={{ marginVertical: 16 }}>
          <ReasonItem
            checked={selectedItem === 'Changed mind about coffee choice'}
            onPress={() => handleCheckboxPress('Changed mind about coffee choice')}
            title="Changed mind about coffee choice"
          />
          {/* <ReasonItem
            checked={selectedItem === 'Unforeseen change in meeting schedule'}
            onPress={() => handleCheckboxPress('Unforeseen change in meeting schedule')}
            title="Unforeseen change in meeting schedule"
          /> */}
          {/* <ReasonItem
            checked={selectedItem === 'Weather affecting visit plans'}
            onPress={() => handleCheckboxPress('Weather affecting visit plans')}
            title="Weather affecting visit plans"
          /> */}
          <ReasonItem
            checked={selectedItem === 'Sudden change in mood or taste preference'}
            onPress={() => handleCheckboxPress('Sudden change in mood or taste preference')}
            title="Sudden change in mood or taste preference"
          />
          <ReasonItem
            checked={selectedItem === 'Traffic or transit delays'}
            onPress={() => handleCheckboxPress('Traffic or transit delays')}
            title="Traffic or transit delays"
          />
          <ReasonItem
            checked={selectedItem === 'Other reason'}
            onPress={() => handleCheckboxPress('Other reason')}
            title="Other reason"
          />
        </View>
        {/* <Text style={styles.inputLabel}>Add detailed reason</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your reason here..."
          multiline={true}
          numberOfLines={4} // Set the number of lines you want to display initially
          onChangeText={handleCommentChange}
          value={comment}
        /> */}
      </View>
    )
  }

  /**
      * Render submit buttons
      */
  const renderSubmitButton = () => {
    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          onPress={() => submission()}
          style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Header title="Cancel Orders" />
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
      {renderSubmitButton()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
    alignItems: "center"
  },
  headerIcon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: COLORS.gray
  },
  arrowLeft: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  moreIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  input: {
    borderColor: "gray",
    borderWidth: .3,
    borderRadius: 5,
    width: "100%",
    padding: 10,
    paddingBottom: 10,
    fontSize: 12,
    height: 150,
    textAlignVertical: "top"
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.black
  },
  btnContainer: {
    position: "absolute",
    bottom: 0,
    height: 72,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    alignItems: "center"
  },
  btn: {
    height: 48,
    width: SIZES.width - 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  btnText: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.white
  },
})

export default CancelOrders