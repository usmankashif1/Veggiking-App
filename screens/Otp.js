import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, illustrations } from '../constants'
import GeneralService from '../services/general.service';
import { useNavigation } from '@react-navigation/native';


const VerificationComponent = ({ route }) => {
  const { email } = route.params;
  const navigation = useNavigation();
  const [otpFields, setOtpFields] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (text, index) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = text;
    setOtpFields(newOtpFields);

    // If backspace is pressed and the field is empty, move focus to the previous field
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // If backspace is pressed and the field is empty, clear the previous field's value
    if (text.length === 0 && index > 0 && newOtpFields[index - 1] === '') {
      const updatedOtpFields = [...otpFields];
      updatedOtpFields[index - 1] = '';
      setOtpFields(updatedOtpFields);
    }

    // If a digit is entered and the field is not the last one, move focus to the next field
    if (text.length === 1 && index < otpFields.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otp = otpFields.join('');
    // Here you can implement your OTP verification logic
    // For demonstration, I'm just displaying the entered OTP in an alert
    // Alert.alert('OTP Error', "Enter valid OTP");
    try {
      const response = await GeneralService.checkForgotToken(otp, email); // Call the forgot method and capture the response
      navigation.replace("ResetPassword", { otp: otp, email: email });
    } catch (err) {
      console.log(err?.response?.status);
      if (err?.response?.status == 404) {
        Alert.alert("Error", "Incorrect otp");
      } else {
        Alert.alert("Error", "Server error. Please try again later.");
      }
    }
  };

  const handleBack = () => {
    // Implement your back button logic here
  };

  const handleForgot = async () => {
    try {
      // setIsLoading(true);
      // setIsEnable(false);
      const response = await GeneralService.forgotOtp(email); // Call the forgot method and capture the response
      console.log('Forgot response:', response); // Log the response to see the structure and extract the message if needed

      // setIsLoading(false);
      // setIsEnable(true);
      // Display the response message, assuming the response contains a 'message' field
      // Alert.alert('Success', 'Check your email to reset password'); // Modify the field according to your API response structure
      navigation.navigate("opt", { email: email });
    } catch (err) {
      console.error('Error occurred:', err);
      Alert.alert("Error", "Server error. Please try again later.");
      // setIsLoading(false);
      // setIsEnable(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>OTP Verification</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={illustrations.otpVerify}
          resizeMode="contain"
          style={styles.locationImage}
        />
        <Text style={styles.subHeaderText}>Verification code sent to</Text>
        <Text style={styles.phoneNumber}>{email}</Text>
        <View style={styles.inputContainer}>
          {/* <TextInput keyboardType='numeric' style={styles.input} name="field1" id="field1" />
          <TextInput keyboardType='numeric' style={styles.input} name="field2" id="field2" />
          <TextInput keyboardType='numeric' style={styles.input} name="field3" id="field3" />
          <TextInput keyboardType='numeric' style={styles.input} name="field4" id="field4" /> */}

          {otpFields.map((field, index) => (
            <TextInput
              key={index}
              keyboardType='numeric'
              style={styles.input}
              maxLength={1}
              value={field}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onSubmitEditing={() => {
                if (index === otpFields.length - 1) {
                  handleVerifyOTP();
                }
              }}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleForgot}>
            <Text style={styles.buttonText}>Resend Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleVerifyOTP}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Confirm</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity>
          <Text style={styles.otherMethods}>Try other login methods</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f44c00',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationImage: {
    height: SIZES.width * 0.8,
    width: SIZES.width * 0.9,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#495057',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: screenWidth * 0.8,
  },
  input: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: screenWidth * 0.8,
  },
  button: {
    flex: 1,
    backgroundColor: '#f44c00',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  secondaryButtonText: {
    color: '#ffffff',
  },
  otherMethods: {
    textAlign: 'center',
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationComponent;
