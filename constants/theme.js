import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

export const COLORS = {
    primary: '#f44c00',
    white: '#FFFFFF',
    black: "#32343E",
    secondaryBlack: "#646982",
    tertiaryBlack: "#181C2E",
    secondaryWhite: '#F7F7FC',
    tertiaryWhite: '#fafafa',
    white4: "#F5F4F8",
    blue: "#1E1E2E",
    gray: "#F0F5FA",
    secondaryGray: '#ECF0F4',
    tertiaryGray: "#F6F6F6",
    gray4: "#A0A5BA",
    gray5: "#676767",
    gray6: "#EDEDED",
    gray7: "#F6F8FA",
    yellow: "#FFD27C",
    orange: "#FFEBE4",
    green: "#059C6A",
    red: "#E04444"
}

export const SIZES = {
    // Global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,

    // FONTS Sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    // App Dimensions
    width,
    height,
}

export const FONTS = {
    largeTitle: {
        fontFamily: 'black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: { fontFamily: 'bold', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'bold', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: 'bold', fontSize: SIZES.h4, lineHeight: 20 },
    body1: { fontFamily: 'regular', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'regular', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'regular', fontSize: SIZES.body3, lineHeight: 22 },
    body5: { fontFamily: 'bold', fontSize: SIZES.body1, lineHeight: 50 },
    body4: { fontFamily: 'regular', fontSize: SIZES.body4, lineHeight: 20 },
}

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme