import { View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const StartUpScreen = () => {
  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white
     }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
     </View>
    )
}

export default StartUpScreen