import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TransactionHistoryData } from '../data/utils'
import TransactionCard from '../components/TransactionCard'
import Header from '../components/Header'

const TransactionHistory = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                <Header title="Transaction History" />
                <ScrollView>
                    <FlatList
                        data={TransactionHistoryData}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TransactionCard
                                image={item.image}
                                amount={item.amount}
                                type={item.type}
                                price={item.price}
                                date={item.date}
                                name={item.name}
                            />
                        )}
                    />
                </ScrollView>
            </View>
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
    subtitle: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
})

export default TransactionHistory