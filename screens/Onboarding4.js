import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import PageContainer from '../components/PageContainer'
import DotsView from '../components/DotsView'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'

const Onboarding4 = ({ navigation }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(intervalId)
                    return prevProgress
                }

                return prevProgress + 0.5
            })
        }, 2000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        if (progress >= 1) {
            // navigate to the Feed Screen
            navigation.navigate('Login')
        }
    }, [progress, navigation])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <StatusBar style="light" />
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginHorizontal: 22,
                    }}
                >


                    <Image
                        source={images.onboarding4}
                        resizeMode="contain"
                        style={{
                            height: SIZES.width * 0.8,
                            width: SIZES.width * 0.8,
                        }}
                    />

                    <View
                        style={{
                            marginVertical: 18,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h3,
                                color: COLORS.black,
                            }}
                        >
                            Free delivery offers
                        </Text>
                        <Text
                            style={{
                                ...FONTS.h3,
                                color: COLORS.primary,
                            }}
                        >
                            FEELESS
                        </Text>
                    </View>

                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.black,
                            textAlign: 'center',
                        }}
                    >
                        Order from your chosen chef with no delivery fee.
                        You just place the order, we do the rest.
                    </Text>

                    <View
                        style={{
                            marginBottom: 20,
                            marginTop: 20
                        }}
                    >
                        {progress < 1 && <DotsView progress={progress} numDots={4} />}
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 22,
                        }}
                    >
                        <Button
                            title="Next"
                            filled
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                width: SIZES.width - 44,
                                marginBottom: SIZES.padding,
                            }}
                        />
                        <Button
                            title="Skip"
                            onPress={() => navigation.navigate('Login')}
                            style={{
                                width: SIZES.width - 44,
                                marginBottom: SIZES.padding,
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Onboarding4