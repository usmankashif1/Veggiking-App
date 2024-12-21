import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { COLORS, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'

const Header = ({ title }) => {
    const navigation = useNavigation();

  return (
<View style={styles.headerContainer}>
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={commonStyles.header1Icon}>
        <Image
            source={icons.arrowLeft}
            resizeMode='contain'
            style={styles.arrowLeft}
        />
    </TouchableOpacity>
    <Text style={[styles.title, styles.leftTitle]}>{title}</Text>
    {/* <TouchableOpacity style={styles.headerIcon}>
        <Image
            source={icons.more}
            resizeMode='contain'
            style={styles.moreIcon}
        />
    </TouchableOpacity> */}
</View>

  )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between', // Add this to push the title to the left
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto', // Adjust to push the title to the left
    },
    leftTitle: {
        marginLeft: 10, // Additional margin to create space between the back button and the title
    },
    headerIcon: {
        marginRight: 10,
    },
    arrowLeft: {
        width: 20,
        height: 20,
    },
    moreIcon: {
        width: 20,
        height: 20,
    },
})

export default Header