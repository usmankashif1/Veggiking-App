import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS, SIZES, icons, illustrations } from "../constants"
import { commonStyles } from '../styles/CommonStyles'

const SubmitQuestion = ({ navigation }) => {
  /***
   * Render Submit answers header
   */
  function renderHeader() {
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
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: 'regular' }}>Ask Questions</Text>
      </View>
    )
  }

  /***
   * Render submit questions forms
   */

  function renderSubmitQuestionForm() {
    const [question, setQuestion] = useState('');

    const handleSubmit = () => {
      if (question.trim() === '') {
        Alert.alert('Error', 'Please enter your question');
      } else {
        // Perform the submission logic here, such as sending the question to the server or saving it locally.
        // You can customize this part based on your app's requirements.
        Alert.alert('Success', 'Your question has been submitted');
        setQuestion('');
      }
    };

    return (
      <View style={styles.container}>
        <Image
          source={illustrations.question}
          resizeMode='contain'
          style={{
            width: SIZES.width * 0.8,
            height: SIZES.width * 0.8
          }}
        />
        <Text style={styles.title}>Submit your questions</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your question"
          onChangeText={(text) => setQuestion(text)}
          value={question}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <View style={{
        flex: 1,
        marginHorizontal: 12
      }}>
        {renderHeader()}
        {renderSubmitQuestionForm()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 150,
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default SubmitQuestion