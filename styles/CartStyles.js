import { StyleSheet } from "react-native"
import { FONTS, COLORS, SIZES } from "../constants"


export const cartStyles = StyleSheet.create({
    header:{
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 4
    },
    footer:{
        height: 280,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 22,
        paddingVertical: 30,
        zIndex: 9999,
        // marginBottom: "5%"
    },
    body3:{
        fontSize: 14, 
        textTransform: 'uppercase',
        fontFamily: 'regular',
        color: COLORS.black
    },
    body2:{
        fontSize: 18, 
        color: COLORS.white,
        fontFamily: 'regular'
    },
    body3Color:{
        fontSize: 14, 
        textTransform: 'uppercase', 
        color: COLORS.primary,
        fontFamily: 'regular'
    },
    roundedBtn:{
            height: 24,
            width: 24,
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255,0.5)",
            alignItems: 'center',
            justifyContent: 'center'
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width -32,
        // height: 120,
        borderRadius: 30,
        marginTop: 8,
    },
})