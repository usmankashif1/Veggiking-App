import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from "@expo/vector-icons"
import OTPTextInput from 'react-native-otp-textinput'

const Verification = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const otpInput = useRef(null)

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Verification</Text>
                <Text style={commonStyles.subHeaderTitle}>We have sent a code to your email</Text>
                <Text style={commonStyles.subHeaderTitleBold}>example@gmail.com</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <View style={styles.center}>
                    <Text style={commonStyles.inputHeader}>Code</Text>
                    <TouchableOpacity
                        onPress={() => console.log("Resend")}
                    >
                        <Text style={{ textDecorationLine: 'underline' }}>Resend</Text>
                    </TouchableOpacity>
                </View>
                <OTPTextInput
                    textInputStyle={commonStyles.OTPStyle}
                    inputCount={4}
                    tintColor={COLORS.primary}
                />
                <Button
                    title="VERIFY"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigation.navigate('ResetPassword')}
                    style={commonStyles.btn1}
                />
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Verification